import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FluentProvider, webLightTheme } from "@fluentui/react-components"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider theme={webLightTheme} style={{ height: "100vh", overflow: 'hidden', background: "transparent"}} >
    <App />
  </FluentProvider>,
)