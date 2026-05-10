import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Nav from '../views/components/layout/Nav';
import Footer from '../views/components/layout/Footer';

const HomePage = lazy(() => import('../views/pages/HomePage'));
const CatalogPage = lazy(() => import('../views/pages/CatalogPage'));
const BookDetailPage = lazy(() => import('../views/pages/BookDetailPage'));
const AdminPage = lazy(() => import('../views/pages/AdminPage'));
const ContactPage = lazy(() => import('../views/pages/ContactPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#16A34A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" dir="rtl">
        <Nav />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
