import React from 'react'
import "./Loader.css"

const Loader = () => {
  return (
    <div style={{
        position:"fixed",
        height:"100dvh",
        width:"100vw",
        background:"#ffffff9d",
        zIndex:"999",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
<div class="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Loader