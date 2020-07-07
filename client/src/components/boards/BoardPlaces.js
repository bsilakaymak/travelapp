import React from 'react'
import styled from 'styled-components'

const PlacesDiv = styled.div`
    width: 50%;
    margin: auto;
`

const BoardPlaces = ({ places }) => {
    return (
        <PlacesDiv>
            {places &&
                places.map((place) => (
                    <div key={place._id}> 
                        {/* <p>{place.title}</p>
                        <p>{place.description}</p> */}
                    </div>
                ))}
        </PlacesDiv>
    )
}

export default BoardPlaces
