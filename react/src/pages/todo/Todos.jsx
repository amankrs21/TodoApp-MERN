import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import AuthUser from '../../components/AuthUser';

const columns = [
    { id: '', label: '#', minWidth: 10 },
    { id: 'title', label: 'title', minWidth: 100 },
    { id: 'discription', label: 'discription', minWidth: 170 },
    { id: 'completed', label: 'completed', minWidth: 100 },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

export default function Todos() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [todos, setTodos] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { http } = AuthUser();
    const getTodos = async () => {
        try {
            const response = await http.get("todo/");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching todos", error);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Container maxWidth='lg'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 560 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {row.title}
                                            </TableCell>
                                            <TableCell>
                                                {row.discription}
                                            </TableCell>
                                            <TableCell>
                                                {row.completed ? "completed" : "not completed"}
                                            </TableCell>
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