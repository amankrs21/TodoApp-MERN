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

import AddTodo from './AddTodo';
import AuthUser from '../../components/AuthUser';

export default function Todos() {
    const { http, isLoggedIn } = AuthUser();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [todos, setTodos] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = ['#', 'Title', 'description', 'Completed', 'CreatedAt', "Action"];

    const handleOpen = () => {
        setOpen(!open);
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
    }, [open]);

    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Todo's List
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>
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
            <AddTodo open={open} handleOpen={handleOpen} />
        </Container>
    );
}