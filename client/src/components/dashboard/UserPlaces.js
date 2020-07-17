import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Card, Image, Title } from '../shared/Elements'
import { Row, Grid } from '../shared/GridSystem'
const UserPlaces = ({ places }) => {
    return (
        <Row>
            {places && places.length === 0 && (
                <Card>
                    <Title color="black" center>
                        No Places
                    </Title>
                </Card>
            )}

            {places &&
                places.map(({ _id, title, image, description }) => (
                    <Grid lg={3} md={6} sm={6} key={_id} mb={2}>
                        <Link to={`/place/${_id}`}>
                            <Card minHeight="360px">
                                <Title center>{title}</Title>
                                <Divider gray margin="0.5rem 0 .5rem 0" />
                                <Image
                                    width="200"
                                    height="200"
                                    src={image}
                                    alt={title}
                                />
                                <Divider gray margin=".8rem .8rem" />
                                <p>
                                    {description.slice(0, 40)}{' '}
                                    {description.slice(0, 40).length === 40 &&
                                        '...'}
                                </p>
                            </Card>
                        </Link>
                    </Grid>
                ))}
        </Row>
    )
}

export default UserPlaces
