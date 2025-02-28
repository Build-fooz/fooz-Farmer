import React from "react";
import Chilli from "../../assets/images/HomePage/chilli.svg";
import Coffee from "../../assets/images/HomePage/coffee.svg";
import Honey from "../../assets/images/HomePage/honey.svg";
import PlantFill from "../../assets/images/HomePage/plant-fill.svg";

export default function SourcesProducts() {
  return (
    <section id="products" className="py-10">
      <div className="mb-6 text-center text-3xl font-bold">
        Products We Source
      </div>
      <div className="grid grid-cols-4">
        <div className="m-4 flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white py-10">
          <img src={PlantFill} alt="Plant icon" className="h-10" />
          <p className="text-center text-xl font-bold">Organic Products</p>
          <p className="text-center text-gray-500">
            Fresh vegetables, fruits and grains
          </p>
        </div>
        <div className="m-4 flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white py-10">
          <img src={Honey} alt="Honey jar icon" className="h-10" />
          <p className="text-center text-xl font-bold">Honey</p>
          <p className="text-center text-gray-500">
            Pure and natural honey products
          </p>
        </div>
        <div className="m-4 flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white py-10">
          <img src={Chilli} alt="Chilli icon" className="h-10" />
          <p className="text-center text-xl font-bold">Spices</p>
          <p className="text-center text-gray-500">
            Fresh vegetables, fruits and grains
          </p>
        </div>
        <div className="m-4 flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white py-10">
          <img src={Coffee} alt="Coffee icon" className="h-10" />
          <p className="text-center text-xl font-bold">Coffee</p>
          <p className="text-center text-gray-500">Specialty coffee beans</p>
        </div>
      </div>
    </section>
  );
}
