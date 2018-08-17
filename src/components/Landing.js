import React from 'react';

const Landing = () => (
  <section className="landing">
  <div className="hero">
    <form action="/library" id="listen">
      <input type="submit" value="Listen Now" />
    </form>
  </div>
    <h1 className="hero-title">Turn the Music Up!</h1>

    <section className="selling-points">
      <div className="point">
        <i class="icon ion-md-musical-notes"></i>
        <h2 className="point-title">Choose Your Music</h2>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <i class="icon ion-md-wifi"></i>
        <h2 className="point-title">Unlimited Streaming, Ad-Free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <i class="icon ion-md-phone-portrait"></i>
        <h2 className="point-title">Mobile-Enabled</h2>
        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing;