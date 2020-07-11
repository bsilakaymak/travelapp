import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../../actions/auth'

const SendContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    background: #3e497b;
`

const SendEmail = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        email: '',
    })
    const { email } = userData
    const onChangeRegisterHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitAuthFormHandler = (e) => {
        e.preventDefault()
        dispatch(forgetPassword(email))
    }

    return (
        <SendContainer>
            <Form right onSubmit={onSubmitAuthFormHandler}>
                <FormTitle>Forget Password</FormTitle>
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

                <Button
                    background="#3f51b5;"
                    marginTop="0.5rem"
                    marginBottom="0.5rem"
                >
                    {' '}
                    Send Email{' '}
                </Button>
            </Form>
        </SendContainer>
    )
}

export default SendEmail
