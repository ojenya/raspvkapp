import React from 'react'
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import Icon36Article from '@vkontakte/icons/dist/36/article';

export const ViewApp = (props)=>{

 
    const  { children, id, activePanel, group,title, setActiveModal} = props
    
    return (

        <View id={id} activePanel={activePanel}>
			<Panel id={id}>
				<PanelHeader 
						left={<Icon36Article onClick={() => setActiveModal()}/>}
						separator={false}
					>
						{title}
				</PanelHeader>
                {children}
			</Panel>
		</View>

    )
}

