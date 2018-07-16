// $(document).ready(function () {

//Initialize Firebase
var config = {
    apiKey: "AIzaSyD3GtRS1N5UxrzvxA1i8XV0babAG61zf9Q",
    authDomain: "groupproject1-e81bf.firebaseapp.com",
    databaseURL: "https://groupproject1-e81bf.firebaseio.com",
    projectId: "groupproject1-e81bf",
    storageBucket: "groupproject1-e81bf.appspot.com",
    messagingSenderId: "825404731161"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Define global variables
// Sections
var landing = $("#landing");
var charLimit = $("#charLimit");
var charEmpty = $("#charEmpty");
var planning = $("#planning");
var itinerary = $("#itinerary");
// Planning page search field IDs
var destination = $("#destination");
var searchGeneral = $("#general-search");
var searchAdvanced = $("#advanced-search");
// Search buttons 
var submit2 = $("#submit2");
var genItem = $("#gen-item");
var advItem = $("#adv-item");
// Header location variable
var nowDestination = $("#now-destination");
// Search field values
var search;
var inputGeneral;
var inputAdvanced;
var fromDate;
var toDate;
var firstDay;
var lastDay;
var totalDays;
var d; // stores destination value
var city; // stores destination value from 'd'
var dayCounter = 1;
// AJAX call variables
var queryURL;
// Temperature display variables
var maxTemp;
var minTemp;
var icon;
var description;
var currentDate;
// Result display variables
var site;
var image;
var description;
var rating;
var tips;
// Array list variables
var listArray = [];
var dayArray = [];

// To hide the opening fields.
landing.show();
charLimit.hide();
charEmpty.hide();
planning.hide();
itinerary.hide();
searchAdvanced.hide();
$("#gen-disclaim").hide();

function landingSubmit() {
    // Add onclick even for the submit "add-item" button.
    submit2.on("click", function (event) {
        event.preventDefault();

        fromDate = $("#fromDate").val().trim();
        toDate = $("#toDate").val().trim();
        firstDay = (Date.parse(fromDate) / 1000 / 60 / 60 / 24);
        lastDay = (Date.parse(toDate) / 1000 / 60 / 60 / 24);
        totalDays = lastDay - firstDay;
        console.log(fromDate);
        console.log(toDate);
        console.log(totalDays);
        d = destination.val().trim();
        localStorage.clear();
        localStorage.setItem("destination", d);
        localStorage.setItem("totalDays", totalDays);
        console.log(d);
        total = parseInt(localStorage.getItem("totalDays"));
        city = localStorage.getItem("destination");
        console.log(total);
        console.log(city);

        for (var i = 0; i < total; i++) {
            dayArray[i] = [];
        }

        for (var i = 0; i < total; i++) {
            var listDiv = $("<div>");
            var listButton = $("<button style='background-color: #4B4B4B; width: 200px; display: block; margin:auto'>");

            // listDiv.addClass("row");
            listButton.text("Day " + (i + 1)).attr("data-day", (i + 1)).addClass("btn btn-secondary dayBtn");
            listDiv.addClass("col-3");
            listDiv.append(listButton);
            $("#wrapper").append(listDiv);
        }

        nowDestination.text(d);

        // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
        if (destination.val() !== "") {
            if (destination.val().length < 5) {
                charLimit.addClass("show");
                charLimit.show();
                return;
            } else {
                landing.hide();
                planning.show();

                search = city;
                console.log(search);
                destination.val("");

                var APIkey = "7515b70f90e44119b6484f6d00871af3";

                queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + search + "&key=" + APIkey;
                console.log(queryURL);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    result = response;
                    maxTemp = response.data[0].app_max_temp;
                    minTemp = response.data[0].app_min_temp;
                    icon = response.data[0].weather.icon;
                    description = response.data[0].weather.description;
                    currentDate = response.data[0].datetime;
                    console.log(result);
                    console.log(maxTemp);
                    console.log(minTemp);
                    console.log(icon);
                    console.log(description);
                    console.log(currentDate);

                    var weatherDiv = $("<div style='display:block;' class='col col-3'>");
                    var date = $("<h5 class='text-center'>");
                    var data = parseFloat(((maxTemp + minTemp) / 2).toFixed(1));
                    console.log(data);
                    var p = $("<p class='text-center'>");
                    var image = $("<img style='display:block; margin: auto;'>");
                    image.attr({
                        "src": "https://www.weatherbit.io/static/img/icons/" + icon + ".png",
                    })
                    date.append(currentDate);
                    date.append("<br>Daily: " + data + "<span id='unit'>&#8451</span>")
                    p.append(description);
                    p.append("<br>Max: " + maxTemp);
                    p.append("<br>Min: " + minTemp);
                    weatherDiv.prepend(date);
                    weatherDiv.append(image);
                    weatherDiv.append(p);
                    $("#weather-display").prepend(weatherDiv);
                })
            }
        } else {
            charEmpty.addClass("show");
            charEmpty.show();
            return;
        }
    });
};

