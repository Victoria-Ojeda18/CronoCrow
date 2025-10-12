// src/app.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './app/dashboard/page'
import Login from './app/login/page'
import Dashboard from './app/dashboard/attendance/loading'
import Employees from './app/dashboard/employees/page'
import AddEmployee from './app/dashboard/employees/add/page'
import TimeOff from './app/dashboard/time-off/page'
import Attendance from './app/dashboard/attendance/page'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/employees" element={<Employees />} />
        <Route path="/dashboard/employees/add" element={<AddEmployee />} />
        <Route path="/dashboard/time-off" element={<TimeOff />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
    </Routes>
  )
}

export default App



