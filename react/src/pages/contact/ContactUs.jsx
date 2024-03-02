import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';

export default function ContactUs() {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContactForm({ ...contactForm, [name]: value });
    };

    const submitContact = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <form onSubmit={submitContact}>
                        <TextField
                            required
                            fullWidth
                            hiddenLabel
                            name="name"
                            variant="outlined"
                            onChange={handleChange}
                            value={contactForm.name}
                            placeholder="Enter your Name*"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            hiddenLabel
                            name="email"
                            type='email'
                            variant="outlined"
                            onChange={handleChange}
                            value={contactForm.email}
                            placeholder="Enter your Email*"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            rows={4}
                            required
                            fullWidth
                            multiline
                            hiddenLabel
                            name="message"
                            variant="outlined"
                            onChange={handleChange}
                            value={contactForm.message}
                            placeholder="Enter your Message here...*"
                            sx={{ mb: 3 }}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Our Office
                            </Typography>
                            <Typography variant="body2">
                                Sector 125, Noida, New Delhi, India
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="subtitle2">
                                ~Aman Singh
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
