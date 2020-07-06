import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button } from '../shared/Elements'
const InputStyled = styled.input`
    display: none;
`

const ImageUpload = (props) => {
    const filePickerRef = useRef()
    const pickImageHandler = () => filePickerRef.current.click()
    return (
        <>
            <InputStyled
                ref={filePickerRef}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={props.onChange}
                value={props.value}
                name={props.name}
            />

            <Button
                small
                background="#3f51b5;"
                marginTop="0.5rem"
                marginBottom="0.5rem"
                onClick={pickImageHandler}
            >
                PICK IMAGE
            </Button>
        </>
    )
}

export default ImageUpload
