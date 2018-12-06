$(document).ready(function() {
    //topics[] have initial food elements that are emptied and appended to
    //Begin by making a starting array with topic items as elements
    var topics = ["pizza", "tacos", "ramen", "sushi", "salad", "sandwich"];
    
    //Chronological First Function
    //Function for displaying initial food array elements as buttons
    function renderButtons() {
      // Deleting the food buttons prior to adding new food buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("#buttonFoods").empty();
      // Looping through the array of foods
      for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each food in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("btn btn - food info");
        // Adding a data-attribute with a value of the food at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the food at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttonFoods").append(a);
        $('#food-input').val('')
      }
    }
    
    //Chronological Second Function
    //This function will stick push new food input into topics[] and call on renderButtons function
    $("#add-food").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();
      // This line will grab the text from the input box
      var food = $("#food-input").val().trim();
      // The food from the textbox is then added to our array
      topics.push(food);
      // calling renderButtons which handles the processing of our food array
      renderButtons();
    });
    
    $(document).on("click",".food", showGifs);
    // Calling the renderButtons function at least once to display the initial list of foods
    renderButtons()
    
    });
    
    //Chronological Third Function
    //This function will grab gifs from the API key from the query URL
    function showGifs() {
        var food = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&limit=15&api_key=dc6zaTOxFJmzC";       
        //Empty all of the gifs in the second bootstrap row 
        //This will make sure buttons do not repeated
        $("#gifRowOne").empty();
        $("#gifRowTwo").empty();
        $("#gifRowThree").empty();
        $("#gifRowFour").empty();
        $("#gifRowFive").empty();
        //Creating an AJAX call for the specific food button being clicked       
        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
          //grab the data array from the response object stored in API key and store as variable name 
          var giphyArr = response.data; 
        //The response Object's first method is the data array in queryURL
          for(i=0; i<giphyArr.length; i++){
            //Target a div to hold the food gifs
            var foodGifs = $('<div class="col-sm-3">');
            //Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + giphyArr[i].rating);
            var foodImage = $('<img data-state="still">')
    
            foodImage.attr('src', giphyArr[i].images.fixed_height_still.url)
            foodImage.attr('data-animate', giphyArr[i].images.fixed_height.url)
            foodImage.attr('data-still', giphyArr[i].images.fixed_height_still.url)
            foodImage.attr('class', 'gif img-responsive')
            
            foodGifs.append(pOne);
            foodGifs.append(foodImage);
            //Fit the gifs that iterate out onto page into their own rows of three with 5 total rows
            if (i < 3){
              $('#gifRowOne').append(foodGifs)
            }
            else if (i > 3 && i < 7) {
              $('#gifRowTwo').append(foodGifs);
            }
            else if (i > 6 && i < 10){
              $('#gifRowThree').append(foodGifs);
            }
            else if (i > 9 && i < 13) {
              $('#gifRowFour').append(foodGifs);
            }
            else if (i > 12 && i < 15) {
              $('#gifRowFive').append(foodGifs);
            };
          }
        })
    }
    
    //Chronological Fourth Function
    //Add toggle function here
    $(document).on("click", ".gif", function(){
    
      var still = $(this).attr("data-still");
      var animate = $(this).attr("data-animate");
    
      if ($(this).attr("data-state") === "still"){
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      }
    })
    
    
        
     