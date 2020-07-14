import React, { useEffect, useState, Fragment } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
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
import { addPlaceToBoard } from '../../actions/boards'
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

    const [open, setOpen] = useState(false)
    const [isBoardsOpen, setIsBoardsOpen] = useState(false)

    if (!place) return <h4>Loading</h4>

    return (
        <Container>
            <Row center>
                <Modal center open={open} onClose={() => setOpen(false)}>
                    <Map
                        center={place.location}
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
                        <Image src={place.image} />
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
                            margin="5px"
                            onClick={() => setOpen(true)}
                        >
                            Map
                        </Button>
                        <Button
                            small
                            background="#004C7F"
                            margin="5px"
                            fontSize="0.98rem"
                            onClick={() => setIsBoardsOpen(true)}
                        >
                            Add to your board
                        </Button>
                        <Modal
                            center
                            open={isBoardsOpen}
                            onClose={() => setIsBoardsOpen}
                        >
                            <div>
                                <Title marginBottom="1rem" center>
                                    Your Boards
                                </Title>
                                {user &&
                                    user.placeLists &&
                                    user.placeLists.map((placelist) => (
                                        <Fragment>
                                            <Button
                                                background="#004C7F"
                                                onClick={() => {
                                                    dispatch(
                                                        addPlaceToBoard(
                                                            placelist._id,
                                                            placeId
                                                        )
                                                    )
                                                    return (
                                                        <Redirect
                                                            to={`/boards/${placelist._id}`}
                                                        />
                                                    )
                                                }}
                                            >
                                                {placelist.listName}
                                            </Button>
                                            <Divider
                                                dark
                                                marginBottom="0.5rem"
                                                marginTop="0.5rem"
                                            ></Divider>
                                        </Fragment>
                                    ))}
                            </div>
                            <Button
                                small
                                fontSize="0.75rem"
                                marginTop="1rem"
                                background=""
                                wheat
                                onClick={() => {
                                    setIsBoardsOpen(false)
                                }}
                            >
                                Close
                            </Button>
                        </Modal>
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
