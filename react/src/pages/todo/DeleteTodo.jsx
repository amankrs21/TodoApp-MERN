import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthUser from '../../components/AuthUser';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteTodo({ openDelete, handleDeleteOpen, todoId }) {
    const theme = useTheme();
    const { http } = AuthUser();

    const handleDelete = async () => {
        try {
            await http.delete(`/todo/delete/${todoId}`);
            toast.info('Todo Deleted Successfully!')
            handleDeleteOpen();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        handleDeleteOpen();
    };

    return (
        <Dialog
            open={openDelete}
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
            <DialogTitle>{"Delete Todo?"}</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this todo?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error">
                    Yes, Delete
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
