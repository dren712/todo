import { useEffect, useState } from "react"
import axios from "axios"

export default function Text(){
    const [ip, setip]=useState("")
    const [todos, setTodos]=useState([])

useEffect(()=>{
    async function fetchAll(){
        const response = await axios.get("http://localhost:2003/get")
        setTodos(response.data)
    }
    fetchAll()
},
[]);

async function subHandler(){
    try {
        if(!ip) return alert("Enter valid data")
    const response = await axios.post("http://localhost:2003/submit",{task:ip})
    setTodos([...todos,response.data])
    setip("")
    } catch (error) {
        console.error("Error:-",error)
    }
}

async function delHandler(id){
        try {
            await axios.delete(`http://localhost:2003/delete/${id}`)
            setTodos(todos.filter(todo => todo._id !== id))
        } catch (error) {
            console.error("Error:",error)
        }
}
async function clrHandler() {
    
    try {
        await axios.delete("http://localhost:2003/clear")
        setTodos([])
    } catch (error) {
        console.error("Error clearing todos:", error)
    }    
}
    return(
        <div className="flex flex-col items-center">
            <div className="flex  justify-center">
            <input 
            type="text"
            value={ip} 
            className="bg-white w-[400px] rounded p-2 focus:outline-none"
            onChange={(e)=>(setip(e.target.value))}
            placeholder="Enter a To-Do..." />
            </div>
            <div className="flex items-center justify-center p-5 space-x-40 ">
                <button onClick={subHandler} style={{backgroundColor:"#16C47F"}} className="py-1 px-2 rounded text-white drop-shadow-lg hover:-translate-y-1 ease-in-out transition-all duration-200">Submit</button>
                <button onClick={clrHandler} className="bg-red-500 text-white p-1 rounded drop-shadow-lg py-1 px-2 hover:-translate-y-1 transition-all ease-in-out duration-200">Clear All</button>
            </div>

            <div className="flex flex-col items-center justify-center  w-[800px] space-y-2 " >
            {todos.map((todo)=>(<div className="flex items-center justify-between w-full p-2 bg-white rounded " key={todo._id}>
                <div className="flex ">
                {todo.task}
                </div>
                <button 
                onClick={() => delHandler(todo._id)}
                className="bg-red-500 rounded text-xs text-white p-1">
                 Delete</button>
                </div>
                ))}
            </div>
        </div>
    )
}