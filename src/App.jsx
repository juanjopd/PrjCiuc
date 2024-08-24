import React, { useState } from "react";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { SidebarContainer } from "./components/SidebarContainer";

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => {},
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container className={sidebarOpen ? "sidebarOpen" : ""}>
              <SidebarContainer
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <MyRoutes />
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.sidebarOpen {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;
export default App;
