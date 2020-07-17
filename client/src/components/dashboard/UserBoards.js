import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row } from '../shared/GridSystem'
import { Card, Divider, Title, Holder } from '../shared/Elements'
const UserBoards = ({ boards }) => {
    return (
        <Row>
            {boards && boards.length === 0 && (
                <Card>
                    {' '}
                    <Title color="black" center>
                        No boards
                    </Title>
                </Card>
            )}
            {boards &&
                boards.map(({ listName, description, _id }) => (
                    <Grid md={4} lg={3}>
                        <Link to={`/boards/${_id}`} key={_id}>
                            <Card>
                                <Holder direction="inherit">
                                    <Title color="black" marginRight="0.5rem">
                                        <strong>Board name: </strong>
                                    </Title>{' '}
                                    <Title color="black"> {listName}</Title>
                                </Holder>
                                <Divider gray margin="0.5rem 0 .5rem 0" />
                                <Holder direction="inherit">
                                    <Title color="black" marginRight="0.5rem">
                                        <strong>Description</strong>
                                    </Title>
                                    <p>{description}</p>
                                </Holder>
                            </Card>
                        </Link>
                    </Grid>
                ))}
        </Row>
    )
}

export default UserBoards
