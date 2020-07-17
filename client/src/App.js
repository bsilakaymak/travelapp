import React from 'react'
import Routes from './components/routes/Routes'
import setAuthToken from '../src/utils/setAuthToken'


if (localStorage.token) {
    setAuthToken(localStorage.token)
}
function App() {
    return (
            <Routes />
    )
}

export default App
