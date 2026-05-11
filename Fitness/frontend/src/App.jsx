import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import WorkoutLog from './WorkoutLog.jsx'
import DashboardPage from './dashboard.jsx'
import RegisterPage from './Register.jsx'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/workout-log' element={<WorkoutLog/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='' element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
