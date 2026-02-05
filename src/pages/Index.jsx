import HeroSection from '@/components/HeroSection';
import RealmNavigation from '@/components/RealmNavigation';
import RealmOrigins from '@/components/RealmOrigins';
import RealmTime from '@/components/RealmTime';
import RealmMortals from '@/components/RealmMortals';
import MythologyMap from '@/components/MythologyMap';
import PastEvent from '@/components/pastevent'
import Team from './Team';
import Links from '@/components/links';

const Index = () => {
    return (
        <div className="relative bg-background text-foreground overflow-x-hidden">
            {/* <Header /> */}
            <RealmNavigation />
            <Links />
            <HeroSection />
            <MythologyMap />
            <RealmTime />
            <PastEvent />
            <RealmOrigins />
            <Team />
            {/* <RealmGods /> */}
            {/* <RealmTrials /> */}
            <RealmMortals />
            {/* <AmbientAudio /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default Index;
