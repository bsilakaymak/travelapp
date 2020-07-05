import React from 'react'
import styled from 'styled-components'

const ModalDiv = styled.div`
    width:80%;
    background-color: #f7f5f5;
    margin: auto;
    padding:2rem;
    position: fixed;
    z-index: 100;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-direction:column;
    align-items:center;
    justify-content:center;
    transition: all 0.5s ease;
    @media (min-width: 1075px) {
        width: 50%;
    }
`

const Modal = (props) => {
    return (
        <ModalDiv isOpen={props.isOpen}>
            {props.children}
        </ModalDiv>
    )
}

export default Modal
