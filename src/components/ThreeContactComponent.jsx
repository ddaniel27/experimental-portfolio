import { useEffect } from "react"
import { endContact } from "./ThreeController"

export default function ThreeContactComponent({setScreen}){
    const handleContact = () => {
        setScreen("home")
    }

    useEffect(()=>{
        return () => {
            endContact()
        }
    },[])

    return(
        <button className="back-btn" onClick={handleContact}> &lt;-- Back</button>
    )
}