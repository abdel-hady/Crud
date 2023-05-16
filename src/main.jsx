import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./components/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProviders>
  // </React.StrictMode>
);
