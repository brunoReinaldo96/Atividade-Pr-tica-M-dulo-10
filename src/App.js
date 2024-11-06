import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header";
import ListarTarefa from "./pages/tarefa/ListarTarefa";
import Login from "./pages/tarefa/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setAuthenticated={(auth) => {
                    setAuthenticated(auth);
                    localStorage.setItem("authenticated", auth);
                  }}
                />
              }
            />
            {authenticated && (
              <>
                <Route
                  path="/tarefas"
                  element={
                    <>
                      <Header
                        setAuthenticated={(auth) => {
                          setAuthenticated(auth);
                          if (!auth) localStorage.removeItem("authenticated");
                        }}
                      />
                      <ListarTarefa />
                    </>
                  }
                />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
