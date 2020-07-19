import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Divider, Image, Title, Icon, Button } from '../shared/Elements'
import { Container, Row, Grid } from '../shared/GridSystem'
import { Modal } from 'react-responsive-modal'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePlaceFromBoard } from '../../actions/boards'

const DeleteIcon = styled(Icon)`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
`

const BoardPlaces = ({ places, boardId, creator }) => {
    const [showDelete, setShowDelete] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    return (
        <Container>
            <>
                <Title center marginBottom="1rem">
                    Places
                </Title>
                <Row>
                    {places.length === 0 ? (
                        <Card>
                            <Title center>Np places</Title>
                        </Card>
                    ) : (
                        places.map((place) => (
                            <Grid key={place._id} md={4} sm={6}>
                                {creator === user._id && (
                                    <div>
                                        <Modal
                                            center
                                            open={showDelete}
                                            onClose={() => setShowDelete(false)}
                                        >
                                            <p>
                                                Are you sure you want to delete
                                                this board?
                                            </p>
                                            <Button
                                                marginRight="0.8rem"
                                                red
                                                small
                                                onClick={() => {
                                                    dispatch(
                                                        removePlaceFromBoard(
                                                            boardId,
                                                            place._id
                                                        )
                                                    )
                                                    setShowDelete(false)
                                                }}
                                            >
                                                DELETE
                                            </Button>
                                            <Button
                                                gray
                                                small
                                                onClick={() =>
                                                    setShowDelete(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </Modal>
                                    </div>
                                )}

                                <Card
                                    key={place._id}
                                    textAlign="center"
                                    marginTop="1rem"
                                >
                                    <DeleteIcon
                                        color="black"
                                        className="far fa-trash-alt"
                                        onClick={(e) =>
                                            setShowDelete(!showDelete)
                                        }
                                        margin="1rem"
                                    />
                                    <Link to={`/place/${place._id}`}>
                                        {' '}
                                        <Image
                                            src={place.image}
                                            alt={place.title}
                                            height="250px"
                                        />
                                        <p>{place.title}</p>
                                        <Divider
                                            marginTop="1rem"
                                            marginBottom="1rem"
                                        ></Divider>
                                        <p>{place.description}</p>
                                    </Link>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Row>
            </>
        </Container>
    )
}

export default BoardPlaces
