# GitHub Repository Search

A modern, responsive web application for searching and discovering repositories on GitHub. Built with Next.js, React, and Tailwind CSS.

## Features

- 🔍 **Repository Search**: Search GitHub repositories with real-time results
- 🎯 **Advanced Filtering**: Filter by language, sort by stars/forks/date, and order results
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Debounced Search**: Optimized API calls with search debouncing
- 📄 **Pagination**: Navigate through large result sets with intuitive pagination
- 🔗 **URL State Management**: Search state is maintained in URL parameters
- 🎨 **Modern UI**: Beautiful, clean interface with smooth animations
- ⚠️ **Error Handling**: Comprehensive error handling for API failures
- 🔄 **Loading States**: Clear loading indicators during API calls

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: GitHub REST API
- **State Management**: React hooks with URL state
- **Routing**: Next.js built-in routing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nuvento_repo_task
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Search Repositories
- Enter a search term in the search bar
- Results will appear automatically after 500ms (debounced)
- Use filters to narrow down results

### Filter Options
- **Language**: Filter by programming language
- **Sort By**: Sort by stars, forks, help-wanted issues, updated date, or created date
- **Order**: Choose ascending or descending order

### Navigation
- Use pagination controls to navigate through results
- Click on repository names to open them on GitHub
- All search state is preserved in the URL for easy sharing

## API Integration

The application integrates with the GitHub Search REST API:
- **Base URL**: `https://api.github.com/search/repositories`
- **Authentication**: Not required (uses unauthenticated requests)
- **Rate Limiting**: Respects GitHub's rate limits
- **Error Handling**: Graceful handling of API errors

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── SearchBar.tsx     # Search input with debouncing
│   ├── FilterPanel.tsx   # Filter controls
│   ├── RepositoryList.tsx # Repository cards
│   ├── Pagination.tsx    # Pagination controls
│   └── LoadingSpinner.tsx # Loading indicator
└── types/
    └── index.ts          # TypeScript type definitions
```

## Key Features Implementation

### Search Debouncing
- 500ms debounce delay to optimize API calls
- Prevents excessive requests while typing

### URL State Management
- Search parameters stored in URL
- Browser back/forward navigation works
- Shareable URLs with search state

### Responsive Design
- Mobile-first approach
- Collapsible filter panel on mobile
- Optimized layouts for all screen sizes

### Error Handling
- Network error handling
- API error responses
- User-friendly error messages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for technical assessment purposes.
