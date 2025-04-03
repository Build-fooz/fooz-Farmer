import React from "react";
import Header from "../Components/HomePage/Header";
import Hero from "../Components/HomePage/Hero";
import SourcesProducts from "../Components/HomePage/SourcesProducts";
import Register from "./RegisterForm";
import Categories from "../Components/HomePage/Categories";
import SuccessStories from "../Components/HomePage/SuccessStories";
import WhyPartner from "../Components/HomePage/WhyPartner";
import Footer from "../Components/HomePage/Footer";

export default function HomePage() {
  return (
    <>
      <title>FoozFood</title>
      <Header />
      <main className="bg-gray-100">
        <Hero />
        <SourcesProducts />
        <Register />
        <Categories />
        <SuccessStories />
        <WhyPartner />
      </main>
      <Footer />
    </>
  );
}
