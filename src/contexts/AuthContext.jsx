import { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const clearUser = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
    });
    return () => clearUser();
  }, []);

  const store = {
    user,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
