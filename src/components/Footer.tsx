import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <div className="mesh-gradient absolute inset-0 opacity-30" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent via-violet to-pink flex items-center justify-center">
                <span className="text-white font-black text-xs">{siteConfig.logo.text}</span>
              </div>
              <span className="text-sm font-bold gradient-text">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">快速导航</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {siteConfig.navItems.filter(item => item.href !== '/').map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground-secondary hover:text-accent transition-smooth"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">联系方式</h4>
            <div className="flex gap-2">
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary/80 hover:bg-accent/10 flex items-center justify-center text-foreground-secondary hover:text-accent transition-smooth"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="w-8 h-8 rounded-lg bg-secondary/80 hover:bg-pink/10 flex items-center justify-center text-foreground-secondary hover:text-pink transition-smooth"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="/rss.xml"
                className="w-8 h-8 rounded-lg bg-secondary/80 hover:bg-orange/10 flex items-center justify-center text-foreground-secondary hover:text-orange transition-smooth"
                aria-label="RSS"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 110 4.36 2.18 2.18 0 010-4.36zM4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44zm0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-foreground-secondary">
            &copy; {currentYear} {siteConfig.name}. {siteConfig.footer.text}
          </p>
          <p className="text-xs text-foreground-secondary">
            Made with <span className="text-pink">♥</span> by {siteConfig.author.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
