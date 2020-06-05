import React,{useState,useEffect, Fragment} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

// import { Setting } from '../components/Setting';
import {FormLayout,TabbarItem,Epic,Tabbar,Text,Separator,Div,Header,Button,Select, Textarea, Root, UsersStack} from "@vkontakte/vkui";
import {TabsItem,Card,CardGrid,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";
import Setting from '../Settings/Setting';

import {update} from '../../helpers/Service' 
import {getWeek} from '../../helpers/Service' 

export const Deadline = (props) => {
	const [activePanel, setActivePanel]= useState('panel3')
	const [activeView, setactiveView]= useState('view1')
    const [activeTab, setActiveTab]= useState('Активные')
    const [selectDay, setSelectDay]= useState(activeTab)
    const [updateSchedule,setUpdateSchedule ]= useState([])

    useEffect(() => {
        setSelectDay(activeTab)
        
      });
   
    const dl = [
        {
            id:1,
            subject_name:'Физика',
            text:'Сделать кр, домашку'
        },
        {
          id:2,
          subject_name:'Матеша',
          text:'Практическая #2'
      }
    ]

    const dlEnd = [
      {
          id:1,
          subject_name:'Информатика',
          text:'Просто завершенный дедлайн'
      },
      {
        id:2,
        subject_name:'Русский язык',
        text:'Век живи -- век учись!'
    }
  ]
	return (
        
<Root activeView={activeView}>

    <View activePanel={activePanel} id="view1">  
        <Panel id="panel3">    
        <Tabs>    
            <HorizontalScroll>
            <TabsItem 
                onClick={() => setActiveTab('Активные')}
                selected={activeTab === 'Активные'}
            >
               <Text weight="semibold">Активные</Text>
            </TabsItem>
            <TabsItem
                onClick={() => setActiveTab('Завершенные' )}
                selected={activeTab === 'Завершенные'}
            >
               <Text weight="semibold">Завершенные</Text>
            </TabsItem>
            </HorizontalScroll>
        </Tabs>
        {(activeTab === 'Активные')?
        <CardGrid>
        

           {dl.map(dead =>
           <Card size="l" key={dead.id}>
              <Div>
                {dead.subject_name}
              </Div> 
              <Div>
                {dead.text}
              </Div>   
            </Card>)}

       
      </CardGrid>
        :
        <CardGrid>

          {dlEnd.map(dead =>
           <Card size="l" key={dead.id}>
              <Div>
                {dead.subject_name}
              </Div> 
              <Div>
                {dead.text}
              </Div>   
            </Card>)
          } 
      </CardGrid>
        }
       
        </Panel>
        
        </View>

</Root>
	);
};

export default Deadline;
