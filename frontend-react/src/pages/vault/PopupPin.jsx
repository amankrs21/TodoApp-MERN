import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function PopupPin({ open, setOpen }) {
    const [forget, setForget] = useState(false);

    const handleChange = () => {
        setOpen(!open);
    }

    const handleForgetPin = () => {
        setForget(!forget);
    }


    return (
        <Dialog
            open={open}
            onClose={handleChange}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const pin = formJson.pin;
                    localStorage.setItem('SecurityPin', btoa(pin));
                    handleChange();
                },
            }}
        >
            <DialogTitle>Security PIN</DialogTitle>
            {forget ? (
                <DialogContent>
                    <DialogContentText mb={2}>
                        If you forget your security PIN, you will lose your all encrypted data.
                        <br />
                        Do you want to continue?
                    </DialogContentText>
                    <Button variant="text" mt={1} onClick={handleForgetPin}>
                        Still remember your PIN?
                    </Button>
                </DialogContent>
            ) : (
                <DialogContent sx={{ textAlign: "right" }}>
                    <DialogContentText mb={2}>
                        Please enter you security PIN 🔑 to access the vault.
                    </DialogContentText>
                    <TextField autoFocus fullWidth required name="pin" variant="outlined"
                        label="Security PIN" type="password" />
                    <Button variant="text" mt={1} onClick={handleForgetPin}>
                        Forget your PIN?
                    </Button>
                </DialogContent>
            )}
            <DialogActions>
                <Button variant='outlined' onClick={handleChange}>Cancel</Button>
                <Button type="submit" variant='contained'>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

PopupPin.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};
