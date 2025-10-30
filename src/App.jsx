import { Routes, Route } from "react-router-dom";
import Navber from "./components/Navber";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <>

      <Navber />

      <Routes>
       
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
