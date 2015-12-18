'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','UnicornFactory', function($scope ,UnicornFactory) {

  $scope.unicorns = [];
    $scope.unicorn = {};
    $scope.unicorn.name = "";
    $scope.unicorn.gender = "F";
    $scope.unicorn.likes = [];
    $scope.unicorn.date;
    $scope.unicorn.vampires = 0;
    $scope.input = {};
    $scope.input.like = "";
    $scope.input.update = false;

    $scope.message = "";



    $scope.loadList = function(){
        UnicornFactory.getAllUnicorns()
            .success(function(data){
                $scope.unicorns = data;
            })
            .error(function(err){
                $scope.message = "An error has occured";
            });
    };

    $scope.loadList();

  $scope.deleteUnicornClick = function(id){
      UnicornFactory.removeUnicorn(id)
          .success(function(data){
              console.log(data);
              $scope.loadList();
          })
          .error(function(err){
              $scope.message = "An error has occured";
          });
  };

    $scope.addLikes= function(){
        $scope.unicorn.likes.push($scope.input.like);
        $scope.input.like = "";
    };

    $scope.getUnicorn = function(id){
        UnicornFactory.getUnicorn(id).success(function(data){
            $scope.input.update = true;
            $scope.unicorn = data;
            $scope.unicorn.date = new Date($scope.unicorn.date);
            $scope.loadList();
        }).error(function(err){
            $scope.message = "An error has occured";
        });
    };


    /*
        Add or update a unicorn
     */
    $scope.ok = function(){
        if($scope.input.update){
            UnicornFactory.updateUnicorn($scope.unicorn).success(function(data){
                $scope.message = "A unicorn has been updated";
                $scope.loadList();
                $scope.input.update = false;
            }).error(function(err){
                $scope.message = "An error has occured";
                $scope.input.update = false;
            })
        }
        else{
            UnicornFactory.addUnicorn($scope.unicorn).success(function(data){
                $scope.message = "A unicorn has been added";
                $scope.loadList();
            }).error(function(err){
                $scope.message = "An error has occured";
            })
        }

    }

}]);