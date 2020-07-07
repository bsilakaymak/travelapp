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
    min-height: calc(100% - 50px);
    background: #3e497b;
    position: absolute;
    right: 0;
    left: 0;
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
            <Form right onSubmit={onSubmitAuthFormHandler}>
                <FormTitle>Login</FormTitle>
                <Divider marginBottom="0.8rem" />

                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="email"
                        value={email}
                        onChange={onChangeRegisterHandler}
                        autoComplete="off"
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
                        autoComplete="off"
                        type="password"
                        required
                    />
                    <Label>Password</Label>
                </InputHolder>

                <Button
                    background="#3f51b5;"
                    marginTop="0.5rem"
                    marginBottom="0.5rem"
                >
                    {' '}
                    Login{' '}
                </Button>
                <ForgetPasswordBtn to="#!">Forget password</ForgetPasswordBtn>
            </Form>
        </LoginContainer>
    )
}

export default Login
