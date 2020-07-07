import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { addBoard } from '../../actions/boards'

const CreateBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 50px);
    background: #3e497b;
    position: absolute;
    right: 0;
    left: 0;
`
const CreateBoard = () => {
    const [boardData, setBoardData] = useState({
        listName: '',
        description: '',
    })
    const dispatch = useDispatch()
    const { listName, description } = boardData
    const onChangeCreateBoardHandler = (e) => {
        setBoardData({ ...boardData, [e.target.name]: e.target.value })
    }
    const onSubmitCreateBoardFormHandler = (e) => {
        e.preventDefault()
        dispatch(addBoard(boardData))
    }

    return (
        <CreateBoardContainer>
            <Form
                marginTop="0.8rem"
                marginBottom="0.8rem"
                onSubmit={onSubmitCreateBoardFormHandler}
            >
                <FormTitle>Create a Board</FormTitle>
                <Divider marginBottom="0.8rem" />
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="listName"
                        value={listName}
                        onChange={onChangeCreateBoardHandler}
                        autoComplete="off"
                        required
                    />
                    <Label>Board Name</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        color="#fff"
                        name="description"
                        value={description}
                        onChange={onChangeCreateBoardHandler}
                        autoComplete="off"
                        required
                    />
                    <Label>Description</Label>
                </InputHolder>

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
        </CreateBoardContainer>
    )
}

export default CreateBoard
