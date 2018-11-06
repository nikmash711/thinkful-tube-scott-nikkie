/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos = [
    //{}
  ];

  const nextToken = undefined;
  const prevToken = undefined;

  const updateNextToken = function(nextToken) {
    this.nextToken = nextToken;
  };

  const updatePrevToken = function(prevToken) {
    this.prevToken = prevToken;
  };

  const addVideosToStore = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    addVideosToStore,
    nextToken,
    prevToken, 
    updateNextToken,
    updatePrevToken
  };
}());
