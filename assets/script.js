$(document).ready(function(){

console.log("letsago!")

var topics = ["paris", "dubai", "los angeles", "tokyo", "madrid", "london", "rome", "chicago", "new york"]

/*objective 1: I need to create a function that dynamically creates a button for each item in my topics array
and insert the buttons into the HTML*/
	function generateButtons(){
		for (var i = 0; i < topics.length; i++) {
		var cityButtons = $("<button class= city-button value=" + topics[i] + ">" + topics[i] + "</button>");
		$("#buttons-div").append(cityButtons);
			}
	}
generateButtons();


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



$(".city-button").click(function(){
	var unsplitCityName = ($(this).val());
	var cityName = unsplitCityName.split(' ').join('+');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cityName + "&api_key=dc6zaTOxFJmzC&limit=5&rating=pg";
	$("#gif-div").empty();
        $.ajax({
          url: queryURL,
          method: "GET"

        }).done(function(response) {
          console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
          	var gifDiv = $("<div class='dynamic-div'>");
          	var rating = $("<p>").text("Rating: " + results[i].rating);
          	var gifImage = $("<img>");
          	gifImage.attr("src", results[i].images.fixed_height_small.url);
          	gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
          	gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
          	gifImage.attr("data-state", "animate");
          	gifDiv.append(rating);
            gifDiv.append(gifImage);
            $("#gif-div").prepend(gifDiv);
          }
        


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



$("img").click(function() {
      var state = $(this).attr("data-state");
      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    });

	// end of .done method
  });

   // end of button .click method
});


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


$('#submit-button').click(function() {
	console.log($("#user-input").val() + " button added!");
	topics.push($("#user-input").val());
	console.log(topics);
	$("#buttons-div").empty();
	generateButtons();



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




$(".city-button").click(function(){
	var unsplitCityName = ($(this).val());
	var cityName = unsplitCityName.split(' ').join('+');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cityName + "&api_key=dc6zaTOxFJmzC&limit=5&rating=pg";
	$("#gif-div").empty();
        $.ajax({
          url: queryURL,
          method: "GET"

        }).done(function(response) {
          console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
          	var gifDiv = $("<div class='dynamic-div'>");
          	var rating = $("<p>").text("Rating: " + results[i].rating);
          	var gifImage = $("<img>");
          	gifImage.attr("src", results[i].images.fixed_height_small.url);
          	gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
          	gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
          	gifImage.attr("data-state", "animate");
          	gifDiv.append(rating);
            gifDiv.append(gifImage);
            $("#gif-div").prepend(gifDiv);
          }
        


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




$("img").click(function() {
      var state = $(this).attr("data-state");
      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    });

	// end of .done method
  });

   // end of button .click method
});

// end of submit-button .click method
});



// end of .ready method
});


/*I have written the button AND image .click method twice, once toward the beginning of my script so 
these .click methods are functional when the page loads, then again inside the submit-button 
.click method so that this functionality continues to work even after I have added other buttons.
There's got to be a more concise way to do this right?
 */





