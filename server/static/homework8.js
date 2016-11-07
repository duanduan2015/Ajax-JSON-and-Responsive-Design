var stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "Dist. of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MH": "Marshall",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "FM": "Micronesia",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "VI": "Virgin Islands",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
$(document).ready(function($) {
});

var app = angular.module('myApp', ["angularUtils.directives.dirPagination"]);

app.filter("stateFilter", function() {
    return function(items, cond) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if (stateNames[item.state] == cond || cond === undefined || cond == 'All States') {
                filtered.push(item);
            }
        });

        return filtered;
    };
});
app.controller('customerCtrl', function($scope, $http) {
    $http.get("../main.php?query=legislators")
            .then(function (response) {
                $scope.legislators = response.data.results;
                $scope.legislatorsByHouse= jQuery.grep($scope.legislators, function(obj, i) {
                    return obj.chamber == "house"
               });
                $scope.legislatorsBySenate= jQuery.grep($scope.legislators, function(obj, i) {
                    return obj.chamber == "senate"
               });
            });
    $scope.stateOptions = function() {
        var opts = [];
        opts.push("All States");
        for (var k in stateNames) {
            opts.push(stateNames[k]);
        }
        return opts;
    }();
    $scope.currentPage = 1;
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

