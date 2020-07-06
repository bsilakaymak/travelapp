import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import {
    Card,
    Title,
    Holder,
    Image,
    Divider,
    Button,
    Icon,
} from '../shared/Elements'
import { Container, Row, Grid } from '../shared/GridSystem'
import CommentForm from './CommentForm'
import { useSelector, useDispatch } from 'react-redux'
import { getPlace, deletePlace } from '../../actions/places'

import Map from '../../components/shared/Map'
const PlaceDetails = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const history = useHistory()
    const placeId = useParams().placeId
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlace(placeId))
    }, [placeId, dispatch])
    const place = useSelector((state) => state.places.place)
    const user = useSelector((state) => state.auth.user)
    const location = { lat: '52.08889', lon: '5.11556' }

    const [open, setOpen] = useState(false)
    if (!place) return <h4>Loading</h4>
    return (
        <Container>
            <Row center>
                <Modal center open={open} onClose={() => setOpen(false)}>
                    <Map
                        center={location}
                        zoom={16}
                        title={place.address}
                        onClick={() => setOpen(false)}
                    />
                </Modal>
                <Grid md={6} sm={12} lg={4}>
                    <Card marginTop="1rem">
                        {user && user._id === place.creator && (
                            <Icon
                                mr="5px"
                                className="far fa-trash-alt"
                                onClick={() =>
                                    dispatch(deletePlace(placeId, history))
                                }
                            ></Icon>
                        )}
                        <Title center marginTop="1.5rem" marginBottom="1.5rem">
                            {place.title}
                        </Title>
                        <Divider gray marginBottom="0.8rem" />
                        <Holder>
                            <Image src={''} alt="" />
                        </Holder>
                        <Title center marginTop="1.5rem" marginBottom="1.5rem">
                            {place.address}
                        </Title>
                        <p>{place.description}</p>
                        <Divider
                            gray
                            marginTop="0.8rem"
                            marginBottom="0.8rem"
                        />
                        <Button
                            small
                            background="#004C7F"
                            margin="0 0 10px 0"
                            onClick={() => setOpen(true)}
                        >
                            Map
                        </Button>
                    </Card>
                    {isAuth && (
                        <CommentForm placeId={place._id} place={place} />
                    )}
                </Grid>
            </Row>
        </Container>
    )
}

export default PlaceDetails
