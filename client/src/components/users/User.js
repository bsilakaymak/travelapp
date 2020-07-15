import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../../actions/user'
import { Card, Image, Button } from '../shared/Elements'
import styled from 'styled-components'

const UserDiv = styled.div`
    display: flex;
    flex-direction: ${({ fd }) => (fd ? fd : 'row')};
    align-items: center;
    justify-content: space-evenly;
`
const User = ({ user }) => {
    const dispatch = useDispatch()
    return (
        <div>
            {user && (
                <Card>
                    <UserDiv fd="column">
                        <Image
                            src={
                                user.image
                                    ? user.image
                                    : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-768x768.png'
                            }
                            style={{ width: '50%' }}
                        />
                        <h3>{user.name}</h3>
                        <Button
                            small
                            onClick={() => {
                                dispatch(followUser(user._id))
                            }}
                        >
                            Follow
                        </Button>
                        <p>Followers: {user.followers.length}</p>
                        <p>Following: {user.following.length}</p>
                        <p>{user.places.length} Places</p>
                    </UserDiv>
                </Card>
            )}
            ̦
        </div>
    )
}

export default User
