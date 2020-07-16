import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card, Title, Divider, Button } from '../shared/Elements'
import { useSelector } from 'react-redux'
const BoardItemDiv = styled.div`
width:30%;
display:flex;
flex-direction column;
align-items:center;
justify-content:center;
margin:1%;
padding:1%;
text-align:center;
@media (max-width: 768px) {
    width:80%;
}
`

const BoardLink = styled(Link)`
    text-decoration: none;
    color: black;
`
const BoardItem = ({ board }) => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        <BoardItemDiv>
            {board && (
                <Fragment>
                    <Card
                        marginTop="1rem"
                        marginBottom="1rem"
                        background="radial-gradient(circle at center, white 0, #eaeaea 100%)"
                    >
                        <Title center marginTop="1.5rem" marginBottom="1.5rem">
                            {board.listName}
                        </Title>
                        <Divider gray marginTop="1rem" marginBottom="1rem" />
                        <p>{board.description}</p>
                        <Divider gray marginTop="1rem" marginBottom="1rem" />
                        <p>Followers: {board.followers.length}</p>
                        <Divider blue marginTop="1rem" marginBottom="1rem" />
                        {isAuthenticated && (
                            <BoardLink to={`/boards/${board._id}`}>
                                <Button small>DETAILS</Button>
                            </BoardLink>
                        )}
                    </Card>
                </Fragment>
            )}
        </BoardItemDiv>
    )
}

export default BoardItem
