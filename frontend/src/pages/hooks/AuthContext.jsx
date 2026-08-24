import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkAuth() {
    const token = localStorage.getItem("token");
    

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resposta = await response.json();
      setUser(resposta.success);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
