import React from 'react';
import RecCard from './RecCard';

export default function CarouselFoods() {
  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item py-5 active">
          <div className="row">
            <RecCard index="0" type="foods" />
            <RecCard index="1" type="foods" />
          </div>
        </div>
        <div className="carousel-item py-5">
          <div className="row">
            <RecCard index="2" type="foods" />
            <RecCard index="3" type="foods" />
          </div>
        </div>
        <div className="carousel-item py-5">
          <div className="row">
            <RecCard index="4" type="foods" />
            <RecCard index="5" type="foods" />
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
