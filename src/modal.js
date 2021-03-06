const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';

const MODAL_CARD_MONEY_SEND = 'money-send';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModal: null,
      modalHistory: []
    };

    this.users = 'k'.repeat(25).split('').map(() => {
      return getRandomUser();
    });

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };
  }

  setActiveModal(activeModal) {
    activeModal = activeModal || null;
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

    if (activeModal === null) {
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
    } else {
      modalHistory.push(activeModal);
    }

    this.setState({
      activeModal,
      modalHistory
    });
  };

  render() {
    const modal = (
      <ModalRoot
        activeModal={this.state.activeModal}
        onClose={this.modalBack}
      >
        <ModalPage
          id={MODAL_PAGE_FILTERS}
          onClose={this.modalBack}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={<PanelHeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
            >
              Фильтры
            </ModalPageHeader>
          }
        >
          <FormLayout>
            <FormLayoutGroup>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} size="xl">Выбор страны</Button>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_STORY_FEEDBACK)} size="xl">Просмотры истории</Button>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>
            </FormLayoutGroup>

            <SelectMimicry top="Страна" placeholder="Выбрать страну" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} />
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
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
            >
              Выберите страну
            </ModalPageHeader>
          }
          settlingHeight={80}
        >
          <FormLayout>
            <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>

            <FormLayoutGroup>
              {importantCountries.map(({ id, title }) => {
                return (
                  <Radio key={id} name="country" value={id}>{title}</Radio>
                );
              })}
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_STORY_FEEDBACK}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
            >
              Просмотры истории
            </ModalPageHeader>
          }
          settlingHeight={80}
        >
          <List>
            {this.users.map((user) => {
              return (
                <Cell
                  before={<Avatar src={user.photo_100} />}
                  key={user.id}
                >{user.name}</Cell>
              );
            })}
          </List>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_USER_INFO}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
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
          onClose={() => this.setActiveModal(null)}
          icon={<Icon56MoneyTransferOutline />}
          header="Отправляйте деньги друзьям, используя банковскую карту"
          caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
          actions={[{
            title: 'Попробовать',
            mode: 'primary',
            action: () => {
              this.setActiveModal(MODAL_CARD_APP_TO_MENU);
            }
          }]}
        >

        </ModalCard>

        <ModalCard
          id={MODAL_CARD_APP_TO_MENU}
          onClose={() => this.setActiveModal(null)}
        //   icon={<Avatar mode="app" src={getAvatarUrl('app_zagadki', 200)} size={72} />}
          header="Добавить игру «Загадки детства» в меню?"
          caption="Игра появится под списком разделов на экране меню и будет всегда под рукой."
          actions={[{
            title: 'Добавить в меню',
            mode: 'primary',
            action: () => {
              this.setActiveModal(MODAL_CARD_ABOUT);
            }
          }
          ]}
        />

        <ModalCard
          id={MODAL_CARD_ABOUT}
          onClose={() => this.setActiveModal(null)}
          header="Расскажите о себе"
          actions={[
            {
              title: 'Сохранить',
              mode: 'primary',
              action: () => {
                this.setActiveModal(MODAL_CARD_NOTIFICATIONS);
              }
            }
          ]}
        >
          <Textarea defaultValue={'В Грузии'} />
        </ModalCard>

        <ModalCard
          id={MODAL_CARD_NOTIFICATIONS}
          onClose={() => this.setActiveModal(null)}
          icon={<Icon56NotificationOutline />}
          header="Приложение запрашивает разрешение на отправку Вам уведомлений"
          actions={[{
            title: 'Запретить',
            mode: 'secondary',
            action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
          }, {
            title: 'Разрешить',
            mode: 'primary',
            action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
          }]}
        />

        <ModalCard
          id={MODAL_CARD_CHAT_INVITE}
          onClose={() => this.setActiveModal(null)}
        //   icon={<Avatar src={getAvatarUrl('chat_basketball', 200)} size={72} />}
          header="Баскетбол на выходных"
          caption="Приглашение в беседу"
          actions={[{
            title: 'Присоединиться',
            mode: 'primary',
            action: () => this.setActiveModal(null)
          }, {
            title: 'Скопировать приглашение',
            mode: 'secondary',
            action: () => this.setActiveModal(null)
          }]}
          actionsLayout="vertical"
        >
          <UsersStack
            // photos={[
            //   getAvatarUrl('user_mm'),
            //   getAvatarUrl('user_ilyagrshn'),
            //   getAvatarUrl('user_lihachyov'),
            //   getAvatarUrl('user_wayshev'),
            //   getAvatarUrl('user_arthurstam'),
            //   getAvatarUrl('user_xyz'),
            // ]}
            size="m"
            count={3}
            layout="vertical"
          >Алексей, Илья, Михаил<br />и ещё 3 человека</UsersStack>
        </ModalCard>
      </ModalRoot>
    );

    return (
      <View activePanel="modals" modal={modal}>
        <Panel id="modals">
          <PanelHeader>Модальные окна</PanelHeader>

          <Group>
            <FormLayout>
              <Button size="xl" mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_FILTERS)}>
                  Открыть модальную страницу
              </Button>

              <Button size="xl" mode="secondary" onClick={() => this.setActiveModal(MODAL_CARD_MONEY_SEND)}>
                  Открыть модальные карточки
              </Button>
            </FormLayout>
          </Group>
        </Panel>
      </View>
    );
  }
}

<App />