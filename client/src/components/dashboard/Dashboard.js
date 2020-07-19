import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Grid, Row } from '../shared/GridSystem'
import { Title, Divider, Image, Holder, Button, Icon } from '../shared/Elements'
import UserUpdate from './UserUpdate'
import UserBoards from './UserBoards'
import { useSelector, useDispatch } from 'react-redux'
import UserPlaces from './UserPlaces'
import { Menu } from '../layout/Navbar'
import UserWishlist from './UserWishlist'
import { loadUser } from '../../actions/auth'

const UserInfoContent = styled.div`
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    box-shadow: 0px 1px 5px 0px;
    padding: 1rem;
    ${(props) => {
        if (props.mt === 2) {
            return 'margin-top:.5rem'
        } else if (props.mt === 4) {
            return 'margin-top:2rem;'
        }
    }};
`
const DashboardContainer = styled.div`
    display: flex;
    min-height: 100%;
    background: #3e497b;
`
const DashboardMenu = styled(Menu)`
    margin-top: 2rem;
    height: auto;
    padding: 5px 15px;
`
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const [showEdit, setShowEdit] = useState(false)
    const [isBoardsOpen, setIsBoardsOpen] = useState(false)
    const [isPlacesOpen, setIsPlacesOpen] = useState(true)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    return (
        <DashboardContainer>
            {user && (
                <Container>
                    <Row>
                        <Grid md={4}>
                            {showEdit ? (
                                <UserUpdate setShowEdit={setShowEdit} />
                            ) : (
                                <UserInfoContent mt={4}>
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
                                </UserInfoContent>
                            )}
                        </Grid>
                        <Grid md={8}>
                            <DashboardMenu>
                                <Button
                                    active={isPlacesOpen}
                                    small
                                    marginRight="1rem"
                                    onClick={() => {
                                        setIsPlacesOpen(true)
                                        setIsBoardsOpen(false)
                                        setIsWishlistOpen(false)
                                    }}
                                >
                                    My Places
                                </Button>
                                <Button
                                    active={isBoardsOpen}
                                    small
                                    onClick={() => {
                                        setIsBoardsOpen(true)
                                        setIsPlacesOpen(false)
                                        setIsWishlistOpen(false)
                                    }}
                                >
                                    My Boards
                                </Button>
                                <Button
                                    active={isWishlistOpen}
                                    small
                                    marginLeft="1rem"
                                    onClick={() => {
                                        setIsBoardsOpen(false)
                                        setIsPlacesOpen(false)
                                        setIsWishlistOpen(true)
                                    }}
                                >
                                    My Wishlist
                                </Button>
                            </DashboardMenu>
                            <UserInfoContent mt={2}>
                                {isPlacesOpen && (
                                    <UserPlaces places={user.places} />
                                )}

                                {isBoardsOpen && (
                                    <UserBoards boards={user.placeLists} />
                                )}
                                {isWishlistOpen && (
                                    <UserWishlist
                                        wishlist={user.travelWishList}
                                    />
                                )}
                            </UserInfoContent>
                        </Grid>
                    </Row>
                </Container>
            )}
        </DashboardContainer>
    )
}

export default Dashboard
