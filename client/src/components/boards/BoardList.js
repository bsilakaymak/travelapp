import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../actions/boards'
import BoardItem from './BoardItem'
import { Button, Icon, Card, Title } from '../shared/Elements'
import { Link } from 'react-router-dom'
import { Container } from '../shared/GridSystem'
const BoardListDiv = styled.div`
    display: flex;
    align-item: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2%;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

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
            <BoardListDiv>
                <Container>
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
                </Container>
            </BoardListDiv>
        </>
    )
}

export default BoardList
