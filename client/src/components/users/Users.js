import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/users'
import User from './User'
import { Title, Card } from '../shared/Elements'
import { Container } from '../shared/GridSystem'
const Users = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const { users } = useSelector((state) => state.users)
    return (
        <div>
            <Title center fontSize="2rem" margin="1rem">
                Users
            </Title>
            {users !== null && users.length === 0 ? (
                <Container>
                    <Card>
                        <Title center>No users</Title>
                    </Card>
                </Container>
            ) : (
                users !== null &&
                users.map((user) => <User key={user._id} user={user} />)
            )}
        </div>
    )
}

export default Users
