import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`
const ForgetPasswordBtn = styled(Link)`
    color: #fff;
    text-decoration: none;
`
const Login = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const history = useHistory()
    const { email, password } = userData
    const onChangeRegisterHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitAuthFormHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password, history))
    }
    return (
        <LoginContainer>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#000b76"
                    fillOpacity="1"
                    d="M0,224L48,186.7C96,149,192,75,288,58.7C384,43,480,85,576,128C672,171,768,213,864,213.3C960,213,1056,171,1152,133.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
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
                        type='password'
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
