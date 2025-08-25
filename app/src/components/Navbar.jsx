import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, profile, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Mis Tareas</h1>

      {!user ? (
        // 🔹 Cuando NO hay usuario
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Registro
          </Link>
        </div>
      ) : (
        // 🔹 Cuando SÍ hay usuario
        <div className="flex items-center gap-4">
          <button
            onClick={logoutUser}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
          >
            Salir
          </button>

          <div className="flex items-center gap-2">
            <img
              src={profile?.profile_picture || "/default-avatar.png"}
              alt="Perfil"
              className="w-8 h-8 rounded-full border"
            />
            <span>{profile?.name || user.email}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
