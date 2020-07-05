import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { Card, Title, Holder, Image, Divider, Button } from '../shared/Elements'
import { Container, Row, Grid } from '../shared/GridSystem'
import CommentForm from './CommentForm'
import { DUMMY_DATA } from '../../UsersData'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import Map from '../shared/Map'
import { ImageHolder } from '../shared/Map'
const PlaceItem = () => {
    const [open, setOpen] = useState(false)
    const placeId = useParams().placeId
    const place = DUMMY_DATA.find((place) => place.id.toString() === placeId)
    const { title, address, description, image, id } = place
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const location = { lat: '52.08889', lon: '5.11556' }

    return (
        <>
            <Modal
                classNames="Modal"
                open={open}
                onClose={() => setOpen(false)}
                center
            >
                <Map
                    center={location}
                    zoom={16}
                    title={address}
                    onClick={() => setOpen(false)}
                />
            </Modal>
            <Container>
                <Row center>
                    <Grid md={6} sm={12} lg={4}>
                        <Card marginTop="1rem">
                            <Title
                                center
                                marginTop="1.5rem"
                                marginBottom="1.5rem"
                            >
                                {title}
                            </Title>
                            <Divider gray marginBottom="0.8rem" />
                            <Holder>
                                <Image src={image} alt="" />
                            </Holder>
                            <Title
                                center
                                marginTop="1.5rem"
                                marginBottom="1.5rem"
                            >
                                {address}
                            </Title>
                            <p>{description}</p>
                            <Divider
                                gray
                                marginTop="0.8rem"
                                marginBottom="0.8rem"
                            />
                            <Button
                                onClick={() => setOpen(true)}
                                small
                                background="#004C7F"
                                margin="0 0 10px 0"
                            >
                                Map
                            </Button>
                        </Card>
                        {isAuth && <CommentForm placeId={id} />}
                    </Grid>
                </Row>
            </Container>
        </>
    )
}

export default PlaceItem
