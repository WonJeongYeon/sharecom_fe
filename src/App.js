import logo from './logo.svg';
import './App.css';
import Nav from "./nav/Nav";
import Parts from "./parts/Parts";

function App() {
  return (
    <div style={{display: "flex", flexDirection: "row", width:"100%", height:"100%"}}>
      <Nav></Nav>
        <Parts></Parts>

    </div>
  );
}

export default App;
