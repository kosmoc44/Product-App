import React, { useEffect, useRef, useState } from 'react'
import code from "/src/assets/img/coding.svg"
import "./navbar.scss"
import frame from "/src/assets/img/Frame.svg"
import { Link, useNavigate } from 'react-router-dom';
import BasketZero from "../basketZero/BasketZero";
import { SearchContext } from "../../App";
import down from '/src/assets/img/down.svg'
import Contacts from "../contacts/Contacts";
import Search from "./search/Search";
import Shoes from "./shoes/Shoes";


const Navbar = () => {
  const { basket, setShow, show } = React.useContext(SearchContext)
  const navigate = useNavigate()
  const [showCategories, setShowCategories] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCategories(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="wrapper">
          <Link to="/" className="logo">
            <img src={code} alt="" />
          </Link>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__list-item" style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  className="nav__list-item_link"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  Категории
                  <img src={down} alt="" />
                </button>
                {showCategories && (
                  <ul className="dropdown">
                    <li className="dropdown__item" active>
                      <Link to="/products" className="dropdown__link">Косметика</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/groceries" className="dropdown__link">Продукты</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/furniture" className="dropdown__link">Мебель</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/forHome" className="dropdown__link">Для дома</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/shirts" className="dropdown__link">Футболки</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/shoes" className="dropdown__link">Красовки</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/watch" className="dropdown__link">Часы</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/phones" className="dropdown__link">Для телефона</Link>
                    </li>
                    <li className="dropdown__item">
                      <Link to="/moto" className="dropdown__link">Мотоцыклы</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav__list-item">
                <Link to="/discount" className="nav__list-item_link" >
                  Скидки
                </Link>
              </li>
              <li className="nav__list-item">
                <button className="nav__list-item_link" onClick={openModal}>
                  Контакты
                </button>
              </li>
              <li className="nav__list-item">
                <Link to="/aboutus" className="nav__list-item_link">
                  О нас
                </Link>
              </li>
            </ul>
          </nav>
          <Search />
          <div className="frame" onClick={() => {
            if (basket.length) {
              navigate('/basket')
            } else {
              setShow(true)
            }
          }}>
            <img src={frame} />
            <div className="count">
              {basket.length}
            </div>
          </div>
        </div>
      </div>
      <BasketZero />
      <Contacts openModal={isModalOpen} closeModal={closeModal} />
    </header>
  )
}

export default Navbar
