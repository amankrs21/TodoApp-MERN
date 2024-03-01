import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import AuthUser from '../../components/AuthUser';
import AppAppBar from '../navbar/Header';

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

export default function Todos() {
    const { http } = AuthUser();
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = ['#', 'Title', 'Discription', 'Completed', 'CreatedAt', "Action"];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await http.get('/todo');
                setTodos(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth='lg'>
            <AppAppBar />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 560 }}>
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
                                            <TableCell>{todo.discription}</TableCell>
                                            <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
                                            <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={todos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}