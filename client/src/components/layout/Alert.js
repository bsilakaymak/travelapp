import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledAlert = styled.div`
    padding: 0.8rem;
    opacity: 0.9;
    background: #c61d1d;
    color: white;
`

const Alert = () => {
    const alerts = useSelector((state) => state.alert)
    return (
        <div>
            {alerts &&
                alerts !== null &&
                alerts.length > 0 &&
                alerts.map((alert) => (
                    <StyledAlert key={alert.id}>{alert.msg}</StyledAlert>
                ))}
        </div>
    )
}

export default Alert
