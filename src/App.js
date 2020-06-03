import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Error from '@vkontakte/icons/dist/24/error';

import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';
import Setting from './components/Setting';
import Schedule from './panels/Schedule';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	SETTING: 'setting',
	SCHEDULE: 'schedule'

};

const STORAGE_KEYS = {
	STATE: 'state',
	STATUS: 'viewStatus',
};
const group = {group: '02461-ДБ'};
const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.SCHEDULE);
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value =  'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};



	const viewHome = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
			});
			go(panel);
		} catch (error) {
			setSnackbar(<Snackbar
				layout='vertical'
				onClose={() => setSnackbar(null)}
				before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
				duration={900}
			>
				Проблема с отправкой данных в Storage
			</Snackbar>
			);
		}
	}

	const viewSchedule = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
			});
			go(panel);
		} catch (error) {
			setSnackbar(<Snackbar
				layout='vertical'
				onClose={() => setSnackbar(null)}
				before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
				duration={900}
			>
				Проблема с отправкой данных в Storage
			</Snackbar>
			);
		}
	}

   
	
    function getWeekDay (){
		let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let date = new Date()
		let day = {day: days[date.getDay()]};
        return day

    };
	

	return (
		<View activePanel={activePanel} popout={popout}>
			{/* <Home id={ROUTES.HOME} fetchedUser={fetchedUser} fetchedState={fetchedState} go={viewHome} route={ROUTES.HOME} /> */}
			<Schedule id={ROUTES.SCHEDULE} fetchedUser={fetchedUser} fetchedState={fetchedState} day={ getWeekDay()} group={group} go={viewSchedule} route={ROUTES.SCHEDULE} />

			{/* <Setting id={ROUTES.SELECT} fetchedState={fetchedState}/> */}
			{/* <Intro id={ROUTES.INTRO} fetchedUser={fetchedUser}  go={viewIntro} route={ROUTES.HOME} userHasSeenIntro={userHasSeenIntro} /> */}
		</View>
	);
}

export default App;

