/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos = []; 
  // We want our store to hold an array of "decorated" video objects - i.e. objects that
  // have been transformed into ONLY the necessary data we're displaying on our page. 
  // (Removes extraneous dataset from Youtube.)

  //we need to store the previous and next tokens for the buttons
  const nextToken = '';
  const prevToken = '';

  //we need functions to update the next and previous buttons
  const updateNextToken = function(nextToken) {
    this.nextToken = nextToken;
  };

  const updatePrevToken = function(prevToken) {
    this.prevToken = prevToken;
  };

  //recieves videos and sets it to this.videos
  const setVideos = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    setVideos,
    nextToken,
    prevToken, 
    updateNextToken,
    updatePrevToken
  };
}());
