import { useRef } from "react";
import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  const sticky = useRef(null);

  return (
    <>
      <Cursor sticky={sticky} />
      <Spline />
      <Header ref={sticky} />
    </>
  );
}

export default App;
