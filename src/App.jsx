import { useEffect, useRef, useState } from "react";
import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import BackgroundText from "./Components/BackgroundText";
import Landing from "./Components/Landing/Landing";
import SideText from "./Components/SideText/SideText";
import Navigation from "./Components/Navigation/Navigation";
import Creative from "./Components/Creative/Creative";
import About from "./Components/About/About";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const sticky = useRef(null);
  const about = useRef(null);
  const btn = useRef(null);
  
  return (
    <>
      {loadingComplete && <Cursor sticky={sticky} about={about} />}
      <Spline />

      <main>
        <section>
          <BackgroundText isComplete={loadingComplete} text="AZIMBEK" />
          {/* <Creative /> */}
          <SideText completed={loadingComplete} ref={about} hover={isHover} setHover={setIsHover} />
        </section>

        <section>
          <About />
        </section>

      </main>
      <Header isComplete={loadingComplete} ref={sticky} isClick={isClick} setClick={setIsClick} />
      <div className="div"></div>
      <Landing isComplete={loadingComplete} setIsComplete={setLoadingComplete} />
      <Navigation isClick={isClick} />
    </>
  );
}

export default App;
