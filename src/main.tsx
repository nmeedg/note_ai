import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "katex/dist/katex.min.css";
import './index.css'
import { FluentProvider, webLightTheme } from "@fluentui/react-components"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider theme={webLightTheme} style={{ height: "100vh", background: "transparent", paddingTop: "0.5rem" }} >
    <App />
  </FluentProvider>,
)

// // Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })
