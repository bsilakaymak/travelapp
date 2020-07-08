import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Card, Divider, Image, Title, Icon, Button } from '../shared/Elements'
import { Modal } from 'react-responsive-modal'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePlaceFromBoard } from '../../actions/boards'
const PlacesDiv = styled.div`
    width: 50%;
    margin: 1rem auto;
    padding: 1rem;
`

const BoardPlaces = ({ places, boardId, creator }) => {
    const [showDelete, setShowDelete] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    return (
        <PlacesDiv>
            <Title center marginBottom="1rem">
                Places
            </Title>
            {places &&
                places.map((place) => (
                    <Fragment key={place._id}>
                        {creator === user._id && (
                            <div>
                                <Icon
                                    color="black"
                                    className="far fa-trash-alt"
                                    onClick={(e) => setShowDelete(!showDelete)}
                                    margin="1rem"
                                />
                                <Modal
                                    center
                                    open={showDelete}
                                    onClose={() => setShowDelete(false)}
                                >
                                    <p>
                                        Are you sure you want to delete this
                                        board?
                                    </p>
                                    <Button
                                        background="#c61d1d"
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
                                        background="#004C7F"
                                        small
                                        onClick={() => setShowDelete(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Modal>
                            </div>
                        )}

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
                    </Fragment>
                ))}
        </PlacesDiv>
    )
}

export default BoardPlaces
