import { useForm } from "react-hook-form";
import { useApi } from "../api/useApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { createUser } = useApi();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const response = await createUser(data);
    if (response.status === 201) {
      alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } else {
      alert("Error al registrar el usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          {...register("name", { required: true })}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          {...register("last_name", { required: true })}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
