$(document).ready(function () {

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
    var planning = $("#planning");
    var landing = $("#landing");
    var itinerary = $("#itinerary");
    var genItem = $("#gen-item");
    var advItem = $("#adv-item");
    var inputGeneral;
    var inputAdvanced;
    var search;
    var queryURL;
    var searchAdvanced = $("#advanced-search");
    var searchGeneral = $("#general-search");
    var submit2 = $("#submit2");
    var destination = $("#destination");
    var fromDate;
    var toDate;
    var firstDay;
    var lastDay;
    var totalDays
    var d;
    var dayCounter = 1;
    var city;
    var date = $("#date");
    var maxTemp;
    var minTemp;
    var icon;
    var description;
    var currentDate;

    // To hide the opening fields.
    landing.show();
    planning.hide();
    itinerary.hide();
    searchAdvanced.hide();
    $("#gen-disclaim").hide();

    function displayWeather() {
        // Add onclick even for the submit "add-item" button.
        submit2.on("click", function (event) {
            event.preventDefault();

            landing.hide();
            planning.show();

            fromDate = $("#fromDate").val().trim();
            toDate = $("#toDate").val().trim();
            firstDay = (Date.parse(fromDate) / 1000 / 60 / 60 / 24);
            lastDay = (Date.parse(toDate) / 1000 / 60 / 60 / 24);
            totalDays = lastDay - firstDay;
            console.log(totalDays);
            console.log(fromDate);
            console.log(toDate);
            d = destination.val().trim();
            localStorage.clear();
            localStorage.setItem("destination", d);
            localStorage.setItem("totalDays", totalDays);
            console.log(d);
            total = parseInt(localStorage.getItem("totalDays"));
            city = localStorage.getItem("destination");
            console.log(total);
            console.log(city);

            // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
            if (destination.val() !== "") {
                if (destination.val().length < 5) {
                    alert("You must type at least 5 characters.");
                    // change alert to modal.
                } else {
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
                        var data = parseFloat(((maxTemp + minTemp) / 2).toFixed(4));
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
                alert("You did not type in the text field! Please try again.");
                // insert modal here ********
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
            $("#images-display").empty();
            $("#result-display").empty();

            // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
            if (inputGeneral !== "") {
                if ($("#general-input").val().length < 5) {
                    alert("You must type at least 5 characters.");
                    // change alert to modal.
                } else {
                    search = inputGeneral;
                    $("#general-input").val("");

                    var clientID = "0RL33EADN1AF1SNBF34VNKWE5ELLR2UJYYGXIPLISZCDSUEC";
                    var clientSecret = "LADCA322VPVXK4OD4BVAKTXHY1KGFIGJFM3ROSKIF4KYXOCU";

                    // Google Search API is limited to 100 Queries per day.***** This is an issue.
                    // queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=10&q=" + search;
                    queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + city + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&query=" + search + "&v=20180711";
                    console.log(queryURL);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        var venueID = response.response.groups[0].items[0].venue.id;
                        console.log(venueID);

                        queryURL = "https://api.foursquare.com/v2/venues/" + venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180711";
                        console.log(queryURL)
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {
                            var result1 = response.response;
                            console.log(result1);
                            var site = result1.url;

                            //     var apiKEY1 = "X";
                            //     queryURL = "y" + response[i].venues.id; 

                            //         $.ajax
                            //    response[i].venues.id 
                            // }  
                            // var x = response[0].venues.id;
                            //  longitude = response.results[0].locations[0].displayLatLng.lat;
                            //     latitude = response.results[0].locations[0].displayLatLng.lng;
                            //     console.log(longitude);
                            //     console.log("latitude" + latitude);

                            //     var APIkey1 = "d38593be2d85a2092953fb7189767bc9"
                            //     queryURL1 = "https://api.darksky.net/forecast/" + APIkey1 + "/" + latitude + "," + longitude;
                            //     // queryURL1 = "https://api.darksky.net/forecast/14054edeb95fa12dc60adb341b933334/" + latitude + "," + longitude;
                            //     console.log(queryURL1);
                            //     $.ajax({
                            //         url: queryURL1,
                            //         method: "GET"
                            //     }).then(function (response) {
                            //         var result1 = response;
                            //         console.log(result1);
                            //         //Dynamically create divs and btn links for search results.
                            //         for (var j = 0; j < 5; j++) {
                            //             var resultDiv = $("<div>")
                            //             var resultDisplay = $("<button>" + result[j].snippet + "</button>");
                            //             resultDisplay.addClass("btn btn-link");
                            //             resultDiv.prepend(resultDisplay);
                            //             $("#result-display").append(resultDiv);
                            //         }
                            //     });
                        });
                    });

                }
            } else {
                alert("You did not type in the text field! Please try again.");
                // insert modal here ********
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
            $("#images-display").empty();
            $("#result-display").empty();

            // Main test: 1. Did the user input anything in to either text boxes? 2. Is the value < 5 characters?  
            if (inputAdvanced !== "") {
                if ($("#advanced-input").val().length < 5) {
                    alert("You must type at least 5 characters.");
                    // change alert to modal.
                } else {
                    search = inputAdvanced;
                    localStorage.setItem("search", search);
                    $("#advanced-input").val("");

                    var APIkey = "AIzaSyBMHhF1IhDFYqU-cjBf9YhaoTpDCB27lzI";
                    var cx = "000852579600713817389:mvwf8b9vrdi";

                    // Google Search API is limited to 100 Queries per day.***** This is an issue.
                    queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=10&q=" + search;

                    $.ajax({
                        url: queryURL,
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
                }
            } else {
                alert("You did not type in the text field! Please try again.");
                // insert modal here ********
            }
        });
    };

    function showItinerary() {
        $("#confirm-list").on("click", function () {

            landing.hide();
            planning.hide();
            itinerary.show();

            for (var i = 0; i < total; i++) {
                var listDiv = $("<div>");
                var listButton = $("<button style='background-color: #4B4B4B; width: 200px; display: block; margin:auto'>");

                // listDiv.addClass("row");
                listButton.text("Day " + (i+1)).attr("data-day", (i+1)).addClass("btn btn-secondary");
                listDiv.addClass("col-3");
                listDiv.append(listButton);
                $("#wrapper").append(listDiv);
            }
        })
    }

    function nextDay() {
        $("#next-day").on("click", function() {
            planning.show();
            itinerary.hide();
            dayCounter++;
        })
    }

    $("#open-advanced").on("click", function () {
        searchAdvanced.show();
        searchGeneral.hide();
        $("#images-display").empty();
        $("#result-display").empty();
        $("#gen-disclaim").show();
        $("#adv-disclaim").hide();
    });

    $("#open-general").on("click", function () {
        searchAdvanced.hide();
        searchGeneral.show();
        $("#images-display").empty();
        $("#result-display").empty();
        $("#gen-disclaim").hide();
        $("#adv-disclaim").show();
    });

    nextDay();
    showItinerary();
    displayWeather();
    runGeneral();
    runAdvanced();
});



    $('#add-list').on('click',function(){
        alert('addbtn works');

    $('#list-display').append("<ol>" +
        "<li>" + localStorage.getItem("search") + "</li>" +

        "</ol>")
})








// $('#confirm-list').on('click',function(){

//     $()


// })


