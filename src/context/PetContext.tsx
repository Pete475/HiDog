import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  addDays,
  daysBetween,
  isAfter,
  isSameDayOrBefore,
  parseISODateLocal,
} from "../lib/dates";

export type PetState = {
  petName: string;
  microchipNumber: string;
  microchipImplantDate: string;
  rabies1Date: string;
  rabies2Date: string;
  favnDrawDate: string;
  /** Planned flight date to Hawaii (used for planning countdowns only). */
  estimatedDepartureDate: string;
  neighborIsland: boolean;
};

const initialPetState: PetState = {
  petName: "",
  microchipNumber: "",
  microchipImplantDate: "",
  rabies1Date: "",
  rabies2Date: "",
  favnDrawDate: "",
  estimatedDepartureDate: "",
  neighborIsland: false,
};

type PetAction =
  | { type: "SET_FIELD"; field: keyof PetState; value: string | boolean }
  | { type: "RESET" };

function petReducer(state: PetState, action: PetAction): PetState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { ...initialPetState };
    default:
      return state;
  }
}

export type ValidationIssue = {
  id: string;
  severity: "error" | "warning";
  message: string;
};

export function usePetValidation(state: PetState): {
  issues: ValidationIssue[];
  isIneligible: boolean;
  microchipBeforeRabies1: boolean;
  rabies30DayGapOk: boolean | null;
} {
  return useMemo(() => {
    const issues: ValidationIssue[] = [];
    const chip = parseISODateLocal(state.microchipImplantDate);
    const r1 = parseISODateLocal(state.rabies1Date);
    const r2 = parseISODateLocal(state.rabies2Date);
    const favn = parseISODateLocal(state.favnDrawDate);

    let isIneligible = false;
    let microchipBeforeRabies1 = true;
    let rabies30DayGapOk: boolean | null = null;

    if (r1 && favn && isAfter(r1, favn)) {
      isIneligible = true;
      issues.push({
        id: "rabies-after-favn",
        severity: "error",
        message:
          "Ineligible: first rabies vaccination date is after your FAVN draw. Hawaii’s program requires rabies vaccination before the blood sample is collected.",
      });
    }

    if (chip && r1 && !isSameDayOrBefore(chip, r1)) {
      microchipBeforeRabies1 = false;
      issues.push({
        id: "chip-after-rabies",
        severity: "error",
        message:
          "Microchip implantation must be on or before the date of the first rabies vaccination.",
      });
    }

    if (r1 && r2) {
      const gap = daysBetween(r1, r2);
      rabies30DayGapOk = gap >= 30;
      if (gap < 30) {
        issues.push({
          id: "rabies-gap",
          severity: "error",
          message: `Rabies shots must be at least 30 days apart (currently ${gap} day${gap === 1 ? "" : "s"}).`,
        });
      }
    } else {
      rabies30DayGapOk = null;
    }

    return { issues, isIneligible, microchipBeforeRabies1, rabies30DayGapOk };
  }, [state]);
}

export type TimelineResult = {
  favn: Date | null;
  earliestAfter30Days: Date | null;
  dateAfter120Days: Date | null;
  safeWindowSummary: string | null;
};

export function computeTimeline(state: PetState): TimelineResult {
  const favn = parseISODateLocal(state.favnDrawDate);
  if (!favn) {
    return {
      favn: null,
      earliestAfter30Days: null,
      dateAfter120Days: null,
      safeWindowSummary: null,
    };
  }
  const earliestAfter30Days = addDays(favn, 30);
  const dateAfter120Days = addDays(favn, 120);
  const safeWindowSummary =
    "Plan arrival on or after the 30-day rule date. Confirm the 120-day milestone and Direct Airport Release steps with HDOA and your accredited vet.";
  return { favn, earliestAfter30Days, dateAfter120Days, safeWindowSummary };
}

type PetContextValue = {
  state: PetState;
  setField: (field: keyof PetState, value: string | boolean) => void;
  reset: () => void;
  validation: ReturnType<typeof usePetValidation>;
  timeline: TimelineResult;
};

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(petReducer, initialPetState);

  const setField = useCallback((field: keyof PetState, value: string | boolean) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const validation = usePetValidation(state);
  const timeline = useMemo(() => computeTimeline(state), [state]);

  const value = useMemo(
    () => ({
      state,
      setField,
      reset,
      validation,
      timeline,
    }),
    [state, setField, reset, validation, timeline],
  );

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet(): PetContextValue {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePet must be used within PetProvider");
  return ctx;
}
