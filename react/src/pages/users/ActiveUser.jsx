import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthUser from '../../components/AuthUser';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ActiveUser({ openActive, handleActiveOpen, userId }) {
    const theme = useTheme();
    const { http } = AuthUser();

    const handleDelete = async () => {
        try {
            await http.patch(`/auth/active`, { id: userId });
            toast.success('User Active Status Changed Successfully!');
            handleActiveOpen();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        handleActiveOpen();
    };

    return (
        <Dialog
            open={openActive}
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
            <DialogTitle>{"Change Active State"}</DialogTitle>
            <DialogContent>
                Are you sure you want to change this user's active state?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error">
                    Yes, Change
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
