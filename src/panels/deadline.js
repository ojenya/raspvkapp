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

const Deadline = () => {
	const [activePanel, setActivePanel]= useState('panel3')
	const [activeView, setactiveView]= useState('view1')
    const [activeTab3, setActiveTab3]= useState('Активные')
    const [selectDay, setSelectDay]= useState(activeTab3)
    const [updateSchedule,setUpdateSchedule ]= useState([])
    const [week,setWeek]= useState()


    // useEffect(() => {
    //     setWeek(getWeek())
    // });
    
    // useEffect(() => {

    //         update(group,selectDay)
    //         .then(arr => setUpdateSchedule(arr))
        
    //   },[selectDay]);

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
                onClick={() => setActiveTab3('Активные')}
                selected={activeTab3 === 'Активные'}
            >
               <Text weight="semibold">Активные</Text>
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab3('Завершенные' )}
                selected={activeTab3 === 'Завершенные'}
            >
               <Text weight="semibold">Завершенные</Text>
            </TabsItem>
            </HorizontalScroll>
        </Tabs>

        {/* <Setting schedule={updateSchedule}/> */}
        </Panel>
        </View>

</Root>
	);
};

export default Deadline;
