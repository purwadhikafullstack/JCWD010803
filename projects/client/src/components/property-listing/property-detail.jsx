import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingWidget from "./booking-widgets";
import PlaceGallery from "./property-gallery";
import AddressLink from "../address-link";

export default function PlacePage() {
  const { id } = useParams();
  const [Place, setPlace] = useState(null);

  // Data statis sebagai gantinya
  const staticPlaceData = {
    title: "Big log cabin with panorama view",
    address: "Søndre Land, Innlandet, Norway",
    description:
      "A traditional wooden cabin on 101 square meters with panorama view over Randsfjorden. Make time for recreation with your friends and family. Here, it is room for everyone to enjoy and relax. The beach is just nearby and from the pier you can fish. The cabin is also ideal for families with an nearby activity area with volleyball court and climbing frame.",
    checkIn: "14 September 2023",
    checkOut: "17 September 2023",
    maxGuests: 5,
    extraInfo: `- 3 bedrooms,
      - 1 bathroom,
      - 2 living rooms,
      - Kitchen,
      - Laundry room,
      - A covered terrace that extends onto a large sun deck,
      - Parking spots`,
  };
  

  useEffect(() => {
    if (!id) {
      return;
    }
    //   axios.get(`/places/${id}`).then(response => {
    //     setPlace(response.data);
    //   });
    // }, [id]);
    //   Menggunakan data statis sebagai gantinya
    setPlace(staticPlaceData);
  }, [id]);

  if (!staticPlaceData) return "";

  return (
    <div className="mt-4 bg-gray-100 px-4 py-8">
      <h1 className="text-3xl">{staticPlaceData.title}</h1>
      <AddressLink>{staticPlaceData.address}</AddressLink>
      <PlaceGallery staticPlaceData={staticPlaceData} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">About this space</h2>
            {staticPlaceData.description}
          </div>
          Check-in: {staticPlaceData.checkIn}<br />
          Check-out: {staticPlaceData.checkOut}<br />
          Max number of guests: {staticPlaceData.maxGuests}
        </div>
        <div>
          <BookingWidget staticPlaceData={staticPlaceData} />
        </div>
      </div>
      <div className="bg-white px-4 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{staticPlaceData.extraInfo}</div>
      </div>
    </div>
  );
}
