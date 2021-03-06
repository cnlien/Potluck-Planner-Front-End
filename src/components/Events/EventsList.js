import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./EventsList.scss";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
// import {axiosWithAuth} from "../../utils/axiosWithAuth";
export default function EventsList() {
  //Will eventually comment out to use imported axiosWithAuth
  const axiosWithAuth = () =>
    axios.create({
      baseURL: "https://potluck-planner-bw.herokuapp.com/events/",
      headers: {
        authorization: localStorage.getItem("token")
      }
    });

  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("")
      .then(res => {
        // console.log(res.data);
        setEvents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // console.log(events[0]);
  return (
    <div className="mainEventsList">
      <Sidebar />
      {[...events].reverse().map(event => (
        <div className="EventCardDiv">
          <EventCard event={event} id={event.event_id} />
          <Link to={`/Events/${event.event_id}`}>
            <p className="eventDetailsLink">View Event Details</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
