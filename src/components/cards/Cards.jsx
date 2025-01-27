import React from "react";
import "./cards.scss";
import { SearchContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const navigate = useNavigate();
    const {
        plusOneBasket,
        minusOneBasket,
        basket,
        currentPage,
        cardsPerPage,
        addBasket,
        sort,
        error,
        handlePageChange,
        products,
        searchValue,
        setCurrentPage,
        indexOfLastCard,
        indexOfFirstCard,
        promise,
        handleByClick
    } = React.useContext(SearchContext);

    const filterProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const currentCards = filterProducts.slice(indexOfFirstCard, indexOfLastCard);

    if (error) {
        return <div className="error">Ошибка загрузки</div>;
    }

    const handleImageClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="cards container">
            {currentCards.length === 0 ? (
                <div className="no-results">Товар не найден</div>
            ) : (
                currentCards
                    .sort((a, b) => {
                        if (sort === 'price') {
                            return b.price - a.price;
                        } else if (sort === 'name') {
                            return a.title.localeCompare(b.title);
                        } else if (sort === 'amount') {
                            return b.stock - a.stock;
                        } else {
                            return 0;
                        }
                    })
                    .map((card) => {
                        const itemInBasket = basket.find(product => product.id === card.id);
                        const itemCount = itemInBasket ? itemInBasket.count : 0;
                        return (
                            <div key={card.id} className="card">
                                <div className="card__img" onClick={() => handleImageClick(card.id)}>
                                    <img src={card.thumbnail} alt="" />
                                </div>
                                <h1 className="card__title">
                                    {card.title}
                                </h1>
                                <div className="cards__info">
                                    <p>
                                        Цена: {card.price}$
                                    </p>
                                    <p>
                                        Кол-во: {card.stock}
                                    </p>
                                    <p>
                                        Рейтинг: {card.rating}
                                    </p>
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
                                        : <button type="button" onClick={() => handleByClick(card)}>
                                            Купить
                                        </button>
                                }
                            </div>
                        );
                    })
            )}
        </div>
    );
};

export default Cards;