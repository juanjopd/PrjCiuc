import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = () => {
  const [programData, setProgramData] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/byprogramas`);
        setProgramData(response.data);
      } catch (error) {
        console.error("Error fetching program data:", error.message);
      }
    };

    fetchProgramData();
  }, []);

  // Define colors for the pie slices
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#FF6347",
    "#32CD32",
    "#ffea00",
    "#ff0808",
    "#f627de",
    "#153cc9",
  ];

  return (
    <ChartContainer>
      <h6> Cuantos estudiantes por programa</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={programData}
            dataKey="count"
            nameKey="program"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {
              // Map through the data to assign different colors to each slice
              programData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-top: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 20%;
  margin-left: 40px; /* Left alignment */
`;

export default Charts;
