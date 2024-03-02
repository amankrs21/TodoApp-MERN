import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material/styles";
import AuthUser from '../../components/AuthUser';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTodo({ open, handleOpen }) {
    const theme = useTheme();
    const { http } = AuthUser();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const title = data.get('title');
        const description = data.get('description');
        try {
            await http
                .post("/todo/add", { title, description })
                .then((res) => {
                    setToken(res.data.token);
                    toast.success("Todo Added Successfully!");
                    e.target.reset();
                    handleOpen();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        } catch (error) {
            toast.error(error);
        }
    };

    const handleClose = () => {
        handleOpen();
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
                    width: 500,
                },
            }}
        >
            <DialogContent
                sx={{
                    margin: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <DialogTitle>{"Add a new Todo!"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit} required>
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="title"
                        variant="outlined"
                        placeholder="Enter your Todo Title*"
                    />
                    <TextField
                        sx={{ mt: 3 }}
                        required
                        fullWidth
                        hiddenLabel
                        multiline
                        rows={3}
                        name="description"
                        variant="outlined"
                        placeholder="Enter Todo Description*"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 3 }}
                    >
                        Add Todo
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
