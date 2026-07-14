import { HotelType } from "../../../shared/types";
import { MapPin, Calendar, Moon, Users } from "lucide-react";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-5 rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Your Booking Details</h2>
      
      {/* Location */}
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-sm text-gray-500 block font-medium">Location</span>
          <span className="font-bold text-gray-900">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <span className="text-sm text-gray-500 block font-medium">Check-in</span>
            <span className="font-bold text-gray-900">{checkIn.toDateString()}</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
          <div>
            <span className="text-sm text-gray-500 block font-medium">Check-out</span>
            <span className="font-bold text-gray-900">{checkOut.toDateString()}</span>
          </div>
        </div>
      </div>

      {/* Length of Stay */}
      <div className="flex items-start gap-3 border-t pt-4">
        <Moon className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-sm text-gray-500 block font-medium">Total length of stay</span>
          <span className="font-bold text-gray-900">{numberOfNights} night{numberOfNights > 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-start gap-3 border-t pt-4">
        <Users className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-sm text-gray-500 block font-medium">Guests</span>
          <span className="font-bold text-gray-900">
            {adultCount} adult{adultCount > 1 ? "s" : ""} & {childCount} child{childCount !== 1 ? "ren" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;