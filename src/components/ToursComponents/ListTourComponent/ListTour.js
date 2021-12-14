import React from "react"
import './ListTour.css'
import TourItems from "../TourItemsComponent/TourItems"

export default function ListTour({tours}) {

    return (
        <div className="list-tour-section">
            {
                tours.map(tour => (
                    <TourItems 
                        key={tour.id}
                        id={tour.id}
                        name={tour.name}
                        image={tour.image}
                        time={tour.time}
                        startDate={tour.start_date}
                        traffic={tour.traffic}
                        destination={tour.destination.name}
                        price={tour.price}
                        avg_rating = {tour.ratings}
                        views = {tour.views}
                    />
                ))
             }
        </div>
    )
}