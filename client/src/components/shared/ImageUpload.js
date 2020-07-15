import React from 'react'
import styled from 'styled-components'
import { Holder, Image } from './Elements'
const InputStyled = styled.input`
    display: none;
`
const UploadButton = styled.label.attrs((props) => ({
    htmlFor: 'file',
}))`
    &::before {
        content: ' PICK IMAGE';
        width: 120px;
        background-color: #3f51b5;
        position: absolute;
        z-index: 5;
        line-height: 3;
        padding-left: 30px;
        cursor: pointer;
    }
`
const ImageUpload = (props) => {
    return (
        <>
            <InputStyled
                id="file"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={props.onChange}
                value={props.value}
                name={props.name}
            />
            <UploadButton></UploadButton>
            <Holder width="150px" height="150px" mt="3.5rem">
                {!props.previewImage ? (
                    <p>Please pick an image.</p>
                ) : (
                    <Image
                        height="150"
                        width="150"
                        src={props.previewImage}
                        alt=""
                    />
                )}
            </Holder>
        </>
    )
}

export default ImageUpload
