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
                        <i class="icon ion-md-skip-backward"></i>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <i className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></i>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <i class="icon ion-md-skip-forward"></i>
                    </button>
                </section>

                <section id="volume-control">
                    <div><i class="icon ion-md-volume-up"></i></div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={this.props.volume}
                        max="1"
                        min="0"
                        step=".001"
                        onChange={this.props.handleVolumeChange} 
                    />
                    <i class="icon ion-md-volume-down"></i>
                </section>
                <script src="https://unpkg.com/ionicons@4.2.4/dist/ionicons.js"></script>
            </section>
        )
    }
}

export default Playerbar