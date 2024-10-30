import LaunchCards from "./pages/LaunchCards/LaunchCard.jsx";
import Spacer from "./Spacer.jsx";
import Navbar from "./Navbar.jsx";
import About from "./pages/about.jsx";

function App() {
  let component;

  switch (window.location.pathname) {
    case "/":
      component = <LaunchCards />;
      break;
    case "/about":
      component = <About />;
      break;
  }
  
  return (
    <>
      <Navbar />

      {component}
    </>
  );
}

export default App;
