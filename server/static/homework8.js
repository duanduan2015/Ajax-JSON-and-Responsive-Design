var stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
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
            if (item.state == cond || cond === undefined || cond == 'All States') {
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

app.filter("nameFilter", function() {
    return function(items, cond) {
        var filtered = [];
        var normCond = '';
        if (cond != null)  normCond = cond.trim().toLowerCase();
        var conds = normCond.split(" ");
        angular.forEach(items, function(item) {
            var canAdd = true;
            angular.forEach(conds, function(cond) {

                searchString = item.first_name.toLowerCase() + " " +
                    item.last_name.toLowerCase() + " " +
                    item.state.toLowerCase() + " " +
                    item.district;

                if (item.party == "R") {
                    searchString += " republican";
                } else if (item.party == "D") {
                    searchString += " democrat";
                } else {
                    searchString += " independent";
                }

                if (!searchString.includes(cond)) {
                    canAdd = false;
                }
            });
            if (canAdd) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

app.filter("billFilter", function() {
    return function(items, cond) {
        var filtered = [];
        var normCond = '';
        if (cond != null)  normCond = cond.trim().toLowerCase();
        var conds = normCond.split(" ");
        angular.forEach(items, function(item) {
            var canAdd = true;
            angular.forEach(conds, function(cond) {

                searchString = item.chamber.toLowerCase() + " " +
                    item.bill_id.toLowerCase() + " " +
                    item.bill_type.toLowerCase() + " " +
                    item.title.toLowerCase() + " " +
                    item.sponsor_name.toLowerCase() + " " +
                    item.introduced_date.toLowerCase();

                if (!searchString.includes(cond)) {
                    canAdd = false;
                }
            });
            if (canAdd) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

app.controller('customerCtrl', function($scope, $localStorage, $http) {

    $scope.bills = [];
    $scope.activebillsByHouse = [];
    $scope.activebillsBySenate = [];
    $scope.legislators = [];
    $scope.legislatorBills = [];
    $scope.isDisplayNavBar = true;
    $scope.mainViewWidth = "col-xs-10 col-md-10;";
    $scope.toggleNavBar = function() {
        if ($scope.isDisplayNavBar == true) {
            $scope.displayNavBar = "display:none;";
            $scope.mainViewWidth = "col-xs-12 col-md-12";
        } else {
            $scope.displayNavBar = "display:block;";
            $scope.mainViewWidth = "col-xs-10 col-md-10";
        }
        $scope.isDisplayNavBar = !$scope.isDisplayNavBar;
    }

    if ($localStorage.favorites == null) {
        $localStorage.favorites = {};
    }

    $http.get("../main.php?query=legislators&chamber=senate")
            .then(function (response) {
                $scope.legislatorsBySenate = [];
                angular.forEach(response.data.results[0].members, function(item) {
                    item.is_favorite = item.id in $localStorage.favorites; 
                    item.state = stateNames[item.state];
                    item.chamber = "senate";
                    $scope.legislators.push(item);
                    $scope.legislatorsBySenate.push(item);
                });
            });

    $http.get("../main.php?query=legislators&chamber=house")
            .then(function (response) {
                $scope.legislatorsByHouse = [];
                angular.forEach(response.data.results[0].members, function(item) {
                    item.is_favorite = item.id in $localStorage.favorites; 
                    item.state = stateNames[item.state];
                    item.chamber = "house";
                    $scope.legislators.push(item);
                    $scope.legislatorsByHouse.push(item);
                });
            });

    $http.get("../main.php?query=billsTrue&chamber=house")
            .then(function (response) {
                angular.forEach(response.data.results[0].bills, function(item) {
                    item.is_favorite = item.bill_id in $localStorage.favorites;
                    item.chamber = "house";
                    $scope.activebillsByHouse.push(item);
                    $scope.bills.push(item);
                });
            });

    $http.get("../main.php?query=billsTrue&chamber=senate")
            .then(function (response) {
                angular.forEach(response.data.results[0].bills, function(item) {
                    item.is_favorite = item.bill_id in $localStorage.favorites;
                    item.chamber = "senate";
                    $scope.activebillsBySenate.push(item);
                    $scope.bills.push(item);
                });
            });


    $scope.getEmail = function(x) {
        if (x.oc_email == null) {
            return "N.A.";
        }
        return x.oc_email;
    }

    $scope.getImage = function(x) {
        return 'https://theunitedstates.io/images/congress/225x275/' + x.id + '.jpg'; 
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

    $scope.goBackViewBillsDetails = function(x) {
        $('a[href="#billPage"]').tab('show');
        $scope.clickViewBillsDetails(x);
    }
    $scope.hasLink = function(x) {
        if (x.govtrack_url == null) {
            return "color:black;text-decoration: none;";
        }
        return "";
    }
    $scope.linkName = function(x) {
        if (x.govtrack_url == null) {
            return "N.A.";
        }
        return "Link";
    }
    $scope.billitem = {};
    $scope.clickViewBillsDetails = function(x) {
        $scope.billitem = x;
        $scope.bill_id = x.bill_id;
        $scope.bill_type = x.bill_type;
        $scope.bill_title = x.title;
        $scope.bill_sponsor = x.sponsor_title + " " + x.sponsor_name;
        if (x.chamber == "house") {
            $scope.bill_chamber = "House";
        } else {
            $scope.bill_chamber = "Senate";
        }
        $scope.bill_introduced_on = x.introduced_date;
        $scope.bill_congress_url = x.congressdotgov_url;
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
            if (l.id != null) {
                delete $localStorage.favorites[l.id];
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
            if (l.id != null) {
                $localStorage.favorites[l.id] = {};
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
        $scope.img_src = 'https://theunitedstates.io/images/congress/225x275/' + x.id + '.jpg'; 
        $scope.name = x.last_name + ", " + x.first_name;
        if (x.contact_form == null) {
            $scope.contact_form = "N.A";
        } else {
            $scope.contact_form = x.contact_form;
        }
        if (x.chamber == "house") {
            $scope.chamber = "House";
        } else {
            $scope.chamber = "Senate";
        }
        $scope.phone = x.phone;
        $scope.partyLogoImg = $scope.partyLogo(x.party);
        if (x.party == "R") $scope.partyName = "Republican";
        if (x.party == "D") $scope.partyName = "Democrat";
        if (x.party == "I") $scope.partyName = "Independent";
        $scope.endTerm = x.next_election;
        $scope.percent = x.votes_with_party_pct;
        if (x.office == null) {
            $scope.office = x.office;
        } else {
            $scope.office = x.office;
        }
        $scope.state = x.state;
        if (x.fax == null) {
            $scope.fax = "N.A";
        } else {
            $scope.fax = x.fax;
        }
        $scope.birthday = x.date_of_birth;
        if (x.twitter_account == null) {
            $scope.twitterAddress = null;
            $scope.twitterImg = null;
        } else {
            $scope.twitterAddress = 'https://twitter.com/' + x.twitter_account;
            $scope.twitterImg = 'images/t.png';
        }
        if (x.youtube_account == null) {
            $scope.youtubeAddress = null;
            $scope.youtubeImg = null;
        } else {
            $scope.youtubeAddress = 'https://www.youtube.com/' + x.youtube_account;
            $scope.youtubeImg = 'images/y.png';
        }
        if (x.facebook_account == null) {
            $scope.facebookAddress = null;
            $scope.facebookImg = null;
        } else {
            $scope.facebookAddress = 'https://www.facebook.com/' + x.facebook_account;
            $scope.facebookImg = 'images/f.png';
        }
        if (x.url == null) {
            $scope.website = null;
            $scope.websiteImg = null;
        } else {
            $scope.website = x.url;
            $scope.websiteImg = 'images/w.png';
        }

        $http.get("../main.php?query=memberBills&id=" + x.id)
            .then(function (response) {
                if (response.data.results !== null) {
                    $scope.legislatorBills = response.data.results[0].bills;
                }
            });

        $http.get("../main.php?query=committees?member_ids=" + x.id + "&per_page=5")
            .then(function (response) {
                $scope.legislatorCommittees = response.data.results;
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

