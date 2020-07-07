import React, { useEffect } from 'react'
import Routes from './components/routes/Routes'
import { loadUser } from '../src/actions/auth'
import setAuthToken from '../src/utils/setAuthToken'

import { useDispatch } from 'react-redux'
if (localStorage.token) {
    setAuthToken(localStorage.token)
}
function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    return (
            <Routes />
    )
}

export default App
