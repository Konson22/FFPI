import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import ImpactSection from './ImpactSection';
import PurposeSection from './PurposeSection';
import TeamSection from './TeamSection';

export default function index() {
    return (
        <div className="scroll-smooth">
            <GuestNavbar />
            <HeroSection />
            <PurposeSection />
            <ImpactSection />
            <TeamSection />
            <BlogSection />
            <ContactSection />
            <GuestFooter />
        </div>
    );
}
