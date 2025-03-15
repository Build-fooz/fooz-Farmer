import React from "react";
import CloudUpload from "../../assets/images/HomePage/cloud-upload.png";

export default function PartnerRegistration() {
  return (
    <section id="register" className="bg-white py-10">
      <div className="text-center text-2xl font-bold">
        Register as a Partner Farmer
      </div>
      <p className="my-8 text-center text-xl text-gray-500">
        Join our growing community of sustainable farmers
      </p>
      <form
        className="mx-auto w-[95vw] max-w-[50rem]"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log(formData);
        }}
      >
        <div className="my-6 flex justify-center flex-col md:flex-row">
          <label className="flex flex-1 flex-col items-start px-4 mb-2">
            Full name
            <input
              type="text"
              name="name"
              className="w-full border-2 border-gray-300 px-4 py-2"
              placeholder="John Doe"
            />
          </label>
          <label className="flex flex-1 flex-col items-start px-4">
            Phone number
            <input
              type="text"
              name="phone-number"
              className="w-full border-2 border-gray-300 px-4 py-2"
              placeholder="+1 (555) 000-0000"
            />
          </label>
        </div>
        <div className="my-6 flex justify-center flex-col md:flex-row">
          <label className="flex flex-1 flex-col items-start px-4 mb-4">
            E-mail address
            <input
              type="email"
              name="email"
              className="w-full border-2 border-gray-300 px-4 py-2"
              placeholder="johndoe@example.com"
            />
          </label>
          <label className="flex flex-1 flex-col items-start px-4">
            Farm Location
            <input
              type="text"
              name="farm-location"
              className="w-full border-2 border-gray-300 px-4 py-2"
              placeholder="City, State"
            />
          </label>
        </div>
        <div className="my-6 flex justify-center">
          <label className="flex flex-1 flex-col items-start px-4">
            Farm Size (acres)
            <input
              type="number"
              name="farm-size"
              className="w-full border-2 border-gray-300 px-4 py-2"
              placeholder="johndoe@example.com"
            />
          </label>
        </div>
        <p className="px-4">Products You Grow</p>
        <div className="my-2 flex justify-evenly flex-col md:flex-row">
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="organic-vegetables"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Organic vegetables
          </label>
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="honey"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Honey
          </label>
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="cloves"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Cloves
          </label>
        </div>
        <div className="mb-6 flex justify-evenly flex-col md:flex-row">
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="red-chillis"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Red chillis
          </label>
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="coffee"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Coffee
          </label>
          <label className="flex flex-1 items-center px-4">
            <input
              type="checkbox"
              name="products-grown"
              value="other-spices"
              className="border-2 border-gray-300 px-4 py-2"
            />
            &nbsp; Other Spices
          </label>
        </div>
        <div className="my-6 w-full px-4">
          <p className="mb-2">Upload Farm Certificates</p>
          <label
            htmlFor="certificates"
            className="block w-full border-2 border-dashed border-gray-400 bg-[magnta] px-4 py-6 text-center"
          >
            <img
              src={CloudUpload}
              alt="Cloud upload icon"
              className="mx-auto h-10"
            />
            <p>
              <span className="font-bold">Upload a file</span>
              <span className="text-gray-500"> or drag and drop</span>
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, PDF upto 10MB</p>
          </label>
          <input
            type="file"
            id="certificates"
            name="certificate"
            accept="application/pdf;images/jpg"
            className="hidden"
          />
        </div>
        <div className="w-full px-4">
          <button className="w-full cursor-pointer rounded bg-black py-2 text-white">
            Submit Registration
          </button>
        </div>
      </form>
    </section>
  );
}
