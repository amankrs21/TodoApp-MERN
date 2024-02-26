import React, { useState } from 'react'
import { Button, Card, Container, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../components/AuthUser';
import { toast } from 'react-toastify';

export default function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const navigate = useNavigate();

    const { http, isValidToken } = AuthUser();

    if (isValidToken(localStorage.getItem('token'))) {
        navigate("/todo")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Credentials not matched!!")
        }
        else {
            await http.post("/auth/register", {name, username, password}).then((res) => {
                toast.success(res.data.message);
                navigate("/login")
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            })
        }
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: 'grey'
                }}
                maxWidth='xl'
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '20px',
                        width: '300px',
                        height: '400px'
                    }}
                    component='form'
                    onSubmit={handleSubmit}
                >
                    <TextField
                        required
                        variant='outlined'
                        type='text'
                        name='name'
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        variant='outlined'
                        type='text'
                        name='username'
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        variant='outlined'
                        type='password'
                        name='password'
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        variant='outlined'
                        type='password'
                        name='confirm_password'
                        label="Confirm Password"
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                    <Button type='submit' variant='contained'>Register</Button>
                </Card>
            </Container>
        </>
    )
}