// To run the General search, when the genItem button is clicked.
function runGeneral() {
    // Add onclick even for the submit "add-item" button.
    genItem.on("click", function (event) {
        event.preventDefault();

        inputGeneral = $("#general-input").val().trim();
        inputAdvanced = $("#advanced-input").val("");
        $("#result-display").empty();
        $("#rating-display").empty();
        $("#description-display").empty();
        $("#images-display").empty();
        $("#reviews-display").empty();

        // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
        if (inputGeneral !== "") {
            if ($("#general-input").val().length < 5) {
                charLimit.addClass("show");
                charLimit.show();
                return;
            } else {
                search = inputGeneral;
                $("#general-input").val("");

                var keySelect = Math.floor(Math.random() * key.length);
                console.log(keySelect);
                var clientID = key[keySelect]['clientID'];
                var clientSecret = key[keySelect]['clientSecret'];

                queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + city + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&query=" + search + "&v=20180711";
                console.log(queryURL);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    for (var i = 0; i < 4; i++) {
                        var venueID = response.response.groups[0].items[i].venue.id;
                        console.log(venueID);

                        queryURL = "https://api.foursquare.com/v2/venues/" + venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180711";
                        console.log(queryURL)
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {
                            var result1 = response.response.venue;
                            console.log(result1);
                            site = result1.url;
                            name = result1.name;
                            img = result1.photos.groups[0].items[0].prefix + result1.photos.groups[0].items[0].user.id + result1.photos.groups[0].items[0].suffix;
                            rating = result1.rating;
                            console.log(site);
                            console.log(image);
                            console.log(rating);
                            var resultDiv = $("<div style='display:block; float:left' class='col col-4'>");
                            var btn = $("<button class='btn btn-link genBtn'>");
                            var h7 = $("<h7>");
                            // var image = $("");
                            var anchor = $("<a target='_blank' href=" + site + "><img src=" + img + " style='height: auto; width:100%; max-width: 360px' class='travelImages'></a>");
                            btn.text(name);
                            h7.text("Rating: " + rating);
                            btn.attr({
                                "data-name": name
                            });
                            console.log(image);
                            resultDiv.prepend(btn);
                            resultDiv.append(h7);
                            resultDiv.append(anchor);
                            $("#images-display").prepend(resultDiv);
                        });
                    }
                });
            }
        } else {
            charEmpty.addClass("show");
            charEmpty.show();
            return;
        }
    });
};

