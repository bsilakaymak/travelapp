import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory, Redirect } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon, Image, Holder } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'
import { useDispatch } from 'react-redux'
import { addPlace } from '../../actions/places'
import Checkbox from '../shared/Checkbox'
const CreatePlaceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 48px);
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
        const placeFormData = { image, title, address, description, tags }
        e.preventDefault()
        dispatch(addPlace(placeFormData, history))

        return <Redirect to={`/places`} />
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
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
                        required
                    />
                    <Label>Description</Label>
                </InputHolder>
                <ImageUpload
                    name="image"
                    onChange={onChangeCreatePlaceHandler}
                />
                <Holder width="150px" height="150px">
                    {!previewUrl && <p>Please pick an image.</p>}
                    <Image src={previewUrl} alt="" />
                </Holder>

                <Button
                    small
                    background="#3f51b5;"
                    marginTop="0.5rem"
                    marginBottom="0.5rem"
                >
                    <Icon mr="0.25rem" className="fas fa-plus" />
                    Create
                </Button>
                {checkbox}
            </Form>
        </CreatePlaceContainer>
    )
}

export default CreatePlace
