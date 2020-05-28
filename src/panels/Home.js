import React from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import { Setting } from '../components/Setting';

import './Home.css';

const Home = ({ id, snackbarError, fetchedState,day,group }) => {
	
	return (
		<Panel id={id}>
			<PanelHeader>Расписание</PanelHeader>
			<Setting day={day} group={group} fetchedState={fetchedState} snackbarError={snackbarError}/>

		</Panel>
	);
};

export default Home;
