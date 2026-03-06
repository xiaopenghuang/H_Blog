'use client';

import { siteConfig } from '@/config/site';

export default function HeroProfileCard() {
  return (
    <div className="profile-card p-5 sm:p-6 md:p-8 shadow-card-hover">
      <div className="relative z-10">
        {/* Avatar with animated ring */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-accent via-pink to-cyan p-[3px] animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                {siteConfig.author.avatar.startsWith('http') || siteConfig.author.avatar.startsWith('/') ? (
                  <img
                    src={siteConfig.author.avatar}
                    alt={siteConfig.author.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{siteConfig.author.avatar}</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green rounded-full border-[3px] border-surface flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center mb-4 sm:mb-5">
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1.5">{siteConfig.author.name}</h3>
          <p className="text-sm sm:text-base gradient-text font-bold">{siteConfig.author.role}</p>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-foreground-secondary text-center leading-relaxed mb-5 sm:mb-6">
          {siteConfig.author.bio}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6">
          {siteConfig.techStack.map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <a
            href={siteConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent hover:to-violet flex items-center justify-center text-foreground-secondary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow-accent"
            aria-label="GitHub"
          >
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink/10 to-pink/5 hover:from-pink hover:to-rose flex items-center justify-center text-foreground-secondary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow-pink"
            aria-label="Email"
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href={`tencent://message/?uin=${siteConfig.author.qq}&Site=&Menu=yes`}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan/10 to-cyan/5 hover:from-cyan hover:to-green flex items-center justify-center text-foreground-secondary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow-cyan"
            aria-label="QQ"
          >
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.003 2C6.486 2 2.001 6.486 2.001 12.003c0 2.097.648 4.044 1.755 5.65l-.483 2.88a.75.75 0 00.998.833l2.622-.955a9.946 9.946 0 005.11 1.405c5.517 0 10.002-4.486 10.002-10.003C22.005 6.296 17.52 2 12.003 2zM8.25 10.5a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm3.75 0a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm3.75 0a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z" />
            </svg>
          </a>
          <a
            href="/rss.xml"
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange/10 to-orange/5 hover:from-orange hover:to-rose flex items-center justify-center text-foreground-secondary hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="RSS"
          >
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 110 4.36 2.18 2.18 0 010-4.36zM4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44zm0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
            </svg>
          </a>
        </div>

        {/* GitHub Profile Link */}
        <a
          href={siteConfig.author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl text-center text-base font-bold btn-gradient text-white"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Follow on GitHub
          </span>
        </a>
      </div>
    </div>
  );
}
