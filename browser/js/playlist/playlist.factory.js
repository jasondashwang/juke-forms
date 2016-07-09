'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory){

  var savedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.create = function (playlistJSON){
    return $http.post('/api/playlists', playlistJSON)
    .then(function(res){
      savedPlaylists.push(res.data);
      return res.data;
    });
    //
  };

  PlaylistFactory.fetchAll = function(){
    return $http.get('/api/playlists')
    .then(function(res){
      angular.copy(res.data, savedPlaylists);
      return savedPlaylists;
    });
  };

  PlaylistFactory.fetchById = function(id){
    return $http.get('/api/playlists/' + id)
    .then(function(res){
      return res.data;
    });
  };

  PlaylistFactory.addSongToPlaylist = function(playlist, song){
    return $http.post('/api/playlists/' + playlist.id + '/songs', song)
    .then(function(res){
      return SongFactory.convert(res.data);
    });
  };

  return PlaylistFactory;
});
