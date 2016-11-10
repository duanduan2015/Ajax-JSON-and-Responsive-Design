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
var app = angular.module('myApp', ["ngStorage", "angularUtils.directives.dirPagination"]);

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

app.filter("favoriteCommittee", function() {
    return function(items, cond) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if ( item.is_favorite == cond) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

app.filter("favoriteBill", function() {
    return function(items, cond) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if ( item.is_favorite == cond) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

app.filter("favoriteLegislator", function() {
    return function(items, cond) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if ( item.is_favorite == cond) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

app.controller('customerCtrl', function($scope, $localStorage, $http) {

    $scope.bills = [];
    $scope.committees = [];
    $scope.legislators = [];
    if ($localStorage.favorites == null) {
        $localStorage.favorites = {};
    }
    //$http.get("../main.php?query=legislators")
    $http.get("../main.php?query=legislators")
            .then(function (response) {
                $scope.legislatorsByHouse = [];
                $scope.legislatorsBySenate = [];
                angular.forEach(response.data.results, function(item) {
                    item.is_favorite = item.bioguide_id in $localStorage.favorites; 
                    $scope.legislators.push(item);
                    if (item.chamber == "house") {
                        $scope.legislatorsByHouse.push(item);
                    } else {
                        $scope.legislatorsBySenate.push(item);
                    }
                });
            });
    //$http.get("../main.php?query=bills?per_page=50&history.active=true")
    $http.get("../main.php?query=bills")
            .then(function (response) {
                $scope.activebills = response.data.results;
                angular.forEach(response.data.results, function(item) {
                    item.is_favorite = item.bill_id in $localStorage.favorites;
                    $scope.bills.push(item);
                });
            });

    //$http.get("../main.php?query=bills?per_page=50&history.active=false")
    $http.get("../main.php?query=bills")
            .then(function (response) {
                $scope.newbills = response.data.results;
                angular.forEach(response.data.results, function(item) {
                    item.is_favorite = item.bill_id in $localStorage.favorites;
                    $scope.bills.push(item);
                });
            });

    //$http.get("../main.php?query=committees?per_page=all")
    $http.get("../main.php?query=committees")
            .then(function (response) {
                $scope.committeesByHouse = [];
                $scope.committeesBySenate = [];
                $scope.committeesByJoint = [];
                angular.forEach(response.data.results, function(item) {
                    item.is_favorite = item.committee_id in $localStorage.favorites;
                    $scope.committees.push(item);
                    if (item.chamber == "house") {
                        $scope.committeesByHouse.push(item);
                    } else if (item.chamber == "senate") {
                        $scope.committeesBySenate.push(item);
                    } else {
                        $scope.committeesByJoint.push(item);
                    }
                });
            });

    $scope.getEmail = function(x) {
        if (x.oc_email == null) {
            return "N.A.";
        }
        return x.oc_email;
    }

    $scope.getImage = function(x) {
        return 'https://theunitedstates.io/images/congress/225x275/' + x.bioguide_id + '.jpg'; 
    }

    $scope.sub_committee = function(x) {
        if (x.subcommittee == true) {
            return "true";
        }
        return "false";
    }

    $scope.committee_id = function(x) {
        if (x.committee_id == null) {
            return "N.A.";
        }
        return x.committee_id;
    }

    $scope.committee_name = function(x) {
        if (x.name == null) {
            return "N.A.";
        }
        return x.name;
    }

    $scope.parent_committee_id = function(x) {
        if (x.parent_committee_id == null) {
            return "N.A.";
        }
        return x.parent_committee_id;
    }

    $scope.committee_phone = function(x) {
        if (x.committee_phone == null) {
            return "N.A.";
        }
        return x.committee_phone;
    }

    $scope.committee_office = function(x) {
        if (x.committee_office == null) {
            return "N.A.";
        }
        return x.committee_office;
    }

    $scope.currentPageFL = 1;
    $scope.currentPageLegislatorState = 1;
    $scope.currentPageLegislatorHouse = 1;
    $scope.currentPageLegislatorSenate = 1;
    $scope.currentPageActiveBill = 1;
    $scope.currentPageNewBill = 1;
    $scope.currentPageCommitteeHouse = 1;
    $scope.currentPageCommitteeSenate = 1;
    $scope.currentPageCommitteeJoint = 1;
    $scope.getTermPercent = function(x) {
        var start = moment(x.term_start);
        var end = moment(x.term_end);
        var now = moment();
        return Math.round((now - start) * 100 / (end - start));
    }

    $scope.goBackViewBillsDetails = function(x) {
        $('a[href="#billPage"]').tab('show');
        $scope.clickViewBillsDetails(x);
    }

    $scope.billitem = {};
    $scope.clickViewBillsDetails = function(x) {
        $scope.billitem = x;
        $scope.bill_id = x.bill_id;
        $scope.bill_title = x.official_title;
        $scope.bill_sponsor = x.sponsor.title + ". " + x.sponsor.last_name + ", " + x.sponsor.first_name;
        if (x.chamber == "house") {
            $scope.bill_chamber = "House";
        } else {
            $scope.bill_chamber = "Senate";
        }
        if (x.history.active == false) {
            $scope.bill_status = "New";
        } else {
            $scope.bill_status = "Active";
        }
        $scope.bill_introduced_on = x.introduced_on;
        $scope.bill_congress_url = x.urls.congress;
        $scope.bill_version_status = x.last_version.version_name;
        $scope.bill_url = x.last_version.urls.pdf;
        $("#billCarousel").carousel(1);
    }

    $scope.favoriteIconClassName = function(x) {
        if (x.is_favorite == true) {
            return "fa fa-star my-star-on";
        }
        return "fa fa-star my-star-off";
    }

    $scope.toggleFavorite = function(l) {
        if (l.is_favorite == true) {
            l.is_favorite = false;
            if (l.committee_id != null) {
                delete $localStorage.favorites[l.committee_id];
                return;
            }
            if (l.bioguide_id != null) {
                delete $localStorage.favorites[l.bioguide_id];
                return;
            }
            if (l.bill_id != null) {
                delete $localStorage.favorites[l.bill_id];
                return;
            }
        } else {
            l.is_favorite = true;
            if (l.committee_id != null) {
                $localStorage.favorites[l.committee_id] = {};
                return;
            }
            if (l.bioguide_id != null) {
                $localStorage.favorites[l.bioguide_id] = {};
                return;
            }
            if (l.bill_id != null) {
                $localStorage.favorites[l.bill_id] = {};
                return;
            }
        }
    }

    $scope.goBackViewDetails = function(x) {
        $('a[href="#legislatorPage"]').tab('show');
        $scope.clickViewDetails(x);
    }
    $scope.lgitem = {};
    $scope.clickViewDetails = function(x) {
        $scope.lgitem = x;
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
        $("#legislatorCarousel").carousel(1);
    }

    $scope.goBackLegislator = function() {
        $("#legislatorCarousel").carousel(0);
    }

    $scope.goBackBill = function() {
        $("#billCarousel").carousel(0);
    }

    $scope.stateOptions = function() {
        var opts = [];
        opts.push("All States");
        for (var k in stateNames) {
            opts.push(stateNames[k]);
        }
        return opts;
    }();
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

