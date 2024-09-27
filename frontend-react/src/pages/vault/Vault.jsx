import Grid from '@mui/material/Grid2';
import {
    Container, Typography, Divider, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Vault() {

    return (
        <Container maxWidth="lg">
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
