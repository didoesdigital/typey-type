import "./instrument";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentTitle from "components/DocumentTitle";
import ErrorBoundary from "./components/ErrorBoundary";
import AppWithAtomsCompat from "AppWithAtomsCompat";
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <DocumentTitle title="Typey Type for Stenographers">
    <Router
      basename={import.meta.env.VITE_PUBLIC_URL}
      future={{
        v7_relativeSplatPath: false,
        v7_startTransition: false,
      }}
    >
      <ErrorBoundary>
        <Routes>
          <Route path={"*"} element={<AppWithAtomsCompat />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  </DocumentTitle>,
);
