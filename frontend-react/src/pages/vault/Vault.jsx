import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
    Container, Typography, Divider, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import AuthUser from '../../components/AuthUser';
import PopupPin from './PopupPin';

export default function Vault() {
    const { http } = AuthUser();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const securityPin = localStorage.getItem('SecurityPin') || null;

        if (securityPin) {
            const fetchData = async () => {
                try {
                    const response = await http.post('/passwords', { key: securityPin });
                    setData(response.data);
                } catch (error) {
                    if (error.response.status === 400) {
                        toast.error("Invalid Security Pin!");
                        localStorage.removeItem('SecurityPin');
                        setOpen(true);
                    } else {
                        toast.error("Something went wrong!");
                        console.error(error);
                    }
                }
            };
            fetchData();
        } else {
            setOpen(true);
        }
    }, [http]);

    return (
        <Container maxWidth="lg">
            {open && <PopupPin open={open} setOpen={setOpen} />}

            <Grid container justifyContent="space-between" alignItems="center" mt={3} spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography pt={2} variant="h4" gutterBottom>
                        Your Secure Data 🔒
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} container justifyContent="flex-end" alignItems="center">
                    <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search with Title or Username"
                            slotProps={{
                                input: {
                                    endAdornment: <SearchIcon color='primary' />
                                }
                            }}
                        />
                        <Button variant='contained' color='primary'
                            sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2' }}
                        >
                            Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            {data.length > 0 ? (

                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#659ed8' }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Username</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Password</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>UpdatedAt</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.password}</TableCell>
                                    <TableCell>{item.updatedAt}</TableCell>
                                    <TableCell>
                                        {/* Add your action buttons here */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="h6">
                        No secure passwords available. Please add new records.
                    </Typography>
                    <Button variant='contained' color='primary'
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}>
                        Add New Password
                    </Button>
                </div>
            )}
        </Container>
    );
}
