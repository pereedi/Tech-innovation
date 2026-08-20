import { useState } from 'react'

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Programs',   href: '#Programs' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Values',    href: '#values' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      id="navbar"
      className="fixed top-0 w-full z-50 border-b border-white/10 dark:border-outline-variant/20 shadow-2xl transition-all duration-500 ease-in-out"
      style={{
        background: 'rgba(19,19,20,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight hover:text-primary transition-colors duration-300"
          aria-label="Tech & Innovation home"
        >
          Technology &amp; Digital Innovation
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            id="nav-cta-btn"
            className="btn-primary px-6 py-3 rounded-full font-label-md text-label-md text-on-primary font-bold ml-4"
          >
            Start a Project
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-on-surface p-2"
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-margin-mobile pb-6 border-t border-white/10 flex flex-col gap-4"
          style={{ background: 'rgba(19,19,20,0.9)', backdropFilter: 'blur(24px)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-300 py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            id="mobile-cta-btn"
            className="btn-primary px-6 py-3 rounded-full font-label-md text-label-md text-on-primary font-bold w-full mt-2"
          >
            Start a Project
          </button>
        </div>
      )}
    </nav>
  )
}
