import { Route, Routes } from 'react-router'
import "./Styles.css"
import BetaPage from './pages/Beta'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CheckVerification from './pages/CheckVerification'
import PrivatePolicy from './pages/PrivatePolicy'
import Session from './pages/Session'
import Settings from './pages/Settings'
import { ClassDashboard } from './pages/ClassDashboard'
import { SetupPage } from './pages/Setup'

function App() {
  return (
    <>
    <Routes>
      <Route path='/'>
        <Route path='' element={<BetaPage />} />
        <Route path='login' element={<Login />} />
        <Route path='setup' element={<SetupPage />} />
        <Route path='signup' element={<Signup />} />
        <Route path='checkyouremail' element={<CheckVerification />} />
        <Route path='privatepolicy' element={<PrivatePolicy />} />  {/**/}

        {/* TODO: conditional on authentication routing */}
        {/* <Route element={<Root />}>
          
        </Route> */}
        <Route path='session' element={<Session />} />
        <Route path='settings' element={<Settings />} />

      </Route>
    </Routes>
    </>
  )
}

export default App
