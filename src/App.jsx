import React from "react"

import ThreeHomeComponent from './components/ThreeHomeComponent'
import ThreeAboutComponent from './components/ThreeAboutComponent'
import ThreeWorkComponent from "./components/ThreeWorkComponent"
import ThreeContactComponent from "./components/ThreeContactComponent"
import ThreeController from "./components/ThreeController"

function App() {
  const divRef = React.useRef(null)
  const [screen, setScreen] = React.useState("home")

  React.useEffect(() => {
    ThreeController(divRef.current)
  }, [])

  return (
    <div ref={divRef} className="main-container">
      {screen === "home" && <ThreeHomeComponent setScreen={setScreen} />}
      {screen === "about" && <ThreeAboutComponent setScreen={setScreen} />}
      {screen === "work" && <ThreeWorkComponent setScreen={setScreen} />}
      {screen === "contact" && <ThreeContactComponent setScreen={setScreen} />}

    </div>
  );
}

export default App;
