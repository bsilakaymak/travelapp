import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Card, Image, Title, Icon, Button } from '../shared/Elements'
import { Row, Grid } from '../shared/GridSystem'
import Modal from 'react-responsive-modal'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeItemFromWishlist,
    updateItemInWishlist,
} from '../../actions/user'
import styled from 'styled-components'
const StyledCheckBox = styled.input`
    width: 1.5rem;
    height: 1.5rem;
    font-family: 'Font Awesome 5 Free';
    content: '\f00c';
    display: inline-block;
    vertical-align: middle;
    font-weight: 900;
    color: #3f51b5;
    margin-right: 10px;
    box-shadow: 1px 1px 7px 0px rgba(0, 0, 255, 0.5);
`

const UserWishlist = ({ wishlist }) => {
    const [deletePlaceOpen, setDeletePlaceOpen] = useState(false)
    const dispatch = useDispatch()
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
                        {el.wish && el.wish !== null && (
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
                                    </Card>
                                </Link>
                                <div style={{marginTop:'3%', textAlign:'center',padding:'1rem', backgroundColor:'#3E497A'}}>
                                    <StyledCheckBox
                                        name="is-visited"
                                        type="checkbox"
                                        value={el.isVisited}
                                        checked={el.isVisited}
                                        onChange={() => {
                                            dispatch(
                                                updateItemInWishlist(
                                                    el.wish._id,
                                                    {
                                                        isVisited: !el.isVisited,
                                                    }
                                                )
                                            )
                                        }}
                                    />
                                    <label htmlFor="is-visited">
                                        {el.isVisited
                                            ? 'Visited'
                                            : 'Not Visited Yet'}
                                    </label>
                                </div>
                            </Fragment>
                        )}
                    </Grid>
                ))}
        </Row>
    )
}

export default UserWishlist
