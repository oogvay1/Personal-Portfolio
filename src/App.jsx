import { useEffect, useRef, useState } from "react";
import { Cursor } from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import Rotate from './Components/Rotate/Rotate'
import BackgroundText from "./Components/BackgroundText";
import Landing from "./Components/Landing/Landing";
import SideText from "./Components/SideText/SideText";
import Navigation from "./Components/Navigation/Navigation";
import Creative from "./Components/Creative/Creative";
import About from "./Components/About/About";
import Screw from "./Components/Screw/Screw";
import Work from "./Components/Work/Work";
import Works from "./Components/Works/Works";
import MyGoal from "./Components/MyGoal/MyGoal";
import Marquee from "./Components/Marquee/Marquee";
import Slider from "./Components/Slider/Slider";

function App() {

  useEffect(() => {

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      wheelMultiplier: .7,
    })

    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const sticky = useRef(null);
  const about = useRef(null);
  const btn = useRef(null);
  const imgList = useRef([]);

  return (
    <>
      {loadingComplete && <Cursor sticky={sticky} about={about} img={imgList} />}

      <main>
        <section className="hero-section">
          <Spline />
          <BackgroundText isComplete={loadingComplete} text="AZIMBEK" />
          {/* <Creative /> */}
          <SideText completed={loadingComplete} ref={about} hover={isHover} setHover={setIsHover} />
          {/* <Marquee /> */}
        </section>

        <section className="about-section">
          <About />
        </section>

        <section className="work-section">
          <Works ref={imgList} />
        </section>

        <section>
          <MyGoal />
        </section>

      </main>
      <Header isComplete={loadingComplete} ref={sticky} isClick={isClick} setClick={setIsClick} />
      <div className="div"></div>
      <Landing isComplete={loadingComplete} setIsComplete={setLoadingComplete} />
      <Navigation isClick={isClick} />
    </>
  );
}

export default App