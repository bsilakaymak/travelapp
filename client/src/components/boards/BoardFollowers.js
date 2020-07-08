import React, { Fragment } from 'react'
import { Divider, Title } from '../shared/Elements'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FollowerLink = styled(Link)`
    text-decoration: none;
    text-align: center;
    color: black;
    &:hover {
        color: #122241;
    }
`

const BoardFollowers = ({ followers }) => {
    return (
        <Fragment>
            <Title center>Followers</Title>
            <Divider marginTop="1rem" marginBottom="1rem"></Divider>
            {followers &&
                followers.map((follower) => (
                    <FollowerLink
                        key={follower._id}
                        to={`/users/${follower._id}`}
                    >
                        {follower.name}
                    </FollowerLink>
                ))}
        </Fragment>
    )
}

export default BoardFollowers
