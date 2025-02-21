import Categories from "./components/Categories";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerRegistration from "./components/PartnerRegistration";
import SourcesProducts from "./components/SourcesProducts";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-100">
        <Hero />
        <SourcesProducts />
        <PartnerRegistration />
        <Categories />
      </main>
    </>
  );
}

export default App;
