import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Global'
import AppRoutes from './routes/AppRoutes'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    )
}

export default App
