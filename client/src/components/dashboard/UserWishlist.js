import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Card, Image, Title, Icon, Button } from '../shared/Elements'
import { Row, Grid } from '../shared/GridSystem'
import Modal from 'react-responsive-modal'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromWishlist } from '../../actions/user'
import { loadUser } from '../../actions/auth'
const UserWishlist = ({ wishlist }) => {
    const [deletePlaceOpen, setDeletePlaceOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    const { user } = useSelector((state) => state.auth)
    return (
        <Row>
            {wishlist && wishlist.length === 0 && (
                <Card>
                    <Title color="black" center>
                        Hello {user.name} You have no places in Your wishlist
                    </Title>
                </Card>
            )}

            {user &&
                user.travelWishList &&
                user.travelWishList.map((el) => (
                    <Grid lg={3} md={6} sm={6} key={el._id} mb={2}>
                        {el.wish && el.wish !==null && (
                            <Fragment>
                                <Icon
                                    mr="5px"
                                    className="far fa-trash-alt"
                                    onClick={() => setDeletePlaceOpen(true)}
                                ></Icon>
                                <Modal
                                    center
                                    open={deletePlaceOpen}
                                    onClose={() => setDeletePlaceOpen(false)}
                                >
                                    <p>
                                        Are you sure you want to delete this
                                        place from your wishlist?
                                    </p>
                                    <Button
                                        small
                                        red
                                        onClick={() => {
                                            dispatch(
                                                removeItemFromWishlist(
                                                    el.wish._id
                                                )
                                            )
                                            console.log(el, el.wish)
                                            setDeletePlaceOpen(false)
                                        }}
                                    >
                                        DELETE
                                    </Button>
                                    <Button
                                        darkGray
                                        small
                                        onClick={() =>
                                            setDeletePlaceOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </Modal>
                                <Link to={`/place/${el.wish._id}`}>
                                    <Card minHeight="360px">
                                        <Title center>{el.wish.title}</Title>
                                        <Divider
                                            gray
                                            margin="0.5rem 0 .5rem 0"
                                        />
                                        <Image
                                            width="200"
                                            height="200"
                                            src={el.wish.image}
                                            alt={el.wish.title}
                                        />
                                        <Divider gray margin=".8rem .8rem" />
                                        <p>
                                            {el.wish.description.slice(0, 40)}{' '}
                                            {el.wish.description.slice(0, 40)
                                                .length === 40 && '...'}
                                        </p>
                                        <p>
                                            {el.isVisited
                                                ? 'Visited'
                                                : 'Not Visited Yet'}
                                        </p>
                                    </Card>
                                </Link>
                            </Fragment>
                        )}
                    </Grid>
                ))}
        </Row>
    )
}

export default UserWishlist
