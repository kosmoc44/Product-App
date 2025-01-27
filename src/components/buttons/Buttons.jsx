import { SearchContext } from "../../App"
import "./buttons.scss"
import React, { useState } from 'react'

const Buttons = () => {
  const { sort, setSort, products} = React.useContext(SearchContext)

  const [listOpen, setListOpen] = useState(false)
  const [selectSort, setSelectSort] = useState("")

  const sortChange = (e) => {
    setSelectSort(e.target.value)
  }

  const applySort = () => {
    setSort(selectSort)
  }


  return (
    <div className="buttons">
      <div className="container">
        <div className="btns">
          <div className="btns__price">
            <select onChange={sortChange} className="price__list" name="" id="">
              <option value=""> Сортировать </option>
              <option value="price" className="price__list-item">По цене</option>
              <option value="name" className="price__list-item">По названию</option>
              <option value="amount" className="price__list-item">По кол-во</option>
            </select>
            <button className="click" onClick={applySort}>
              Применить
            </button>
          </div>
          <button className="amount">
            Общее кол-во товаров - {products.length}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buttons
