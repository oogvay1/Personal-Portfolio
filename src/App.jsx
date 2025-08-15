import { useEffect, useRef, useState } from "react";
import { Cursor } from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import Rotate from './Components/Rotate/Rotate'
import BackgroundText from "./Components/BackgroundText";
import { Canvas } from "@react-three/fiber";
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
import gsap from "gsap";
import Wave from "./Components/Wave";
import WaveWithText from "./Components/Wave";
import WaveBackground from "./Components/Wave";
import WhiteWave from "./Components/Wave";

function App() {

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const sticky = useRef(null);
  const about = useRef(null);
  const btn = useRef(null);
  const imgList = useRef([]);
  const mainContent = useRef(null);

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

    if (isClick) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => lenis.destroy();
  }, [isClick]);

  useEffect(() => {
    if (isClick) {

      gsap.to("#main", {
        y: "100vh",
        duration: 2,
        ease: "power4.inOut"
      });

      setIsScroll(false);

    } else {

      gsap.to("#main", {
        y: "0vh",
        duration: 2,
        ease: "power4.inOut"
      });

      setIsScroll(true);
    }
  }, [isClick]);


  return (
    <>
      {loadingComplete && <Cursor sticky={sticky} about={about} img={imgList} />}

      <main id="main">
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

        <Works isScroll={isScroll} ref={imgList} />

        <section>
          <MyGoal />
        </section>

        <div className="divvvv">
          <Canvas style={{ width: '100vw', height: '100vh', zIndex: 9999 }}>
            <Wave />
          </Canvas>
          <h1 style={{fontSize: 200, marginTop: -290, color: "red", zIndex: -9999}}>salom</h1>
        </div>

        <div className="divvvv"></div>

      </main >

      <Header isComplete={loadingComplete} ref={sticky} isClick={isClick} setClick={setIsClick} />
      <div className="div"></div>
      <Landing isComplete={loadingComplete} setIsComplete={setLoadingComplete} />
      <Navigation isClick={isClick} />
    </>
  );
}

export default App