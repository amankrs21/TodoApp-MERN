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

export default function Login({ open, handleLogin }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const { http, setToken } = AuthUser();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        try {
            await http
                .post("/auth/login", { username, password })
                .then((res) => {
                    setToken(res.data.token);
                    toast.success("Login Success!");
                    e.target.reset();
                    handleLogin();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        } catch (error) {
            toast.error(error);
        }
    };

    const handleClose = () => {
        handleLogin();
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
                <DialogTitle>{"Sign in"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit} required>
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="username"
                        variant="outlined"
                        placeholder="Enter your username*"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item textAlign='end'>
                            <Link href="#" variant="body2">
                                Don't have an account?<br />Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
