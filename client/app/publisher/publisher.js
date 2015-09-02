'use strict';

angular.module('booksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publisher', {
        url: '/Publisher',
        templateUrl: 'app/publisher/publisher.html',
        controller: 'PublisherCtrl'
      });
  });