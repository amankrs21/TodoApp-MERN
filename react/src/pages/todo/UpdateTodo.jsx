import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthUser from '../../components/AuthUser';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateTodo({ openUpdate, handleUpdateOpen, todoId }) {
    const theme = useTheme();
    const { http } = AuthUser();
    const [todo, setTodo] = useState({ id: todoId, title: '', description: '' });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await http.get(`/todo/${todoId}`);
                setTodo(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTodo();
    }, [openUpdate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.patch(`/todo/update`, todo);
            toast.success('Todo Updated Successfully!')
            handleUpdateOpen();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    };

    const handleClose = () => {
        handleUpdateOpen();
    };

    return (
        <Dialog
            open={openUpdate}
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
                <DialogTitle>{"Update Todo!"}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        hiddenLabel
                        name="title"
                        variant="outlined"
                        placeholder="Your Todo Title*"
                        value={todo.title}
                        onChange={handleChange}
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
                        placeholder="Your Todo Description*"
                        value={todo.description}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 3 }}
                    >
                        Update Todo
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
