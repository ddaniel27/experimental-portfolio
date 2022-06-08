import {useState} from "react"

export default function WorkCard({handleCloseModal, isLoaded, loadedImg=false, title='title', description='description', image='https://via.placeholder.com/150', gif='https://via.placeholder.com/150'}){

    const [ imgSrc, setImgSrc ] = useState(image)

    const handleGif = () => {
        setImgSrc(gif)
    }

    const handleImage = () => {
        setImgSrc(image)
    }

    return(
        <div className="work-card">
            <div className="work-card-title">
                <h1>{title}</h1>
                <span onClick={handleCloseModal}></span>
            </div>
            
            <img style={loadedImg ? {} : { display: 'none' }} src={imgSrc} onMouseOver={handleGif} onMouseOut={handleImage} alt="work-img" onLoad={()=>{isLoaded(true)}} />
            <p>
                {description}
            </p>
        </div>
    )
}