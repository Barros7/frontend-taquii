import Header from '@/components/header/Header';
import BusinessCategories from '@/components/business_categories_section/BusinessCategoriesSection';
import FeatureSection from '@/components/features_section/FeaturesSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultsSection from '@/components/results_section/ResultsSection';
import FaqSection from '@/components/faqs_section/FaqsSection';
import SearchBarSection from '@/components/search_bar/SearchBarSection';
import ServiceCard from '@/components/service_card/ServiceCard';
import BookingAndPaymentSection from '@/components/booking_and_payment_section/BookingAndPaymentSection';

export default function HomePage() {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <Header />
      <SearchBarSection />
      <BookingAndPaymentSection />
      <ServiceCard />
      <BusinessCategories />
      <FeatureSection />
      <ResultsSection />
      <FaqSection />
    </div>
  );
}
