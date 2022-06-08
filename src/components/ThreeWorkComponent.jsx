import { useEffect } from "react"
import { isFocusingObject, onResetCamera, endWorks } from "./ThreeController"

export default function ThreeWorkComponent({setScreen}){

    useEffect(() => {
        return () => {
            endWorks()
        }
    }, [])

    const handleScreen = () => {
        setScreen("home")
    }

    return(
        <>
        <div className="voxel-editor-buttons">
            <button
                onClick={onResetCamera}
                className ="buttonClass button-decoration">
                RESET
            </button>
        </div>
        <button className="back-btn" onClick={handleScreen}> &lt;-- Back</button>
        </>
    )
}