import Cursor from "./Components/Cursor/Cursor";
import Header from "./Components/Header/Header";
import Spline from './Components/Spline/Spline'
import Lenis from "lenis";

function App() {

  const lenis = new Lenis({
    autoRaf: true,
  });

  return (
    <>
      <Cursor />
      <Spline />
      <Header />
    </>
  );
}

export default App;
