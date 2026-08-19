import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
