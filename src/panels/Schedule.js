import React,{useState,useEffect, Fragment} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

// import { Setting } from '../components/Setting';
import {FormLayout,Separator,Div,Header,Button,Select, Textarea, Root} from "@vkontakte/vkui";
import {TabsItem,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";

import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';


import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import './Home.css';
import { Setting } from '../components/Setting';

import {update} from '../components/Service' 
 

const Schedule = ({ id, snackbarError, fetchedState,day,group }) => {
	const [activePanel, setActivePanel]= useState('panel3')
	const [activeView, setactiveView]= useState('view1')
    const [activeTab3, setActiveTab3]= useState(day.day)
    const [selectDay, setSelectDay]= useState(activeTab3)
    const [updateSchedule,setUpdateSchedule ]= useState([])

    
    // console.log(activeTab3)
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
    
        <PanelHeader
            left={<PanelHeaderBack onClick={() => setActivePanel('panel3' )}/>}
            separator={false}
        >
            Расписание
        </PanelHeader>
        <Tabs>
            <HorizontalScroll>
            <TabsItem
                onClick={() => setActiveTab3('Понедельник')}
                selected={activeTab3 === 'Понедельник'}
            >
                Понедельник
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Вторник' )}
                selected={activeTab3 === 'Вторник'}
            >
                Вторник
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Среда' )}
                selected={activeTab3 === 'Среда'}
            >
                Среда
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Четверг' )}
                selected={activeTab3 === 'Четверг'}
            >
                Четверг
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3( 'Пятница' )}
                selected={activeTab3 === 'Пятница'}
            >
                Пятница
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3( 'Суббота' )}
                selected={activeTab3 === 'Суббота'}
            >
               Суббота
            </TabsItem>
            </HorizontalScroll>
        </Tabs>
        <Separator />
        <Setting schedule={updateSchedule}/>
        </Panel>
    </View>
</Root>
	);
};

export default Schedule;
