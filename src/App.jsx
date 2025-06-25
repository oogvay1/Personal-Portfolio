import { useRef, useState } from "react";
import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import BackgroundText from "./Components/BackgroundText";
import Landing from "./Components/Landing/Landing";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  const [loadingComplete, setLoadingComplete] = useState(false);
  const sticky = useRef(null);

  return (
    <>
      {loadingComplete && <Cursor sticky={sticky} />}
      <Spline />
      <BackgroundText isComplete={loadingComplete} text="AZIMBEK" />
      <Header isComplete={loadingComplete} ref={sticky} />
      <div className="div"></div>
      <Landing isComplete={loadingComplete} setIsComplete={setLoadingComplete} />
    </>
  );
}

export default App;
