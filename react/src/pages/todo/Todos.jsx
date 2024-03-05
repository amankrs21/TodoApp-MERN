import { useEffect, useState, useCallback } from 'react';
import {
    Box, Button, Container, Divider, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow,
    Typography, IconButton, Switch, Tooltip
} from '@mui/material';
import { toast } from 'react-toastify';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import DeleteTodo from './DeleteTodo';
import AuthUser from '../../components/AuthUser';


export default function Todos() {
    const { http, isLoggedIn } = AuthUser();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [todos, setTodos] = useState([]);
    const [todoId, setTodoId] = useState(null);
    const [openAdd, setAddOpen] = useState(false);
    const [openUpdate, setUpdateOpen] = useState(false);
    const [openDelete, setDeleteOpen] = useState(false);

    const columns = ['#', 'Title', 'Description', 'Completed', 'CreatedAt', 'Actions'];

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
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
    }, [openAdd, openUpdate, openDelete, todoId]);

    const handleAddOpen = useCallback(() => setAddOpen(prev => !prev), []);

    const handleUpdateOpen = useCallback((id) => {
        setTodoId(id);
        setUpdateOpen(prev => !prev);
    }, []);

    const handleDeleteOpen = useCallback((id) => {
        setTodoId(id);
        setDeleteOpen(prev => !prev);
    }, []);

    const handleMark = useCallback(async (id) => {
        setTodoId(id);
        try {
            await http.patch(`/todo/complete/${id}`);
            toast.success('Todo Marked Successfully!');
            setTodoId(null);
        } catch (error) {
            console.error(error);
        }
    }, [http]);

    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Todo's List</Typography>
                <Button variant="contained" color="primary" onClick={handleAddOpen}>
                    Add a new Todo
                </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {todos.length > 0 ? (
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
                                                <TableCell>
                                                    <Switch
                                                        color="success"
                                                        checked={todo.completed}
                                                        onChange={() => handleMark(todo._id)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </TableCell>
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
            ) : (
                <Typography variant="h6" align='center' sx={{ mt: 2 }}>
                    Sorry, No Todos Found attached to your account! <br />Please add a new Todo.
                </Typography>
            )}
            {openAdd && <AddTodo openAdd={openAdd} handleAddOpen={handleAddOpen} />}
            {openUpdate && <UpdateTodo openUpdate={openUpdate} handleUpdateOpen={handleUpdateOpen} todoId={todoId} />}
            {openDelete && <DeleteTodo openDelete={openDelete} handleDeleteOpen={handleDeleteOpen} todoId={todoId} />}
        </Container>
    );
}
