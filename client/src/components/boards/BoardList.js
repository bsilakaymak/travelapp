import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../actions/boards'
import BoardItem from './BoardItem'
import { Button, Icon, Card, Title } from '../shared/Elements'
import { Link } from 'react-router-dom'
import { Container, Row } from '../shared/GridSystem'

const CreateBoardLink = styled(Link)`
    text-align: center;
    margin: auto;
    display: block;
`
const BoardList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBoards())
    }, [dispatch])
    const { boards } = useSelector((state) => state.boards)
    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        <>
            {isAuthenticated && (
                <CreateBoardLink to={'/createboard'}>
                    <Button small>
                        <Icon mr="0.25rem" className="fas fa-plus" />
                        Create a board
                    </Button>
                </CreateBoardLink>
            )}
            <Container>
                <Row>
                    {boards !== null && boards.length === 0 ? (
                        <Card>
                            <Title center>No Boards</Title>
                        </Card>
                    ) : (
                        boards !== null &&
                        boards.map((board) => (
                            <BoardItem board={board} key={board._id} />
                        ))
                    )}
                </Row>
            </Container>
        </>
    )
}

export default BoardList
