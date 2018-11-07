/*eslint-env jquery*/
/* global store, videoList*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const API = (function(){
  const API_KEY = 'AIzaSyCRbaNBF08000E_9OCK8S8YOa8HPbBNGRE';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  //* Async function, responsible for calling the Youtube API with jQuery, constructing the correct query object, and passing along the callback into the AJAX call
  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
    // Make a getJSON call using the BASEURL + query object we constructed and sending the provided callback in as the last argument
  };

  //This async function will be called when we hit next button so it can pass in the pageToken 
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

  //This async function will be called when we hit previious button so it can pass in the pageToken 
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

  // Uses Youtube API response to create an array of "decorated" video objects
  const decorateResponse = function(response) {
    //map through the response.items array and pick out what we want, capture it in a variable, and set our videos n store to that variable. Then render. 
    //Also update the tokens if necassary 
    const decArr = response.items.map(item => {
      return{
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelId,
        thumbnail: item.snippet.thumbnails.default.url
      };
    });

    //if there's a prevToken, grab that value too and update it 
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