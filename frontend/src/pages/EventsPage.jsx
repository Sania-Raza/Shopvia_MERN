import React from "react";
import { useSelector } from "react-redux";
import { PiConfettiThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents = [], isLoading } = useSelector(
    (state) => state.events || {},
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FDFBF7] min-h-screen">
          <Header activeHeading={4} />

          {allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-25 px-4">
              <div className="w-20 h-20 rounded-full bg-[#1E1B4B]/5 flex items-center justify-center mb-5">
                <PiConfettiThin size={38} className="text-[#1E1B4B]" />
              </div>

              <h2 className="text-[20px] font-semibold text-[#1E1B4B] mb-1.5">
                No events right now
              </h2>

              <p className="text-[14px] text-gray-500 text-center max-w-87.5 mb-6">
                Sellers haven't launched any events yet. Check back soon, or
                browse our full catalog in the meantime.
              </p>

              <Link to="/products">
                <button className="bg-[#1E1B4B] hover:bg-[#141130] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors">
                  Browse Products
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
