import React from 'react'
import "./aboutus.scss"

const AboutUs = () => {
    return (
        <div className="aboutus ">
            <video autoPlay loop muted className="background-video">
                <source src="/src/assets/video/art.mp4" type="video/mp4" />
            </video>
            <div className="introduction">
                <div className="welcome">
                    <h1 className="title">Добро пожаловать в LOGO!</h1>
                    <p className="text">
                        Мы — небольшая, но амбициозная компания, основанная с целью предоставления высококачественных товаров и услуг. Наша история началась в 2024 году, когда Я, решил создать что-то особенное, что могло бы улучшить жизнь людей.
                    </p>
                </div>
                <div className="mission">
                    <h2 className="title">
                        Наша миссия
                    </h2>
                    <p className="text">
                        Наша миссия — предлагать нашим клиентам только лучшее. Мы стремимся к инновациям и качеству, чтобы каждый продукт, который мы предлагаем, соответствовал самым высоким стандартам. Мы верим, что каждый клиент заслуживает индивидуального подхода и внимательного обслуживания.
                    </p>
                </div>
                <div className="why-we">
                    <div className="title-div"><h3 className="title">Почему выбирают нас?</h3></div>
                    <p className="text">
                        <span>Качество:</span> Мы тщательно отбираем материалы и поставщиков, чтобы гарантировать, что наши продукты соответствуют самым высоким стандартам.
                    </p>
                </div>
                <div className="cont-us">
                    <h4 className="title">Свяжитесь с нами</h4>
                    <p className="text">
                        Если у вас есть вопросы или предложения, не стесняйтесь обращаться! Я всегда рад помочь и обсудить, как мы можем работать вместе. Вы можете связаться со мной по адресу: kosmoc44@gmail.com .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
