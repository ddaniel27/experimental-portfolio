import { useEffect, useState, useLayoutEffect } from "react"
import { testVaraible, onResetCamera, endWorks } from "./ThreeController"
import WorkCard from "./atom/workCard"
import data from './data/works.json'

export default function ThreeWorkComponent({setScreen}){

    const [ myData, setMyData ] = useState({
        ...data,
    })

    const [ currentProject, setCurrentProject ] = useState({})
    const [ showCard, setShowCard ] = useState(false)
    const [ prevPath, setPrevPath ] = useState(false)
    const [ loadedImg, setLoadedImg ] = useState(false)

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }

    const handleScreen = () => {
        setScreen("home")
    }

    const handleEventListener = async () => {
        setCurrentProject(myData.works[Math.floor(Math.random() * myData.works.length)])
        await delay(1600)
        setShowCard(testVaraible)
    }
    const handleCloseModal = () => {
        setShowCard(false)
        onResetCamera()
    }

    useEffect(()=>{
        if(prevPath !== currentProject.image){
            setLoadedImg(false)
        }
        setPrevPath(currentProject.image)
    },[currentProject])

    useEffect(() => {
        window.addEventListener('pointerdown',handleEventListener)
        return () => {
            endWorks()
        }
    }, [])

    return(
        <>
            <button className="back-btn" onClick={handleScreen}> &lt;-- Back</button>
            {showCard && <WorkCard isLoaded={setLoadedImg} loadedImg={loadedImg} handleCloseModal={handleCloseModal} {...currentProject} />}
        </>
    )
}