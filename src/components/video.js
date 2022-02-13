import React from "react"
import ReactPlayer from 'react-player'


const Video = ({ videoSrcURL, videoTitle, ...props }) => (
    <ReactPlayer 
        url= {'https:' + videoSrcURL} 
        playing='true'
        width='65%'
        height='30%'
        class='videoDiv'
    ></ReactPlayer>
)
export default Video