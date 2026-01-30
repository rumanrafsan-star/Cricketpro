import Navigation from '@/components/custom/Navigation';
import Hero from '@/sections/Hero';
import LiveScores from '@/sections/LiveScores';
import Statistics from '@/sections/Statistics';
import Fantasy from '@/sections/Fantasy';
import TeamGrid from '@/sections/TeamGrid';
import News from '@/sections/News';
import Rankings from '@/sections/Rankings';
import Polls from '@/sections/Polls';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navigation />
      <main>
        <Hero />
        <LiveScores />
        <TeamGrid />
        <Statistics />
        <Fantasy />
        <News />
        <Rankings />
        <Polls />
      </main>
      <Footer />
    </div>
  );
}

export default App;
