"use strict";

juke.config(function($stateProvider){
  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/createPlaylist.html',

    controller: 'newPlaylistController'
  })

  .state('playlist', {
    url: '/playlists/:playlistId',
    templateUrl: '/js/playlist/templates/playlist.html',

    controller: 'PlaylistCtrl'
  });
});
