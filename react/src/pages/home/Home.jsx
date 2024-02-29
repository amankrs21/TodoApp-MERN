import React from 'react';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';

export default function Home() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' align='center' gutterBottom>
                Welcome to the MERN Todo's Application
            </Typography>
            {loggedIn ? (
                <Box>
                    <Typography variant='body1' gutterBottom>
                        Thank you for logging in! Your todos are saved securely and are accessible from anywhere. Get started by adding your first todo item, and enjoy the full functionality of our MERN stack Todo application. Your progress is automatically saved as you go.
                    </Typography>
                    {/* Add more user-specific content or features here */}
                </Box>
            ) : (
                <Box>
                    <Typography variant='body1' gutterBottom>
                        Login to access the fully functional MERN stack Todo application. Once logged in, you can create, edit, and delete your todo items. Your todos will be saved and accessible from any device, making it easy to stay organized wherever you are.
                    </Typography>
                </Box>
            )}
            <Box style={{ marginTop: "20px" }}>
                <Typography variant='h5' gutterBottom>
                    Features:
                </Typography>
                <List>
                    <ListItem><ListItemText primary="Create, edit, and delete todos" /></ListItem>
                    <ListItem><ListItemText primary="View todos in a list or grid format" /></ListItem>
                    <ListItem><ListItemText primary="Filter todos by categories or tags" /></ListItem>
                    <ListItem><ListItemText primary="Dark and light mode for a personalized UI experience" /></ListItem>
                    <ListItem><ListItemText primary="Secure authentication to keep your data safe" /></ListItem>
                </List>
            </Box>
        </Container>
    );
}
