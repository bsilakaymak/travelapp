import React from 'react'
import styled from 'styled-components'
import { Card, Divider, Image, Title } from '../shared/Elements'
import { Link } from 'react-router-dom'
const PlacesDiv = styled.div`
    width: 50%;
    margin: 1rem auto;
    padding: 1rem;
`

const BoardPlaces = ({ places }) => {
    return (
        <PlacesDiv>
            <Title center marginBottom="1rem">
                Places
            </Title>
            {places &&
                places.map((place) => (
                    <Link to={`/place/${place._id}`}>
                        {' '}
                        <Card
                            key={place._id}
                            textAlign="center"
                            marginTop="1rem"
                        >
                            <Image src={place.image} />
                            <p>{place.title}</p>
                            <Divider
                                marginTop="1rem"
                                marginBottom="1rem"
                            ></Divider>
                            <p>{place.description}</p>
                        </Card>
                    </Link>
                ))}
        </PlacesDiv>
    )
}

export default BoardPlaces
