import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import Icon36Article from '@vkontakte/icons/dist/36/article';

import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';
import Schedule from './panels/Schedule';
import Deadline from './panels/deadline';

// import Tab from './panels/tab';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import {
	ModalPage,
	Root,
	Cell,
	List,
	Panel,
	PanelHeader,IS_PLATFORM_IOS,IS_PLATFORM_ANDROID,
	Epic,Tabbar,TabbarItem, ModalRoot,ModalCard,ModalPageHeader,
	PanelHeaderButton,Button,SelectMimicry,FormLayoutGroup,Radio,Input
	,Checkbox,Textarea,FormLayout,UsersStack,InfoRow} from "@vkontakte/vkui";
	import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
	import Icon24Done from '@vkontakte/icons/dist/24/done';
	import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';


const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
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
	STATE: 'state',
	STATUS: 'viewStatus',
};
const group = {group: '02461-ДБ'};
const App = () => {
	const [activePanel, setActivePanel] = useState('schedule');
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);

	const [activeModal,setModal]=useState(null);
	const [modalHistory,setModalHistory]=useState([]);

	const [activeStory, setActiveStory]= useState('discover')

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
	// const modal = (
	// 	<ModalRoot activeModal={activeModal}>
	// 	  <ModalPage id="select">

	// 	  </ModalPage>
	// 	  <ModalCard id="faq">

	// 	  </ModalCard>
	// 	</ModalRoot>
	//   );
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
		  //activeModal={this.state.activeModal}
		//   onClose={this.modalBack}
		>
		  <ModalPage
			id={MODAL_PAGE_FILTERS}
			onClose={modalBack}
			header={
			  <ModalPageHeader
				left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
				right={<PanelHeaderButton onClick={ modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
			  >
				Фильтры
			  </ModalPageHeader>
			}
		  >
			<FormLayout>
			  <FormLayoutGroup>
				<Button mode="secondary" onClick={() =>  setActiveModal(MODAL_PAGE_COUNTRIES)} size="xl">Выбор страны</Button>
				<Button mode="secondary" onClick={() =>  setActiveModal(MODAL_PAGE_STORY_FEEDBACK)} size="xl">Просмотры истории</Button>
				<Button mode="secondary" onClick={() =>  setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>
			  </FormLayoutGroup>
  
			  <SelectMimicry top="Страна" placeholder="Выбрать страну" onClick={() =>  setActiveModal(MODAL_PAGE_COUNTRIES)} />
			  <SelectMimicry top="Город" placeholder="Выбрать город" disabled />
  
			  <FormLayoutGroup top="Пол">
				<Radio name="sex" value={0} defaultChecked>Любой</Radio>
				<Radio name="sex" value={1}>Мужской</Radio>
				<Radio name="sex" value={2}>Женский</Radio>
			  </FormLayoutGroup>
  
			  <SelectMimicry top="Школа" placeholder="Выбрать школу" disabled />
			  <SelectMimicry top="Университет" placeholder="Выбрать университет" disabled />
  
			  <FormLayoutGroup top="Дополнительно">
				<Checkbox>С фотографией</Checkbox>
				<Checkbox>Сейчас на сайте</Checkbox>
			  </FormLayoutGroup>
  
			  <FormLayoutGroup top="Работа">
				<Input placeholder="Место работы" />
				<Input placeholder="Должность" />
			  </FormLayoutGroup>
  
			  <FormLayoutGroup top="Дата рождения">
				<SelectMimicry placeholder="День рождения" disabled />
				<SelectMimicry placeholder="Месяц рождения" disabled />
				<SelectMimicry placeholder="Год рождения" disabled />
			  </FormLayoutGroup>
			</FormLayout>
		  </ModalPage>
  
		  <ModalPage
			id={MODAL_PAGE_COUNTRIES}
			header={
			  <ModalPageHeader
				left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
				right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={ modalBack}><Icon24Dismiss /></PanelHeaderButton>}
			  >
				Выберите страну
			  </ModalPageHeader>
			}
			settlingHeight={80}
		  >
			<FormLayout>
			  <Button mode="secondary" onClick={() =>  setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>
  
			  {/* <FormLayoutGroup>
				{importantCountries.map(({ id, title }) => {
				  return (
					<Radio key={id} name="country" value={id}>{title}</Radio>
				  );
				})}
			  </FormLayoutGroup> */}
			</FormLayout>
		  </ModalPage>
  
		  <ModalPage
			id={MODAL_PAGE_STORY_FEEDBACK}
			header={
			  <ModalPageHeader
				left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
				right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={ modalBack}><Icon24Dismiss /></PanelHeaderButton>}
			  >
				Просмотры истории
			  </ModalPageHeader>
			}
			settlingHeight={80}
		  >
			<List>
			  {/* {this.users.map((user) => {
				return (
				  <Cell
					before={<Avatar src={user.photo_100} />}
					key={user.id}
				  >{user.name}</Cell>
				);
			  })} */}
			</List>
		  </ModalPage>
  
		  <ModalPage
			id={MODAL_PAGE_USER_INFO}
			header={
			  <ModalPageHeader
				left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={ modalBack}><Icon24Cancel /></PanelHeaderButton>}
				right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={ modalBack}><Icon24Dismiss /></PanelHeaderButton>}
			  >
				Информация о пользователе
			  </ModalPageHeader>
			}
		  >
			<List>
			  <Cell>
				<InfoRow header="Дата рождения">
				  30 января 1993
				</InfoRow>
			  </Cell>
			  <Cell>
				<InfoRow header="Родной город">
				  Ереван
				</InfoRow>
			  </Cell>
			  <Cell>
				<InfoRow header="Место работы">
				  Команда ВКонтакте
				</InfoRow>
			  </Cell>
			</List>
		  </ModalPage>
  
		  <ModalCard
			id={MODAL_CARD_MONEY_SEND}
			onClose={() =>  setActiveModal(null)}
			// icon={<Icon56MoneyTransferOutline />}
			header="Отправляйте деньги друзьям, используя банковскую карту"
			caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
			actions={[{
			  title: 'Попробовать',
			  mode: 'primary',
			  action: () => {
				 setActiveModal(MODAL_CARD_APP_TO_MENU);
			  }
			}]}
		  >
  
		  </ModalCard>
  
		  <ModalCard
			id={MODAL_CARD_APP_TO_MENU}
			onClose={() =>  setActiveModal(null)}
			// icon={<Avatar mode="app" src={getAvatarUrl('app_zagadki', 200)} size={72} />}
			header="Добавить игру «Загадки детства» в меню?"
			caption="Игра появится под списком разделов на экране меню и будет всегда под рукой."
			actions={[{
			  title: 'Добавить в меню',
			  mode: 'primary',
			  action: () => {
				 setActiveModal(MODAL_CARD_ABOUT);
			  }
			}
			]}
		  />
  
		  <ModalCard
			id={MODAL_CARD_ABOUT}
			onClose={() =>  setActiveModal(null)}
			header="Расскажите о себе"
			actions={[
			  {
				title: 'Сохранить',
				mode: 'primary',
				action: () => {
				   setActiveModal(MODAL_CARD_NOTIFICATIONS);
				}
			  }
			]}
		  >
			<Textarea defaultValue={'В Грузии'} />
		  </ModalCard>
  
		  <ModalCard
			id={MODAL_CARD_NOTIFICATIONS}
			onClose={() =>  setActiveModal(null)}
			// icon={<Icon56NotificationOutline />}
			header="Приложение запрашивает разрешение на отправку Вам уведомлений"
			actions={[{
			  title: 'Запретить',
			  mode: 'secondary',
			  action: () =>  setActiveModal(MODAL_CARD_CHAT_INVITE)
			}, {
			  title: 'Разрешить',
			  mode: 'primary',
			  action: () =>  setActiveModal(MODAL_CARD_CHAT_INVITE)
			}]}
		  />
  
		  <ModalCard
			id={MODAL_CARD_CHAT_INVITE}
			onClose={() =>  setActiveModal(null)}
			// icon={<Avatar src={getAvatarUrl('chat_basketball', 200)} size={72} />}
			header="Баскетбол на выходных"
			caption="Приглашение в беседу"
			actions={[{
			  title: 'Присоединиться',
			  mode: 'primary',
			  action: () =>  setActiveModal(null)
			}, {
			  title: 'Скопировать приглашение',
			  mode: 'secondary',
			  action: () =>  setActiveModal(null)
			}]}
			actionsLayout="vertical"
		  >
			<UsersStack
			//   photos={[
			// 	getAvatarUrl('user_mm'),
			// 	getAvatarUrl('user_ilyagrshn'),
			// 	getAvatarUrl('user_lihachyov'),
			// 	getAvatarUrl('user_wayshev'),
			// 	getAvatarUrl('user_arthurstam'),
			// 	getAvatarUrl('user_xyz'),
			//   ]}
			  size="m"
			  count={3}
			  layout="vertical"
			>Алексей, Илья, Михаил<br />и ещё 3 человека</UsersStack>
		  </ModalCard>
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
</View>