// To run the Advanced search, when advItem button is clicked. 
function runAdvanced() {
    // Add onclick even for the submit "add-item" button.
    advItem.on("click", function (event) {
        event.preventDefault();

        inputGeneral = $("#general-input").val("");
        inputAdvanced = $("#advanced-input").val().trim();
        $("#result-display").empty();
        $("#rating-display").empty();
        $("#description-display").empty();
        $("#images-display").empty();
        $("#reviews-display").empty();

        // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
        if (inputAdvanced !== "") {
            if ($("#advanced-input").val().length < 5) {
                charLimit.addClass("show");
                charLimit.show();
                return;
            } else {
                search = inputAdvanced;
                localStorage.setItem("search", search);
                $("#advanced-input").val("");

                var keySelect = Math.floor(Math.random() * key.length);
                var clientID = key[keySelect]['clientID'];
                var clientSecret = key[keySelect]['clientSecret'];

                queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + city + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&query=" + search + "&limit=5&v=20180711";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var venueID = response.response.groups[0].items[0].venue.id;
                    console.log(venueID);

                    // Queries for description, using 4Square "Venue Details" URL
                    queryURL1 = "https://api.foursquare.com/v2/venues/" + venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&limit=4&v=20180711";
                    console.log(queryURL1)
                    $.ajax({
                        url: queryURL1,
                        method: "GET"
                    }).then(function (response) {
                        var result = response.response.venue;
                        console.log(result);
                        description = result.description;
                        tips = result.tips.groups[0].items[0].text;
                        rating = result.rating;
                        var ratingDiv = $("<div>");
                        var descriptionDiv = $("<div>");
                        var reviewDiv = $("<div>");
                        var h3 = $("<h3 class='text-center'>");
                        var p = $("<p>");
                        var h5 = $("<h5>");
                        h3.text("Rating: " + rating);
                        p.text("Description: " + description);
                        h5.text("Tips: " + tips);
                        ratingDiv.append(h3);
                        descriptionDiv.append(p);
                        reviewDiv.append(h5);
                        $("#rating-display").prepend(ratingDiv);
                        $("#description-display").prepend(descriptionDiv);
                        $("#reviews-display").prepend(reviewDiv);
                    });

                    // Queries for photos, using Google Images API (limited to 100 Queries per day).
                    var APIkey = "AIzaSyBMHhF1IhDFYqU-cjBf9YhaoTpDCB27lzI";
                    var cx = "000852579600713817389:mvwf8b9vrdi";

                    queryURL2 = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=3&q=" + search;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    }).then(function (response) {
                        var result = response.items;
                        console.log(result);

                        // Dynamically create divs and img tags for the images queried.
                        for (var i = 0; i < result.length; i++) {
                            var imageDiv = $("<div style='display:block; float:left' class='col col-3'>");
                            var image = $("<img style='height: auto; width:100%; max-width: 360px'>");
                            image.addClass("travelImages");
                            image.attr({
                                "src": result[i].link,
                            })
                            console.log(result[i].link);
                            imageDiv.prepend(image);
                            $("#images-display").prepend(imageDiv);
                        }
                    });
                });
            }
        } else {
            charEmpty.addClass("show");
            charEmpty.show();
            return;
        }
    });
};

// Add's items to list display
function addItem() {
    $('#add-list').on('click', function () {

        $('#list-display').append("<ul>" +
            "<li>" + localStorage.getItem("search") + "</li>" +

            "</ul>");

        dayArray[dayCounter].push(localStorage.getItem("search"));
        console.log(dayArray[dayCounter]);
    })
}

function showItinerary() {
    $("#confirm-list").on("click", function () {

        landing.hide();
        planning.hide();
        itinerary.show();
        $("#confirm-display").empty();
        listArray.push(dayArray[dayCounter]);
        console.log(listArray);

    })
}

   // Allows user to sign-out
   function signOut() {
    $(".signout-button").on("click", function (event) {
        // alert("this works!");

        localStorage.clear();
        var d = destination.val().trim();
        var search = search.val().trim();
        var totalDays = totalDays.val().trim();
        var listArray = listArray.val().trim();
        // destination = destination.val().trim();
        console.log(d);
        console.log(search);
        console.log(totalDays);

        localStorage.setItem("destination", d);
        localStorage.setItem("search", search);
        localStorage.setItem("totalDays", totalDays);
        localStorage.setItem("listArray", listArray);
        
    })
}

// 
function returnItinerary() {
    $("#current-itinerary").on("click", function () {
        var tempDest=localStorage.getItem("destination")
        var tempSearch=localStorage.getItem("search")// advancedSearch or genSearch
        var tempTotalDay=(parseInt(localStorage.getItem("totalDays")));
//         alert(tempDest)
//         alert(tempSearch)
//         alert(tempTotalDay)
        $('#itineraryDisplay').append("<li>" + tempDest+ "</li>" +
        "<li>" + tempSearch+ "</li>" +
        "<li>" + tempSearch+ "</li>" +
        "<li>" + tempTotalDay+ "</li>" 
    )
    //     // window.location = "index.html";
        

        // window.location = "index.html";
        landing.hide();
        planning.hide();
        itinerary.show();
    })
}

