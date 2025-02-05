import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import ContextsProviders from "./contexts/ContextsProviders";

// Import styles
import "./index.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ContextsProviders />
    </StrictMode>,
  );
}
