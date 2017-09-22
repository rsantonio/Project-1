$(document).ready(function() {
// Array of beer types
    var beers = ["IPA", "Ale", "Stout", "Pilsner","Lager"];
    
    // Function to render the beer category for User to select and search the Brewery DB
    function renderButtons() {
        // Deleting the heroes prior to adding new heroes
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < beers.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newBeer = $("<button>");
          // Adding a class of hero to our button
          
          newBeer.addClass("btn btn-lg btn-outline-info");
          // Adding a data-attribute
          newBeer.attr("data-name", beers[i]);
          // Providing the initial button text
          newBeer.text(beers[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(newBeer);
        }
      }

       
       
    // Calling renderButtons which handles the processing of our beer array and displays the beer buttons
    renderButtons()
    function fetchBeers () {
      
      // In this case, the "this" keyword refers to the button that was clicked
      $("#beer-view").empty();
      var beer = $(this).attr("data-name");
      
      // Constructing a URL to search for beer
      
      var queryURL = "https://api.punkapi.com/v2/beers?beer_name=" + beer + "&per_page=" +5;
      console.log(queryURL); 
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Storing an array of results in the results variable
          console.log(response);
          var beers = response;
          for(var i = 0; i< beers.length; i++) {
            var beer = beers[i];
            console.log(beer.name);
            var pairings = beer.food_pairing;
            for(var j = 0; j< pairings.length; j++) {
              var pairing = pairings[j];
              console.log(pairing);
            }
          }
          //var results = response.data;
          //console.log(results);
          // Looping over every result item
          
          for (var i = 0; i < beers.length; i++) {
            
            // Div created to hold each result from the Brewery DB AJAX call
              var beerDiv = $("<div class='beer'>");
              // Storing the result item's beer name
              var beerName = beers[i].name;
              var beerDescription = beers[i].description;
              
              // Creating a paragraph tag for the beer name
              var p1 = $("<p>"). text(beerName);
              
              
              // Creating a paragraph tag for the beer descriptuion
              var p2 = $("<p>").text(beerDescription)
              
              // Creating an beer image tag
              var beerImage = $("<img>");
              // Giving the image tag an src attribute of a property pulled off the
              // result item
              beerImage.attr("src", beers[i].image_url);
              beerImage.addClass("images");
              // Appending the beer info and image we created to "beerDiv" we created
              beerDiv.append(p1);
              beerDiv.append(beerImage);
              beerDiv.append(p2);
              
              // Appending the beerDiv to the "#beer-view" div in the HTML
              $("#beer-view").append(beerDiv);
            }
            
      });
    };
$("button").on("click", fetchBeers)
    

});