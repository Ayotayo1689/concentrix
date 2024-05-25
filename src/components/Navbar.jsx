import React from 'react'
import Logo from "../../src/assets/logo-concentrix-white.svg"
import { Box } from '@chakra-ui/react'
import "./style.css"
import Footer from './Footer'

const Navbar = () => {
  return (
    <Box  position={"fixed"} zIndex={999} w={"100vw"}>
       <div id='footer' style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"20px"
       }}>
       <img src={Logo} alt="" width={"100%"} style={{
            maxWidth:"250px"
        }} />
        <Box display='flex' marginRight={"30px"} gap={"10px"} flexDir={"column"}>
                <Box sx={{
                    color: "white",
                    background:"white",
                    width:"30px",
                    height:"2px"
                }}></Box>
                <Box sx={{
                    color: "white",
                    background:"white",
                    width:"30px",
                    height:"2px"
                }}></Box>
                <Box sx={{
                    color: "white",
                    background:"white",
                    width:"30px",
                    height:"2px"
                }}></Box>
            </Box>
       </div>
       {/* <div>
        <Footer/>
       </div> */}
    </Box>
  )
}

export default Navbar