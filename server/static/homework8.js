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

$("#legislatorDetail").click(function() {
    $scope
    //$("#myCarousel").carousel(0);
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

app.filter("activeFilter", function() {
    return function(items, cond) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if (item.history.active == cond) {
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

    $http.get("../main.php?query=bills")
            .then(function (response) {
                $scope.bills = response.data.results;
            });
    $scope.getTermPercent = function(x) {
        var start = moment(x.term_start);
        var end = moment(x.term_end);
        var now = moment();
        return Math.round((now - start) * 100 / (end - start));
    }
    $scope.clickViewDetails = function(x) {
        $scope.img_src = 'https://theunitedstates.io/images/congress/225x275/' + x.bioguide_id + '.jpg'; 
        $scope.name = x.title + ". " + x.last_name + ", " + x.first_name;
        if (x.oc_email == null) {
            $scope.email = "N.A";
        } else {
            $scope.email = x.oc_email;
        }
        if (x.chamber == "house") {
            $scope.chamber = "House";
        } else {
            $scope.chamber = "Senate";
        }
        $scope.contact = x.phone;
        $scope.partyLogoImg = $scope.partyLogo(x.party);
        if (x.party == "R") $scope.partyName = "Republican";
        if (x.party == "D") $scope.partyName = "Democrat";
        if (x.party == "I") $scope.partyName = "Independent";
        $scope.startTerm = x.term_start;
        $scope.endTerm = x.term_end;
        $scope.percent = $scope.getTermPercent(x);
        if (x.office == null) {
            $scope.office = x.office;
        } else {
            $scope.office = x.office;
        }
        $scope.state = x.state_name;
        if (x.fax == null) {
            $scope.fax = "N.A";
        } else {
            $scope.fax = x.fax;
        }
        $scope.birthday = x.birthday;
        if (x.twitter_id == null) {
            $scope.twitterAddress = null;
            $scope.twitterImg = null;
        } else {
            $scope.twitterAddress = 'https://twitter.com/' + x.twitter_id;
            $scope.twitterImg = 'images/t.png';
        }
        if (x.facebook_id == null) {
            $scope.facebookAddress = null;
            $scope.facebookImg = null;
        } else {
            $scope.facebookAddress = 'https://www.facebook.com/' + x.facebook_id;
            $scope.facebookImg = 'images/f.png';
        }
        if (x.website == null) {
            $scope.website = null;
            $scope.websiteImg = null;
        } else {
            $scope.website = x.website;
            $scope.websiteImg = 'images/w.png';
        }
        $http.get("../main.php?query=committees?member_ids=" + x.bioguide_id + "&per_page=5")
            .then(function (response) {
                $scope.legislatorCommittees = response.data.results;
            });
        $http.get("../main.php?query=bills?sponsor_id=" + x.bioguide_id + "&per_page=5")
            .then(function (response) {
                $scope.legislatorBills = response.data.results;
            });
        $("#myCarousel").carousel(1);
    }

    $scope.goBack = function() {
        $("#myCarousel").carousel(0);
    }

    $scope.stateOptions = function() {
        var opts = [];
        opts.push("All States");
        for (var k in stateNames) {
            opts.push(stateNames[k]);
        }
        return opts;
    }();
    $scope.legislatorCurrentPage = 1;
    $scope.billCurrentPage = 1;
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

