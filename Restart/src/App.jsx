import { BrowserRouter, Navigate, Route, Routes,  } from "react-router-dom";
import Box from "./components/Box";
import Navbar from "./components/Navbar";
import Text from "./components/Text";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";


export default function App() {
  
  const [isAuthed, setIsAuthed] = useState(false)
  const PrivateRoute = ({element})=>{
    return isAuthed ? element : <Navigate to = '/login ' />
  }

  return (

      <div className="App">
        <RefreshHandler setIsAuthed={setIsAuthed}/>  
      <Routes>
        <Route path="/" element={<Navigate to = '/login'/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/aboutme" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      </div>
  )
}


