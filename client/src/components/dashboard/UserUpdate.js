import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon, Image, Holder } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'

const UpdateUser = ({ setShowEdit }) => {
    const [userData, setUserData] = useState({
        name: '',
    })

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

    const onChangeUserUpdateHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const onSubmitUserUpdateFormHandler = (e) => {
        e.preventDefault()
    }
    const { name } = userData

    return (
        <>
            <Form
                md="100%"
                width="100%"
                onSubmit={onSubmitUserUpdateFormHandler}
            >
                <FormTitle>Update Profile</FormTitle>
                <Divider marginBottom="0.8rem" />

                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="name"
                        value={name}
                        onChange={onChangeUserUpdateHandler}
                        autoComplete="off"
                        required
                    />
                    <Label>Name</Label>
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
                    <Icon mr="0.25rem" className="far fa-edit" />
                    Update
                </Button>
                <Button
                    small
                    background="#3f51b5;"
                    marginTop="0.5rem"
                    marginBottom="0.5rem"
                    onClick={(e) => setShowEdit(false)}
                >
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default UpdateUser
