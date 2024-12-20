import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExchangePage } from './pages/ExchangePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<ExchangePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}