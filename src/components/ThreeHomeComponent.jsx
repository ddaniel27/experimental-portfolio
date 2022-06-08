import React from "react";

import {onMergeClick, onResetClick, onStringClick, aChar, cChar, wChar} from './ThreeController'
function ThreeHomeComponent({setScreen}) {
  
  const [showButtons, setShowButtons] = React.useState(false)
  const [merge, setMerge] = React.useState(false)
  const [string, setString] = React.useState(false)
  const [showPages, setShowPages] = React.useState(false)
  
  React.useEffect(() => {
    setShowButtons(true)
  }, [])
  const handleMerge = () => {
    setMerge(true)
    onMergeClick()
  }
  const handleString = () => {
    setString(true)
    onStringClick()
  }
  const handleReset = () => {
    setMerge(false)
    setString(false)
    onResetClick()
  }
  const handlePages = () => {
    setShowPages(!showPages)
  }
  const handleAbout = () => {
    setScreen("about")
    aChar()
  }
  const handleWork = () => {
    setScreen("work")
    wChar()
  }
  return(
    <div className="buttons-container">
      <div className="voxel-editor-buttons">
        <button
          onClick={handleReset}
          className ="buttonClass button-decoration"
          style={{"display": showButtons ? "block" : "none"}}>
          RESET
        </button>
        <button
          onClick={handleMerge}
          className ="buttonClass button-decoration"
          style={{"display": showButtons && !merge ? "block" : "none"}}>
          MERGE
        </button>
        <button
          onClick={handleString}
          className ="buttonClass button-decoration"
          style={{"display": showButtons && merge && !string ? "block" : "none"}}>
          STRING
        </button>
      </div>
      <div className="dropdown">
        <button className="dropbtn buttonClass button-decoration" style={{"display": showButtons ? "block" : "none"}} onClick={handlePages}>CLICK ME</button>
        <div className="page-buttons" style={{"display": showPages ? "block" : "none"}}>
          <button
            onClick={cChar}
            className ="buttonClass button-under-animation"
            style={{"display": showButtons ? "block" : "none"}}>
            C
          </button>
          <button
            onClick={handleAbout}
            className ="buttonClass button-under-animation"
            style={{"display": showButtons ? "block" : "none"}}>
            A
          </button>
          <button
            onClick={handleWork}
            className ="buttonClass button-under-animation"
            style={{"display": showButtons ? "block" : "none"}}>
            W
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default ThreeHomeComponent