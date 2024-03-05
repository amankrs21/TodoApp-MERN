import React from 'react';
import { Container, Typography, Box, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Navigate } from 'react-router-dom';
import AuthUser from '../../components/AuthUser'
import ResetPass from './ResetPass';

export default function Users() {
    const { http, isAdmin } = AuthUser();
    const token = localStorage.getItem("token");
    const [users, setUsers] = React.useState([]);
    const [userId, setUserId] = React.useState(null);
    const [openReset, setResetOpen] = React.useState(false);

    const handleResetOpen = (id) => {
        setUserId(id);
        setResetOpen(!openReset);
    }

    React.useEffect(() => {
        if (token && isAdmin(token)) {
            http.get('/admin/users')
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

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
                                    <TableCell>Is Active</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Last Login</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.isActive.toString()}</TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'New User'}</TableCell>
                                        <TableCell>
                                            <div style={{ cursor: 'pointer' }} onClick={() => handleResetOpen(user._id)}>
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
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {openReset && <ResetPass openReset={openReset} handleResetOpen={handleResetOpen} userId={userId} />}
                </Container>
            ) : (
                <Navigate to='/404' />
            )}
        </>
    )
}
