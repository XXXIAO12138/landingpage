'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import Logos from '@/components/Logos';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import CopilotDrawer from '@/components/CopilotDrawer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Logos />
      <CTA />
      <Footer />
      <CopilotDrawer />
    </>
  );
}
