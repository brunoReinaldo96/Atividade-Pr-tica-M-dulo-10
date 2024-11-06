import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CriarTarefa from "./CriarTarefa";
import EditarTarefa from "./EditarTarefa";

function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa,
  conclusaoEsperadaTarefa
) {
  return {
    idTarefa,
    tituloTarefa,
    descricaoTarefa,
    inicioTarefa,
    fimTarefa,
    statusTarefa,
    recursoTarefa,
    conclusaoEsperadaTarefa,
  };
}

const initialRows = [
  createData(
    1,
    "Tarefa 1",
    "Descrição da Tarefa 1",
    "2022-01-01",
    "2022-01-02",
    "Concluída",
    "Recurso 1",
    "2022-01-02"
  ),
  createData(
    2,
    "Tarefa 2",
    "Descrição da Tarefa 2",
    "2022-01-03",
    "2022-01-04",
    "Em Andamento",
    "Recurso 2",
    "2022-01-06"
  ),
  createData(
    3,
    "Tarefa 3",
    "Descrição da Tarefa 3",
    "2022-01-03",
    "2022-01-04",
    "Em Andamento",
    "Recurso 3",
    "2022-01-06"
  ),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openDeletar, setOpenDeletar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleEditar = (id) => {
    const tarefaParaEditar = tarefas.find((t) => t.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletarOpen = (id) => {
    setIdTarefaSelecionada(id);
    setOpenDeletar(true);
  };

  const handleDeletarConfirm = () => {
    setTarefas((current) =>
      current.filter((tarefa) => tarefa.idTarefa !== idTarefaSelecionada)
    );
    setOpenDeletar(false);
  };

  const handleDeletarClose = () => {
    setOpenDeletar(false);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ minHeight: "100vh", padding: "16px" }}>
        <Card>
          <CardHeader
            title="Tarefas"
            subheader="Listagem de Tarefas"
            action={
              <IconButton onClick={handleThemeToggle}>
                {darkMode ? (
                  <Brightness7 sx={{ color: "#FFD700" }} />
                ) : (
                  <Brightness4 sx={{ color: "#0000ff" }} />
                )}
              </IconButton>
            }
          />
          <CardContent>
            <TableContainer
              component={Paper}
              style={{ backgroundColor: theme.palette.background.default }}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="tabela de tarefas"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Data de Início</TableCell>
                    <TableCell align="right">Data de Finalização</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Recurso</TableCell>
                    <TableCell align="right">Conclusão Esperada</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tarefas.map((row) => (
                    <TableRow key={row.idTarefa}>
                      <TableCell component="th" scope="row">
                        {row.idTarefa}
                      </TableCell>
                      <TableCell>{row.tituloTarefa}</TableCell>
                      <TableCell align="right">{row.descricaoTarefa}</TableCell>
                      <TableCell align="right">{row.inicioTarefa}</TableCell>
                      <TableCell align="right">{row.fimTarefa}</TableCell>
                      <TableCell align="right">{row.statusTarefa}</TableCell>
                      <TableCell align="right">{row.recursoTarefa}</TableCell>
                      <TableCell align="right">
                        {row.conclusaoEsperadaTarefa}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleEditar(row.idTarefa)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeletarOpen(row.idTarefa)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: "12px",
              }}
            >
              <Button size="small" variant="contained" onClick={handleOpen}>
                Criar Tarefa
              </Button>
              <Button size="small" variant="outlined">
                Cancelar
              </Button>
            </div>
          </CardActions>
        </Card>

        <Modal open={open} onClose={handleClose}>
          <CriarTarefa
            handleClose={handleClose}
            tarefas={tarefas}
            setTarefas={setTarefas}
          />
        </Modal>

        <Modal open={openEditar} onClose={handleCloseEditar}>
          <EditarTarefa
            handleCloseEditar={handleCloseEditar}
            tarefas={tarefas}
            tarefa={tarefa}
            setTarefas={setTarefas}
          />
        </Modal>

        <Dialog open={openDeletar} onClose={handleDeletarClose}>
          <DialogTitle>Confirmar Deleção</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja excluir esta tarefa?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeletarClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeletarConfirm} color="error">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default ListarTarefa;
