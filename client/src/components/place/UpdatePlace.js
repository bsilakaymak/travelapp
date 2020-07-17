import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { updatePlace } from '../../actions/places'

const UpdateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    width: 750px;
    background: #3e497b;
    @media (max-width: 850px) {
        width: 500px;
        height: 280px;
    }
    @media (max-width: 576px) {
        width: 250px;
        height: 250px;
    }
`

const UpdatePlace = ({ current, setUpdateMode }) => {
    const dispatch = useDispatch()
    const [place, setPlace] = useState({
        description: '',
        title: '',
    })
    const { description, title } = place
    const onChangeUpdatePlaceHandler = (e) => {
        setPlace({ ...place, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (current) {
            setPlace({
                description: current.description,
                title: current.title,
            })
        }
    }, [current])
    const onSubmitUpdatePlaceFormHandler = (e) => {
        e.preventDefault()
        dispatch(updatePlace(current._id, { description, title }))
        setUpdateMode(false)
    }

    return (
        <UpdateContainer>
            <Form
                md
                width="100%"
                height="100%"
                onSubmit={onSubmitUpdatePlaceFormHandler}
            >
                <FormTitle>Update Place</FormTitle>
                <Divider />
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="title"
                        value={title}
                        onChange={onChangeUpdatePlaceHandler}
                        required
                    />
                    <Label>Title</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="description"
                        value={description}
                        onChange={onChangeUpdatePlaceHandler}
                        required
                    />
                    <Label>Description</Label>
                </InputHolder>

                <Button type="submit"> Update Place </Button>
            </Form>
        </UpdateContainer>
    )
}

export default UpdatePlace
