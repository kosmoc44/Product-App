import React from 'react'
import './search.scss'
import input from '/src/assets/img/search.svg'
import close from '/src/assets/img/close.svg'
import { SearchContext } from "../../../App"
import Input from '@mui/material/Input';

const Search = () => {
    const { setSearchValue, searchValue, setCurentPage } = React.useContext(SearchContext)


    return (
        <div className="search">
            <img className="search-icon" src={input} alt="" />
            <Input
                className="search-input"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Поиск товаров..."
            />
            {
                searchValue && (
                    <img onClick={() => setSearchValue('')} className="search-close" src={close} alt="" />
                )
            }
        </div>
    )
}

export default Search
