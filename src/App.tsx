import Nav from './components/Nav';
import Hero from './components/Hero';
import WaveDivider from './components/WaveDivider';
import Bestsellers from './components/Bestsellers';
import DigitalBooks from './components/DigitalBooks';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <WaveDivider fromColor="#ffffff" toColor="#F5F5F5" />
      <Bestsellers />
      <WaveDivider fromColor="#F5F5F5" toColor="#ffffff" />
      <DigitalBooks />
      <Footer />
    </div>
  );
}
