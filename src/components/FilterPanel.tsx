'use client';

import { useState } from 'react';
import { FilterPanelProps, SearchFilters } from '@/types';

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Dart',
  'Scala',
  'R',
  'MATLAB',
  'Shell',
  'HTML',
  'CSS',
  'Vue',
  'React',
  'Angular'
];

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'help-wanted-issues', label: 'Help Wanted Issues' },
  { value: 'updated', label: 'Updated' },
  { value: 'created', label: 'Created' }
];

const ORDER_OPTIONS = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' }
];

export default function FilterPanel({ onFilterChange, currentFilters }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...currentFilters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = currentFilters.language || currentFilters.sort !== 'stars' || currentFilters.order !== 'desc';

  return (
    <div className="glass-effect" style={{ borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(229, 231, 235, 0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ padding: '0.5rem', color: '#9ca3af', cursor: 'pointer' }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        {hasActiveFilters && (
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#dbeafe', color: '#1e40af' }}>
              Active filters
            </span>
          </div>
        )}
      </div>

      <div style={{ display: isOpen ? 'block' : 'none' }}>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
              Programming Language
            </label>
            <select
              value={currentFilters.language || ''}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="select-field"
            >
              <option value="">All Languages</option>
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
              Sort By
            </label>
            <select
              value={currentFilters.sort || 'stars'}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="select-field"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
              Order
            </label>
            <select
              value={currentFilters.order || 'desc'}
              onChange={(e) => handleFilterChange('order', e.target.value)}
              className="select-field"
            >
              {ORDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={clearFilters}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 