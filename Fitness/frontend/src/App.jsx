import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import {DashboardPage, EditWorkout} from './dashboard.jsx'
import RegisterPage from './Register.jsx'
import WorkoutPage from './WorkoutLog.jsx'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/workout-log/' element={<WorkoutPage/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='' element={<RegisterPage/>} />
        <Route path='/edit-workout/:id' element={<EditWorkout/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
