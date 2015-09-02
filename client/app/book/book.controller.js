'use strict';

angular.module('booksApp')
  .controller('BookCtrl', function ($scope, $http, socket) {
    $scope.books = [];
    $scope.publishers = [];
    var mode = 'none';

    // Toggle add more book view
    $scope.toggleAddMore = function () {
      mode = 'new';
      $scope.bName = '';
      $scope.bAuthor = '';
      $scope.bDesc = '';
      $scope.bISBN = '';
      $scope.bDate = '';
      $scope.bPages = '';
      $scope.selectedPublisherId = '';
    };

    // Dismiss book detail view
    $scope.dismiss = function () {
      mode = 'none';
    };

    // Toogle delete confirm button
    $scope.toggleDelete = function () {
      mode = 'deleting';
    };

    // Grid options
    $scope.gridOptions = {};
    $scope.gridOptions.enableCellEditOnFocus = true;

    $scope.gridOptions = {
      enableFiltering: true,
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveChanges);
        $scope.gridApi.grid.options.multiSelect = false;
      },
      paginationPageSizes: [5, 10, 15],
      paginationPageSize: 5,
      columnDefs: [
        { name: 'name' },
        { name: 'author' },
        { name: 'description' },
        { displayName: 'ISBN', name: 'isbn' },
        { displayName: 'Published on', field: 'publishedDate', cellFilter: 'date:\dd-MM-yyyy', enableCellEdit: false },
        { displayName: 'Number of pages', field: 'numberOfPages', type: 'number' },
        { displayName: 'Publisher', field: 'publisher.name', enableCellEdit: false }
      ]
    };

    // Get list of Books
    $http.get('/Book/').success(function (books) {
      $scope.books = books.value;
      $scope.gridOptions.data = books.value;
      socket.syncUpdates('book', $scope.books);
    });

    // Get list of Publishers for references
    $http.get('/Publisher/').success(function (publishers) {
      $scope.publishers = publishers.value;
      socket.syncUpdates('publisher', $scope.publishers, function (event, publisher, publishers) { // jshint ignore:line
      });
    });

    // View Book's detail
    $scope.viewDetail = function () {
      mode = 'editing';
      $scope.selectedItems = $scope.gridApi.selection.getSelectedRows();
      $scope.bName = $scope.selectedItems[0].name;
      $scope.bAuthor = $scope.selectedItems[0].author;
      $scope.bDesc = $scope.selectedItems[0].description;
      $scope.bISBN = $scope.selectedItems[0].isbn;
      $scope.bDate = new Date($scope.selectedItems[0].publishedDate.toString());
      $scope.bPages = $scope.selectedItems[0].numberOfPages;
      $scope.selectedPublisherId = $scope.selectedItems[0].publisher._id;
    };

    // Add new book
    $scope.addBook = function () {
      $http.post('/Book/',
        {
          name: $scope.bName,
          author: $scope.bAuthor,
          description: $scope.bDesc,
          isbn: $scope.bISBN,
          publishedDate: Date.parse($scope.bDate),
          numberOfPages: $scope.bPages,
          publisher: $scope.selectedPublisherId
        });
      $scope.bName = '';
      $scope.bAuthor = '';
      $scope.bDesc = '';
      $scope.bISBN = '';
      $scope.bDate = '';
      $scope.bPages = '';
      $scope.selectedPublisherId = '';
    };

    // Update book information
    $scope.saveChanges = function (selectedItem) {
      var updatedBook = {
        name: $scope.bName,
        author: $scope.bAuthor,
        description: $scope.bDesc,
        isbn: $scope.bISBN,
        publishedDate: Date.parse($scope.bDate),
        numberOfPages: $scope.bPages,
        publisher: $scope.selectedPublisherId
      };
      $http.put('/Book/' + selectedItem[0]._id, updatedBook);
    };

    // Delete a book
    $scope.deleteBook = function (selectedItem) {
      $http.delete('/Book/' + selectedItem[0]._id);
      $scope.bName = '';
      $scope.bAuthor = '';
      $scope.bDesc = '';
      $scope.bISBN = '';
      $scope.bDate = '';
      $scope.bPages = '';
      $scope.selectedPublisherId = '';
      mode = 'none';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });

    // Check state of forms (add new | update/delete)
    $scope.ModeIs = function (state) {
      return mode === state;
    };
  });