import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Card, Image, Title } from '../shared/Elements'
import { Row, Grid } from '../shared/GridSystem'
const UserWishlist = ({ wishlist }) => {
    return (
        <Row>
            {wishlist && wishlist.length === 0 && (
                <Card>
                    <Title color="black" center>
                        No Places in the wishlist
                    </Title>
                </Card>
            )}

            {wishlist &&
                wishlist.map((wish) => (
                    <Grid lg={3} md={6} sm={6} key={wish.wish_id} mb={2}>
                        <Link to={`/place/${wish.wish_id}`}>
                            <Card minHeight="360px">
                                <Title center>{wish.wish.title}</Title>
                                <Divider gray margin="0.5rem 0 .5rem 0" />
                                <Image
                                    width="200"
                                    height="200"
                                    src={wish.wish.image}
                                    alt={wish.wish.title}
                                />
                                <Divider gray margin=".8rem .8rem" />
                                <p>
                                    {wish.wish.description.slice(0, 40)}{' '}
                                    {wish.wish.description.slice(0, 40)
                                        .length === 40 && '...'}
                                </p>
                                <p>
                                    {wish.isVisited
                                        ? 'Visited'
                                        : 'Not Visited Yet'}
                                </p>
                            </Card>
                        </Link>
                    </Grid>
                ))}
        </Row>
    )
}

export default UserWishlist
