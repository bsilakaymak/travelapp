import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon, Image, Holder } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'
import { useDispatch } from 'react-redux'
import { addPlace } from '../../actions/places'

const CreatePlaceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`
const CreatePlace = () => {
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
        dispatch(addPlace(userData))
    }

    return (
        <CreatePlaceContainer>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#000b76"
                    fillOpacity="1"
                    d="M0,224L48,186.7C96,149,192,75,288,58.7C384,43,480,85,576,128C672,171,768,213,864,213.3C960,213,1056,171,1152,133.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
            <Form right onSubmit={onSubmitCreatPlaceFormHandler}>
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
