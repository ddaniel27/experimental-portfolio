import { useEffect, useState } from "react"
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
    const [ projectArray, setProjectArray ] = useState(myData.works.sort(() => 0.5 - Math.random()))
    const [ openCard, setOpenCard ] = useState(false)

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }
    const handleScreen = () => {
        setScreen("home")
    }
    const handleEventListener = async () => {
        if(testVaraible){
            setOpenCard(true)
        }else{
            setOpenCard(false)
        }
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

    useEffect(()=>{
        if(!openCard){
            if(projectArray.length < 1){
                setProjectArray( myData.works.sort(() => 0.5 - Math.random()) )
            }else{
                setCurrentProject(projectArray[projectArray.length - 1])
                setProjectArray( projectArray.slice(0, projectArray.length - 1) )
            }
        }
    },[openCard])

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