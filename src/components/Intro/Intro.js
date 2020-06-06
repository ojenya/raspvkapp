import React, { useState,Fragment } from 'react';

import {
	ModalPage,
	Root,Search,ScreenSpinner,
	CardGrid,CardF,Text,Div,
	List,Tabs,HorizontalScroll,TabsItem,
	Panel,Group,Avatar,FixedLayout,Button,
	PanelHeader,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalPageHeader,
	PanelHeaderButton,
	Checkbox, CellButton, View} from "@vkontakte/vkui";
import './Intro.css';


export const Intro = (props) => {

	const { id, go, route, setActiveModal,fetchedUser, userHasSeenIntro } = props

	return(


	<Panel id={id} centered={true}>
		<PanelHeader>Расписание ИМИТ</PanelHeader>
		{(fetchedUser && !userHasSeenIntro) &&
			<Fragment>
				<Group>
					<Div className='User'>
						{fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
						<h2>Привет, {fetchedUser.first_name}!</h2>
						<h3>Этот сервис поможет тебе забыть о расписании в Excel табличках.<br/> Узнать расписание стало намного проще. <br/>Просто нажми на кнопку и выбери группу.</h3>
					</Div>
				</Group>
				<FixedLayout vertical='bottom'>
					<Div>
						
					</Div>
					<Div>
						<Button mode='commerce' size="xl" level="2" onClick={() => setActiveModal()}>
							ОК, всё понятно
						</Button>
					</Div>
				</FixedLayout>
			</Fragment>
		}
	</Panel>

	)
	
};
export default Intro;
