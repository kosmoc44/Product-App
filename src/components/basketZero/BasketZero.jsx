import React from 'react'
import './basketZero.scss'
import frame from "/src/assets/img/Frame.svg"
import { SearchContext } from "../../App"


const BasketZero = () => {
  const { show, setShow } = React.useContext(SearchContext)

  return (
    <div style={{ display: show ? 'flex' : 'none' }} className="basketZero">
      <div className="basketZero__blcok">
        <img src={frame} alt="" className="basketZero__icon" />
        <h2 className="basketZero__title">
          Корзина Пустая
        </h2>
        <span onClick={() => setShow(false)} className="basketZero__exit">
          X
        </span>
      </div>
    </div>
  )
}

export default BasketZero
