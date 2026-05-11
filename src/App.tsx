import { Navigate, Route, Routes } from "react-router-dom";
import { PetProvider } from "./context/PetContext";
import { PhaseLayout } from "./layouts/PhaseLayout";
import { LandingPage } from "./pages/LandingPage";
import { Phase1Form } from "./components/Phase1Form";
import { Phase2Timeline } from "./components/Phase2Timeline";
import { Phase3Checklist } from "./components/Phase3Checklist";

export default function App() {
  return (
    <PetProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PhaseLayout />}>
          <Route path="/phase-1" element={<Phase1Form />} />
          <Route path="/phase-2" element={<Phase2Timeline />} />
          <Route path="/phase-3" element={<Phase3Checklist />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PetProvider>
  );
}
