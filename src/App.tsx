import Nav from './components/Nav';
import Hero from './components/Hero';
import Bestsellers from './components/Bestsellers';
import DigitalBooks from './components/DigitalBooks';
import Footer from './components/Footer';
import Reveal from './components/Reveal';

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Reveal><Bestsellers /></Reveal>
      <Reveal><DigitalBooks /></Reveal>
      <Footer />
    </div>
  );
}
