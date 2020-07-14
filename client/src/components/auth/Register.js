import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { register } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 48px);
    background: #3e497b;
`

const Register = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const dispatch = useDispatch()
    const { name, email, password, password2 } = userData
    const onChangeRegisterHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitAuthFormHandler = (e) => {
        e.preventDefault()
        if (password !== password2) {
            console.log('Passwords do not match')
            return
        } else {
            dispatch(register(name, email, password))
        }
    }
    if (isAuthenticated) return <Redirect to="/dashboard" />
    return (
        <LoginContainer>
            <Form right onSubmit={onSubmitAuthFormHandler}>
                <FormTitle>Create an account</FormTitle>
                <Divider marginBottom="0.8rem" />
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="name"
                        value={name}
                        onChange={onChangeRegisterHandler}
                        autoComplete="off"
                        required
                    />
                    <Label>Name</Label>
                </InputHolder>
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
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="password2"
                        value={password2}
                        onChange={onChangeRegisterHandler}
                        type="password"
                        autoComplete="off"
                        required
                    />
                    <Label>Confirm password</Label>
                </InputHolder>

                <Button
                    background="#3f51b5;"
                    marginTop="0.5rem"
                    marginBottom="0.5rem"
                >
                    {' '}
                    Register{' '}
                </Button>
            </Form>
        </LoginContainer>
    )
}

export default Register
