import React, { useEffect, useState } from 'react';
import './discount.scss';
import { Link } from "react-router-dom";
import { SearchContext } from "../../App";
import Pagination from '@mui/material/Pagination';
import { Toaster } from "sonner";
Toaster

const Discount = () => {
    const {
        sort,
        setSort,
        searchValue,
        setSearchValue,
        currentPage,
        handlePageChange,
        totalPages,
        indexOfLastCard,
        indexOfFirstCard,
        minusOneBasket,
        plusOneBasket,
        basket,
        addBasket,
        handleByClick

    } = React.useContext(SearchContext);
    const [discount, setDiscount] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const cardsPerPage = 15;

    const sortDiscount = (event) => {
        setSelectedSort(event.target.value);
    };

    const clickSort = () => {
        setSort(selectedSort);
    };

    const fetchDiscountProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=117');
            const data = await response.json();
            const discountProducts = data.products.filter(product => product.discountPercentage > 0);
            setDiscount(discountProducts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDiscountProducts();
    }, []);

    const calculatePrice = (price, discountPercentage) => {
        return (price - (price * (discountPercentage / 100))).toFixed(2);
    };

    const filterDiscount = discount.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const currentCards = filterDiscount.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <div className="sale">
            <div className="container">
                <div className="title__div">
                    <Link to='/'><button className="sale__back">К выбору товара</button></Link>
                    <h1 className="title">Скидки</h1>
                    <div className="btns__price">
                        <select onChange={sortDiscount} className="price__list" name="" id="">
                            <option value=""> Сортировать </option>
                            <option value="sale_plus" className="price__list-item">По убыванию скидок</option>
                            <option value="sale-minus" className="price__list-item">По возрастанию скидок</option>
                        </select>
                        <button className="click" onClick={clickSort}>
                            Применить
                        </button>
                    </div>
                </div>
                <div className="items">
                    {currentCards
                        .sort((a, b) => {
                            if (sort === 'sale_plus') {
                                return b.discountPercentage - a.discountPercentage;
                            } else if (sort === 'sale-minus') {
                                return a.discountPercentage - b.discountPercentage;
                            } else {
                                return 0;
                            }
                        })
                        .map(card => {
                            const itemInBasket = basket.find(product => product.id === card.id);
                            const itemCount = itemInBasket ? itemInBasket.count : 0;
                            return (
                                <div className="card" key={card.id}>
                                    <div className="discount__img">
                                        <img src={card.thumbnail} alt="" />
                                    </div>
                                    <div className="product__inf">
                                        <h2 className="product__title">{card.title}</h2>
                                        <div className="product__price">
                                            <p className="product__price">Цена без скидки:</p>
                                            <span className="old">{card.price}$</span>
                                        </div>
                                        <span className="new">Цена со скидкой: {calculatePrice(card.price, card.discountPercentage)}$</span>
                                        <p className="product__sale">Скидка: {card.discountPercentage}%</p>
                                    </div>
                                    {
                                        itemInBasket
                                            ? <div className="card__buy">
                                                <button type="button" onClick={() => minusOneBasket(card.id)}>
                                                    -
                                                </button>
                                                <p>
                                                    {(card.price * itemCount).toFixed(2)}$
                                                </p>
                                                <button onClick={() => plusOneBasket(card.id)} type="button">
                                                    +
                                                </button>
                                                <div className="card__circle">
                                                    {itemCount}
                                                </div>
                                            </div>
                                            :
                                            <>
                                                <Toaster position="bottom-right" expand={false} richColors />
                                                <div className="buy">
                                                    <button type="button" onClick={() => handleByClick(card)}>
                                                        Купить
                                                    </button>
                                                </div>
                                            </>
                                    }
                                </div>
                            );
                        })}
                </div>
            </div>
            <Pagination
                className="pagination"
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
                color="primary"
            />
        </div>
    );
};

export default Discount;
