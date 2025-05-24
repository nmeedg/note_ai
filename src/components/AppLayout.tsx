import Sidebar from "./sidebar"
import AppBar from './AppBar';

function AppLayout() {
  return (
    <div>
      <div id="appbar">
      <AppBar/>
      </div>
      <Sidebar/>
    </div>
  )
}

export default AppLayout