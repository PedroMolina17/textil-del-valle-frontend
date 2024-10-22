import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/user/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <button
        onClick={() => navigate("/admin/create-user")}
        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Agregar Usuario
      </button>
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
      >
        Cerrar Sesión
      </button>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Activo</th>
            <th className="border border-gray-300 px-4 py-2">Creado</th>
            <th className="border border-gray-300 px-4 py-2">Actualizado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.role.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isActive ? "Sí" : "No"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.updatedAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                  className="mr-2 bg-yellow-500 text-white font-semibold py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
