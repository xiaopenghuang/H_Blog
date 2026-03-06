'use client';

import { useEffect, useState } from 'react';

interface RepoData {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  open_issues_count: number;
  topics: string[];
  updated_at: string;
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

function timeAgo(dateStr: string) {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const days = Math.floor(diff / 86400000);
  if (days < 1) return '今天';
  if (days < 30) return `${days} 天前`;
  if (days < 365) return `${Math.floor(days / 30)} 个月前`;
  return `${Math.floor(days / 365)} 年前`;
}

function FallbackPreview({ data }: { data: RepoData }) {
  const langColor = data.language ? (LANG_COLORS[data.language] || '#8b949e') : '#8b949e';

  return (
    <div className="relative aspect-[2/1] bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] p-6 flex flex-col justify-between overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan/8 to-transparent rounded-tr-full" />

      {/* Top: Avatar + Repo name */}
      <div className="relative flex items-start gap-4">
        <img
          src={data.owner.avatar_url}
          alt={data.owner.login}
          className="w-14 h-14 rounded-lg border-2 border-white/10 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="text-white/60 text-xs font-mono mb-0.5">{data.owner.login}</div>
          <h3 className="text-white text-xl font-bold leading-tight break-words">
            {data.full_name.split('/')[1]}
          </h3>
        </div>
        {/* GitHub logo */}
        <svg className="w-8 h-8 text-white/20 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Middle: Description */}
      {data.description && (
        <p className="relative text-white/70 text-sm leading-relaxed line-clamp-2 my-3">
          {data.description}
        </p>
      )}

      {/* Bottom: Stats */}
      <div className="relative flex items-center gap-5 text-white/50 text-xs">
        {data.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: langColor }} />
            <span className="text-white/70 font-medium">{data.language}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {data.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {data.forks_count}
        </span>
        {data.open_issues_count > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.open_issues_count}
          </span>
        )}
      </div>
    </div>
  );
}

export default function GitHubCardLarge({ repo }: { repo: string }) {
  const [data, setData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.ok ? res.json() : null)
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [repo]);

  const ogImageUrl = `https://opengraph.githubassets.com/1/${repo}`;

  if (loading) {
    return (
      <div className="gradient-border-card shadow-card overflow-hidden animate-pulse">
        <div className="aspect-[2/1] bg-secondary" />
        <div className="p-5">
          <div className="h-5 w-48 bg-secondary rounded mb-3" />
          <div className="h-4 w-full bg-secondary rounded mb-2" />
          <div className="h-4 w-2/3 bg-secondary rounded mb-4" />
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-secondary rounded" />
            <div className="h-4 w-16 bg-secondary rounded" />
          </div>
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
          <div className="text-center">
            <svg className="w-12 h-12 text-white/20 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-white/50 text-sm font-medium">{repo}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            github.com
          </div>
          <span className="text-base font-bold text-foreground group-hover:text-accent transition-smooth">{repo}</span>
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
      {/* Preview Area: OG image or Fallback */}
      <div className="relative overflow-hidden">
        {!imgError ? (
          <>
            {!imgLoaded && <FallbackPreview data={data} />}
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
          <FallbackPreview data={data} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Source */}
        <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-2.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span>github.com</span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-accent group-hover:text-accent-light transition-smooth mb-2 leading-snug">
          {data.full_name}
        </h4>

        {/* Description */}
        {data.description && (
          <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
            {data.description}
          </p>
        )}

        {/* Topics */}
        {data.topics && data.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {data.topics.slice(0, 6).map((topic) => (
              <span key={topic} className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-secondary pt-3 border-t border-border/50">
          {data.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
              <span className="font-medium">{data.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-semibold">{data.stargazers_count}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="font-semibold">{data.forks_count}</span>
          </span>
          {data.updated_at && (
            <span className="flex items-center gap-1.5 text-xs ml-auto">
              更新于 {timeAgo(data.updated_at)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