// Allows user to move on to next day of planning
function nextDay() {
    $("#next-day").on("click", function () {
        planning.show();
        itinerary.hide();
        $("#rating-display").empty();
        $("#description-display").empty();
        $("#images-display").empty();
        $("#reviews-display").empty();
        $("#list-display").empty();
        dayCounter++;
    })
}

// Modal button events
$("#charEmptyBtn").on("click", function () {
    charEmpty.hide();
});

$("#charLimitBtn").on("click", function () {
    charLimit.hide();
});

// Search (general and advanced) buttons on click events
$("#open-advanced").on("click", function () {
    searchAdvanced.show();
    searchGeneral.hide();
    $("#result-display").empty();
    $("#rating-display").empty();
    $("#description-display").empty();
    $("#images-display").empty();
    $("#reviews-display").empty();
    $("#gen-disclaim").show();
    $("#adv-disclaim").hide();
});

$("#open-general").on("click", function () {
    searchAdvanced.hide();
    searchGeneral.show();
    $("#result-display").empty();
    $("#rating-display").empty();
    $("#description-display").empty();
    $("#images-display").empty();
    $("#reviews-display").empty();
    $("#gen-disclaim").hide();
    $("#adv-disclaim").show();
});

// Search general button on click event to show rating, description, images and tips
$(document).on("click", ".genBtn", function() {
    $("#images-display").empty();
    search = $(this).attr("data-name");
    localStorage.setItem("search", search);

    var keySelect = Math.floor(Math.random() * key.length);
    var clientID = key[keySelect]['clientID'];
    var clientSecret = key[keySelect]['clientSecret'];

    queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + city + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&query=" + search + "&limit=5&v=20180711";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var venueID = response.response.groups[0].items[0].venue.id;
        console.log(venueID);

        // Queries for description, using 4Square "Venue Details" URL
        queryURL1 = "https://api.foursquare.com/v2/venues/" + venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&limit=4&v=20180711";
        console.log(queryURL1)
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
            var result = response.response.venue;
            console.log(result);
            description = result.description;
            tips = result.tips.groups[0].items[0].text;
            rating = result.rating;
            var ratingDiv = $("<div>");
            var descriptionDiv = $("<div>");
            var reviewDiv = $("<div>");
            var h3 = $("<h3 class='text-center'>");
            var p = $("<p>");
            var h5 = $("<h5>");
            h3.text("Rating: " + rating);
            p.text("Description: " + description);
            h5.text("Tips: " + tips);
            ratingDiv.append(h3);
            descriptionDiv.append(p);
            reviewDiv.append(h5);
            $("#rating-display").prepend(ratingDiv);
            $("#description-display").prepend(descriptionDiv);
            $("#reviews-display").prepend(reviewDiv);
        });

        // Queries for photos, using Google Images API (limited to 100 Queries per day).
        var APIkey = "AIzaSyBMHhF1IhDFYqU-cjBf9YhaoTpDCB27lzI";
        var cx = "000852579600713817389:mvwf8b9vrdi";

        queryURL2 = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=3&q=" + search;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            var result = response.items;
            console.log(result);

            // Dynamically create divs and img tags for the images queried.
            for (var i = 0; i < result.length; i++) {
                var imageDiv = $("<div style='display:block; float:left' class='col col-3'>");
                var image = $("<img style='height: auto; width:100%; max-width: 360px'>");
                image.addClass("travelImages");
                image.attr({
                    "src": result[i].link,
                })
                console.log(result[i].link);
                imageDiv.prepend(image);
                $("#images-display").prepend(imageDiv);
            }
        });
    });
});

// Itinerary button on click events
$(document).on("click", ".dayBtn", function () {
    $("#confirm-display").empty();

    var counter = $(this).attr("data-day");
    var q = counter-1

    $("#confirm-display").append("Day: " + counter);

    for (var i = 0; i < listArray[q].length ; i++) {
        var uList = $("<ul>");
        var listItem = $("<li>");

        // listDiv.addClass("row");
        listItem.text(listArray[q][i]);
        uList.append(listItem);
        $("#confirm-display").append(uList);
    }
});

returnItinerary();
addItem();
nextDay();
showItinerary();
landingSubmit();
runGeneral();
runAdvanced();
signOut();
// });
