import React,{useState} from 'react'
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';

import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';

import {TabsItem,Root,View,Select,Panel,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';


export const Depart = (props) =>{
    const [activePanel, setActivePanel]= useState('panel1')
	const [activeView, setactiveView]= useState('view1')
    const [contextOpened, setContextOpened]= useState(false)
    const [mode, setMode]= useState('all')
    const [activeTab1, setActiveTab1]= useState('recomendations')
    const [activeTab2, setActiveTab2]= useState('music')
    const [activeTab3, setActiveTab3]= useState('news')
    const [activeTab4, setActiveTab4]= useState('all')
    const [activeTab5, setActiveTab5]= useState('all')
    function select() {
        setMode({ mode: false });
        setContextOpened({contextOpened: false});
      }
    
    const {title} = props
    return (
   
    // <>
    // <Root activeView={activeView}>
    //     <View activePanel={activePanel} id="view1">
    //         <Panel id='panel1'>

               
    //         </Panel>

    //         <Panel id="panel2">
    //             <PanelHeader
    //                 left={<PanelHeaderBack onClick={() => setActivePanel( 'panel1' )}/>}
    //                 separator={false}
    //             >
    //             </PanelHeader>
    //         </Panel>
    //     </View>
    // </Root>
    <Group separator="hide" header={<Header mode="secondary">{title}</Header>}>
    <CardGrid>
        <Card size="l" onClick={() => setActivePanel( 'panel2' )}>
            <Div style={{ height: 96 }} />
        </Card>
    </CardGrid>
    </Group>
    )
}