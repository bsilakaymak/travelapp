import React from 'react'
import styled from 'styled-components'

const ModalDiv = styled.div`
    width:100%;
    background-color: #fff;
    color:black;
    margin: auto;
    padding:2rem;
    position: absolute;
    z-index: 100;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Modal = (props) => {
    return (
        <ModalDiv isOpen={props.isOpen}>
            {props.children}
        </ModalDiv>
    )
}

export default Modal
