import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Grid, Row } from '../shared/GridSystem'
import { Title, Divider, Image, Holder, Button, Icon } from '../shared/Elements'
import { USER_DUMMY_DATA } from '../../UsersData'
import UserUpdate from './UserUpdate'
import { useSelector } from 'react-redux'
const { name, avatar, id, followers, following } = USER_DUMMY_DATA
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
    min-height: calc(100% - 50px);
    background: #3e497b;
    position: absolute;
    right: 0;
    left: 0;
`
const Dashboard = () => {
    const user = useSelector((state) => state.auth.user)
    const [showEdit, setShowEdit] = useState(false)

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
                                    <Holder width="150px" height="150px">
                                        <Image src={avatar} alt={user.name} />
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
                                    >
                                        My Places
                                    </Button>
                                    <Button
                                        small
                                        background="#007bff"
                                        marginTop="1rem"
                                    >
                                        My Boards
                                    </Button>
                                </UserInfoContent>
                            )}
                        </Grid>
                    </Row>
                </Container>
            )}
        </DashboardContainer>
    )
}

export default Dashboard
