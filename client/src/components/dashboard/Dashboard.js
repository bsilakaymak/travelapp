import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Grid, Row } from '../shared/GridSystem'
import { Title, Divider, Image, Holder, Button, Icon } from '../shared/Elements'
import { Modal } from 'react-responsive-modal'

import UserUpdate from './UserUpdate'
import UserBoards from './UserBoards'
import { useSelector } from 'react-redux'
import UserPlaces from './UserPlaces'

const UserInfoContent = styled.div`
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    box-shadow: 0px 1px 5px 0px;
    padding: 1rem;
    margin-top: 2rem;
`
const DashboardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    background: #3e497b;
`
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const [showEdit, setShowEdit] = useState(false)
    const [isBoardsOpen, setIsBoardsOpen] = useState(false)
    const [isPlacesOpen, setIsPlacesOpen] = useState(false)

    return (
        <DashboardContainer>
            {user && (
                <Container>
                    <Row center>
                        <Grid md={4}>
                            {showEdit ? (
                                <UserUpdate setShowEdit={setShowEdit} />
                            ) : (
                                <UserInfoContent>
                                    <Icon
                                        color="#fff"
                                        className="fas fa-user-edit"
                                        float="right"
                                        onClick={(e) => setShowEdit(!showEdit)}
                                    />
                                    <Holder width="150px">
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                        />
                                    </Holder>
                                    <Title marginTop="1rem">
                                        <span>Name : </span> {user.name}
                                    </Title>
                                    <Divider width="100%" marginTop="5px" />
                                    <Title marginTop="1rem">
                                        <span>Followers : </span>{' '}
                                        {user.followers.length}
                                    </Title>
                                    <Divider width="100%" marginTop="5px" />
                                    <Title marginTop="1rem">
                                        <span>Following : </span>{' '}
                                        {user.following.length}
                                    </Title>
                                    <Divider width="100%" marginTop="5px" />
                                    <Button
                                        small
                                        background="#007bff"
                                        marginTop="1rem"
                                        marginRight="1rem"
                                        onClick={() =>
                                            setIsPlacesOpen(!isBoardsOpen)
                                        }
                                    >
                                        My Places
                                    </Button>
                                    <Button
                                        small
                                        background="#007bff"
                                        marginTop="1rem"
                                        onClick={() =>
                                            setIsBoardsOpen(!isBoardsOpen)
                                        }
                                    >
                                        My Boards
                                    </Button>
                                </UserInfoContent>
                            )}
                        </Grid>
                    </Row>

                    <Modal
                        center
                        open={isBoardsOpen}
                        onClose={() => setIsBoardsOpen(false)}
                    >
                        <UserBoards boards={user.placeLists} />
                    </Modal>
                    <Modal
                        center
                        open={isPlacesOpen}
                        onClose={() => setIsPlacesOpen(false)}
                    >
                        <UserPlaces places={user.places} />
                    </Modal>
                </Container>
            )}
        </DashboardContainer>
    )
}

export default Dashboard
