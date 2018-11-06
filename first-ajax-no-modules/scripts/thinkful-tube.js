/*eslint-env jquery*/
/* global store*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const thinkfulTube = (function() {

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
    console.log(response);
    const decArr = response.items.map(item => {return{
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
    store.addVideosToStore(decArr);
    render();
  };

  const generateVideoItemHtml = function(video) {
    const base_video_url = 'https://www.youtube.com/watch?v=';
    const base_channel = 'https://www.youtube.com/channel/';
    return `
    <li data-video-id=${video.id}>
      <h3>${video.title}</h3>
      <a href ="${base_video_url}${video.id}" target = "_blank" ><img src="${video.thumbnail}" /> </a>
      <br>
      <a href = "${base_channel}${video.channel}">More from this channel</a>
    </li>

    `;
  };

  const generateButtonTokens = function(nextPageToken,prevPageToken){
    //put in a previous element only if it exists
    console.log(prevPageToken);
    if (prevPageToken){
      return `
      <button class = "prev" data-next-id = "${prevPageToken}"> Previous</button>
      <button class = "next" data-next-id = "${nextPageToken}"> Next</button>
    `;
    }
    return `
      <button class = "next" data-next-id = "${nextPageToken}"> Next</button>
    `;
  };

  const render = function() {
    //console.log(store.videos);
    $('.results').html(store.videos.map(video=>generateVideoItemHtml(video)).join(''));
    $('.buttons').html(generateButtonTokens(store.nextToken, store.prevToken));
  };


  const handleFormSubmit = function() {
    $('form').submit(event =>{
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      //add searchTerm in the store 
      // $('#search-term').val('');
      fetchVideos(searchTerm, decorateResponse); //is this step e?
    });
  };

  const handleNextButtonSubmit = function(){
    $('.buttons').on('click', '.next', event =>{
      // event.preventDefault();
      //we want to somehow use the data-nexttoken to render the next page. But how do we do that using the token?
      fetchNextVideos($('#search-term').val(), decorateResponse); //we need the searchTerm 
    });
  };

  const handlePrevButtonSubmit = function(){
    $('.buttons').on('click', '.prev', event =>{
      // event.preventDefault();
      //we want to somehow use the data-nexttoken to render the next page. But how do we do that using the token?
      fetchPrevVideos($('#search-term').val(), decorateResponse); //we need the searchTerm 
    });
  };

  function bindEventListeners() {
    handleFormSubmit();
    handleNextButtonSubmit();
    handlePrevButtonSubmit();
  }

  return {
    bindEventListeners,
  };
})();
