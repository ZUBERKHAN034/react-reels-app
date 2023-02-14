import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./routes/Protected";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Feed from "./components/feed/Feed";
import ResetPassword from "./components/resetpassward/ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <Protected Component={<Feed/>}/>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
