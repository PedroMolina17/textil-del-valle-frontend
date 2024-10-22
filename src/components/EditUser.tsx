import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        const userData = response.data;
        setValue("name", userData.name);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setValue("roleId", userData.roleId);
        setValue("isActive", userData.isActive);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar los datos del usuario",
          confirmButtonText: "Aceptar",
        });
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(`http://localhost:3000/user/${id}`, data);
      console.log(data);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/admin");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Usuario</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            {...register("name", { required: "Este campo es requerido" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Apellido:</label>
          <input
            type="text"
            {...register("lastName", { required: "Este campo es requerido" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email no válido",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Rol:</label>
          <select
            {...register("roleId")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Admin</option>
            <option value={2}>Usuario Normal</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Activo:</label>
          <input
            type="checkbox"
            {...register("isActive")}
            defaultChecked={true}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default EditUser;
