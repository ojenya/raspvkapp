import React, { useState, useEffect, Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import Icon36Article from '@vkontakte/icons/dist/36/article';
import "./components/setting.css"
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import '@vkontakte/vkui/dist/vkui.css';
import {getWeek} from './components/Service' 
// import apiGetGroup from './components/getGroup' 

import Home from './panels/Home';
import Intro from './panels/Intro';
import Schedule from './panels/Schedule';
import Deadline from './panels/deadline';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
// import Tab from './panels/tab';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import {
	ModalPage,
	Root,Search,
	Cell,CardGrid,Card,Div,Text,
	List,Tabs,HorizontalScroll,TabsItem,
	Panel,
	PanelHeader,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalCard,ModalPageHeader,
	PanelHeaderButton,Button,SelectMimicry,FormLayoutGroup,Radio,Input
	,Checkbox,Textarea,FormLayout,UsersStack,InfoRow, CellButton} from "@vkontakte/vkui";
	import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
	import Icon24Done from '@vkontakte/icons/dist/24/done';
	import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';


const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_DEADLINE = 'deadline';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';

const MODAL_CARD_MONEY_SEND = 'money-send';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';


const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	SETTING: 'setting',
	SCHEDULE: 'schedule',
	TAB: 'tab'
};

const STORAGE_KEYS = {
	GROUP: 'group',
	STATUS: 'viewStatus',
};

const App = () => {

	const [activeTab, setActiveTab]= useState('Активные')
   
    const dl = [
        {
            id:1,
            subject_name:'Физика',
            text:'Сделать кр, упражнея афыаф ыаыфаыыаыаф фыафыафыаыфафыафыа фыафыафыафы'
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
	const [activePanel, setActivePanel] = useState();
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);

	const [activeModal,setModal]=useState(null);
	const [modalHistory,setModalHistory]=useState([]);

	const [activeStory, setActiveStory]= useState('schedule')
	const [group,setGroup]=useState({group: '02461-ДБ'})

	const [search,setSearch]=useState('')
	
	const  new_thematic  = (list, search) =>  {
		return list.filter(({group_id}) => group_id.toLowerCase().indexOf(search.toLowerCase()) > -1);
	}
	const list  = new_thematic(thematics, search)

	function  onChange (e) {
		setSearch(e.target.value); 
	}

    function goSearch () { 
		setActivePanel('search'); 
	}
    function hideModal() { 
		setActiveModal( null ); 
	}
	function handleClick(thematic) { 
		setGroup({group:thematic.group_id})
		modalBack()
	}


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

		
	};
	const viewHome = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
			});
			go(panel);
		} catch (error) {
	
		}
	}
	const viewSchedule = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
			});
			go(panel);
		} catch (error) {
			// setSnackbar(<Snackbar
			// 	layout='vertical'
			// 	onClose={() => setSnackbar(null)}
			// 	before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
			// 	duration={900}
			// >
			// 	Проблема с отправкой данных в Storage
			// </Snackbar>
			// );
		}
	}
	const viewTab = async (panel) => {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
			});
			go(panel);
		} catch (error) {
			
			
		}
	}
	const viewIntro = async (panel) => {
		try {
			// await bridge.send('VKWebAppStorageSet', {
			// 	key: STORAGE_KEYS.STATUS,
			// 	value: JSON.stringify({
			// 		hasSeenIntro: true,
			// 	}),
			// });
			go(panel);
		} catch (error) {
			console.log(error)
		}
	}

    function getWeekDay (){
		let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let date = new Date()
		let day = {day: days[date.getDay()]};
        return day

	};
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
	

	return (
		
<Root modal={modal}> 
<Epic activeStory={activeStory} tabbar={
    <Tabbar>
      <TabbarItem
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
		<View id="schedule" activePanel='schedule'>
			<Panel id="schedule">
				<PanelHeader 
						left={<Icon36Article onClick={() => setActiveModal(MODAL_PAGE_FILTERS)}/>}
						separator={false}
					>
						{group.group}
				</PanelHeader>

				<Schedule id={ROUTES.SCHEDULE} fetchedUser={fetchedUser} fetchedState={fetchedState} day={ getWeekDay()} group={group} go={viewSchedule} route={ROUTES.SCHEDULE} />

			</Panel>

			{/* <Panel id="search"/> */}
		</View>

		<View id="deadline" activePanel='deadline'>
  <Panel id="deadline">
  <PanelHeader 
            left={<Icon36Article onClick={() => setActiveModal(MODAL_PAGE_FILTERS)}/>}
            separator={false}
        >
            {group.group}
        </PanelHeader>

		
	{/* <Deadline/> */}

	
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
        <Card size="l" className="deadline_card">
          <Div className="deadline_check">
		  <Checkbox/>
		  </Div>
		
           <List className="deadline_list" onClick={() => setActiveModal(MODAL_PAGE_DEADLINE)}>{dl.map(dead =><Fragment><Cell key={dead.id}>{dead.subject_name} </Cell><Cell>{dead.text}</Cell></Fragment>)}</List>

          
        </Card>
      </CardGrid>
        :
        <CardGrid>
        <Card size="l">
          <Div style={{ height: 96 }} />
        </Card>
      </CardGrid>
        }
       
      

	

  </Panel>
</View>
	</Epic>
</Root>
	);
}

export default App;

