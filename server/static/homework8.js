$(document).ready(function($) {
});

var app = angular.module('myApp', []);
app.controller('customerCtrl', function($scope, $http) {
    $http.get("../main.php?query=legislators")
            .then(function (response) {
                $scope.legislators = response.data.results;
                //$scope.legislatorsByHouse = response.data.results;
                $scope.legislatorsByHouse= jQuery.grep($scope.legislators, function(obj, i) {
                    return obj.chamber == "house"
               });
                $scope.legislatorsBySenate= jQuery.grep($scope.legislators, function(obj, i) {
                    return obj.chamber == "senate"
               });
            });
    
    $scope.partyLogo = function(s) {
        if (s == "R") {
            return "images/r.png";
        }
        if (s == "D") {
            return "images/d.png";
        }
        return null;
    }
    $scope.districtNum = function(s) {
        if (s == null) {
            return "N.A";
        } else {
            return "District " + s;
        }
    }
    $scope.chamberLogo = function(s) {
        if (s == "house") {
            return "images/h.png";
        } else {
            return "images/s.svg";
        }
    }
    $scope.chamberName = function(s) {
        if (s == "house") {
            return "House";
        } else {
            return "Senate";
        }
    }
});

