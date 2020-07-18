import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Title, Holder, Image, Divider, Button } from '../shared/Elements'
import { avgRating } from '../../utils/avgRating'
import StarRating from '../shared/StarRating'
import { useDispatch, useSelector } from 'react-redux'
import { ratePlace } from '../../actions/places'
import Modal from 'react-responsive-modal'
const TagContent = styled.div`
    margin-right: 10px;
    border: 1px solid #004c7f;
    padding: 5px;
    border-radius: 6px;
    font-size: 15px;
`
const PlaceItem = ({ place }) => {
    const { title, address, description, image, _id, tags, ratings } = place

    const dispatch = useDispatch()
    const [warningOpen, setWarningOpen] = useState(false)
    const { isAuthenticated } = useSelector((state) => state.auth)

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
                {tags &&
                    tags.map((tag) => <TagContent key={tag}>{tag}</TagContent>)}
            </Holder>
            <Divider gray marginTop="0.8rem" marginBottom="0.8rem" />
            <p>{description}</p>
            <Divider gray marginTop="0.8rem" marginBottom="0.8rem" />
            <StarRating
                count={avgRating(ratings)}
                onChange={(e) => {
                    isAuthenticated
                        ? dispatch(
                              ratePlace(_id, {
                                  rating: parseInt(e.target.value),
                              })
                          )
                        : setWarningOpen(true)
                }}
                ratings={`(${ratings.length} ratings)`}
            />
            <Modal
                center
                open={warningOpen}
                onClose={() => setWarningOpen(false)}
            >
                Please login or sign up to rate a place
            </Modal>
            <Link to={`/place/${_id}`}>
                <Button small margin="0 0 10px 0">
                    Details
                </Button>
            </Link>
        </Card>
    )
}

export default PlaceItem
