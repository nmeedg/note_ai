import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "katex/dist/katex.min.css";
import "./styles/block-editor.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
