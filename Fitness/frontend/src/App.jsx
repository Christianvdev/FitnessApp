import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import {WorkoutDisplay, EditWorkout} from './WorkoutDay.jsx'
import RegisterPage from './Register.jsx'
import WorkoutLogging from './WorkoutLog.jsx'
import DashboardPage from './DashboardPage.jsx'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/workout-log/:day' element={<WorkoutLogging/>} />
        <Route path='/dashboard/:day' element={<WorkoutDisplay/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/edit-workout/:id/:day' element={<EditWorkout/>}/>
        <Route path='/home' element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
