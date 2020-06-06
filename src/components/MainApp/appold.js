import React, { useState, useEffect,Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
// import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Error from '@vkontakte/icons/dist/24/error';
// import "./components/Schedule/setting.css"
// import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/Intro.css'
import Icon36Article from '@vkontakte/icons/dist/36/article';
// import {getWeek} from './helpers/Service' 
// import apiGetGroup from './components/getGroup' 
// import Schedule from './components/Schedule/Schedule';
// import ViewApp from './components/ViewApp';
// import Depart from './components/Depart';
// import Deadline from './components/Deadlines';

import Schedule from './components/Schedule/Schedule';
import ViewApp from './components/ViewApp';
import Depart from './components/Depart';
import Deadline from './components/Deadlines';
import MainApp from './components/MainApp';
import Intro from './components/Intro';





import {getWeekDay} from './helpers/getWeekDay'
import './components/Settings/setting.css'
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import {
	ModalPage,
	Root,Search,ScreenSpinner,
	CardGrid,Card,Div,Text,
	List,Tabs,HorizontalScroll,TabsItem,
	Panel,Group,Avatar,FixedLayout,Button,
	PanelHeader,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalPageHeader,
	PanelHeaderButton,
	Checkbox, CellButton} from "@vkontakte/vkui";
	import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
	import Icon24Done from '@vkontakte/icons/dist/24/done';





const ROUTES = {
	MAINAPP: 'mainapp',
	INTRO: 'intro',
};

const STORAGE_KEYS = {
	GROUP: 'group',
	STATUS: 'viewStatus',
};
const App = () => {
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [group,setGroup]=useState({})
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(null);

	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedState, setFetchedState] = useState(null);

	useEffect(() => {
	
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value =  'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
				// console.log(data)
			}		
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const rasp = await bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEYS.GROUP, STORAGE_KEYS.STATUS]});
			if (Array.isArray(rasp.keys)) {
				const data = {};
				rasp.keys.forEach(({ key, value }) => {
					try {
						data[key] = value ? JSON.parse(value) : {};
						console.log(key)
						switch (key) {
							case STORAGE_KEYS.GROUP:
								setFetchedState(data[STORAGE_KEYS.GROUP]);
								
								break;
							case STORAGE_KEYS.STATUS:
								console.log(data[key])
								if (data[key] && data[key].hasSeenIntro) {
									setActivePanel(ROUTES.MAINAPP);
									setUserHasSeenIntro(true);
								}
								break;
							default:
								break;
						}
					} catch (error) {
						setSnackbar(<Snackbar
							layout='vertical'
							onClose={() => setSnackbar(null)}
							before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
							duration={900}
						>
							Проблема с получением данных из Storage
						</Snackbar>
						);
						setFetchedState({});
					}
				});
				
			} else {
				setFetchedState({});
			}
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	const viewIntro = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					hasSeenIntro: true,
				}),
			});
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.GROUP,
				value: JSON.stringify({
					hasSeenIntro: true,
				}),
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
	  },
	  {
		id:1,
		subject_name:'Физика',
		text:'Сделать кр, домашку'
	},
	{
	  id:2,
	  subject_name:'Матеша',
	  text:'Практическая #2'
  },
  {
	id:1,
	subject_name:'Физика',
	text:'Сделать кр, домашку'
},
{
  id:2,
  subject_name:'Матеша',
  text:'Практическая #2'
},
	  
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
	const thematics = [
	{
		_id: '5ebfa075ceaf2810f663d343',
		course: '1',
		group_id: '02121-ДБ'
		},
		{
		_id: '5ebfa0d5ceaf2810f663d344',
		course: '1',
		group_id: '02122-ДБ'
		},
		{
		_id: '5ebfa124ceaf2810f663d345',
		course: '1',
		group_id: '02141-ДБ'
		},
		{
		_id: '5ebfa13dceaf2810f663d346',
		course: '1',
		group_id: '02161-ДБ'
		},
		{
		_id: '5ebfa155ceaf2810f663d347',
		course: '1',
		group_id: '02171-ДБ'
		},
		{
		_id: '5ebfa167ceaf2810f663d348',
		course: '1',
		group_id: '02172-ДБ'
		},
		{
		_id: '5ebfa17fceaf2810f663d349',
		course: '1',
		group_id: '02173-ДБ'
		},
		{
		_id: '5ebfd0a67257c6154c5e748a',
		course: '2',
		group_id: '02221-ДБ'
		},
		{
		_id: '5ebfd0c27257c6154c5e748b',
		course: '2',
		group_id: '02222-ДБ'
		},
		{
		_id: '5ebfd0df7257c6154c5e748c',
		course: '2',
		group_id: '02241-ДБ'
		},
		{
		_id: '5ebfd0f07257c6154c5e748d',
		course: '2',
		group_id: '02242-ДБ'
		},
		{
		_id: '5ebfd1367257c6154c5e748f',
		course: '2',
		group_id: '02261-ДБ'
		},
		{
		_id: '5ebfd1447257c6154c5e7490',
		course: '2',
		group_id: '02271-ДБ'
		},
		{
		_id: '5ebfd3067257c6154c5e7491',
		course: '3',
		group_id: '02311-ДБ'
		},
		{
		_id: '5ebfd3167257c6154c5e7492',
		course: '3',
		group_id: '02321-ДБ'
		},
		{
		_id: '5ebfd3287257c6154c5e7493',
		course: '3',
		group_id: '02322-ДБ'
		},
		{
		_id: '5ebfd33c7257c6154c5e7494',
		course: '3',
		group_id: '02341-ДБ'
		},
		{
		_id: '5ebfd3657257c6154c5e7495',
		course: '3',
		group_id: '02361-ДБ'
		},
		{
		_id: '5ebfd37c7257c6154c5e7496',
		course: '3',
		group_id: '02371-ДБ'
		},
		{
		_id: '5ebfd3ac7257c6154c5e7499',
		course: '4',
		group_id: '02411-ДБ'
		},
		{
		_id: '5ebfd3bf7257c6154c5e749a',
		course: '4',
		group_id: '02422-ДБ'
		},
		{
		_id: '5ebfd3d67257c6154c5e749b',
		course: '4',
		group_id: '02421-ДБ'
		},
		{
		_id: '5ebfd3e67257c6154c5e749c',
		course: '4',
		group_id: '02441-ДБ'
		},
		{
		_id: '5ebfd3f47257c6154c5e749d',
		course: '4',
		group_id: '02461-ДБ'
		},
		{
		_id: '5ebfd4117257c6154c5e749e',
		course: '4',
		group_id: '02471-ДБ'
		},
		{
		_id: '5ebfda577257c6154c5e749f',
		course: '5',
		group_id: '02121-ДМ'
		},
		{
		_id: '5ebfda6d7257c6154c5e74a0',
		course: '5',
		group_id: '02161-ДМ'
		},
		{
		_id: '5ebfda897257c6154c5e74a1',
		course: '6',
		group_id: '02211-ДМ'
		},
		];




	function handleClick(thematic) { 
		setGroup({group:thematic.group_id})
		setStorage(thematic.group_id)
		modalBack()

	}
	function setStorage(key){
		bridge.send("VKWebAppStorageSet", {"key": "group", "value": `${key}`})
		.then(
			e => console.log({...e})
		) 
		
	}

	function getStorage() {
		bridge.send("VKWebAppStorageGet", {"keys": ["group"]})
		.then(
			e => console.log({...e})
		) 
	}

