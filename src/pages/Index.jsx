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
import PastEvent from '@/components/pastevent'
import Footer from '@/components/Footer';
import Team from './Team';

const Index = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* <Header /> */}
            <RealmNavigation />
            <HeroSection />
            <MythologyMap />
            <RealmTime />
            <PastEvent />
            <RealmOrigins />
            <Team showHeader={false} />
            {/* <RealmGods /> */}
            {/* <RealmTrials /> */}

            <RealmMortals />
            <AmbientAudio />
            {/* <Footer /> */}
        </div>
    );
};

export default Index;
