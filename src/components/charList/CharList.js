import React from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


const CharList = (props) => {
    const [charList, setCharList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [newItemLoading, setNewItemLoading] = React.useState(false)
    const [offset, setOffset] = React.useState(210)

    const marvelService = new MarvelService();

    React.useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList])
        setLoading(false)
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
    }

    const onError = () => {
        setError(true)
        setLoading(false)

    }

    const itemRefs = React.useRef([])

    const focusOfItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li ref={el => itemRefs.current[i] = el} className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOfItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li >
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
                <div
                    className="inner"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}>load more</div>
            </button>
        </div>
    )
}

export default CharList;