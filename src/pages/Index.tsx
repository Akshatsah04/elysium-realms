import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RealmNavigation from '@/components/RealmNavigation';
import RealmOrigins from '@/components/RealmOrigins';
import RealmGods from '@/components/RealmGods';
import RealmTrials from '@/components/RealmTrials';
import RealmTime from '@/components/RealmTime';
import RealmMortals from '@/components/RealmMortals';
import MythologyMap from '@/components/MythologyMap';
import AmbientAudio from '@/components/AmbientAudio';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <RealmNavigation />
      <HeroSection />
      <MythologyMap />
      <RealmOrigins />
      <RealmGods />
      <RealmTrials />
      <RealmTime />
      <RealmMortals />
      <AmbientAudio />
      <Footer />
    </div>
  );
};

export default Index;
