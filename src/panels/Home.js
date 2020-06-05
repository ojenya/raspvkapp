import React,{useState, Fragment} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

// import { Setting } from '../components/Setting';
import {FormLayout,Separator,Div,Header,Button,Select, Textarea, Root} from "@vkontakte/vkui";
import {TabsItem,CellButton,PanelHeader,HorizontalScroll,PanelHeaderBack,PanelHeaderButton,Group,PanelHeaderContext,Counter,Cell,List, Search,Tabs} from "@vkontakte/vkui";

import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import './Home.css';
import  Setting from '../components/Settings/Setting';


const Home = ({ id, snackbarError, fetchedState,day,group }) => {
	const [activePanel, setActivePanel]= useState('panel1')
	const [activeView, setactiveView]= useState('view1')
  const [contextOpened, setContextOpened]= useState(false)
  const [mode, setMode]= useState('all')
  const [activeTab1, setActiveTab1]= useState('recomendations')
  const [activeTab2, setActiveTab2]= useState('music')
  const [activeTab3, setActiveTab3]= useState('news')
  const [activeTab4, setActiveTab4]= useState('all')
  const [activeTab5, setActiveTab5]= useState('all')


  const [activeModal,setActiveModal]=useState(null)
  const [modalHistory,setModalHistory]=([])

  function select() {
	setMode({ mode: false });
	setContextOpened({contextOpened: false});
  }

const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';

const MODAL_CARD_MONEY_SEND = 'money-send';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';


	return (

<Root activeView={activeView}>
<View activePanel={activePanel} id="view1">
          <Panel id='panel1'>
            <PanelHeader
              left={<PanelHeaderButton><Icon28CameraOutline /></PanelHeaderButton>}
              right={<PanelHeaderButton><Icon28AddOutline /></PanelHeaderButton>}
              separator={false}
            >
              <Tabs>
                <TabsItem
                  onClick={() => {
                    if (activeTab1 === 'news') {
                      setContextOpened( !contextOpened );
                    }
                    setActiveTab1('news')
                  }}
                  selected={activeTab1 === 'news'}
                  after={<Icon16Dropdown fill="var(--accent)" style={{
                    transform: `rotate(${contextOpened ? '180deg' : '0'})`
                  }}/>}
                >
                  Новости
                </TabsItem>
                <TabsItem
                  onClick={() => {
					setActiveTab1( 'recomendations')
					setContextOpened(false)
                  }}
                  selected={activeTab1 === 'recomendations'}
                >
                  Интересное
                </TabsItem>
              </Tabs>
            </PanelHeader>
            <PanelHeaderContext
              opened={contextOpened}
              onClose={() => { setContextOpened(false) }}
            >
              <List>
                <Cell
                  before={<Icon28UsersOutline />}
                  asideContent={setMode === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
                  onClick={select}
                  data-mode="all"
                >
                  Communities
                </Cell>
                <Cell
                  before={<Icon28SettingsOutline />}
                  asideContent={setMode === 'managed' ? <Icon24Done fill="var(--accent)" /> : null}
                  onClick={select}
                  data-mode="managed"
                >
                  Managed Communities
                </Cell>
              </List>
            </PanelHeaderContext>
            <CellButton onClick={() => setActivePanel( 'panel2' )}>Под шапкой</CellButton>
          </Panel>
          <Panel id="panel2">
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setActivePanel( 'panel1' )}/>}
              separator={false}
            >
              <Search />
            </PanelHeader>
            <Tabs>
              <TabsItem
                onClick={() => setActiveTab2( 'music' )}
                selected={activeTab2 === 'music'}
              >
                Моя музыка
              </TabsItem>
              <TabsItem
                onClick={() => setActiveTab2('recomendations')}
                selected={activeTab2 === 'recomendations'}
              >
                Рекомендации
              </TabsItem>
            </Tabs>
            <Group>
              <CellButton onClick={() => setActivePanel('panel3')}>Со скроллом</CellButton>
            </Group>
          </Panel>
          <Panel id="panel3">
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setActivePanel('panel2' )}/>}
              separator={false}
            >
              Новости
            </PanelHeader>
            <Tabs>
              <HorizontalScroll>
                <TabsItem
                  onClick={() => setActiveTab3('news')}
                  selected={activeTab3 === 'news'}
                >
                  Понедельник
                </TabsItem>
                <TabsItem
                  onClick={() => setActiveTab3('recomendations' )}
                  selected={activeTab3 === 'recomendations'}
                >
                  Вторник
                </TabsItem>
                <TabsItem
                  onClick={() => setActiveTab3('friends' )}
                  selected={activeTab3 === 'friends'}
                >
                  Среда
                </TabsItem>
                <TabsItem
                  onClick={() => setActiveTab3('photos' )}
                  selected={activeTab3 === 'photos'}
                >
                  Четверг
                </TabsItem>
                <TabsItem
                  onClick={() => setActiveTab3( 'groups' )}
                  selected={activeTab3 === 'groups'}
                >
                  Пятница
                </TabsItem>
              </HorizontalScroll>
            </Tabs>
            <Separator />
			<Setting/>
            <Group>
              <CellButton onClick={() => setActivePanel('panel4' )}>Табы-кнопки</CellButton>
            </Group>
          </Panel>
          <Panel id="panel4">
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setActivePanel( 'panel3' )}/>}
            >
              Кнопки
            </PanelHeader>
            <Tabs mode="buttons">
              <TabsItem
                onClick={() => setActiveTab4( 'all' )}
                selected={activeTab4 === 'all'}
              >
                Все записи
              </TabsItem>
              <TabsItem
                onClick={() => setActiveTab4( 'user' )}
                selected={activeTab4 === 'user'}
              >
                Записи Павла
              </TabsItem>
            </Tabs>
            {/* {osname === IOS && */}
            <CellButton onClick={() => setActivePanel( 'panel5' )}>Segmented (iOS only)</CellButton>
            {/* } */}
          </Panel>
          <Panel id="panel5">
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setActivePanel( 'panel4' )}/>}
              separator={false}
            >
              <Search />
            </PanelHeader>
            <Tabs mode="segmented">
              <TabsItem
                onClick={() => setActiveTab5( 'all' )}
                selected={activeTab5 === 'all'}
              >
                Все записи
              </TabsItem>
              <TabsItem
                onClick={() => setActiveTab5( 'user' )}
                selected={activeTab5 === 'user'}
                after={<Counter>3</Counter>}
              >
                Записи Павла
              </TabsItem>
            </Tabs>
          </Panel>
</View>
</Root>
		// {/* </Panel> */}
	);
};

export default Home;
