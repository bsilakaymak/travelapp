import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '../shared/Elements'

const UserPlaces = ({ places }) => {
    console.log(places)
    return (
        <div>
            {places && places.length === 0 && <h4>No Places</h4>}
            {places &&
                places.map((place) => (
                    <Fragment>
                        <Link to={`/place/${place._id}`} key={place._id}>
                            <h4>{place.title}</h4>
                        </Link>
                        <Divider></Divider>
                        <p>{place.description}</p>
                    </Fragment>
                ))}
        </div>
    )
}

export default UserPlaces
