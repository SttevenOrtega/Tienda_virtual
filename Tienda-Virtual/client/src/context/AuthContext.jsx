import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Eliminar el valor incorrecto de localStorage
        return null;
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return !!storedUser && storedUser !== "undefined";
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setIsAuthenticated(true);
        setSuccessMessage("¡Cuenta registrada correctamente!");
        navigate("/");
      } else {
        throw new Error('La respuesta no contiene datos de usuario.');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Este correo ya está registrado."]);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user, { withCredentials: true });
      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setIsAuthenticated(true);
        setSuccessMessage("¡Inicio de sesión exitoso!");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        let errorMessage = "";
        switch (error.response.data.message) {
          case "Usuario no encontrado":
            errorMessage = "Usuario no encontrado";
            break;
          case "Contraseña incorrecta":
            errorMessage = "Contraseña incorrecta";
            break;
          default:
            errorMessage = "Error al iniciar sesión";
            break;
        }
        setErrors([errorMessage]);
      } else {
        setErrors(["Error al iniciar sesión."]);
      }
    }
  };

  const signout = async () => {
    await logoutRequest();
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setSuccessMessage("¡Cierre de sesión exitoso!");
  };

  useEffect(() => {
    console.log("Estado del usuario:", user);
  }, [user]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signout,
        setUser, // Asegúrate de pasar setUser en el contexto
        user,
        isAuthenticated,
        errors,
        successMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
