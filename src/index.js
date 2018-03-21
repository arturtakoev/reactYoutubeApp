import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


import YTSearch from 'youtube-api-search';
import _ from 'lodash';

const API_KEY = 'AIzaSyDNP7_AnKbKqrXDjrJA2beGbfH34bCyzW0';



//Create a new component

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('manutd');

    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce( (term) => {this.videoSearch(term)}, 400 )
        return (
            <div>
                <SearchBar videoSearch={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>
        );
    }

}

//Put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));
