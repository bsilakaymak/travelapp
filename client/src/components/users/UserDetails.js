import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user'
import { Card, Image, Button } from '../shared/Elements'
import styled from 'styled-components'
import { getUser } from '../../actions/users'
import { useParams } from 'react-router-dom'

const UserDiv = styled.div`
    display: flex;
    flex-direction: ${({ fd }) => (fd ? fd : 'row')};
    align-items: center;
    justify-content: space-evenly;
`
const UserDetails = () => {
    const dispatch = useDispatch()
    const { uid: userId } = useParams()
    const { user: currentUser, isAuthenticated } = useSelector(
        (state) => state.auth
    )
    useEffect(() => {
        dispatch(getUser(userId))
    }, [dispatch, userId])
    const { user } = useSelector((state) => state.users)
    const isFollowed = (currentUserFollowing, followedUserId) => {
        if (
            currentUserFollowing.find(
                (following) => following.user === followedUserId
            )
        ) {
            return true
        }
        return false
    }
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
                        {currentUser && user && isAuthenticated && (
                            <Button
                                small
                                onClick={() => {
                                    !isFollowed(currentUser.following, user._id)
                                        ? dispatch(followUser(user._id))
                                        : dispatch(unfollowUser(user._id))
                                }}
                            >
                                {isAuthenticated && !isFollowed(currentUser.following, user._id)
                                    ? 'Follow'
                                    : 'Unfollow'}
                            </Button>
                        )}

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

export default UserDetails
