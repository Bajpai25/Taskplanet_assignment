import React from 'react'
import {Route , Routes} from "react-router-dom"
import Dashboard from './components/Dashboard'
import User_Form from './components/User_Form'
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import ProtectedRoute from './components/Auth/Protected_route'
import Error from './components/Auth/Error'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><Dashboard/></ProtectedRoute>}></Route>
     <Route path="/user_details" element={<ProtectedRoute allowedRoles={['User','Admin']}><User_Form/></ProtectedRoute>}/>
      {/* Unauthorized page for restricted access */}
      <Route path="/unauthorized" element={<Error/>} />
    </Routes>
    </div>
  )
}

export default App