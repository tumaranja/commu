import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FilterOptionsPreview } from "./components/FilterOptionsPreview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterOptionsPreview />
  </StrictMode>,
);
