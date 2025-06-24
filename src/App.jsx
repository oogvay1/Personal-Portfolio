import { useRef } from "react";
import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";
import BackgroundText from "./Components/BackgroundText";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  const sticky = useRef(null);

  return (
    <>
      <Cursor sticky={sticky} />
      <Spline />
      <BackgroundText text="AZIMBEK" />
      <Header ref={sticky} />
      <div className="div"></div>
    </>
  );
}

export default App;
