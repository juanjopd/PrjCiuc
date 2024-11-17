import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const CreateReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL; // Your API base URL

  // Opciones de reportes
  const reportOptions = [
    { value: "groupsByYear", label: "Reporte de Grupos por Año" },
    { value: "groupsByProfessor", label: "Reporte de Grupos por Profesor" },
    { value: "groupsByFaculty", label: "Reporte de Programas por Facultad" },
  ];

  // Generar opciones de años dinámicamente
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => {
      const year = currentYear + i; // Esto genera los próximos 10 años
      return { value: year, label: year.toString() };
    });
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/faculties`);
        const facultyOptions = response.data.map((faculty) => ({
          value: faculty.id,
          label: faculty.nombre,
        }));
        setFaculties(facultyOptions);
      } catch (error) {
        console.error("Error al obtener las facultades:", error);
      }
    };

    fetchFaculties();
  }, []);

  const handleGenerateReport = async () => {
    if (!selectedReport) return;
    try {
      const reportData = await fetchReportData(selectedReport.value);
      const blob = new Blob([reportData], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = getFileName(selectedReport.value);
      link.click();
      setShowModal(false);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };

  const fetchReportData = async (reportType) => {
    const endpoint = getEndpoint(reportType);

    try {
      const response = await axios.get(endpoint, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el reporte: " + error.message);
    }
  };

  const getEndpoint = (reportType) => {
    if (reportType === "groupsByYear") {
      if (!selectedYear) {
        throw new Error("Debe seleccionar un año antes de generar el reporte.");
      }
      return `${baseUrl}/api/groups-count?year=${selectedYear.value}`;
    } else if (reportType === "groupsByProfessor") {
      return `${baseUrl}/api/groups-count-by-professor`;
    } else if (reportType === "groupsByFaculty") {
      if (!selectedFaculty || !selectedYear) {
        throw new Error(
          "Debe seleccionar una facultad y un año antes de generar el reporte."
        );
      }
      return `${baseUrl}/api/groups-by-faculty?facultyId=${selectedFaculty.value}&year=${selectedYear.value}`;
    }
    throw new Error("Reporte no reconocido");
  };

  const getFileName = (reportType) => {
    if (reportType === "groupsByYear") {
      return "Reporte_Grupos_por_Año.pdf";
    } else if (reportType === "groupsByProfessor") {
      return "Reporte_Grupos_por_Profesor.pdf";
    } else if (reportType === "groupsByFaculty") {
      return "Reporte_Programas_por_Facultad.pdf";
    }
    throw new Error("Nombre de archivo no disponible para este reporte");
  };

  return (
    <Container>
      {/* Selector de reportes */}
      <Select
        options={reportOptions}
        value={selectedReport}
        onChange={(option) => {
          setSelectedReport(option);
          setSelectedFaculty(null);
          setSelectedYear(null);
        }}
        placeholder="Selecciona un reporte"
      />
      {/*Selectores para año */}
      {selectedReport?.value === "groupsByYear" && (
        <SelectContainer>
          <Select
            options={generateYearOptions()}
            value={selectedYear}
            onChange={(option) => setSelectedYear(option)}
            placeholder="Selecciona un año"
          />
        </SelectContainer>
      )}

      {/* Selectores para facultades y año */}
      {selectedReport?.value === "groupsByFaculty" && (
        <SelectContainer>
          <Select
            options={faculties}
            value={selectedFaculty}
            onChange={(option) => setSelectedFaculty(option)}
            placeholder="Selecciona una facultad"
          />
          <Select
            options={generateYearOptions()}
            value={selectedYear}
            onChange={(option) => setSelectedYear(option)}
            placeholder="Selecciona un año"
          />
        </SelectContainer>
      )}
      {/* Botón para generar el reporte */}
      <ButonContainer>
        <Button
          variant="primary"
          onClick={handleGenerateReport}
          disabled={
            !selectedReport ||
            (selectedReport.value === "groupsByFaculty" &&
              (!selectedFaculty || !selectedYear))
          }
        >
          Generar Reporte
        </Button>
      </ButonContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;
  margin-top: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  position: fixed;
  left: 30%;
`;

const ButonContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center; /* Centra horizontalmente */
`;

const SelectContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column; /* Alinea los selects en una columna */
  gap: 15px; /* Establece el espacio entre los selects (ajusta el valor según lo necesites) */
  width: 100%; /* Puedes ajustar esto si necesitas un ancho específico */
`;

export default CreateReport;
