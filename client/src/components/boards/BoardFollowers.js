import React from 'react'
import { Divider, Title, Holder, Image } from '../shared/Elements'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FollowerLink = styled(Link)`
    text-decoration: none;
    color: white;
    margin-top: 0.25rem;
    margin-right: 0.5rem;
    width: 36px;
`
const FollowerContainer = styled.div`
    display: flex;
`

const BoardFollowers = ({ followers }) => {
    return (
        <>
            <Title center>Followers</Title>
            <Divider marginTop="1rem" marginBottom="1rem" />
            <FollowerContainer>
                {followers &&
                    followers.map(({ _id, name, image }) => (
                        <FollowerLink key={_id} to={`/users/${_id}`}>
                            <Holder width="30px" height="30px">
                                <Image rounded src={image} alt={name} />
                            </Holder>
                            <span> {name}</span>
                        </FollowerLink>
                    ))}
            </FollowerContainer>
        </>
    )
}

export default BoardFollowers
