import './Login.css';
import { useState } from 'react';  // Import useState for managing form state
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let tempErrors = {};

        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email address is invalid";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required";
        }

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            console.log('Form submitted', formData);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                size={{ xs: false, sm: 4, md: 7 }}
                sx={{
                    backgroundImage: 'url(./login2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{ xs: 12, sm: 8, md: 5 }} elevation={6} className="login-container">
                <Box className="login-box">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            autoFocus
                            name="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Grid mt={1}>
                            <Typography variant="body2" className="login-forget">
                                Forgot password?
                            </Typography>
                        </Grid>
                        <Button
                            fullWidth
                            type='submit'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid className="login-register" mb={5}>
                            <Button variant="text">
                                Don&apos;t have an account? Sign Up
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
