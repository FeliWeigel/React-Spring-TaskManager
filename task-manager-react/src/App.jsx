import "../index.css"
import Home from "./components/Home";
import Login from "./components/access/Login";
import Register from "./components/access/Register"
import {Route, Routes} from "react-router-dom"
import AddTask from "./components/task/AddTask";
function App(){
    return(
        <div className="App">
            <Routes>
                <Route exact path="/register" element={<Register/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/tasks/add" element={<AddTask/>}></Route>
            </Routes>
        </div>
    )
}

export default App;
