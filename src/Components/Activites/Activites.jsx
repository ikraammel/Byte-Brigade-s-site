import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './ActivitiesCarousel.css';
import ImageModal from './ImageModal';

const activities = [
  {
    title: "Microsoft Generative AI – YouCode",
    date: "31 Mai 2025",
    images: [
      "activites/generative1.jpg",
      "activites/generative3.jpg",
      "activites/generative4.jpg"
    ],
    video: [
      "activites/generative2.mp4"
    ]
  },
  {
    title: "Visite – Gitex Africa",
    date: "14-15 Avril 2025",
    images: [
      "activites/gitex1.jpg",
      "activites/gitex2.jpg",
      "activites/gitex3.jpg"
    ],
    video: [
      "activites/gitex3.mp4",
    ]
  },
  {
    title: "Conférence IA : Menace ou Opportunité",
    date: "24 Février 2025",
    images: [
      "activites/conference1.jpg",
      "activites/conference2.jpg",
    ],
    video: [
      "activites/conference3.mp4"
    ]
  },
  {
    title: "Science Week – UM6P",
    date: "21 Février 2025",
    images: [
      "activites/UM6P1.jpg",
      "activites/UM6P2.jpg",
      "activites/UM6P3.jpg",
      "activites/UM6P4.jpg"
    ],
    video: [
      "activites/UM6P5.mp4"
    ]
  },
  {
    title: "Geeks Blabla – YouCode",
    date: "22 Février 2025",
    images: [
      "activites/geeks1.jpg",
      "activites/geeks2.jpg",
      "activites/geeks3.jpg",
      "activites/geeks4.jpg"
    ],
    video: [
      "activites/geeks5.mp4"
    ]
  },
  {
    title: "Journée RH dans l'IT – YouCode",
    date: "16 Janvier 2025",
    images: [
      "activites/IT1.jpg",
      "activites/IT2.jpg",
      "activites/IT3.jpg"
    ]
  },
  {
    title: "Journée numérique – Alliance Française",
    date: "30 Novembre 2024",
    images: [
      "activites/alliance1.jpg",
      "activites/alliance2.jpg",
      "activites/alliance3.jpg",
      "activites/alliance4.jpg"
    ]
  },
  {
    title: "Conférence Employabilité – RH YouCode",
    date: "9 Novembre 2024",
    images: ["activites/employabilite.jpg"],
    video: "activites/employabilite.mp4"
  }
];

function Activites() {

  const [modalIndex, setModalIndex] = useState(null);
  const [modalImages, setModalImages] = useState([]);


  return (
    <div className="container py-5">
      <h2 className="text-white text-center mb-5">Nos Activités</h2>
      <div className="row g-4">
        {activities.map((activity, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="activity-carousel-card p-3 rounded">
              
              <Carousel interval={null} controls={true} indicators={false} className="custom-carousel">
                {activity.images.map((img, i) => (
                  <Carousel.Item key={`img-${i}`}>
                    <div className="carousel-img-wrapper position-relative">
                      <img src={img} alt="" className="carousel-img w-100 rounded" />
                      <button
                        className="fullscreen-btn"
                        onClick={() => {
                        setModalImages([...(activity.images || []), ...(activity.video || [])]);
                        setModalIndex(i);                // index cliqué
                      }}

                        title="Agrandir l'image"
                      >
                        ⛶
                      </button>
                    </div>
                  </Carousel.Item>
                ))}


                {Array.isArray(activity.video) &&
  activity.video.map((vid, vIdx) => (
    <Carousel.Item key={`vid-${vIdx}`}>
      <div className="carousel-video-wrapper">
        <video
          controls
          className="w-100 rounded"
          style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
        >
          <source src={vid} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
      </div>
    </Carousel.Item>
))}

              </Carousel>

              <div className="mt-3">
                <h5 className="text-white">{activity.title}</h5>
                <p className="text-light">{activity.date}</p>
                {modalIndex !== null && (
                  <ImageModal
                    show={modalIndex !== null}
                    src={modalImages[modalIndex]}
                    onHide={() => setModalIndex(null)}
                    images={modalImages}
                    index={modalIndex}
                    setIndex={setModalIndex}
                  />

                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activites;
