import { useNavigate } from "react-router-dom"

export default function Navbar({handleLogout}){

    const navigate = useNavigate()
    return(
        <div 
        style={{backgroundColor:"#3674B5"}}
        className="flex flex-col justify-between  p-3">
            <div className="flex justify-between ">
                <button className="text-white text-2xl px-2 ">Pranav</button>
            <div className="flex space-x-4 text-xl text-white ">
                <button onClick={()=>navigate('/contact')} className=" hover:-translate-y-1 translation-all ease-in-out duration-200">Contact</button>
                <button onClick={()=>navigate('/aboutme')} className=" hover:-translate-y-1 translation-all ease-in-out duration-200">About Me</button>
                <button onClick={handleLogout} className=" hover:-translate-y-1 translation-all ease-in-out duration-200">Logout</button>
            </div>
        </div>
        </div>  
    )
}