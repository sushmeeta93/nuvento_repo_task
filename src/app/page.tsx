'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import RepositoryList from '@/components/RepositoryList';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Repository, SearchFilters } from '@/types';

function HomeContent() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get('q') || '';
  const language = searchParams.get('language') || '';
  const sort = searchParams.get('sort') || 'stars';
  const order = searchParams.get('order') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');

  const searchRepositories = useCallback(async (searchQuery: string, filters: SearchFilters, pageNum: number) => {
    if (!searchQuery.trim()) {
      setRepositories([]);
      setTotalCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      let q = searchQuery;
      
      if (filters.language) {
        q += ` language:${filters.language}`;
      }
      
      params.set('q', q);
      if (filters.sort) params.set('sort', filters.sort);
      if (filters.order) params.set('order', filters.order);
      params.set('page', pageNum.toString());
      params.set('per_page', '10');

      const response = await fetch(`https://api.github.com/search/repositories?${params}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      setRepositories(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching repositories');
      setRepositories([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filters: SearchFilters = { language, sort, order };
    searchRepositories(query, filters, page);
    setCurrentPage(page);
  }, [query, language, sort, order, page, searchRepositories]);

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('q', searchQuery);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleFilterChange = (filters: SearchFilters) => {
    const params = new URLSearchParams(searchParams);
    
    params.delete('language');
    params.delete('sort');
    params.delete('order');
    
    if (filters.language) {
      params.set('language', filters.language);
    }
    params.set('sort', filters.sort || 'stars');
    params.set('order', filters.order || 'desc');
    
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="glass-effect" style={{ borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' }}>
            <h1 className="header-title" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
              GitHub Repository Search
            </h1>
            <p className="header-description" style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '42rem', margin: '0 auto' }}>
              Discover amazing repositories on GitHub with our powerful search and filtering tools
            </p>
          </div>
        </header>

        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="glass-effect" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
            <SearchBar onSearch={handleSearch} initialQuery={query} />
          </div>
          
          <div className="responsive-grid">
            <div>
              <FilterPanel
                onFilterChange={handleFilterChange}
                currentFilters={{ language, sort, order }}
              />
            </div>
            
            <div>
              {loading && <LoadingSpinner />}
              
              {error && (
                <div className="glass-effect" style={{ borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flexShrink: 0 }}>
                      <svg style={{ width: '1.25rem', height: '1.25rem', color: '#f87171' }} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div style={{ marginLeft: '0.75rem' }}>
                      <p style={{ color: '#991b1b', fontWeight: '500' }}>{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {!loading && !error && repositories.length === 0 && query && (
                <div className="glass-effect" style={{ borderRadius: '1rem', padding: '3rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '1.5rem' }}>🔍</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                    No repositories found
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                    Try adjusting your search terms or filters to find what you're looking for
                  </p>
                </div>
              )}
              
              {!loading && !error && repositories.length > 0 && (
                <>
                  <div className="glass-effect" style={{ borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#374151', fontSize: '1.125rem', fontWeight: '500' }}>
                      Found <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{totalCount.toLocaleString()}</span> repositories
                    </p>
                  </div>
                  <RepositoryList repositories={repositories} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
              
              {!loading && !error && !query && (
                <div className="glass-effect" style={{ borderRadius: '1rem', padding: '3rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '1.5rem' }}>🚀</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                    Start exploring repositories
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '2rem' }}>
                    Enter a search term above to discover amazing repositories on GitHub
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>React</span>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>TypeScript</span>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>Next.js</span>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>Python</span>
                    <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}>Machine Learning</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