<View id="deadline" activePanel='deadline'>
  <Panel id="deadline">
  <PanelHeader 
            left={<Icon36Article onClick={() => setActivePanel('panel3' )}/>}
            separator={false}
        >
            {group.group}
        </PanelHeader>
		
	<Deadline/>

	

  </Panel>
</View>
  {/* </Epic> */}
		{/* <View activePanel={activePanel} popout={popout} modal={modal}> */}
		{/* <View activePanel={activePanel} popout={popout} > */}

			 {/* <Home id={ROUTES.HOME} fetchedUser={fetchedUser} fetchedState={fetchedState} go={viewHome} route={ROUTES.HOME} /> */}
			 {/* <Schedule id={ROUTES.SCHEDULE} fetchedUser={fetchedUser} fetchedState={fetchedState} day={ getWeekDay()} group={group} go={viewSchedule} route={ROUTES.SCHEDULE} /> */}
			{/* <Tab id={ROUTES.TAB}  go={viewTab} route={ROUTES.TAB}/> */}
		{/* <Setting id={ROUTES.SELECT} fetchedState={fetchedState}/> */}
		{/* <Intro id={ROUTES.INTRO} fetchedUser={fetchedUser}  go={viewIntro} route={ROUTES.HOME} userHasSeenIntro={userHasSeenIntro} /> */}
		{/* </View> */}
		 </Epic>
</Root>
	);
}

export default App;

