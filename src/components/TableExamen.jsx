import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Select from "react-select";

export const TableExamen = () => {
  const [students, setStudents] = useState([]); // Lista completa de estudiantes
  const [studentsOptions, setStudentsOptions] = useState([]); // Opciones filtradas para el select
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState({
    speaking: "",
    listening: "",
    reading: "",
    writing: "",
    englishTest: "",
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  // Agregar estudiante a la tabla
  const addStudent = (selectedOption) => {
    const student = selectedOption.data;
    if (!selectedStudents.some((s) => s.studentCode === student.studentCode)) {
      setSelectedStudents([
        ...selectedStudents,
        {
          ...student,
          grades: {
            speaking: "",
            listening: "",
            reading: "",
            writing: "",
            englishTest: "",
          }, // Inicialización de grades
        },
      ]);
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
    setGrades(
      student.grades || {
        speaking: "",
        listening: "",
        reading: "",
        writing: "",
        englishTest: "",
      }
    );
    setShowModal(true);
  };

  // Guardar notas en la tabla
  const saveGrades = () => {
    setSelectedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.studentCode === selectedStudent.studentCode
          ? { ...student, grades }
          : student
      )
    );
    setShowModal(false);
  };

  const handleGradeChange = (e, field) => {
    const value = parseFloat(e.target.value) || 0;
  
    setGrades((prevGrades) => {
      const updatedGrades = { ...prevGrades, [field]: value };
  
      if (field !== "englishTest") {
        // Automatically calculate englishTest as the sum of other grades
        const { speaking = 0, listening = 0, reading = 0, writing = 0 } = updatedGrades;
        updatedGrades.englishTest = speaking + listening + reading + writing;
      }
  
      return updatedGrades;
    });
  };

  // Configuración de columnas de la tabla
  const columns = [
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    { name: "Código", selector: (row) => row.studentCode, sortable: true },
    {
      name: "Speaking",
      selector: (row) => row.grades?.speaking || "N/A",
      sortable: true,
    },
    {
      name: "Listening",
      selector: (row) => row.grades?.listening || "N/A",
      sortable: true,
    },
    {
      name: "Reading",
      selector: (row) => row.grades?.reading || "N/A",
      sortable: true,
    },
    {
      name: "Writing",
      selector: (row) => row.grades?.writing || "N/A",
      sortable: true,
    },
    {
      name: "English Test",
      selector: (row) => row.grades?.englishTest || "N/A",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <Button variant="primary" onClick={() => openGradeModal(row)}>
          Agregar Notas
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <Container>
      <h2>Buscar y Agregar Estudiantes</h2>
      {/* Selector de estudiantes con react-select */}
      <Select
        options={studentsOptions}
        onInputChange={handleSearch}
        onChange={addStudent}
        placeholder="Buscar estudiante..."
        isClearable
      />

      {/* Tabla de estudiantes seleccionados */}
      <DataTable
        title="Estudiantes Seleccionados"
        columns={columns}
        data={selectedStudents}
        selectableRows
      />

      {/* Modal para agregar notas */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Notas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["speaking", "listening", "reading", "writing", "englishTest"].map(
            (field) => (
              <Form.Group key={field} controlId={`form${field}`}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={grades[field]}
                  onChange={(e) => handleGradeChange(e, field)}
                  placeholder={`Introduce la nota de ${field}`}
                  min="0"
                  max="100"
                  step="1"
                />
              </Form.Group>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveGrades}>
            Guardar Notas
          </Button>
        </Modal.Footer>
      </Modal>
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
