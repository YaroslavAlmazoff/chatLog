import React from "react";
import "../styles/notice.css"

const Notice = ({noticeText, noticeDisplay, noticeRef}) => {
    //Всплывающая подсказка
    return (
        <div ref={noticeRef} className="notice" style={{display: noticeDisplay}}>
            <p className="notice-text">{noticeText}</p>
        </div>
    )
}

export default Notice