const MODAL_PAGE_FILTERS = 'filters';
const [activeModal,setModal]=useState(null);
const [activeStory, setActiveStory]= useState('intro')
const [modalHistory,setModalHistory]=useState([]);
const [search,setSearch]=useState('')
const  new_thematic  = (list, search) =>  {
	return list.filter(({group_id}) => group_id.toLowerCase().indexOf(search.toLowerCase()) > -1);
}
const list  = new_thematic(thematics, search)

function  onChange (e) {
	setSearch(e.target.value); 
}



function setActiveModal (activeModal) {
	activeModal = activeModal || null;
	let history = modalHistory ? [...modalHistory] : [];

	if (activeModal === null) {
history = [];
	} else if (history.indexOf(activeModal) !== -1) {
history = history.splice(0, history.indexOf(activeModal) + 1);
	} else {
history.push(activeModal);
	}

	setModal(activeModal)
	setModalHistory(modalHistory)
}


const modalBack = () => {
	setActiveModal(modalHistory[modalHistory.length - 2]);
};

const modal = (
	<ModalRoot
	activeModal={activeModal}
	onClose={ modalBack}
	>
	<ModalPage
	id={MODAL_PAGE_FILTERS}
	onClose={modalBack}
	header={
		<ModalPageHeader
		left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
		right={<PanelHeaderButton onClick={ modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
		>
		Группы
		</ModalPageHeader>
	}
	>

	<Search value={search} onChange={onChange} after={null}/>
	{list.length != 0 ? 
		<List>
			{list.map(thematic => 
				<CellButton key={thematic.id} onClick={() => handleClick(thematic)}>
					{thematic.group_id}
				</CellButton>)}
		</List> : 
	null
	}

	</ModalPage>
	</ModalRoot>
);

{/* <View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedState={fetchedState} snackbarError={snackbar} />
			<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro} route={ROUTES.HOME} userHasSeenIntro={userHasSeenIntro} />
		</View> */}

	return(
	<Root modal={modal}>
	<Epic activeStory={activeStory} tabbar={
    <Tabbar>

	<TabbarItem
	label={dl.length}
	onClick={() => setActiveStory('deadline')}
	selected={activeStory === 'deadline'}
	data-story="deadline"
	text="Дедлайны"
	><Icon28FireOutline /></TabbarItem>

	<TabbarItem
	onClick={() => setActiveStory('schedule')}
	selected={activeStory === 'schedule'}
	data-story="schedule"
	text="Расписание"
	><Icon28CalendarOutline /></TabbarItem>
	
	<TabbarItem
        onClick={() => setActiveStory('out')}
        selected={activeStory === 'out'}
        data-story="out"
        text="Отделы ИГУ"
      ><Icon28Place /></TabbarItem>

    </Tabbar>
  }>	
		<ViewApp id='out' activePanel='out' title={'Отделы ИГУ'} setActiveModal={() => setActiveModal(MODAL_PAGE_FILTERS)}>
  			<Depart title={'Профком'}  id='prof' activePanel='prof'/>
  			<Depart title={'Библиотека'}  id='lib' activePanel='lib'/>
			<Depart title={'Профком'}  id='prof' activePanel='prof'/>
  			<Depart title={'Библиотека'}  id='lib' activePanel='lib'/>
			<Depart title={'Профком'}  id='prof' activePanel='prof'/>
  			<Depart title={'Библиотека'}  id='lib' activePanel='lib'/>
			<Depart title={'Профком'}  id='prof' activePanel='prof'/>
  			<Depart title={'Библиотека'}  id='lib' activePanel='lib'/>
		</ViewApp>

		<ViewApp id='schedule' activePanel='schedule' title={group.group} setActiveModal={() => setActiveModal(MODAL_PAGE_FILTERS)}>
			<Schedule day={ getWeekDay()} group={group} />
		</ViewApp>
		
		<ViewApp id='deadline' activePanel='deadline' title={'Дедлайны'} setActiveModal={() => setActiveModal(MODAL_PAGE_FILTERS)}>
			<Deadline dl={dl} dlEnd={dlEnd} setActiveModal={() => setActiveModal(MODAL_PAGE_DEADLINE)}/>
		</ViewApp>
		
		<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro} route={ROUTES.MAINAPP} userHasSeenIntro={userHasSeenIntro} setActiveModal={() => setActiveModal(MODAL_PAGE_FILTERS)}/>
		

	</Epic>


	{/* <View activePanel={activePanel} popout={popout}>
			<MainApp id={ROUTES.MAINAPP} fetchedState={fetchedState} group={group}/>
	</View>	

	</Epic> */}
	</Root>
	)
}
 

export default App;

