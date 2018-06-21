import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      // adding this below (and comma above if removing)
      currentArtist: album.artist
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

   formatTime(time) {
    if (isNaN(time)) {
      return '-:--;'
    }
    const min = Math.floor(time/60);
    const seconds = Math.floor(time - min * 60);
    if (seconds < 10) {
      return `${min}:0${seconds}`
    } else {
      return `${min}:${seconds}`
    }
   }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }

  handleVolumeChange(t) {
    const newVolume = t.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }

  handleHoverOn(song) {
    this.setState({hovered: song});
  }

  handleHoverOff(song) {
    this.setState({hovered: null});
    // null or empty string
  }

  btnHandler(song, index) {
    const playBtn = <span className="ion-play"></span>;
    const pauseBtn = <span className="ion-pause"></span>;
    const isSameSong = this.state.currentSong === song;
    const played = this.state.currentSong;

    //if song is NOT playing and hovered, return playBtn
    //if song IS playing and hovered, return pauseBtn
    //else return index+1 for song#

    if (this.state.isPlaying === false && this.state.hovered === song)  {
      return playBtn;
    } else if (this.state.isPlaying === true && this.state.hovered === song && isSameSong) {
      return pauseBtn;
    } else {
      return (index +1);
    }


  }
     

  render() {
    return (
      <section className="album">
      <div className="container">
        <div id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </div>
        <PlayerBar 
          isPlaying={this.state.isPlaying} 
          currentSong={this.state.currentSong}
          // adding this below
          currentArtist={this.state.currentArtist}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(t) => this.handleVolumeChange(t)}
          formatTime={(time) => this.formatTime(time)}
        />
      </div>
        <div className="list">
          <table id="song-list">
            <colgroup>
              <col id="song-number-column"/>
              <col id="song-title-column"/>
              <col id="song-duration-column"/> 
            </colgroup>
            <tbody>
              {this.state.album.songs.map ((song, index) => 
                  <tr key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleHoverOn(song)} onMouseLeave={() => this.handleHoverOff(song)}>
                    <td> {this.btnHandler(song, index)} </td>
                    <td className="song">{song.title}</td>
                    <td>{this.formatTime(song.duration)}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Album;