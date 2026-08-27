import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../Events/EventCard";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";

const EventsPage = () => {
  const { allEvents = [], isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />

          {allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <h2 className="text-center py-10">No Events Available</h2>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
