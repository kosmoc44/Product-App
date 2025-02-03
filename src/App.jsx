import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import "./app.scss";
import Buttons from "./components/buttons/Buttons";
import Cards from "./components/cards/Cards";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Basket from "./components/Navbar/basket/Basket";
import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "./store/basketSlice";
import { setSort } from "./store/sortSlice";
import { addToBasket, increaseCount, decreaseCount, removeFromBasket } from "./store/basketSlice";
import { getProducts, productsSelector } from "./store/productsSlice";
import Discount from "./components/discount/Discount";
import Furniture from "./components/Navbar/furniture/Furniture";
import Groceries from "./components/Navbar/groceries/Groceries";
import Products from "./components/Navbar/products/Products";
import AboutUs from "./components/aboutUs/AboutUs";
import Pagination from '@mui/material/Pagination';
import ProductPage from "./components/productPage/ProductPage";
import ForHome from "./components/Navbar/forHome/ForHome";
import Shirts from "./components/Navbar/shirts/Shirts";
import Shoes from "./components/Navbar/shoes/Shoes";
import Watch from "./components/Navbar/watch/Watch";
import Phones from "./components/Navbar/phones/Phones";
import Moto from "./components/Navbar/moto/Moto";
import { toast, Toaster } from "sonner";
import animatedVideo from './assets/video/animate.mp4'

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [cards, setCards] = useState([])
  const [loadingTimer, setLoadingTimer] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const basket = useSelector(state => state.basket);
  const sort = useSelector(state => state.sort)
  const [show, setShow] = useState(false)
  const { products, loading, error } = useSelector(productsSelector);
  const dispatch = useDispatch();
  const cardsPerPage = 16;

  useEffect(() => {
    const basketData = localStorage.getItem('basket');
    if (basketData) {
      dispatch(setBasket(JSON.parse(basketData)))
    }
    const sortData = localStorage.getItem('sort')
    if (sortData) {
      dispatch(setSort(JSON.parse(sortData)))
    }
    dispatch(getProducts())
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }, [basket])

  useEffect(() => {
    localStorage.setItem('sort', JSON.stringify(sort))
  }, [sort])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimer(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (loading || loadingTimer) {
    return <div className="loading-container">
      <video autoPlay loop muted className="background-video">
        <source src={animatedVideo} type="video/mp4" />
      </video>
      <div className="loading">
        Diploma Work
      </div>
    </div>
  }

  const totalPages = Math.ceil(products.length / cardsPerPage);

  const promise = () => new Promise((resolve) => setTimeout(() => resolve(), 900))

  const handleByClick = (card) => {
    toast.promise(promise(), {
      loading: 'Загрузка...',
      success: (data) => {
        addBasket(card);
        return `${card.title} добавлен в корзину!`;
      },
      error: 'Ошибка при добавлении товара в корзину!',
      style: {
        boxShadow: 'none',
      }
    });
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(100, 100);
  };

  const addBasket = (product) => {
    dispatch(addToBasket(product))
  }

  const plusOneBasket = (id) => {
    dispatch(increaseCount(id))
  }

  const minusOneBasket = (id) => {
    dispatch(decreaseCount(id))
  }

  const delBasket = (id) => {
    dispatch(removeFromBasket(id))
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;


  return (
    <div className="App">
      <SearchContext.Provider value={{
        plusOneBasket,
        minusOneBasket,
        delBasket,
        basket,
        addBasket,
        handlePageChange,
        currentPage,
        cardsPerPage,
        sort,
        error,
        products,
        setSort: (newSort) => dispatch(setSort(newSort)),
        setShow,
        show,
        setSearchValue,
        searchValue,
        setCurrentPage,
        totalPages,
        indexOfLastCard,
        indexOfFirstCard,
        handleByClick,

      }}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/basket"
                element={<Basket />}
              />
              <Route path="/forHome" element={<ForHome />} />
              <Route path="/groceries" element={<Groceries />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/discount" element={<Discount />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/shirts" element={<Shirts />} />
              <Route path="/shoes" element={<Shoes />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/phones" element={<Phones />} />
              <Route path="/moto" element={<Moto />} />
              <Route path="/" element={
                <>
                  <Buttons />
                  <Cards />
                  <Toaster position="bottom-right" expand={false} richColors />
                  <Pagination
                    className="pagination"
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => handlePageChange(page)}
                    color="primary"
                  />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
