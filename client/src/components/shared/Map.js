import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapStyled = styled.div`
    height: 100%;
    width: 100%;
    // position: absolute;
    // top: 40px;
    // left: 0px;
    // right: 0;
    // margin: auto;
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

    return <MapStyled ref={(el) => (mapContainer.current = el)} />
}

export default Map
