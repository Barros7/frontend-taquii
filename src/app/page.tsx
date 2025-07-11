import Header from '@/components/header/Header';
import BusinessCategories from '@/components/business_categories_section/BusinessCategoriesSection';
import FeatureSection from '@/components/features_section/FeaturesSection';
import Hero from '@/components/heros_section/HerosSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultsSection from '@/components/results_section/ResultsSection';
import CallToAction from '@/components/call_to_action_section/CallToActionSection';
import ContactFormSection from '@/components/contact_form_section/ContactFormSection';
import FaqSection from '@/components/faqs_section/FaqsSection';
import PricingPlans from '@/components/pricing_plans/PricingPlans';

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <BusinessCategories />
      <FeatureSection />
      <CallToAction />
      <ResultsSection />
      <PricingPlans />
      <ContactFormSection />
      <FaqSection />
    </div>
  );
}
