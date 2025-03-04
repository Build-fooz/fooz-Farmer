import React from "react";
import { useEffect } from "react";

import MichaelJackson from "../../assets/images/HomePage/MichaelJackson.jpg";
import SarahWilliam from "../../assets/images/HomePage/sarahwilliam.jpg";
import StarFill from "../../assets/images/HomePage/star-fill.svg";
import StarEmpty from "../../assets/images/HomePage/star-empty.svg";

export default function SuccessStories() {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);
  const stories = [
    {
      name: "Michael Jackson",
      designation: "Organic Vegetable Farmer",
      story:
        "Partnering with FoozFoods has transformed my farming business. Their platform made it easy to reach new customers and get better prices for my organic produce.",
      rating: 3,
      partnerSince: 2021,
      photographURL: MichaelJackson,
    },
    {
      name: "Sarah Williams",
      designation: "Honey Producer",
      story:
        "The support and guidance from FoozFood has been invaluable. They helped me expand my honey business and connect with customers who value quality products.",
      rating: 5,
      partnerSince: 2019,
      photographURL: SarahWilliam,
    },
  ];

  return (
    <section className="bg-white py-6">
      <p className="my-4 text-center text-3xl font-bold">
        Farmer Success stories
      </p>
      <p className="text-center text-gray-600">
        Hear from our partner farmers about their experience.
      </p>
      <div className="flex overflow-x-scroll p-8">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="h-5-6 mx-3 w-1/3 rounded-xl bg-gray-100 p-4"
          >
            <div className="flex items-center">
              <img
                src={story.photographURL}
                alt={`${story.name} photo`}
                className="mr-4 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-bold">{story.name}</p>
                <p className="text-sm text-gray-500">{story.designation}</p>
              </div>
            </div>
            <p className="my-2 text-gray-600">&quot;{story.story}&quot;</p>
            <div className="mt-4 flex items-center">
              {Array.from({ length: story.rating }, (_, index) => (
                <img
                  src={StarFill}
                  alt="star"
                  className="mx-0.5 h-5"
                  key={index}
                />
              ))}
              {Array.from({ length: 5 - story.rating }, (_, index) => (
                <img
                  src={StarEmpty}
                  alt="star"
                  className="mx-0.5 h-5"
                  key={index}
                />
              ))}
              <p className="mx-4 text-gray-600">
                Partner since {story.partnerSince}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
