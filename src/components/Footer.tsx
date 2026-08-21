const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

const companyLinks = [
  { label: 'Career', href: '#' },
  { label: 'Contact', href: 'https://kingschat.online/user/alexdabest' },
]

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant/30 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

        {/* Brand */}
        <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
          <a
            href="#"
            className="font-headline-md text-headline-md font-bold text-primary mb-4 block tracking-tight hover:opacity-80 transition-opacity"
          >
            Tech &amp; Innovation
          </a>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80 max-w-xs">
            &copy; 2026 Tech &amp; Innovation. Building What&apos;s Next.
          </p>
        </div>

        {/* Legal */}
        <div className="col-span-1">
          <h4 className="font-label-md text-label-md text-on-surface mb-6 uppercase tracking-widest opacity-60">
            Legal
          </h4>
          <ul className="space-y-4">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all opacity-80 hover:opacity-100 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="col-span-1">
          <h4 className="font-label-md text-label-md text-on-surface mb-6 uppercase tracking-widest opacity-60">
            Company
          </h4>
          <ul className="space-y-4">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all opacity-80 hover:opacity-100 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
