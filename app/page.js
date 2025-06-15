import Hero from "./components/Hero";
import Services from "./components/ServicesSection";
import CategorySection from "./components/CategorySection";
import Topproducts from "./components/Topproducts";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CategorySection />
      <Topproducts />
      <Testimonials/>
    </>
  );
}
