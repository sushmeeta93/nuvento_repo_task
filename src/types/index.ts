export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
  license: {
    name: string;
  } | null;
  open_issues_count: number;
  default_branch: string;
}

export interface SearchFilters {
  language?: string;
  sort?: string;
  order?: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export interface FilterPanelProps {
  onFilterChange: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

export interface RepositoryListProps {
  repositories: Repository[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
} 