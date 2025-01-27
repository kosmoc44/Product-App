import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, productsSelector } from '../../store/productsSlice';
import './productPage.scss';
import star from '/src/assets/img/star.svg';
import halfStar from '/src/assets/img/halfstar.svg';
import { SearchContext } from "../../App";
import react from '/src/assets/img/react.svg';
import { toast, Toaster } from "sonner";

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(productsSelector);
    const { addBasket, plusOneBasket, minusOneBasket, basket } = React.useContext(SearchContext);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

    const product = products.find((product) => product.id === parseInt(id));

    if (!product) {
        return null
    }

    const itemInBasket = basket.find(item => item.id === product.id);
    const itemCount = itemInBasket ? itemInBasket.count : 0;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<img  key={`full-${i}`} src={star} alt="star" />);
        }

        if (hasHalfStar) {
            stars.push(<img  key="half" src={halfStar} alt="half star" />);
        }

        return stars;
    };

    const promise = () => new Promise((resolve) => setTimeout(() => resolve(), 900))

    const handleByClick = (product) => {
        toast.promise(promise(), {
            loading: 'Загрузка...',
            success: (data) => {
                addBasket(product);
                return `${product.title} добавлен в корзину!`;
            },
            error: 'Ошибка при добавлении товара в корзину!',
            style: {
                boxShadow: 'none',
            }
        });
    }

    return (
        <>
            <Toaster position="bottom-right" expand={false} richColors />
            <div className="productPage">
                <div className="wrapper container">
                    <div className="products">
                        <div className="page-img">
                            <img src={product.thumbnail} />
                        </div>
                        <div className="page-cont">
                            <h1 className="title">{product.title}</h1>
                            <h2 className="desc">{product.description}</h2>
                            <div className="rating">
                                <p>{product.rating}</p>
                                {renderStars(product.rating)}
                            </div>
                            <p className="price">{product.price}$</p>
                            <b className="warranty">{product.warrantyInformation} month</b>
                            {
                                basket.findIndex(item => item.id === product.id) > -1
                                    ? <div className="card__buy">
                                        <button type="button" onClick={() => minusOneBasket(product.id)}>
                                            -
                                        </button>
                                        <p>
                                            {(product.price * itemCount).toFixed(2)}$
                                        </p>
                                        <button onClick={() => plusOneBasket(product.id)} type="button">
                                            +
                                        </button>
                                        <div className="card__circle">
                                            {basket.find(item => item.id === product.id).count}
                                        </div>
                                    </div>
                                    :
                                    <div className="buy">
                                        <button type="button" onClick={() => handleByClick(product)}>
                                            Купить
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="title"><h2>Отзывы</h2></div>

                    <div className="reviews">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <div className="review-header">
                                        <div className="review-img">
                                            <img src={react} alt="" />
                                        </div>
                                        <strong>{review.reviewerName}</strong>
                                        <span className="rating"> - {review.rating}</span>
                                        <span className="star"> звезды</span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                                    <p>{review.reviewerEmail}</p>
                                </div>
                            ))
                        ) : (
                            <p>Нет отзывов.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;




