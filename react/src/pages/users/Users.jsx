import React from 'react';
import { Container, Typography, Box, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Navigate } from 'react-router-dom';
import AuthUser from '../../components/AuthUser'

export default function Users() {
    const { isAdmin } = AuthUser();
    const token = localStorage.getItem("token");

    return (
        <>
            {token && isAdmin(token) ? (
                <Container maxWidth='lg'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            User's List
                        </Typography>
                    </Box>
                    <Divider />
                    <TableContainer component={Paper} elevation={0} variant="outlined">
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead className="">
                                <TableRow style={{ fontSize: 30 }}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Is Active</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>admin</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>2021-10-10</TableCell>
                                    <TableCell>True</TableCell>
                                    <TableCell>
                                        <div style={{ cursor: 'pointer' }}>
                                            <Tooltip title="Reset Password">
                                                <IconButton
                                                    color="inherit"
                                                    aria-label="Reset Password"
                                                    sx={{ alignSelf: 'center' }}
                                                >
                                                    <LockResetIcon color='info' />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            ) : (
                <Navigate to='/404' />
            )}
        </>
    )
}
