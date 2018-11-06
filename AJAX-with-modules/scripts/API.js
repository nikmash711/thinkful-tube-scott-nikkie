/*eslint-env jquery*/
/* global store, videoList*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const API = (function(){
  const API_KEY = 'AIzaSyCRbaNBF08000E_9OCK8S8YOa8HPbBNGRE';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const fetchNextVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      pageToken: store.nextToken,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const fetchPrevVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      pageToken: store.prevToken,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const decorateResponse = function(response) {
    const decArr = response.items.map(item => {
      return{
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelId,
        thumbnail: item.snippet.thumbnails.default.url
      };
    });
    if (response.prevPageToken){
      store.updatePrevToken(response.prevPageToken);
    }
    //grab prev token if it exists 
    store.updateNextToken( response.nextPageToken);
    store.setVideos(decArr);
    videoList.render();
  };

  return {
    fetchVideos,
    fetchNextVideos,
    fetchPrevVideos,
    decorateResponse
  };
}());