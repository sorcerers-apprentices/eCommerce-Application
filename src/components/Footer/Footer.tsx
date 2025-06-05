import s from './Footer.module.scss'
import type { ReactElement } from 'react'
import { FaTwitter, FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'

const Footer = (): ReactElement => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.column}>
          <h2 className={s.logo}>The Sorcerer's Apprentices</h2>
          <address className={s.address}>
            <p>21 New York Street</p>
            <p>New York City</p>
            <p>United States of America</p>
            <p>432 34</p>
          </address>
        </div>

        <div className={s.column}>
          <h3 className={s.heading}>Social links</h3>
          <div className={s.socialicons}>
            <a href="https://www.facebook.com/" className={s.iconlink} target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/" className={s.iconlink} target="_blank">
              <FaInstagram />
            </a>
            <a href="https://x.com/" className={s.iconlink} target="_blank">
              <FaTwitter />
            </a>
            <a href="https://pinterest.com/search/pins/?q=pets" className={s.iconlink} target="_blank">
              <FaPinterestP />
            </a>
          </div>
        </div>

        <div className={s.column}>
          <h3 className={s.heading}>Menu</h3>
          <ul className={s.linklist}>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog">New arrivals</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog?meta=sale">Best sellers</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog">Recently viewed</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog">Popular this week</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog">All products</a>
            </li>
          </ul>
        </div>

        <div className={s.column}>
          <h3 className={s.heading}>Categories</h3>
          <ul className={s.linklist}>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog?category=dog">Dog Products</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog?category=cat">Cat Products</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog?category=small-animal">
                Small Animals Products
              </a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/catalog?category=fish">Fish Products</a>
            </li>
          </ul>
        </div>

        <div className={s.column}>
          <h3 className={s.heading}>Our company</h3>
          <ul className={s.linklist}>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/about">About us</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/about">Vacancies</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/about">Contact us</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/about">Privacy</a>
            </li>
            <li>
              <a href="https://sorcerers-apprentices.netlify.app/about">Returns policy</a>
            </li>
          </ul>
        </div>
      </div>

      <span className={s.separator}></span>
      <div className={s.bottom}>
        <p className={s.copyright}>ⓒ All Rights Reserved for The Sorcerer's Apprentices - 2025</p>
      </div>
    </footer>
  )
}

export default Footer
