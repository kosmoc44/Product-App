import React, { useContext } from 'react'
import './basket.scss'
import { Link } from 'react-router-dom';
import { SearchContext } from "../../../App";


const Basket = () => {
    const { plusOneBasket, minusOneBasket, delBasket, basket } = React.useContext(SearchContext)

    const totalPrice = basket.reduce((total, card) => total + (card.price * card.count), 0)

    return (
        <div className="basket">
            <div className="container wrapper">
                <Link to="/"><button className="basket__back">К выбору товара</button></Link>
                <div className="basket__top">
                    <h1 className="basket__title">Корзина</h1>
                    <p className="basket__count">(В корзине {basket.length} товара)</p>
                </div>
                <ul className="basket__list">
                    {basket.map((card) => (
                        <li key={card.id} className="basket__item">
                            <div className="basket__img-title">
                                <img src={card.thumbnail} alt="" />
                                {card.title}
                            </div>
                            <div className="basket__item-right">
                                <div className="basket__item-count">
                                    <button className="basket__item-min" onClick={() => minusOneBasket(card.id)} type="button">-</button>
                                    <span className="basket__item-num">{card.count}</span>
                                    <button className="basket__item-plus" onClick={() => plusOneBasket(card.id)} type="button">+</button>
                                </div>
                                <p className="basket__item-price">{(card.price * card.count).toFixed(2)}$</p>
                                <button className="basket__item-del" onClick={() => delBasket(card.id)}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="total-price">
                    <h2 className="total-count">Общая цена: {totalPrice.toFixed(2)} $ </h2>
                    <button className="total-btn">Купить</button>
                </div>
            </div>
        </div>
    )
}

export default Basket
