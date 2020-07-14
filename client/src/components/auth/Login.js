import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/auth'

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #3e497b;
`
const ForgetPasswordBtn = styled(Link)`
    color: #fff;
    text-decoration: none;
`
const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = userData
    const onChangeRegisterHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitAuthFormHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    if (isAuthenticated) return <Redirect to="/dashboard" />
    return (
        <LoginContainer>
            <Form onSubmit={onSubmitAuthFormHandler}>
                <FormTitle>Login</FormTitle>
                <Divider marginBottom="0.8rem" />

                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="email"
                        value={email}
                        onChange={onChangeRegisterHandler}
                        required
                    />
                    <Label>Email</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="password"
                        value={password}
                        onChange={onChangeRegisterHandler}
                        type="password"
                        required
                    />
                    <Label>Password</Label>
                </InputHolder>

                <Button> Login </Button>
                <ForgetPasswordBtn to="/forgetpassword">
                    Forget password
                </ForgetPasswordBtn>
            </Form>
        </LoginContainer>
    )
}

export default Login
