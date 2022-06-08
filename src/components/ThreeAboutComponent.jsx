import React from "react"
import {initAbout, endAbout} from './ThreeController'


function ThreeAboutComponent({setScreen}){

    React.useEffect(() => {
        initAbout()
        return () => {
            endAbout()
        }
    }, [])

    const handleAbout = () => {
        setScreen("home")
    }

    return(
        <div className="about-container">
            <div className="point-container point-1">
                <div className="text">I love plants 🌳</div>
            </div>
            <div className="point-container point-6">
                <div className="text">LowPoly style 👾</div>
            </div>
            <div className="point-container point-5">
                <div className="text">I have a dog and I love it 🐶</div>
            </div>
            <div className="point-container point-3">
                <div className="text">I really like videogames 🎮</div>
            </div>
            <div className="point-container point-4">
                <div className="text">History documentaries fan ⛰️</div>
            </div>
            <div className="point-container point-2">
                <div className="text">I'm a telecommunications engineer 📡</div>
            </div>
            <div className="bars-6"></div> 
            <button className="back-btn" onClick={handleAbout}> &lt;-- Back</button>
        </div>
    );
}

export default ThreeAboutComponent;