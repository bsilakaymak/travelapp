import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Title, Holder, Image, Divider, Button } from '../shared/Elements'

import StarRating from '../shared/StarRating'
import { useDispatch } from 'react-redux'
import { ratePlace } from '../../actions/places'
const TagContent = styled.div`
    margin-right: 10px;
    border: 1px solid #004c7f;
    padding: 5px;
    border-radius: 6px;
    font-size: 15px;
`
const PlaceItem = ({ place }) => {
    const { title, address, description, image, _id, tags } = place
    const dispatch = useDispatch()
    return (
        <Card marginTop="1rem" marginBottom="1rem">
            <Title center marginTop="1.5rem" marginBottom="1.5rem">
                {title}
            </Title>
            <Divider gray marginTop="0.8rem" marginBottom="0.8rem" />
            <Holder>
                <Image src={image} alt="" />
            </Holder>
            <Title center marginTop="1.5rem" marginBottom="1.5rem">
                {address}
            </Title>
            <Divider gray marginTop="0.8rem" marginBottom="0.8rem" />
            <Holder direction="inherit" justifyContent="center">
                {tags && tags.map((tag) => <TagContent>{tag}</TagContent>)}
            </Holder>
            <p>{description}</p>
            <Divider gray marginTop="0.8rem" marginBottom="0.8rem" />
            <StarRating
                onChange={(e) => {
                    console.log(typeof e.target.value)
                    dispatch(
                        ratePlace(_id, { rating: parseInt(e.target.value) })
                    )
                }}
            />
            <Link to={`/place/${_id}`}>
                <Button right small background="#004C7F" margin="0 0 10px 0">
                    Details
                </Button>
            </Link>
        </Card>
    )
}

export default PlaceItem
