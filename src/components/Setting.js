import React, { useState, useEffect, Fragment } from 'react';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import {Div,Text, Separator} from "@vkontakte/vkui";
import { Color } from './color'
import "./setting.css"



const Setting = (props) => {
    const [getSchedule, setSchedule] = useState([])

    // const zaglushka=
    //     getZag(()=> {
       
    //         <Card 
    //         mode = "shadow"
    //         size = "l"
    //         className = "grid" >
    //         >
    //             <Text weight="semibold">
    //                 ПАР НЕТ
    //             </Text>
               
    //         </Card> 
    // }  
    // )

    useEffect(() => {
        setSchedule(props.schedule)
    })
    const content = getSchedule.length != 0 ?
        getSchedule.map((e, i) => {
         return (
                <Card key = { i }
                    mode = "shadow"
                    size = "l"
                    className = "grid" >
                    <Text weight="semibold">
                    <Color className='time'
                        type = { e.pair_type }
                        start = { e.pair_start_time }
                        end = { e.pair_end_time }
                    />
                    </Text>
                    <Div className = "para" > 
                    <Text weight="semibold">
                    {
                        `${e.subject_name} \n ${e.class_name} ${e.pair_type}`
                    } 
                    </Text>

                    </Div>

                    <Div className = "teacher" > 
                    <Text weight="semibold">
                    {
                        `${e.lastname} ${e.firstname} ${e.patronymic}`
                    } 
                    </Text>

                    </Div> 
                
                </Card>
            )
            
        }) : 'Пар нет'
    return <CardGrid > {content} </CardGrid> 
}


export default Setting