import React, { useState } from 'react'

import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon } from '../shared/Elements'
import ImageUpload from '../shared/ImageUpload'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../actions/user'
import { useHistory } from 'react-router-dom'

const UpdateUser = ({ setShowEdit }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: '',
        image: null,
    })
    const [previewUrl, setPreviewUrl] = useState()

    const { name, image } = userData
    const updateUserInfo = { name, image }
    const onChangeUserUpdateHandler = (e) => {
        if (e.target.name === 'image') {
            setUserData({ ...userData, image: e.target.files[0] })
            setPreviewUrl(window.URL.createObjectURL(e.target.files[0]))
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }
    const onSubmitUserUpdateFormHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(updateUserInfo, history))
        setShowEdit(false)
    }

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
                        required
                    />
                    <Label>Name</Label>
                </InputHolder>

                <ImageUpload
                    name="image"
                    onChange={onChangeUserUpdateHandler}
                    previewImage={previewUrl}
                />

                <Button small>
                    <Icon mr="0.25rem" className="far fa-edit" />
                    Update
                </Button>
                <Button small gray onClick={(e) => setShowEdit(false)}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default UpdateUser
