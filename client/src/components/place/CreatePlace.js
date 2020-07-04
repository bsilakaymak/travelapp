import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon, Image, Holder } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'
import { useDispatch } from 'react-redux'
import { addPlace } from '../../actions/places'

const CreatePlaceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 50px);
    background: #3e497b;
    position: absolute;
    right: 0;
    left: 0;
`
const CreatePlace = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({
        title: '',
        address: '',
        description: '',
    })
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState()
    useEffect(() => {
        if (!file) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])
    const { title, address, description } = userData
    const onChangeCreatePlaceHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitCreatPlaceFormHandler = (e) => {
        e.preventDefault()
        dispatch(addPlace(userData, history))
    }

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
                <ImageUpload onChange={(e) => setFile(e.target.files[0])} />
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
            </Form>
        </CreatePlaceContainer>
    )
}

export default CreatePlace
