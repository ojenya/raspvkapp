import React,{ useState, useEffect} from 'react';
import {List, CellButton} from "@vkontakte/vkui";




const ListGroup = (props) => {
    const {handler, search} = props
    const [thematics, setThematics] = useState([])

    useEffect(()=> {
        fetch('https://raspmath.herokuapp.com/group')
            .then(e => e.json())
            .then(body =>  setThematics(body.group))

    },[])

    const  filterSearch = (list, search) =>  {
        if(search === '') {
            return list
        }
        return list.filter(({ group_id }) => group_id.toLowerCase().indexOf(search.toLowerCase()) > -1);
   }
   
    const list  = filterSearch(thematics, search);
    let render = <CellButton>{'Начни вводить'}</CellButton>
    if(!!list.length) {
        render = list.map(i => {
            return (
                <CellButton key={i.id} onClick={() => handler(i)}>
                    {i.group_id}
                </CellButton>
            )
        });
    } else {
    render = <CellButton>{'Ничего не найдено'}</CellButton>
    }
        

    return (
    <List>
        { render }
    </List>
    )
}

export default ListGroup