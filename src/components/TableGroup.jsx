import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Select from "react-select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { StudentsPdf } from "./StudentsPDF";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TableGroup = () => {
  const [students, setStudents] = useState([]); // Lista completa de estudiantes
  const [studentsOptions, setStudentsOptions] = useState([]); // Opciones filtradas para el select
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grade, setGrade] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { id: groupId } = useParams();

  // Obtener todos los estudiantes al montar el componente
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/students`);
        if (response.data && Array.isArray(response.data.students)) {
          setStudents(response.data.students);
          setStudentsOptions(
            response.data.students.map((student) => ({
              value: student.name,
              label: `${student.name} - ${student.studentCode}`,
              data: student,
            }))
          );
        } else {
          console.error(
            "Formato inesperado en la respuesta de la API:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    };
    fetchStudents();

    setSelectedStudents((prev) =>
      prev.map((student) => ({
        ...student,
        grade: storedGrades[student.studentCode] || student.grade,
      }))
    );
  }, [baseUrl]);

  // Función para guardar estudiantes seleccionados en el backend
  const saveStudentsToGroup = async () => {
    if (!groupId) {
      toast.error("ID del grupo no encontrado");
      return;
    }

    try {
      // Preparar los datos para enviar, asegurándose de que `student_code` sea un objeto
      const studentCodes = selectedStudents.map((student) => ({
        student_code: student.studentCode, // Aquí agregamos el formato correcto
      }));

      const response = await axios.post(
        "http://localhost:3001/api/addStudent",
        {
          id: Number(groupId), // El ID del grupo
          students: studentCodes, // Enviar el array de estudiantes con los códigos
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error al guardar estudiantes:", error);
      toast.error(
        "Error al guardar estudiantes: " +
          (error.response?.data?.message || "Desconocido")
      );
    }
  };

  /* useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/groups/${groupId}`);
        if (response.data && Array.isArray(response.data.students)) {
          // Mapear los estudiantes para usar los nombres de atributos esperados
          const mappedStudents = response.data.students.map((student) => ({
            name: student.student_name, // Mapeamos 'student_name' a 'name'
            studentCode: student.student_code, // Mapeamos 'student_code' a 'studentCode'
            grade: student.grade, // Mantener la nota si ya existe
          }));
          setStudents(mappedStudents);
          setStudentsOptions(
            mappedStudents.map((student) => ({
              value: student,
              label: `${student.name} - ${student.studentCode}`,
              data: student,
            }))
          );
        } else {
          console.error(
            "Formato inesperado en la respuesta de la API:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    }; 
    if (groupId) {
      fetchStudents();
    }
  }, [baseUrl, groupId]);*/


  // Filtrar estudiantes según el término de búsqueda
  const handleSearch = (inputValue) => {
    if (inputValue) {
      const filteredOptions = students
        .filter((student) =>
          `${student.name} ${student.studentCode}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
        .map((student) => ({
          value: student.name,
          label: `${student.name} - ${student.studentCode}`,
          data: student,
        }));
      setStudentsOptions(filteredOptions);
    } else {
      // Si el campo está vacío, mostrar todos los estudiantes
      setStudentsOptions(
        students.map((student) => ({
          value: student.name,
          label: `${student.name} - ${student.studentCode}`,
          data: student,
        }))
      );
    }
  };

  // Agregar un estudiante a la tabla
  const addStudent = (selectedOption) => {
    const student = selectedOption.data;
    // Verifica si el estudiante ya está en la lista seleccionada
    if (!selectedStudents.some((s) => s.studentCode === student.studentCode)) {
      setSelectedStudents((prevSelected) => [
        ...prevSelected,
        { ...student, grade: "" }, // Agrega el estudiante con una nota vacía
      ]);
      // Elimina el estudiante de las opciones disponibles
      setStudentsOptions((prevOptions) =>
        prevOptions.filter(
          (option) => option.data.studentCode !== student.studentCode
        )
      );
    }
  };

  // Abrir modal para agregar la nota
  const openGradeModal = (student) => {
    setSelectedStudent(student);
    setGrade(student.grade || "");
    setShowModal(true);
  };

  // Guardar nota en la tabla
  // Guardar nota de un estudiante en el backend
  const saveGrade = async () => {
    try {
      const payload = {
        student_code: selectedStudent.studentCode,
        idCourse: groupId,
        grade,
      };

      const response = await axios.post(`${baseUrl}/api/saveGrade`, payload);

      if (response.status === 200) {
        setSelectedStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.studentCode === selectedStudent.studentCode
              ? { ...student, grade }
              : student
          )
        );
        setShowModal(false);
        alert("Nota guardada correctamente.");
      } else {
        alert("Error al guardar la nota.");
      }
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      alert("Ocurrió un error al intentar guardar la nota.");
    }
  };

  // Configuración de columnas de la tabla
  const columns = [
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    { name: "Código", selector: (row) => row.studentCode, sortable: true },
    {
      name: "Nota",
      selector: (row) => row.grade || "Sin nota",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="primary"
            onClick={() => openGradeModal(row)}
            style={{ width: "100px" }}
          >
            Agregar Nota
          </Button>

          <PDFDownloadLink
            document={<StudentsPdf students={[row]} />}
            fileName={`${row.studentCode}_reporte_estudiante.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="secondary"
                disabled={loading}
                style={{ marginLeft: "10px", width: "100px" }} // Match width with the first button
              >
                {loading ? "Generando PDF..." : "Generar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <Container>
      <h2>Estudiantes del Grupo</h2>
      <Select
        options={studentsOptions}
        onInputChange={handleSearch}
        onChange={addStudent}
        placeholder="Buscar estudiante..."
        isClearable
      />
      <DataTable
        title="Estudiantes Seleccionados"
        columns={columns}
        data={selectedStudents}
        selectableRows
      />
      <Button variant="success" onClick={saveStudentsToGroup}>
        Guardar Estudiantes
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nota</Form.Label>
            <Form.Control
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveGrade}>
            Guardar Nota
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Paddings de 20px */
  margin-top: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 95%;
  margin-left: 40px;
`;
