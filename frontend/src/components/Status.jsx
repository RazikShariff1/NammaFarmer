import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import WeatherAy from "./WeatherAy";

export default function Status() {
  return (
    <div style={{ width: "70vw" }}>
      <h1 className="text-2xl font-semibold">Status</h1>
      <p className="text-gray-700 mt-2">View your current status and updates.</p>

      {/* Bootstrap Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide mt-8" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/800x400"
              className="d-block w-100"
              alt="First Slide"
              style={{ height: "300px", objectFit: "cover" }}  // Set fixed height and object-fit
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First Slide Label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/800x400"
              className="d-block w-100"
              alt="Second Slide"
              style={{ height: "300px", objectFit: "cover" }}  // Set fixed height and object-fit
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second Slide Label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/800x400"
              className="d-block w-100"
              alt="Third Slide"
              style={{ height: "300px", objectFit: "cover" }}  // Set fixed height and object-fit
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third Slide Label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <WeatherAy/>
    </div>
  );
}
