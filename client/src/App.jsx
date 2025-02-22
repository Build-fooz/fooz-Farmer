import Categories from "./components/Categories";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerRegistration from "./components/PartnerRegistration";
import SourcesProducts from "./components/SourcesProducts";
import SuccessStories from "./components/SuccessStories";

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
      </main>
    </>
  );
}

export default App;
