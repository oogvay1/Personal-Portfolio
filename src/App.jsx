import { useRef, useState } from "react";
import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import BackgroundText from "./Components/BackgroundText";
import Landing from "./Components/Landing/Landing";
import SideText from "./Components/SideText/SideText";
import Navigation from "./Components/Navigation/Navigation";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const sticky = useRef(null);
  const about = useRef(null);

  return (
    <>
      {loadingComplete && <Cursor sticky={sticky} about={about} />}
      <Spline />

      <main>
        <BackgroundText isComplete={loadingComplete} text="AZIMBEK" />
        <SideText completed={loadingComplete} ref={about} hover={isHover} setHover={setIsHover} />
      </main>
      <Header isComplete={loadingComplete} ref={sticky} />
      <div className="div"></div>
      <Landing isComplete={loadingComplete} setIsComplete={setLoadingComplete} />
      <Navigation />
    </>
  );
}

export default App;
