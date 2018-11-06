/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos = [
    //{}
  ];

  // const tokens = [
  //
  // ];

  const updateTokens = function() {

  };

  const addVideosToStore = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    addVideosToStore,
  };
}());
