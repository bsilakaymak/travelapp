import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'
import { useDispatch } from 'react-redux'
import { addPlace } from '../../actions/places'
import Checkbox from '../shared/Checkbox'
import { setAlert } from '../../actions/alert'
const CreatePlaceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    background: #3e497b;
`
const CreatePlace = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])

    const [placeData, setPlaceData] = useState({
        title: '',
        address: '',
        description: '',
        image: null,
    })
    const dispatch = useDispatch()
    const [previewUrl, setPreviewUrl] = useState()
    const { title, address, description, image } = placeData

    const onChangeCreatePlaceHandler = (e) => {
        if (e.target.name === 'image') {
            setPlaceData({ ...placeData, image: e.target.files[0] })
            setPreviewUrl(window.URL.createObjectURL(e.target.files[0]))
        } else {
            setPlaceData({ ...placeData, [e.target.name]: e.target.value })
        }
    }

    const onSubmitCreatPlaceFormHandler = (e) => {
        e.preventDefault()
        const placeFormData = { image, title, address, description, tags }
        if (
            image === null ||
            title.trim() === '' ||
            address.trim() === '' ||
            description.trim() === '' ||
            tags.length === 0
        ) {
            return dispatch(setAlert(' All fields are required', 'danger'))
        }

        dispatch(addPlace(placeFormData))

        history.push('/places')
    }

    const checkboxHandler = (event) => {
        const tagName = event.target.value
        const checked = event.target.checked

        if (checked) {
            setTags((oldTags) => {
                return oldTags.includes(tagName)
                    ? oldTags
                    : [...oldTags, tagName]
            })
        } else {
            setTags((oldTags) => {
                return oldTags.includes(tagName)
                    ? oldTags.filter((tag) => tag !== tagName)
                    : oldTags
            })
        }
    }

    const checkbox = ['Natural', 'Historical', 'Outdoor', 'Touristic'].map(
        (att) => {
            return (
                <Checkbox
                    key={att}
                    label={att}
                    htmlFor={att}
                    id={att}
                    value={att}
                    onChange={checkboxHandler}
                />
            )
        }
    )

    return (
        <CreatePlaceContainer>
            <Form
                marginTop="0.8rem"
                marginBottom="0.8rem"
                onSubmit={onSubmitCreatPlaceFormHandler}
            >
                <FormTitle>Create Place</FormTitle>
                <Divider marginBottom="0.8rem" />
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="title"
                        value={title}
                        onChange={onChangeCreatePlaceHandler}
                        required
                    />
                    <Label>Title</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="address"
                        value={address}
                        onChange={onChangeCreatePlaceHandler}
                        required
                    />
                    <Label>Address</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="description"
                        value={description}
                        onChange={onChangeCreatePlaceHandler}
                        required
                    />
                    <Label>Description</Label>
                </InputHolder>
                <ImageUpload
                    name="image"
                    onChange={onChangeCreatePlaceHandler}
                    previewImage={previewUrl}
                />
                {checkbox}
                <Button small>
                    <Icon mr="0.25rem" className="fas fa-plus" />
                    Create Place
                </Button>
            </Form>
        </CreatePlaceContainer>
    )
}

export default CreatePlace
