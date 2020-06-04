import React,{useState,useEffect, Fragment} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

// import { Setting } from '../components/Setting';
import {FormLayout,TabbarItem,Epic,Tabbar,Text,Separator,Div,Header,Button,Select, Textarea, Root} from "@vkontakte/vkui";
import {TabsItem,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';

const Tab = () => {
	const [activeStory, setActiveStory]= useState('discover')

	return (
        

<Epic activeStory={activeStory} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={setActiveStory('feed')}
            selected={activeStory === 'feed'}
            data-story="feed"
            text="Новости"
          ><Icon28CalendarOutline /></TabbarItem>
          <TabbarItem
            onClick={setActiveStory('discover')}
            selected={activeStory === 'discover'}
            data-story="discover"
            text="Поиск"
          ><Icon28ArticleOutline /></TabbarItem>
          <TabbarItem
            onClick={setActiveStory('messages')}
            selected={activeStory === 'messages'}
            data-story="messages"
            label="12"
            text="Сообщения"
          ><Icon28CalendarOutline /></TabbarItem>
        </Tabbar>
      }>
    <View id="feed" activePanel="feed">
          <Panel id="feed">
            <PanelHeader>Новости</PanelHeader>
          </Panel>
        </View>
        <View id="discover" activePanel="discover">
          <Panel id="discover">
            <PanelHeader>Поиск</PanelHeader>
          </Panel>
        </View>
        <View id="messages" activePanel="messages">
          <Panel id="messages">
            <PanelHeader>Сообщения</PanelHeader>
          </Panel>
        </View>
        <View id="notifications" activePanel="notifications">
          <Panel id="notifications">
            <PanelHeader>Уведомления</PanelHeader>
          </Panel>
        </View>
        <View id="more" activePanel="more">
          <Panel id="more">
            <PanelHeader>Ещё</PanelHeader>
          </Panel>
        </View>
    </Epic>

	);
};

export default Tab;

