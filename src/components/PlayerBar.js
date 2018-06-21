import React, {Component} from 'react';

class Playerbar extends Component {
    render() {
        return (
            <section className="player-bar">
                
                
                <section id="current-song">
                    <div className="song-playing">{this.props.currentSong.title}</div>
                    <div className="artist-playing">{this.props.currentArtist}</div>
                </section>

                <section id="time-control">
                    <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        // I do NOT understand this off the bat...
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                </section>

                <section id="button">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-skip-backward"></span>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <span className="ion-skip-forward"></span>
                    </button>
                </section>

                <section id="volume-control">
                    <div className="icon ion-volume-high"></div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={this.props.volume}
                        max="1"
                        min="0"
                        step=".001"
                        onChange={this.props.handleVolumeChange} 
                    />
                    <div className="icon ion-volume-low"></div>
                </section>
            </section>
        )
    }
}

export default Playerbar