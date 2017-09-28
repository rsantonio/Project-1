$(document).ready(function(){ 

  $('.modal').modal();
  $('#modal1').modal('open');

  initAge();

  var age= {};

  function initAge() {
    var month = 0;
    var day = 0;
    var year = 0;

    $("#age-submit").on("click", function() {

      age.month = $("#verify-month").val();
      age.day = $("#verify-day").val();
      age.year = $("#verify-year").val();
      checkDate();
    });
  }

  function checkDate() {
    if (age.month === 'none' || age.day === 'none' || age.year === 'none') {
      // Fade in the error...
      $('#modal-error').css('visibility', 'visible').hide().fadeIn('slow');
      // changes the background color of the select if invalid
      if (age.month === 'none') {
        $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-month").on('change', function() {
          if ($("#verify-month").val() === 'none') {
            $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-month").css('background', 'white');
          }
        });
      }

      // changes the background color of the select if invalid
      if (age.day === 'none') {
        $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-day").on('change', function() {
          if ($("#verify-day").val() === 'none') {
            $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-day").css('background', 'white');
          }
        });
      }

      // changes the background color of the select if invalid
      if (age.year === 'none') {
        console.log(age.year);

        $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-year").on('change', function() {
          if ($("#verify-year").val() === 'none') {
            $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-year").css('background', 'white');
          }
        });
      }
    } else {
      oldEnough();
    }
  }

  // Compares age entered with todays date 21 years ago...
  function oldEnough() {
    var ageLimit = moment().subtract(21, 'years').calendar();
    var birthDate = age.month + " " + age.day + " " + age.year;
    var oldEnough = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, 'day');
    console.log(oldEnough);

    if (oldEnough) {

      $('#ageModal').modal('close');

    } else {
     window.location.href = "https://www.drugrehab.com/addiction/alcohol/underage-drinking/";
     console.log("it is false");
    }
  }


    $("#abc").on("click", function(event){
      event.preventDefault();

      age.month = $("#verify-month").val();
      age.day = $("#verify-day").val();
      age.year = $("#verify-year").val();
      checkDate();
    })


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBoy7xKwDRknCHdwaYRxllq0zhXazAKgzw",
    authDomain: "beer-and-recipes.firebaseapp.com",
    databaseURL: "https://beer-and-recipes.firebaseio.com",
    projectId: "beer-and-recipes",
    storageBucket: "beer-and-recipes.appspot.com",
    messagingSenderId: "1099467579743"
  };
  firebase.initializeApp(config);

  var database = firebase.database().ref();
  var activekey = null;
  var pair = null;

  //Initializing arrays with food pairings by type of beer
  var ipa = ["curry","gorgonzola","apple","mexican"];
  var stout = ["smoked","barbecue","oyster","chocolate","stew"];
  var ale = ["burgers","wings","asian","pizza","cheddar"];
  var lager = ["shrimp","lobster","sushi","mexican","spicy"];
  var wit = ["muenster","salmon","tuna","asparagus","havarti"];

  //Initializing variables to hold on click data
  var foodChoice;
  var beerType;

  // 1. add DOM elements for pairings
  // 2. include firebase "key" value in DOM element
  // 3. handle click on DOM element ( buttons)
  // 4. extract key from clicked element
  // 5. use key to get current likes from firebase
  // 6. add 1 to likes
  // 7. use key to update firebase


  function addElements(pairing, key) {

      // create row to hold beer column, food column, and button column
      var row = $('<div class="row dynamic">');

      // create Beer Column element
      var beerColumn = $('<div class="col-md-5 beer">');
      beerColumn.append('<div class="divText">' + pairing.beerName + '</div>');
      beerColumn.append('<img class="beerImg" src="' + pairing.beerImage + '">');
      beerColumn.append('<div class="divText">' + pairing.beerDesc + '</div>');

      // append beer column to row
      row.append(beerColumn);


      // create food column element
      var foodColumn = $('<div class="col-md-5 food">');
      foodColumn.append('<div class="divText">' + pairing.recipeName + '</div>');
      foodColumn.append('<a href="' + pairing.recipeURL + '" target="_blank"><img class ="foodImg" src="' + pairing.recipeImage + '"></a>');


      // append column to row
      row.append(foodColumn);

      //create button column
      var buttonColumn = $('<div class="col-md-2 buttons">');
      var likeButton = $('<button id="like-button" data-key="' + key + '" class="rating-button btn btn-success">Like</button>')
      var dislikeButton = $('<button id="dislike-button" data-key="' + key + '" class="rating-button btn btn-danger">Dislike</button>')
      buttonColumn.append(likeButton);
      buttonColumn.append(dislikeButton);


      // append button column to row
      row.append(buttonColumn);

      // run at end
      $('#food-view').append(row);
    }

    function addDbElements(pairing, key) {

      // create row to hold beer column, food column, and button column
      var row = $('<div class="row dynamic">');

      // create Beer Column element
      var beerColumn = $('<div class="col-md-6 beer">');
      beerColumn.append('<div class="divText">' + pairing.beerName + '</div>');
      beerColumn.append('<img class="beerImg" src="' + pairing.beerImage + '">');
      beerColumn.append('<div class="divText">' + pairing.beerDesc + '</div>');

      // append beer column to row
      row.append(beerColumn);


      // create food column element
      var foodColumn = $('<div class="col-md-6 food">');
      foodColumn.append('<div class="divText">' + pairing.recipeName + '</div>');
      foodColumn.append('<a href="' + pairing.recipeURL + '" target="_blank"><img class ="foodImg" src="' + pairing.recipeImage + '"></a>');


      // append column to row
      row.append(foodColumn);

      // run at end
      $('#trending-view').append(row);
    }

  function makePairArray(beerIndex, recipe) {
    var pair = {
      likes: 0,
      dislikes: 0,
      beerName: beerIndex.name,
      beerDesc: beerIndex.description,
      beerImage: beerIndex.image_url,
      recipeName: recipe.name,
      recipeImage: recipe.images[0].hostedLargeUrl,
      recipeURL: recipe.attribution.url
    };

    return pair;
  }

  function makeAjaxCalls() {
      //First AJAX call to yummly to obtain list of recipes based on the random food choice selected
    
    var searchURL = "https://api.yummly.com/v1/api/recipes?_app_id=649a83ad&_app_key=4697316e4e0926361a8b7dba1626b763&q=" + foodChoice +"&maxResult=100";

    $.ajax({
      url: searchURL,
      method: "GET"
    }).done(function(response1) {

      var recipeArray = response1.matches;

      var queryURL = "https://api.punkapi.com/v2/beers?beer_name=" + beerType + "&per_page=" +10;

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response2) {
        // Storing an array of results in the results variable

        var beerArray = response2;
        //Using for loop to run the second AJAX call five times

        for (var i = 0; i < 5; i++){

          //choose random recipe from recipe array
          var recipeId = recipeArray[Math.floor(Math.random()*recipeArray.length)].id;
          
          var recipeIndex = recipeArray[Math.floor(Math.random()*recipeArray.length)];

          //Second AJAX call to obtain recipe detail
          var recipeURL = "https://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=649a83ad&_app_key=4697316e4e0926361a8b7dba1626b763";

          $.ajax({
            url: recipeURL,
            method: "GET"
          }).done(function(recipe) {

            var beerIndex = beerArray[Math.floor(Math.random()*beerArray.length)];

            var pairing = makePairArray(beerIndex, recipe);

            var pairRef = database.push(pairing);

            console.log(pairing, pairRef.key);

            // call addElements - call this with pairing - to show single object in DOM
            addElements(pairing, pairRef.key);
          });
        }
      });
    });
  }

  $("button").on("click", function(){
    event.preventDefault();
    beerType = $(this).attr("beerType");
    $("#food-view").empty();
    pairArray = [];
    //Choose a random index in the array of the type of beer clicked and set it to a search variable

    if(beerType === "ipa"){
      foodChoice = ipa[Math.floor(Math.random()*ipa.length)]
    } else if (beerType === "stout"){
      foodChoice = stout[Math.floor(Math.random()*stout.length)]
    } else if (beerType === "ale"){
      foodChoice = ale[Math.floor(Math.random()*ale.length)]
    } else if (beerType === "lager"){
      foodChoice = lager[Math.floor(Math.random()*lager.length)]
    } else {
      foodChoice = wit[Math.floor(Math.random()*wit.length)]
    }

    makeAjaxCalls();
  });

  $(document).on('click', '.rating-button', function() {

      var text = $(this).text();
      var id = $(this).attr('data-key');
      console.log(text, id)

      if(text === "Like") {

        database.child(id).once("value").then(function(snapshot){

          var likes = snapshot.val().likes;
          var dislikes = snapshot.val().dislikes;
          var beerName = snapshot.val().beerName
          var beerDesc = snapshot.val().beerDesc
          var beerImage = snapshot.val().beerImage
          var recipeName = snapshot.val().recipeName
          var recipeImage = snapshot.val().recipeImage
          var recipeURL = snapshot.val().recipeURL

          database.child(id).set({
            likes: likes-1,
            dislikes: dislikes,
            beerName: beerName,
            beerDesc: beerDesc,
            beerImage: beerImage,
            recipeName: recipeName,
            recipeImage: recipeImage,
            recipeURL: recipeURL
          })
        });

        } else {
          database.child(id).once("value").then(function(snapshot){

            var likes = snapshot.val().likes;
            var dislikes = snapshot.val().dislikes;
            var beerName = snapshot.val().beerName
            var beerDesc = snapshot.val().beerDesc
            var beerImage = snapshot.val().beerImage
            var recipeName = snapshot.val().recipeName
            var recipeImage = snapshot.val().recipeImage
            var recipeURL = snapshot.val().recipeURL

            database.child(id).set({
              likes: likes,
              dislikes: dislikes-1,
              beerName: beerName,
              beerDesc: beerDesc,
              beerImage: beerImage,
              recipeName: recipeName,
              recipeImage: recipeImage,
              recipeURL: recipeURL
            })
          });
      }
    });


        database.orderByChild('likes').limitToFirst(5).on('child_added', function(snapshot) {
          console.log(snapshot.val())
            addDbElements(snapshot.val(), snapshot.key);
        });

}); 