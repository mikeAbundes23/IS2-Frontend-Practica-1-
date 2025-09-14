import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Obtener la URL base de la API desde las variables de entorno
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/";

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let [profile, setProfile] = useState(() =>
    localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${API_BASE_URL}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));

      // 👇 pedir el perfil del usuario
      let profileRes = await fetch(`${API_BASE_URL}user/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.access,
        },
      });

      if (profileRes.status === 200) {
        let profileData = await profileRes.json();
        setProfile(profileData);
        localStorage.setItem("profile", JSON.stringify(profileData));
      }

      navigate("/");
    } else {
      console.log("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setProfile(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("profile");
    navigate("/login");
  };

  let updateToken = async () => {
    console.log("Updating token...");
    let response = await fetch(`${API_BASE_URL}token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user,
    profile,
    authTokens,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (!authTokens) {
      setLoading(false);
      return;
    }

    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 25;
    let interval = setInterval(() => {
      if (authTokens) {
        //setLoading(true);
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
