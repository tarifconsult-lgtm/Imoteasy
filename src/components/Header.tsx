import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

const navigation = [
  { label: "Обяви", href: "#properties" },
  { label: "Квартали", href: "#neighborhoods" },
  { label: "За нас", href: "#about" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="IMOTEASY — начало">
          <span className="brand-mark" aria-hidden="true">i</span>
          <span className="brand-wordmark">IMOT<span>EASY</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Основна навигация">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <a className="publish-button" href="#contact">
          Публикувай обява <ArrowUpRight aria-hidden="true" size={16} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Мобилна навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Публикувай обява</a>
        </nav>
      )}
    </header>
  )
}
