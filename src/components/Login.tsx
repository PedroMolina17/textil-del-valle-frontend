import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const result = response.data;
      Cookie.set("token", result.accessToken);

      setLoginError("");
      console.log(result);

      const decodedToken = jwtDecode(result.accessToken);
      console.log("Datos decodificados:", decodedToken);
      Swal.fire({
        title: "Inicio de sesión exitoso!",
        text: "Bienvenido de nuevo!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      if (decodedToken.roleId === 1) {
        navigate("/admin");
      } else if (decodedToken.roleId === 2) {
        navigate("/empleados");
      } else {
        Swal.fire({
          title: "Error",
          text: "Rol no autorizado.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Credenciales inválidas.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Este campo es obligatorio" })}
            className={`mt-1 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500`}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Este campo es obligatorio" })}
            className={`mt-1 block w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
