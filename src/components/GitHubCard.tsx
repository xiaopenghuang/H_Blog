'use client';

import { useEffect, useState } from 'react';

interface RepoData {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Batchfile: '#C1F12E',
  Shell: '#89e051',
};

function SmallFallbackPreview({ data }: { data: RepoData }) {
  const langColor = data.language ? (LANG_COLORS[data.language] || '#8b949e') : '#8b949e';

  return (
    <div className="aspect-[2/1] bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] p-4 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
      <div className="flex items-center gap-2.5 relative">
        <img src={data.owner.avatar_url} alt="" className="w-8 h-8 rounded-md border border-white/10" />
        <div className="min-w-0">
          <div className="text-white/50 text-[0.6rem]">{data.owner.login}</div>
          <div className="text-white text-sm font-bold truncate">{data.full_name.split('/')[1]}</div>
        </div>
      </div>
      {data.description && (
        <p className="text-white/60 text-[0.65rem] line-clamp-1 relative">{data.description}</p>
      )}
      <div className="flex items-center gap-3 text-white/40 text-[0.6rem] relative">
        {data.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
            {data.language}
          </span>
        )}
        <span className="flex items-center gap-0.5">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          {data.stargazers_count}
        </span>
        <span className="flex items-center gap-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          {data.forks_count}
        </span>
      </div>
    </div>
  );
}

export default function GitHubCard({ repo }: { repo: string }) {
  const [data, setData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const ogImageUrl = `https://opengraph.githubassets.com/1/${repo}`;

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.ok ? res.json() : null)
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [repo]);

  if (loading) {
    return (
      <div className="gradient-border-card shadow-card overflow-hidden animate-pulse">
        <div className="aspect-[2/1] bg-secondary" />
        <div className="p-3">
          <div className="h-3 w-24 bg-secondary rounded mb-2" />
          <div className="h-3.5 w-full bg-secondary rounded" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block gradient-border-card shadow-card hover:shadow-card-hover hover-lift overflow-hidden transition-smooth group"
      >
        <div className="aspect-[2/1] bg-gradient-to-br from-[#0d1117] to-[#161b22] flex items-center justify-center">
          <svg className="w-8 h-8 text-white/15" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5 text-[0.65rem] text-foreground-secondary mb-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            github.com
          </div>
          <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-smooth">{repo}</span>
        </div>
      </a>
    );
  }

  const langColor = data.language ? (LANG_COLORS[data.language] || '#8b949e') : '#8b949e';

  return (
    <a
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block gradient-border-card shadow-card hover:shadow-card-hover hover-lift overflow-hidden transition-smooth group"
    >
      {/* Preview Area */}
      <div className="relative overflow-hidden">
        {!imgError ? (
          <>
            {!imgLoaded && <SmallFallbackPreview data={data} />}
            <img
              src={ogImageUrl}
              alt={data.full_name}
              className={`w-full aspect-[2/1] object-cover group-hover:scale-[1.02] transition-transform duration-500 ${imgLoaded ? '' : 'absolute inset-0'}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <SmallFallbackPreview data={data} />
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 text-[0.65rem] text-foreground-secondary mb-1.5">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          github.com
        </div>
        <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-smooth mb-1 leading-snug line-clamp-1">
          {data.full_name}
        </h4>
        {data.description && (
          <p className="text-xs text-foreground-secondary line-clamp-1 mb-2 leading-relaxed">
            {data.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-[0.65rem] text-foreground-secondary">
          {data.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
              {data.language}
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <svg className="w-3 h-3 text-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {data.stargazers_count}
          </span>
          <span className="flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {data.forks_count}
          </span>
        </div>
      </div>
    </a>
  );
}
