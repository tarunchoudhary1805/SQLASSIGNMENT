import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Upload from "./Components/Upload";
import Routes from "./Components/Routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
      {/* <Upload /> */}
    </BrowserRouter>
  );
}

export default App;
