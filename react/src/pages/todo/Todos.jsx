import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import DeleteTodo from './DeleteTodo';
import AuthUser from '../../components/AuthUser';
import { IconButton, Tooltip } from '@mui/material';

export default function Todos() {
    const { http, isLoggedIn } = AuthUser();
    const [openAdd, setAddOpen] = useState(false);
    const [openUpdate, setUpdateOpen] = useState(false);
    const [openDelete, setDeleteOpen] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [page, setPage] = useState(0);
    const [todos, setTodos] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = ['#', 'Title', 'description', 'Completed', 'CreatedAt', "Action"];

    const handleAddOpen = () => {
        setAddOpen(!openAdd);
    };

    const handleUpdateOpen = (id) => {
        setTodoId(id);
        setUpdateOpen(!openUpdate);
    };

    const handleDeleteOpen = (id) => {
        setTodoId(id);
        setDeleteOpen(!openDelete);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token && isLoggedIn(token)) {
            const fetchData = async () => {
                try {
                    const res = await http.get('/todo');
                    setTodos(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [openAdd, openUpdate, openDelete]);

    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Todo's List
                </Typography>
                <Button variant="contained" color="primary" onClick={handleAddOpen}>
                    Add a new Todo
                </Button>
            </Box>
            <Divider />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 310 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((todo, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{todo.title}</TableCell>
                                            <TableCell>{todo.description}</TableCell>
                                            <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
                                            <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80px' }}>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => handleUpdateOpen(todo._id)}>
                                                        <Tooltip title="Update Todo">
                                                            <IconButton
                                                                color="inherit"
                                                                aria-label="Update Todo"
                                                                sx={{ alignSelf: 'center' }}
                                                            >
                                                                <BorderColorIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => handleDeleteOpen(todo._id)}>
                                                        <Tooltip title="Delete Todo">
                                                            <IconButton
                                                                color="inherit"
                                                                aria-label="Delete Todo"
                                                                sx={{ alignSelf: 'center' }}
                                                            >
                                                                <DeleteForeverIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={todos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {openAdd && <AddTodo openAdd={openAdd} handleAddOpen={handleAddOpen} />}
            {openUpdate && <UpdateTodo openUpdate={openUpdate} handleUpdateOpen={handleUpdateOpen} todoId={todoId} />}
            {openDelete && <DeleteTodo openDelete={openDelete} handleDeleteOpen={handleDeleteOpen} todoId={todoId} />}
        </Container>
    );
}