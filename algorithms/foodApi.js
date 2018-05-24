// https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY

// https://api.nal.usda.gov/ndb/reports/?ndbno=11960&type=f&format=json&api_key=DEMO_KEY

// https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=205&nutrients=204&nutrients=208&nutrients=269

function buildQueryURL (toDo, searchNdbno) {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nal.usda.gov/ndb/";

    // Search for food and allows to acquire NDBNO
    if(toDo === "search"){
    
        // grab text the user typed into the search input, add as parameter to url
        var searchFood = $("#search-term").val().trim();
        queryURL += "search/?format=json&q=" + searchFood;
      
        // add the api key parameter (the one we received when we registered)
        queryURL += "&sort=n&max=25&offset=0&api_key=MDuoTgcs8zlr9VqYGWTvFMBwKIyxqGduAaxKByep";
      
        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
      
        return queryURL;
    }
        
    // Return calories and other nutrients
    else if(toDo === "report"){
        // grab ndbno the user clicked into, add as parameter to url 
        queryURL += "reports/?ndbno=" + searchNdbno;

        queryURL += "&type=b&format=json&api_key=MDuoTgcs8zlr9VqYGWTvFMBwKIyxqGduAaxKByep"

        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
      
        return queryURL;
    }    
} 

//Fills in food list from search input available for user to select
function updatePage(foodList) {
  
    // log the foodList to console, where it will show up as an object
    console.log(foodList);
    console.log("------------------------------------");

    // loop through and build elements for the defined number of foods
    for (var i = 0; i < 25; i++) {
  
      // get specific info info for current index
      var foods = foodList.list.item[i];
  
      // increase the foodCount (track food # - starting at 1)
      var foodCount = i + 1;
        
      var identity = foods.ndbno;
      console.log(identity);
  
      // create the HTML well (section) and add the food content for each
      var $foodWell = $("<div>");
      $foodWell.addClass("well");
      $foodWell.attr("id", "food-well-" + foodCount);
  
      // add the newly created element to the DOM
      $("#well-section").append($foodWell);
  
      // log and append name to $foodWell
      var name = foods.name;
      
        $foodWell.append(
          "<h3 class='foodName' data-identity='" + identity + "'>" +
          "<span class='label label-primary'>" + foodCount + "</span>" +
          "<strong> " + name + "</strong></h3>"
        );
  
      // log and append group to $foodWell
      var group = foods.group;
  
        console.log(group);
  
        $foodWell.append("<h5>" + group + "</h5>");
    }
}

//Fills in food list from search input available for user to select
function dataPage(foodData) {

    // var to be sent to calculations for displaying as eaten
    var calories = 0
  
    // log the foodData to console, where it will show up as an object
    console.log(foodData);
    console.log("------------------------------------");
  
    // get specific info info for current index
      var food = foodData.report.food;

      var nutrients = food.nutrients;

  
      // create the HTML well (section) and add the food content for each
      var $foodData = $("<div>");
      $foodData.addClass("well");
      $foodData.attr("id", "food-data");
  
      // add the newly created element to the DOM
      $("#well-section").append($foodData);
  
      // log and append name to $foodWell
      var name = food.name;
      
        $foodData.append(
          "<h3 class='foodName'>" +
          "<strong> " + name + "</strong></h3><br>"
        );
        // Array to hold desired nutrients to display
        var displayNutrients = [];

        // Selects calories(energy), fats, carbs and sugar information from api
        for (var i = 0; i < nutrients.length; i++){
            var currentNutrient = nutrients[i];

            var currentId = currentNutrient.nutrient_id;

            switch (currentId){

                case "208":
                displayNutrients.push(currentNutrient);
                calories = currentNutrient.value;
                break;
                case "205":
                displayNutrients.push(currentNutrient);
                break;
                case "204":
                displayNutrients.push(currentNutrient);
                break;
                case "269":
                displayNutrients.push(currentNutrient);
                break;
                default:
                console.log(currentId)
                break;
            }
        }
        console.log(displayNutrients);

        // adds nutrients to HTML 
        for (var j = 0; j < displayNutrients.length; j++){
            var nutrientName = displayNutrients[j].name;
            var value = displayNutrients[j].value;
            var unit = displayNutrients[j].unit;
        
            $foodData.append(
            "<h4>" + nutrientName + "</h4>" +
            "<h5 data-value='" + value + "'>" + value + " " + unit + "</h5>"
            );
        }
}


// function to empty out the food
function clear() {
    $("#well-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // empty the region associated with the food
    clear();
  
    // build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL("search", 0);
  
    // make the AJAX request to the API - GETs the JSON data at the queryURL.
    // the data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });

$(document).on('click', '.foodName', function() {

    // Acquires nDBNO for use in API from user input
    var nDBNo = $(this).data('identity');
    console.log(nDBNo);
    // build the query URL for the ajax request to the reports API
    var queryURL = buildQueryURL("report", nDBNo);

    // empty the region associated with the food
    clear();

    // make the AJAX request to the API - GETs the JSON data at the queryURL.
    // the data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(dataPage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);