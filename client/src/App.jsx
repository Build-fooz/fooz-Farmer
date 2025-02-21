import Header from "./components/Header";
import Hero from "./components/Hero";
import PartnerRegistration from "./components/PartnerRegistration";
import SourcesProducts from "./components/SourcesProducts";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <Hero />
        <SourcesProducts />
        <PartnerRegistration />
      </main>
    </>
  );
}

export default App;
