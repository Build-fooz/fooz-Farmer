import Header from "./components/Header";
import Hero from "./components/Hero";
import SourcesProducts from "./components/SourcesProducts";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <Hero />
        <SourcesProducts />
      </main>
    </>
  );
}

export default App;
