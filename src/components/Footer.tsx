import { ArrowUpRight, Instagram, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main section-wrap">
        <div className="footer-brand-block">
          <a className="brand footer-brand" href="#top" aria-label="IMOTEASY — начало">
            <span className="brand-mark" aria-hidden="true">i</span>
            <span className="brand-wordmark">IMOT<span>EASY</span></span>
          </a>
          <p>По-лесният път към дома<br />започва от Русе.</p>
        </div>

        <div className="footer-column">
          <h2>Разгледай</h2>
          <a href="#properties">Всички обяви</a>
          <a href="#neighborhoods">Квартали в Русе</a>
          <a href="#about">За IMOTEASY</a>
        </div>

        <div className="footer-column footer-contact">
          <h2>Свържи се с нас</h2>
          <p><MapPin aria-hidden="true" size={16} /> Русе, България</p>
          <a href="mailto:info@imoteasy.bg">info@imoteasy.bg <ArrowUpRight aria-hidden="true" size={14} /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram aria-hidden="true" size={15} /> Instagram</a>
        </div>

        <a className="footer-publish" href="mailto:info@imoteasy.bg?subject=Публикуване%20на%20обява">
          Имаш имот за продажба?<br /><span>Публикувай обява <ArrowUpRight aria-hidden="true" size={16} /></span>
        </a>
      </div>
      <div className="footer-bottom section-wrap">
        <span>© {new Date().getFullYear()} IMOTEASY. Всички права запазени.</span>
        <span>Създадено с мисъл за дома.</span>
      </div>
    </footer>
  )
}
