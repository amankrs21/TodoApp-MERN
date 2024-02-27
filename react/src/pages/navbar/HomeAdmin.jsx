import React, { Children } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header'
import Footer from './Footer'
import getLPTheme from '../../components/getLPTheme';

const defaultTheme = createTheme({});

export default function HomeAdmin({ children }) {
    const [mode, setMode] = React.useState('light');
    const LPtheme = createTheme(getLPTheme(mode));
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    return (
        <ThemeProvider theme={LPtheme}>
            <Header mode={mode} toggleColorMode={toggleColorMode} />
            <div style={{ height: "80vh" }}></div>
            <Footer />
        </ThemeProvider>
    )
}
