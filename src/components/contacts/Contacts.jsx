import React from 'react'
import './contacts.scss'

const Contacts = ({openModal, closeModal}) => {

    if (!openModal) return null;

    return (
        <div className="contacts">
            <div className="modal">
                <button className="close__button" onClick={closeModal}>x</button>
                <h1>Контакты</h1>
                <div className="contact__info">
                    <h2>Свяжитесь с нами</h2>
                    <p>Адрес: ул. Новый-Ташкен, 123, Город, Страна</p>
                    <p>Телефон: +998(90)12-345-67</p>
                    <p>Gmail: kosmoc44@gmail.com</p>
                    <p>Часы работы: Пн-Чт 15:00 - 17:00</p>
                </div>
                <div className="contact__form">
                    <h2>Обратная связь</h2>
                    <form>
                        <div className="input-info">
                            <input type="name" placeholder="Имя" required />
                            <input type="email" placeholder="Gmail" required />
                        </div>
                        <div className="input__theme">
                            <input type="text" placeholder="Тема обращения" />
                            <textarea placeholder="Сообщение" required></textarea>
                        </div>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contacts
