
import React,{useState,useEffect, Fragment} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import View from '@vkontakte/vkui/dist/components/View/View';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import {FormLayout,Separator,Div,Header,Button,Select, Textarea} from "@vkontakte/vkui";
import "./setting.css"



export const Setting = (props,fetchedState,snackbarError)=> {
    const [selectGroup, setSelectGroup] = useState(props.group);
    const [selectDay, setSelectDay] = useState(props.day);
    const [schedule, setSchedule]= useState([])

  
  Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return week

};


function getWeek() {
    var oddeven = new Date().getWeekNumber()
    if (oddeven % 2 == 1) {
        var weektype = "нижняя"
        return weektype
    } else {
        var weektype = "верхняя"
        return weektype
    }

}
      function update(day,group){
     
        fetch("https://raw.githubusercontent.com/ojenya/tg/master/sevice/schedule_imei.json")
          .then(res => res.json())
          .then(result => {
            const getSchedule = result.filter(e=> e.group_name === group && e.weekday === day).filter(e=>{
              if (e.week_type ===""){
                return e
              }
              if(e.week_type===getWeek()){
                return e
              }
            }).sort(function(obj1, obj2) {
              return obj1.pair_start_time - obj2.pair_start_time;
            })
            setSchedule(getSchedule)
            console.log(result[0])
          })
      }

      return (
        <View activePanel="select">
        <Panel id="select">
          <FormLayout>
      
            <Select top="Название группы"  value={selectGroup} onChange={(e) => setSelectGroup(e.target.value)}>
              <option value="02461-ДБ">02461-ДБ</option>
              <option value="02471-ДБ">02471-ДБ</option>
              <option value="02121-ДБ">02121-ДБ</option>
              <option value="02261-ДБ">02261-ДБ</option>
              <option value="02361-ДБ">02361-ДБ</option>
            </Select>
            <Select top="День недели" value={selectDay} onChange={(e) => setSelectDay(e.target.value)}>
              <option value="Понедельник">Понедельник</option>
              <option value="Вторник">Вторник</option>
              <option value="Среда">Среда</option>
              <option value="Четверг">Четверг</option>
              <option value="Пятница">Пятница</option>
              <option value="Суббота">Суббота</option>
            </Select>
            <Button type="submit" size="xl" onClick={() =>  update(selectDay,selectGroup)}>
              Сохранить
            </Button>
          
          </FormLayout>
         
          <CardGrid>
          {/* {schedule.map(e=><Fragment><Card className="minis">{`${e.pair_start_time}--${e.pair_end_time}`}</Card><Card  mode="shadow" className="grid"><span>{`${e.subject_name}`}</span></Card></Fragment>)} */}
      {schedule.map(e=><Card mode="shadow" size="l"className="grid"><Div>{`${e.pair_start_time}-${e.pair_end_time} ${e.subject_name} \n ${e.class_name} ${e.pair_type} ${e.lastname} ${e.firstname} ${e.patronymic} `}</Div></Card>)}
          </CardGrid> 
        </Panel>
      </View>

      );
      
    }
  

  export default <Setting/>