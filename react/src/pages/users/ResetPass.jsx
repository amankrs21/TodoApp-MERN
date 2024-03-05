import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthUser from '../../components/AuthUser';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResetPass({ openReset, handleResetOpen, userId }) {
    const theme = useTheme();
    const { http } = AuthUser();

    const handleDelete = async () => {
        try {
            await http.patch(`/auth/reset`, { id: userId });
            toast.success('Password Reset Successfully!')
            handleResetOpen();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        handleResetOpen();
    };

    return (
        <Dialog
            open={openReset}
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
            <DialogTitle>{"Reset Password?"}</DialogTitle>
            <DialogContent>
                Are you sure you want to reset this user's password?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error">
                    Yes, Reset
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
