import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CardLayoutPreview } from "./components/CardLayoutPreview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CardLayoutPreview />
  </StrictMode>,
);
