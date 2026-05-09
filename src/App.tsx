import Nav from './components/Nav';
import Hero from './components/Hero';
import Bestsellers from './components/Bestsellers';
import DigitalBooks from './components/DigitalBooks';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Bestsellers />
      <DigitalBooks />
      <Footer />
    </div>
  );
}
