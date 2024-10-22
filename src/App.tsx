import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import ProtectedRoute from "./components/ProtectedRoute";
import EditUser from "./components/EditUser";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empleados"
          element={
            <ProtectedRoute>
              <EmployeeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-user/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
