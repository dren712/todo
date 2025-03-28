import { toast } from "react-toastify";

export const handleSuccess = (msg) =>{
    toast.success(msg,{
        position: 'top-right',
        // style: { marginTop: "-60px" }, // Moves it higher up

    })
}

export const handleError = (msg) =>{
    toast.error(msg,{
        position: 'top-right'
    })
}