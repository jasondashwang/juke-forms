'use strict';

juke.controller('newPlaylistController', function($scope, $state, PlaylistFactory){

  $scope.sendNewPlaylist = function(data){
    PlaylistFactory.create(data)
    .then(function(newPlaylist){
      $state.go('playlist', {playlistId: newPlaylist.id});
    });
    $scope.playlist = null;
    $scope.newPlaylistForm.$setPristine();

  };


});


juke.controller('PlaylistCtrl', function($scope, $stateParams, SongFactory, PlaylistFactory, PlayerFactory){
  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  PlaylistFactory.fetchById($stateParams.playlistId)
  .then(function(playlist){
    $scope.playlist = playlist;
    $scope.playlist.songs.forEach(function(song){
      SongFactory.convert(song);
    });
  });

  SongFactory.fetchAll()
  .then(function(songs){
    $scope.songs = songs;
  });


  $scope.addNewSongToPlaylist = function(song){
    PlaylistFactory.addSongToPlaylist($scope.playlist, song)
    .then(function(newSong){
      $scope.playlist.songs.push(newSong);
    });
    $scope.newSong = null;
    $scope.addNewSongForm.$setPristine();
  };

});
