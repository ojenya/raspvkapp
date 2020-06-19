import React, { useState, useEffect, Fragment} from 'react';
import bridge from '@vkontakte/vk-bridge';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import ListGroup from './components/ListGroup';
import Schedule from './components/Schedule/Schedule';
import ViewApp from './components/ViewApp';
import Depart from './components/Depart';
import Deadline from './components/Deadlines';
import Intro from './components/Intro';



import {getWeekDay} from './helpers/getWeekDay'
import './components/Settings/setting.css'
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import {
	ModalPage,
	Root,Search,Snackbar,Avatar,
	List,ScreenSpinner,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalPageHeader,
	PanelHeaderButton, CellButton} from "@vkontakte/vkui";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';


const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_DEADLINE = 'deadline';



// const ROUTES = {
// 	HOME: 'home',
// 	INTRO: 'intro',
// 	SETTING: 'setting',
// 	SCHEDULE: 'schedule',
// 	TAB: 'tab'
// };

const STORAGE_KEYS = {
	GROUP: 'group',
	STATUS: 'viewStatus',
};

const App = () => {
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
  const thematic = [
	{
	_id: '5ebfa075ceaf2810f663d343',
	course: '1',
	group_id: '02121-ДБ'
	},{
		_id: '5ebfa075ceaf2810f663d343',
		course: '1',
		group_id: '02121-ДБ'
		},
  ]


	
	// const [activePanel, setActivePanel] = useState();
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [activeTab, setActiveTab]= useState('Активные')
	const [activeModal,setModal]=useState(null);
	const [modalHistory,setModalHistory]=useState([]);
	const [activeStory, setActiveStory]= useState('schedule')
	const [group,setGroup]=useState({})


	const [search,setSearch]=useState('')
	

	

	function  onChange (e) {
		setSearch(e.target.value); 
	}
	function handleClick(thematic) { 
		setGroup({group:`${thematic.group_id}`})
		setStorage(thematic.group_id)
		modalBack()
		setUserHasSeenIntro(true)
		setIntro()

	}
	
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
			const hasSeenIntro = await bridge.send("VKWebAppStorageGet", {"keys": [STORAGE_KEYS.GROUP, STORAGE_KEYS.STATUS]})
			if (Array.isArray(hasSeenIntro.keys)) {
				hasSeenIntro.keys.forEach(({ key, value }) => {
					try {
						switch (key) {
							case STORAGE_KEYS.GROUP:
								setGroup({group:`${value}`});
								break;
							case STORAGE_KEYS.STATUS:
								if (value.includes('true') ) {
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
					
				} 
				else {
					setFetchedState({});
				}
				setUser(user);
				setPopout(null);
			}
			fetchData();
		}, []);

	// const go = panel => {
	// 	setActivePanel(panel);
	// };
	function setActiveModal (activeModal) {
		activeModal = activeModal || null;
		let history = modalHistory ? [...modalHistory] : [];
	
			if (activeModal === null) {
				history = [];
			} 
			else if (history.indexOf(activeModal) !== -1) {
				history = history.splice(0, history.indexOf(activeModal) + 1);
			} 
			else {
				history.push(activeModal);
			}
	
		setModal(activeModal)
		setModalHistory(modalHistory)
	}

	
	function setStorage(key){
		bridge.send("VKWebAppStorageSet", {"key": "group", "value": `${key}`})
		.then(
			e => console.log({...e})
		) 
		
	}
	function setIntro(){
		bridge.send("VKWebAppStorageSet", {"key": "viewStatus", "value": "true"})
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

	const modalBack = () => {
		setActiveModal(modalHistory[modalHistory.length - 2]);
	};
	

	
	const modal = (
		<ModalRoot
		activeModal={activeModal}
		onClose={ modalBack}
		>
		<ModalPage 
		dynamicContentHeight
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
	
		<Search value={search} onChange={onChange} />
{/* 		
		{search == 0 ? 
		<Div className='searchAll'>
		<img className='search' src="/search-icon.png" /> 
		<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>Найти свою группу очень просто</Caption>
		<Caption level="2" weight="regular"  style={{ marginBottom: 16 }}>Просто начни вводить номер группы и выбери свою :)</Caption>
		</Div>
		:
			<List>
				{list.map(thematic => 
					<CellButton key={thematic.id} onClick={() => handleClick(thematic)}>
						{thematic.group_id}
					</CellButton>)}
			</List> 
		
		} */}
		{/* {list.length != 0 ? 
			<List>
				{list.map(thematic => 
					<CellButton key={thematic.id} onClick={() => handleClick(thematic)}>
						{thematic.group_id}
					</CellButton>)}
			</List> : 
		null
		} */}
		<ListGroup handler={handleClick} search={search}/>



		</ModalPage>

		<ModalPage
		id={MODAL_PAGE_DEADLINE}
		onClose={modalBack}
		header={
			<ModalPageHeader
			left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
			right={<PanelHeaderButton onClick={ modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
			>
			Дедлайн
			</ModalPageHeader>
		}
		>
			{/* <List
				className="deadline_list"
				onClick={() => setActiveModal(MODAL_PAGE_DEADLINE)}>
					{dl.map(dead =>
					{
						return (
							<Fragment>
								<Cell key={dead.id}>{dead.subject_name} </Cell>
								<Cell key={`${dead.id}1`}>{dead.text}</Cell>
							</Fragment>
							)
					})
				}
			</List> */}
		</ModalPage>
		</ModalRoot>
	);
	
	const content = (userHasSeenIntro === false ? <Intro fetchedUser={fetchedUser} userHasSeenIntro={userHasSeenIntro} setActiveModal={() => setActiveModal(MODAL_PAGE_FILTERS)}></Intro> : 
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
			</Epic>)


	return ( 
		
<Root modal={modal}> 
	{content}
</Root>
	);
}

export default App;
