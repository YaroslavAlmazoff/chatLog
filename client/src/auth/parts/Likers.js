import React from 'react'
import "../styles/likers.css"
import LikerItem from './LikerItem'

const Likers = ({likers, likersDisplay}) => {
    return (
        <div className='likers' style={{display: likersDisplay}}>
            {likers.map(el => <LikerItem el={el} />)}
        </div>
    )
}

export default Likers