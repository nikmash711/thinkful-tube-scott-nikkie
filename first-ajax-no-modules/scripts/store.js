/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {
  const videos= [
    //{}
  ];

  const addVideosToStore = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    addVideosToStore,
  };
}());
