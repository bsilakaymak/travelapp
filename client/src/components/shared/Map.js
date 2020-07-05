import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Divider, Button, Title } from '../shared/Elements'
const MapStyled = styled.div`
    height: 100%;
    width: 100%;
`
const ImageHolder = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 500px;
    @media (max-width: 576px) {
        width: 100%;
        height: 400px;
    }
`
const Map = (props) => {
    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)
    const { center, zoom } = props

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: center,
                zoom: zoom,
            })

            map.on('load', () => {
                setMap(map)
                map.resize()
            })
        }
        console.log(map)
        if (!map) initializeMap({ setMap, mapContainer })
    }, [map, center, zoom])

    return (
        <ImageHolder>
            <Title center>{props.title}</Title>
            <Divider gray margin="0.8rem" />
            <MapStyled ref={(el) => (mapContainer.current = el)} />
            <Divider gray marginTop="0.8rem" />
            <Button
                onClick={props.onClick}
                small
                background="#004C7F"
                marginTop="0.8rem"
            >
                Close
            </Button>
        </ImageHolder>
    )
}

export default Map
