import React from "react";
import Honey from "../../assets/images/HomePage/honey.png";
import Spices from "../../assets/images/HomePage/spices.png";
import Vegetables from "../../assets/images/HomePage/vegetables.png";

export default function Categories() {
  return (
    <section className="flex flex-col items-center py-16">
      <h6 className="mb-2 text-3xl font-bold">Our Product Categories</h6>
      <p className="mb-4 text-gray-500 text-center md:text-left">
        Discover the range of products you can sell through our platform
      </p>
      <div className="flex md:px-20 px-2 flex-col md:flex-row">
        <div className="m-2 flex-1 rounded-xl bg-white p-6">
          <div className="w-full rounded-lg">
            <img
              src={Vegetables}
              alt="Vegetables stock image"
              className="min-h-full min-w-full rounded-xl"
            />
            <p className="py-2 text-lg font-bold">Organic Products</p>
            <p className="font-medium text-gray-500">
              Fresh, certified organic vegetables and fruits grown with
              sustainable practices
            </p>
            <a
              href="#"
              className="my-2 block w-full rounded-lg border p-2 text-center"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="m-2 flex-1 rounded-xl bg-white p-6">
          <div className="w-full rounded-lg">
            <img
              src={Honey}
              alt="Vegetables stock image"
              className="min-h-full min-w-full rounded-xl"
            />
            <p className="py-2 text-lg font-bold">Honey Products</p>
            <p className="font-medium text-gray-500">
              Pure, natural honey and related products from our partner
              beekeepers.
            </p>
            <a
              href="#"
              className="my-2 block w-full rounded-lg border p-2 text-center"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="m-2 flex-1 rounded-xl bg-white p-6">
          <div className="w-full rounded-lg">
            <img
              src={Spices}
              alt="Vegetables stock image"
              className="min-h-full min-w-full rounded-xl"
            />
            <p className="py-2 text-lg font-bold">Spices and coffee</p>
            <p className="font-medium text-gray-500">
              Premium quality spices and coffee beans from certified farmers.
            </p>
            <a
              href="#"
              className="my-2 block w-full rounded-lg border p-2 text-center"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
