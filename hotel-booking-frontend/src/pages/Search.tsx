import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import useSearchContext from "../hooks/useSearchContext"; // Corrected import path and default import syntax to match the hook!
import * as apiClient from "../api-client";
import { useState, useEffect } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const [urlSearchParams] = useSearchParams();
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("" );

  // Get search params directly from URL to completely eliminate asynchronous context state delay on first click!
  const destination = urlSearchParams.get("destination") || "";
  const checkIn = urlSearchParams.get("checkIn") || "";
  const checkOut = urlSearchParams.get("checkOut") || "";
  const adultCount = urlSearchParams.get("adultCount") || "1";
  const childCount = urlSearchParams.get("childCount") || "0";

  // Sync URL search params back to search context in background to keep other components aligned
  useEffect(() => {
    if (checkIn && checkOut) {
      search.saveSearchValues(
        destination,
        new Date(checkIn),
        new Date(checkOut),
        parseInt(adultCount, 10),
        parseInt(childCount, 10)
      );
    }
  }, [destination, checkIn, checkOut, adultCount, childCount]);

  const searchParams = {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isLoading } = useQuery(
    ["searchHotels", searchParams], 
    () => apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((type) => type !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  const handleClearFilters = () => {
    setSelectedStars([]);
    setSelectedHotelTypes([]);
    setSelectedFacilities([]);
    setSelectedPrice(undefined);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 bg-white h-fit sticky top-10">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-300 pb-5">
            <h3 className="text-lg font-semibold">Filter by:</h3>
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          </div>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center h-10">
          <span className="text-xl font-bold">
            {isLoading ? (
              <span className="text-gray-400 animate-pulse">Finding perfect stays...</span>
            ) : (
              <>
                {hotelData?.pagination.total || 0} Hotels found
                {destination ? ` in ${destination}` : ""}
              </>
            )}
          </span>
          {!isLoading && (
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (Low to High)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (High to Low)
              </option>
            </select>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white border rounded-lg shadow-sm">
            {/* Spinning Loader Icon */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Searching for perfect hotels...</p>
            <p className="text-sm text-gray-400 mt-1">Please wait while we fetch the latest deals for {destination || "you"}</p>
          </div>
        ) : (
          <>
            {hotelData?.data.map((hotel) => (
              <SearchResultsCard key={hotel._id} hotel={hotel} />
            ))}
            {(!hotelData || hotelData.data.length === 0) && (
              <div className="flex flex-col items-center justify-center py-10 bg-white border rounded-lg">
                <p className="text-lg font-semibold text-gray-700">No hotels found</p>
                <p className="text-sm text-gray-500 mt-2">
                  {destination ? (
                    <>
                      We couldn't find any hotels in{" "}
                      <span className="font-medium">{destination}</span>
                      {selectedStars.length > 0 && (
                        <> with {selectedStars.join(", ")} star rating</>
                      )}
                      {selectedPrice && <> under ₹{selectedPrice} per night</>}.
                    </>
                  ) : (
                    <>
                      We couldn't find any hotels matching your criteria
                      {selectedStars.length > 0 && (
                        <> with {selectedStars.join(", ")} star rating</>
                      )}
                      {selectedPrice && <> under ₹{selectedPrice} per night</>}.
                    </>
                  )}
                </p>
              </div>
            )}
          </>
        )}

        {!isLoading && (
          <div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;