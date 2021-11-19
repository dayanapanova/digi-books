import React from 'react'
import landPage from './landPage.png'
const LandPage = () => {
    const styleObj = {
        height: "100vh",
        width: "100%",
        display: "block"
    }
    return (
        <div>
            <img src={landPage} alt="Land page" style={styleObj} />
        </div>
    )
}

export default LandPage
