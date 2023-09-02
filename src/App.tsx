import { Route, Routes } from "react-router-dom";
import "./Styles.css"
import Main from "./pages/Main";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import BetaPage from './pages/Beta'
import Room from "./pages/Room";
import Signup from './pages/Signup'
import CheckVerification from './pages/CheckVerification'
import PrivatePolicy from './pages/PrivatePolicy'
import Session from './pages/Session'
import Settings from './pages/Settings'
import {ClassDashboard} from './pages/ClassDashboard'
import {SetupPage} from './pages/Setup'
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      w='100vw'
      h='100vh'  
    >
      <Routes>
        <Route path='/'>
          <Route path='' element={<BetaPage />} />
          <Route path='/room/:roomCode' element={<Room/>} />
          <Route path='login' element={<Login/>} />
          <Route path='setup' element={<SetupPage />} />
          <Route path='signup' element={<Signup />} />
          <Route path='checkyouremail' element={<CheckVerification />} />
          <Route path='privatepolicy' element={<PrivatePolicy />} />
        </Route>
        
        <Route path='/home' element={<Main/>} >
          <Route path='session' element={<Session />} />
          <Route path='dashboard' element={<ClassDashboard />} />
          <Route path='settings' element={<Settings />} />
          <Route path="*" element={<Error404/>} />
        </Route>
      </Routes>
    </Flex>
  );
}

export default App;
