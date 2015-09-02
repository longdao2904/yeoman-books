'use strict';

angular.module('booksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('book', {
        url: '/Book',
        templateUrl: 'app/book/book.html',
        controller: 'BookCtrl'
      })
      .state('detail', {
        url: '/Book/:id',
        templateUrl: 'app/book/bookDetail.html',
        controller: 'BookCtrl'
      });
  });