
import React,{useState,useEffect, Fragment} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import View from '@vkontakte/vkui/dist/components/View/View';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import {FormLayout,Separator,Div,Header,Button,Select, Textarea} from "@vkontakte/vkui";
import "./setting.css"



export const Setting = (props)=> {
    // const [day, setDay] = useState(props.group.group);
    // const [group, setGroup] = useState(props.day);
    const [getSchedule, setSchedule]= useState([])
    useEffect(() => {
      setSchedule(props.schedule)
    })

    // useEffect(() => {
    //   setGroup(props.day)
      
    // });
    // useEffect(() => {
      
    // setDay(props.group.group)
      
    // });


//   Date.prototype.getWeekNumber = function() {
//     var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
//     var dayNum = d.getUTCDay() || 7;
//     d.setUTCDate(d.getUTCDate() + 4 - dayNum);
//     var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
//     var week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
//     return week

// };


// function getWeek() {
//     var oddeven = new Date().getWeekNumber()
//     if (oddeven % 2 == 1) {
//         var weektype = "нижняя"
//         return weektype
//     } else {
//         var weektype = "верхняя"
//         return weektype
//     }

// }
// function update(selectGroup,selectDay){
//   fetch("https://raw.githubusercontent.com/ojenya/tg/master/sevice/schedule_imei.json")
//     .then(res => res.json())
//     .then(result => {
//       const getSchedule = result.filter(e=> e.group_name === selectGroup && e.weekday === selectDay).filter(e=>{
//         if (e.week_type ===""){
//           return e
//         }
//         if(e.week_type===getWeek()){
//           return e
//         }
//       }).sort(function(obj1, obj2) {
//         return obj1.pair_start_time - obj2.pair_start_time;
//       })
//       setSchedule(getSchedule)
//     })
// }
const content = 
  getSchedule.map((e,i) => {
    const element = (
      <Card key={i} mode="shadow" size="l"className="grid">
        <Div>
          {
            `${e.pair_start_time}-${e.pair_end_time} ${e.subject_name} \n ${e.class_name} ${e.pair_type} ${e.lastname} ${e.firstname} ${e.patronymic} `
          }
        </Div>
      </Card>
    )
    return element
  }) 

      return (
        // <View activePanel="select">
        // <Panel id="select">
        <Fragment>
          {/* <FormLayout>
          {schedule}
          </FormLayout> */}
         
          <CardGrid>
          {/* {schedule.map(e=><Fragment><Card className="minis">{`${e.pair_start_time}--${e.pair_end_time}`}</Card><Card  mode="shadow" className="grid"><span>{`${e.subject_name}`}</span></Card></Fragment>)} */}
      {/* {schedule.map((e,i)=><Card key={i} mode="shadow" size="l"className="grid"><Div>{`${e.pair_start_time}-${e.pair_end_time} ${e.subject_name} \n ${e.class_name} ${e.pair_type} ${e.lastname} ${e.firstname} ${e.patronymic} `}</Div></Card>)} */}
      {content}
          </CardGrid> 
          </Fragment>
      //   </Panel>
      // </View>

      );
      
    }
  

  export default <Setting/>