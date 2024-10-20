import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Registro } from "../pages/Registro";
import { Creacion } from "../pages/Creacion";
import { Dashboard } from "../pages/Dashboard";
import { Reportes } from "../pages/Reportes";
import { RegistroEstudiantes } from "../pages/RegistroEstudiantes";
import { GroupsTeacher } from "../pages/GroupsTeacher";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creacion" element={<Creacion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/estudiantes" element={<RegistroEstudiantes />} />
      <Route path="/groupsTeacher" element={<GroupsTeacher />} />
    </Routes>
  );
}
