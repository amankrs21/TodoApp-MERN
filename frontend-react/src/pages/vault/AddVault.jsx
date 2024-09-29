import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';
import { toast } from 'react-toastify';
import AuthUser from '../../components/AuthUser';

export default function AddVault({ openAdd, setOpenAdd }) {
    const { http } = AuthUser();
    const handleChange = () => {
        setOpenAdd(!openAdd);
    }

    return (
        <Dialog
            maxWidth="xs"
            open={openAdd}
            onClose={handleChange}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    if (localStorage.getItem('SecurityPin') && localStorage.getItem('SecurityPin') !== formJson.key) {
                        toast.error('Security Pin does not match!');
                        return;
                    } else {
                        localStorage.setItem('SecurityPin', formJson.key);
                        (async () => {
                            try {
                                const response = await http.post('/password/add', formJson);
                                toast.success(response.data.message);
                                handleChange();
                            } catch (error) {
                                toast.error('Something went wrong!');
                                console.error(error);
                            }
                        })();
                    }
                    handleChange();
                },
            }}
        >
            <DialogTitle>Add a new Password</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please fill the form to add a new password.
                </DialogContentText>
                <TextField autoFocus fullWidth required variant="outlined"
                    name="title" label="Title (Website Name)" />
                <TextField fullWidth variant="outlined" sx={{ marginY: 2 }}
                    name="username" label="Username (optional)" />
                <TextField autoFocus fullWidth required variant="outlined"
                    name="password" label="Password" />
                <TextField fullWidth required variant="outlined" sx={{ marginTop: 2 }}
                    name="key" label="PIN to encrypt Password" />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleChange}>Cancel</Button>
                <Button type="submit" variant='contained'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

AddVault.propTypes = {
    openAdd: PropTypes.bool.isRequired,
    setOpenAdd: PropTypes.func.isRequired,
};
