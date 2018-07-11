$(document).ready(function() {

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
        var genItem = $("#gen-item");
        var advItem = $("#adv-item");
        var inputGeneral;
        var inputAdvanced;
        var search;
        var queryURL;
        var searchAdvanced = $("#advanced-search");
        var searchGeneral = $("#general-search");
        var destination = $("#destination");
        var date = $("#date");

        // Landing Page Info

        $("#submit2").on("click", function () {
            
        });

        // To hide the opening fields.
        searchAdvanced.hide();
        $("#gen-disclaim").hide();

        function showSuggestions() {

        }

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

                        var APIkey = "AIzaSyBMHhF1IhDFYqU-cjBf9YhaoTpDCB27lzI";
                        var cx = "000852579600713817389:mvwf8b9vrdi";

                        // Google Search API is limited to 100 Queries per day.***** This is an issue.
                        queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=10&q=" + search;
                        // queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=lZmoHvNGfZTWDHmraYUAgeyzv20gygnH&limit=10";

                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {
                            var result = response.items;
                            console.log(result);
                            //Dynamically create divs and btn links for search results.
                            for (var j = 0; j < 5; j++) {
                                var resultDiv = $("<div>")
                                var resultDisplay = $("<button>" + result[j].snippet + "</button>");
                                resultDisplay.addClass("btn btn-link");
                                resultDiv.prepend(resultDisplay);
                                $("#result-display").append(resultDiv);
                            }
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
                        $("#advanced-input").val("");

                        var APIkey = "AIzaSyBMHhF1IhDFYqU-cjBf9YhaoTpDCB27lzI";
                        var cx = "000852579600713817389:mvwf8b9vrdi";

                        // Google Search API is limited to 100 Queries per day.***** This is an issue.
                        queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=" + cx + "&searchType=image&num=10&q=" + search;
                        // queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=lZmoHvNGfZTWDHmraYUAgeyzv20gygnH&limit=10";

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

        runGeneral();
        runAdvanced();
})

