'use client';

import { RepositoryListProps } from '@/types';

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="card"
          style={{ padding: '1.5rem', position: 'relative' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login} avatar`}
                  style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #e5e7eb' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      {repo.full_name}
                    </a>
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    by <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{repo.owner.login}</a>
                  </p>
                </div>
              </div>

              {repo.description && (
                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.5' }} className="line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                {repo.language && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                    <span style={{ fontWeight: '500' }}>{repo.language}</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: '#eab308' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{formatNumber(repo.stargazers_count)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{formatNumber(repo.forks_count)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{formatNumber(repo.open_issues_count)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: '#3b82f6' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '9999px', border: '1px solid #bfdbfe' }}
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 5 && (
                    <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#6b7280', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>
                      +{repo.topics.length - 5} more
                    </span>
                  )}
                </div>
              )}

              {repo.license && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1rem', height: '1rem', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.125rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#374151' }}>
                    {repo.license.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 