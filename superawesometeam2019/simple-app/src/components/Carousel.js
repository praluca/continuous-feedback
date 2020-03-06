import React, { Component } from 'react'

class Carousel extends Component {

  render() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner bg-dark">
            <div className="carousel-item active">
                <p className="text-light text-center">SuperAwesomeTeam members:</p>
                <p className="text-light text-center">Pavel Mihaela</p>
                <p className="text-light text-center">Pistol Georgiana</p>
                <p className="text-light text-center">Plesa Iulia</p>
                <p className="text-light text-center">Popa Raluca</p>
                <p className="text-light text-center">Popescu Ionut-Alexandru</p>
            </div>
            <div className="carousel-item">
                <p className="text-light text-center">Sign in and get instantaneous feedback from you audience in real time!</p>
            </div>
            <div className="carousel-item">
                <p className="text-light text-center">Keep your events save, see your last feedbacks and improve your presentation skill!</p>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
        </div>
    )
  }
}

export default Carousel