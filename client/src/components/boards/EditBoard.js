import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Input, Label, FormTitle, InputHolder } from '../shared/FormGroup'
import { Divider, Button, Icon } from '../shared/Elements'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../../actions/boards'

const EditBoard = () => {
    const [boardData, setBoardData] = useState({
        listName: '',
        description: '',
    })
    const history = useHistory()
    const dispatch = useDispatch()
    const { boardId } = useParams()
    const { listName, description } = boardData
    const onChangeUpdateHandler = (e) => {
        setBoardData({ ...boardData, [e.target.name]: e.target.value })
    }
    const onClickUpdateHandler = (e) => {
        e.preventDefault()
        dispatch(updateBoard(boardId, boardData))
        history.push('/boards')
    }

    return (
        <div>
            <Form
                marginTop="0.8rem"
                marginBottom="0.8rem"
                onSubmit={onClickUpdateHandler}
                width="100%"
                md="100%"
                bg="white"
                color="black"
            >
                <FormTitle>Update a Board</FormTitle>
                <Divider marginBottom="0.8rem" />
                <InputHolder>
                    <Input
                        background="none"
                        color="black"
                        name="listName"
                        placeholder="board name"
                        value={listName}
                        onChange={onChangeUpdateHandler}
                        required
                    />
                    <Label>Board Name</Label>
                </InputHolder>
                <InputHolder>
                    <Input
                        background="none"
                        placeholder="board description"
                        color="black"
                        name="description"
                        value={description}
                        onChange={onChangeUpdateHandler}
                        required
                    />
                    <Label>Description</Label>
                </InputHolder>

                <Button small>
                    <Icon mr="0.25rem" className="fas fa-plus" />
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default EditBoard
