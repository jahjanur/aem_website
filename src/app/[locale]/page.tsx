import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import FloorPreview from '@/components/sections/FloorPreview';
import ProgressSection from '@/components/sections/ProgressSection';
import CTASection from '@/components/sections/CTASection';
import Loader from '@/components/ui/Loader';

export default function HomePage() {
  return (
    <>
      <Loader />
      <Hero />
      <AboutSection />
      <MarqueeSection />
      <FloorPreview />
      <ProgressSection />
      <CTASection />
    </>
  );
}
