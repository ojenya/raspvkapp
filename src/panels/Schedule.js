import React,{useState,useEffect, Fragment} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

// import { Setting } from '../components/Setting';
import {FormLayout,TabbarItem,Epic,Tabbar,Text,Separator,Div,Header,Button,Select, Textarea, Root, UsersStack} from "@vkontakte/vkui";
import {TabsItem,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";
import Setting from '../components/Setting';

import {update} from '../components/Service' 
import {getWeek} from '../components/Service' 

const Schedule = ({ id, snackbarError, fetchedState,day,group }) => {
	const [activePanel, setActivePanel]= useState('panel3')
	const [activeView, setactiveView]= useState('view1')
    const [activeTab3, setActiveTab3]= useState(day.day)
    const [selectDay, setSelectDay]= useState(activeTab3)
    const [updateSchedule,setUpdateSchedule ]= useState([])
    const [week,setWeek]= useState()


    useEffect(() => {
        setWeek(getWeek())
    });
    
    useEffect(() => {

            update(group,selectDay)
            .then(arr => setUpdateSchedule(arr))
        
      },[selectDay]);

    useEffect(() => {
        setSelectDay(activeTab3)
        
      });
   
	return (
        
<Root activeView={activeView}>

    <View activePanel={activePanel} id="view1">  
        <Panel id="panel3">
        {/* <PanelHeader 
            left={<Icon36Article onClick={() => setActivePanel('panel3' )}/>}
            separator={false}
        >
            {group.group}
        </PanelHeader> */}
        <TabsItem>
                {week} неделя
            </TabsItem>
        <Tabs>
            
            <HorizontalScroll>
            
            <TabsItem 
                onClick={() => setActiveTab3('Понедельник')}
                selected={activeTab3 === 'Понедельник'}
            >
               <Text weight="semibold">ПН</Text>
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Вторник' )}
                selected={activeTab3 === 'Вторник'}
            >
               <Text weight="semibold">ВТ</Text>
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Среда' )}
                selected={activeTab3 === 'Среда'}
            >
            <Text weight="semibold">СР</Text>

            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Четверг' )}
                selected={activeTab3 === 'Четверг'}
            >
            <Text weight="semibold">ЧТ</Text>
            
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3( 'Пятница' )}
                selected={activeTab3 === 'Пятница'}
            >
            <Text weight="semibold">ПТ</Text>
                
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3( 'Суббота' )}
                selected={activeTab3 === 'Суббота'}
            >
               <Text weight="semibold">СБ</Text>
            
            </TabsItem>
            </HorizontalScroll>
        </Tabs>

        <Setting schedule={updateSchedule}/>
        </Panel>
        </View>

</Root>
	);
};

export default Schedule;
