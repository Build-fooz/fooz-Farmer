import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerRegistration from "./components/PartnerRegistration";
import SourcesProducts from "./components/SourcesProducts";
import SuccessStories from "./components/SuccessStories";
import WhyPartner from "./components/WhyPartner";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-100">
        <Hero />
        <SourcesProducts />
        <PartnerRegistration />
        <Categories />
        <SuccessStories />
        <WhyPartner />
      </main>
      <Footer />
    </>
  );
}

export default App;
