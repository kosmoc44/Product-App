import React, { useEffect, useState } from 'react'
import Buttons from "../../buttons/Buttons"
import '../../buttons/buttons.scss'
import { SearchContext } from "../../../App"
import { Toaster } from "sonner"

const Phones = () => {
    const { addBasket, basket, plusOneBasket, minusOneBasket, sort, setSort, searchValue, handleByClick } = React.useContext(SearchContext)

    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category/mobile-accessories')
                const data = await response.json()
                setCards(data.products)
                console.log(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchCards()
    }, [])

    const filterCard = cards.filter(card =>
        card.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <>
            <Buttons />
            <div className="cards container">
                {filterCard
                    .sort((a, b) => {
                        if (sort === 'price') {
                            return b.price - a.price
                        } else if (sort === 'name') {
                            return a.title.localeCompare(b.title)
                        } else if (sort === 'amount') {
                            return b.stock - a.stock
                        } else {
                            return 0;
                        }

                    })
                    .map((card) => (
                        <div key={card.id} className="card">
                            <div className="card__img">
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
                            </div>
                            {
                                basket.findIndex(product => product.id === card.id) > -1
                                    ? <div className="card__buy">
                                        <button type="button" onClick={() => minusOneBasket(card.id)}>
                                            -
                                        </button>
                                        <p>
                                            {card.price}$
                                        </p>
                                        <button onClick={() => plusOneBasket(card.id)} type="button" >
                                            +
                                        </button>
                                        <div className="card__cirlce">
                                            {basket.find(product => product.id === card.id).count}
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <Toaster position="bottom-right" expand={false} richColors />
                                        <button type="button" onClick={() => handleByClick(card)}>
                                            Купить
                                        </button>
                                    </>
                            }
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Phones
