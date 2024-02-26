import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Container, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import AuthUser from '../../components/AuthUser'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const { http, setToken, isValidToken } = AuthUser();

    if (isValidToken(localStorage.getItem('token'))) {
        navigate("/todo")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await http.post("/auth/login", { username, password }).then((res) => {
            console.log(res);
            setToken(res.data.token);
            toast.success(res.data.message)
            navigate('/todo');
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <Container className='loginContainer' maxWidth="xl">
                <Box
                    component='form'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Card className='loginCard'>
                        <TextField
                            required
                            variant='outlined'
                            label='Username'
                            type='text'
                            name='username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            required
                            variant='outlined'
                            label='Password'
                            type='password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant='contained' type='submit'>Login</Button>
                    </Card>
                </Box>
            </Container>
        </>
    )
}
