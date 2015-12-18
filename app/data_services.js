/**
 * Created by hdelo on 18/12/2015.
 */
angular.module('myApp.UnicornFactory', []).factory('UnicornFactory',['$http', function($http){
    var ipServer = 'http://10.31.1.63:8000/unicorns/';
    return{

        getAllUnicorns: function(){
            return $http({
                url: ipServer,
                method: 'GET'
            })
        },

        getUnicorn: function(id){
            return $http({
                url: ipServer + id,
                method: 'GET'
            })
        },

        removeUnicorn: function(id){
            return $http({
                url: ipServer + id,
                method: 'DELETE'
            })
        },

        addUnicorn: function(unicorn){
            return $http({
                url: ipServer,
                method: 'POST',
                data: unicorn
            })
        },

        updateUnicorn: function(newUnicorn){
            return $http({
                url: ipServer + newUnicorn.id,
                method: 'PUT',
                data: newUnicorn
            })
        }

    }

}]);