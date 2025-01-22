import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
// import { avatar } from "../../images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer'>
      <div className='footer__addr'>
        <img
          src='/staticuploads/ScreenPic13.png'
          alt='ClearSpecs'
          width='200px'
        />

        <h2>We are available every day from 9 a.m - 10 p.m. IST</h2>

        <h2>Contact</h2>

        <address>
          Xyz street, Global Chowk, Global City Capital Region <br></br> IIIT
          Global City- 777771
          <a className='footer__btn' href='/aboutUs'>
            Email Us
          </a>
        </address>
      </div>

      <ul className='footer__nav'>
        <li className='nav__item'>
          <h2 className='nav__title'>Company</h2>
          <ul className='nav__ul'>
            <li>
              <a href='/aboutUs'>Our Story</a>
            </li>
          </ul>
        </li>

        <li className='nav_item nav_item--extra'>
          <h2 className='nav__title'>products</h2>

          <ul className='nav_ul nav_ul--extra'>
            <li>
              <a href='/specs'>Eye Glasses</a>
            </li>

            <li>
              <a href='/goggles'>Sun Glasses</a>
            </li>

            <li>
              <a href='/Contactlens'> Contact Lens</a>
            </li>
          </ul>
        </li>

        <li className='nav__item'>
          <h2 className='nav__title'>Legal</h2>

          <ul className='nav__ul'>
            <li>
              <a href='/aboutUs'>Privacy Policy</a>
            </li>

            <li>
              <a href='/aboutUs'>Terms of Use</a>
            </li>

            <li>
              <a href='/aboutUs'>Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className='legal'>
        <p>&copy; {currentYear}. All rights reserved.</p>

        <div className='legal__links'>
          <span>
            Made with <span className='heart'>♥</span> From Clerspecs Tech Team
          </span>
        </div>
      </div>
      <FloatingWhatsApp
        buttonStyle={{
          width: "2.5rem",
          height: "2.5rem",
        }}
        phoneNumber='917559208168'
        chatboxHeight={300}
        accountName='Clerspecs'
        avatar='/images/logo.svg'
        allowClickAway={true}
        messageDelay={3}
        darkMode={true}
        notification={false}
      />
    </footer>
  );
};

export default Footer;
