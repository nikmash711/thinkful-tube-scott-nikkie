/*eslint-env jquery*/
/* global store, API*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const videoList = (function() {

  //Using the decorated object, return an HTML string containing all the expected
  const generateVideoItemHtml = function(video) {
    const base_video_url = 'https://www.youtube.com/watch?v=';
    const base_channel = 'https://www.youtube.com/channel/';
    return `
    <li data-video-id=${video.id}>
      <h3>${video.title}</h3>
      <a href ="${base_video_url}${video.id}" target = "_blank" ><img src="${video.thumbnail}" /> </a>
      <br>
      <a href = "${base_channel}${video.channel}" target = "_blank">More from this channel</a>
    </li>

    `;
  };

  //Using the tokens passed in, return either both buttons or just next 
  const generateButtonTokens = function(nextPageToken,prevPageToken){
    //put in a previous element only if it exists (if you go next then prev, it shouldnt have prev again bc its the first page - but it does FIX)
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

  //render the results li elements and also the buttons to the DOM 
  const render = function() {
    $('.results').html(store.videos.map(video=>generateVideoItemHtml(video)).join(''));
    $('.buttons').html(generateButtonTokens(store.nextToken, store.prevToken));
  };

  //event listener for when user searches and clicks go
  const handleFormSubmit = function() {
    $('form').submit(event =>{
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      //add searchTerm in the store 
      // $('#search-term').val('');
      
      //fetch videos with this searchterm
      API.fetchVideos(searchTerm, API.decorateResponse); //is this step e?
    });
  };

  //handles user clicking next button and fetching next videos
  const handleNextButtonSubmit = function(){
    $('.buttons').on('click', '.next', event =>{
      API.fetchNextVideos($('#search-term').val(), API.decorateResponse); //we need the searchTerm 
    });
  };

  //handles user clicking prev button and fetching prev videos
  const handlePrevButtonSubmit = function(){
    $('.buttons').on('click', '.prev', event =>{
      API.fetchPrevVideos($('#search-term').val(), API.decorateResponse); //we need the searchTerm 
    });
  };

  //bind all the event listeners so we can call it when the document loads
  function bindEventListeners() {
    handleFormSubmit();
    handleNextButtonSubmit();
    handlePrevButtonSubmit();
  }

  //these are the exposed values that we'll have to call elsewhere
  return {
    bindEventListeners,
    render
  };
})();
