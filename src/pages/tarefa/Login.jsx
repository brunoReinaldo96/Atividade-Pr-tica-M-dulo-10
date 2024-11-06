import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  CssBaseline,
  Grid,
  Link,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsername = "admin";
    const validPassword = "admin123";

    if (username === validUsername && password === validPassword) {
      setAuthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate("/tarefas");
    } else {
      setError(true);
      setHelperText("Usuário ou senha inválidos");
    }
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {""}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#005eff" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onKeyDown={handleKeyDown}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Nome"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              helperText={helperText}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem uma conta? Inscreva-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 30,
              backgroundColor: darkMode ? "#333" : "#ddd",
              borderRadius: 20,
              cursor: "pointer",
              p: 0.5,
            }}
            onClick={handleThemeToggle}
          >
            <IconButton sx={{ p: 0 }}>
              {darkMode ? (
                <Brightness7 sx={{ color: "#FFD700" }} />
              ) : (
                <Brightness4 sx={{ color: "#0000ff" }} />
              )}
            </IconButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
