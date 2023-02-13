import Signup from "./components/signup/Signup";
import { BrowserRouter ,Routes ,Route} from "react-router-dom";
import Login from "./components/login/Login";

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
