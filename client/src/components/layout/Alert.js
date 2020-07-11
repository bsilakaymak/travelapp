import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledAlert = styled.div`
    padding: 0.8rem;
    opacity: 0.9;
    background: ${(props) => (props.success ? 'green' : '#c61d1d')};
    color: white;
    text-align:center;
`

const Alert = () => {
    const alerts = useSelector((state) => state.alert)
    return (
        <div>
            {alerts &&
                alerts !== null &&
                alerts.length > 0 &&
                alerts.map((alert) => (
                    <StyledAlert
                        key={alert.id}
                        success={alert.alertType === 'success'}
                    >
                        {alert.msg}
                    </StyledAlert>
                ))}
        </div>
    )
}

export default Alert
