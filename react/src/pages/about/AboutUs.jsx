// import React from 'react';
// import { Container, Typography, List, ListItem, Divider, Box } from '@mui/material';

// export default function AboutUs() {
//     return (
//         <Container maxWidth="lg">
//             <Box>
//                 <Typography variant="h4" component="h2" gutterBottom>
//                     About Us
//                 </Typography>
//                 <Typography variant="subtitle1" paragraph>
//                     Welcome to the Todo's Application in React! This application is designed to help you manage your tasks and stay organized.
//                 </Typography>

//                 <Divider sx={{ my: 4 }} />

//                 <Typography variant="subtitle1" paragraph>
//                     Key features of the Todo's Application include:
//                 </Typography>

//                 <List>
//                     <ListItem>Adding, editing, and deleting tasks</ListItem>
//                     <ListItem>Marking tasks as completed</ListItem>
//                     <ListItem>Searching for specific tasks</ListItem>
//                 </List>

//                 <Divider sx={{ my: 4 }} />

//                 <Typography variant="subtitle1" paragraph>
//                     This application is built using React, a powerful and popular web framework. It demonstrates the basics of React components, hooks, and state management.
//                 </Typography>

//                 <Typography variant="subtitle1" paragraph>
//                     Feel free to explore and use the application to manage your daily tasks efficiently!
//                 </Typography>
//             </Box>
//         </Container>
//     );
// }


import React from 'react';
import { Container, Typography, List, ListItem, Divider, Box } from '@mui/material';

export default function AboutUs() {
    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant="h4" component="h2" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    This website is built with the MERN stack (MongoDB, Express, React, Node.js) and incorporates a JWT (JSON Web Token) authentication system for secure access.
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography variant="subtitle1" paragraph>
                    Key features of our platform include:
                </Typography>

                <List>
                    <ListItem>Role-based authorization for differentiated access levels</ListItem>
                    <ListItem>Private routing to secure sensitive pages and features</ListItem>
                    <ListItem>JWT Authentication for secure login and session management</ListItem>
                </List>

                <Divider sx={{ my: 4 }} />

                <Typography variant="subtitle1" paragraph>
                    By leveraging the MERN stack and JWT for authentication, we ensure a secure and efficient user experience. Our role-based authorization and private routing mechanisms further enhance the security and usability of the application.
                </Typography>

                <Typography variant="subtitle1" paragraph>
                    Explore the website to discover its functionalities and how it can assist you in managing tasks more effectively!
                </Typography>
            </Box>
        </Container>
    );
}
