import * as React from 'react';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    Slide,
    TextField,
    Grid,
    Link,
    InputAdornment,
    IconButton,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material/styles";
import AuthUser from '../../components/AuthUser';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Register({ open, handleRegister }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const { http, setToken } = AuthUser();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get('name');
        const username = data.get('username');
        const password = data.get('password');
        try {
            await http
                .post("/auth/register", { name, username, password })
                .then((res) => {
                    setToken(res.data.token);
                    toast.success("Registeration Success!");
                    e.target.reset();
                    handleRegister();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        } catch (error) {
            toast.error(error);
        }
    };

    const handleClose = () => {
        handleRegister();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: {
                    marginTop: theme.spacing(8),
                    marginBottom: theme.spacing(8),
                    width: 400,
                },
            }}
        >
            <DialogContent
                sx={{
                    margin: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <DialogTitle>{"Register here..."}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit} required>
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="name"
                        variant="outlined"
                        placeholder="Enter your name*"
                    />
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="username"
                        variant="outlined"
                        placeholder="Enter your username*"
                        sx={{ mt: 3 }}
                    />
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="password"
                        variant="outlined"
                        placeholder="Enter your password*"
                        type={showPassword ? "text" : "password"}
                        sx={{ mt: 3 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 3 }}
                    >
                        Register
                    </Button>
                    <Grid item textAlign='center' style={{ cursor: 'pointer' }}>
                        <Link variant="body2" onClick={handleClose}>
                            Already have an account? Sign In
                        </Link>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
