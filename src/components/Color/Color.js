import React, { useState, Fragment, useEffect } from "react"
import {Div} from "@vkontakte/vkui";


export const Color = ({type, start, end}) => {
    const [color,setColor]=useState()
    useEffect(()=>{
        switch (type) {
            case "практика":
            setColor('blue')
                break;
    
            case "лекция":
            setColor('orange')
                break;
    
            case "лабораторная":
            setColor('green')
                break;
        }
    })
    return (
        // <Fragment>
        <Div className="time">
            <Div className='start'>{start}</Div>
            <Div className={"v_separator sep " + color}></Div>
            <Div className='end'>{end}</Div>
        </Div>

    )
    
}