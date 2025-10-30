import { Routes, Route } from "react-router-dom";
import Navber from "./components/Navber";
import Create from "./components/Create";
import Read from "./components/Read";

function App() {
  return (
    <>

      <Navber />

      <Routes>
       
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </>
  );
}

export default App;
