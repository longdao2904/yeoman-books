'use strict';

angular.module('booksApp')
  .controller('PublisherCtrl', function ($scope, $http, socket) {
    $scope.publishers = [];

    // Grid options
    $scope.gridOptions = {};
    $scope.gridOptions.enableCellEditOnFocus = true;

    $scope.gridOptions = {
      enableFiltering: true,
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.doneEditing);
      },
      paginationPageSizes: [5, 10, 15],
      paginationPageSize: 5,
      columnDefs: [
        { name: 'name' }
      ]
    };

    // #region CRUD
    $http.get('/Publisher/').success(function (publishers) {
      $scope.publishers = publishers.value;
      $scope.gridOptions.data = publishers.value;
      socket.syncUpdates('publisher', $scope.publishers, function (event, publisher, publishers) { }); // jshint ignore:line
    });

    // add new publisher into database
    $scope.addPublisher = function () {
      $http.post('/Publisher/', { name: $scope.pName });
      $scope.pName = '';
    };

    // begin editing a publisher, save the original in case of cancel
    $scope.editPublisher = function (publisher) {
      publisher.editing = true;
    };

    // update when done editing
    $scope.doneEditing = function (publisher) {
      publisher.editing = false;
      $http.put('/Publisher/' + publisher._id, publisher);
    };

    // remove a publisher from database
    $scope.removePublisher = function (publisher) {
      $http.delete('/Publisher/' + publisher._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('publisher');
    });
    // #endregion CRUD
  });