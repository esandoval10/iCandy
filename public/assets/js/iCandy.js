$(document).ready(function() {
    // Initialize modals no matter their name
    // Will trigger .modal-trigger too
    $(".modal").modal();
   
    // Button click function
    $("#my-modal-button").on("click", function() {
     // console.log("Clicked!");
    });
   });

   //code for name input box
   $(document).ready(function() {
    Materialize.updateTextFields();
  });

  $(document).ready(function() {
    $('select').material_select();
  });

  $('select').material_select('destroy');

  //parallax dashboard image
  $(document).ready(function(){
    $('.parallax').parallax();
  });

  //side-nav
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  //donut js
  $(function(){

    //get the doughnut chart canvas
    var ctx1 = $("#doughnut-chartcanvas-1");
    var ctx2 = $("#doughnut-chartcanvas-2");

    //doughnut chart data
    var data1 = {
        labels: ["Remaining", "Eaten"],
        datasets: [
            {
                label: "Calories Eaten",
                data: [500, 1500],
                backgroundColor: [
                    "#8A898A",
                    "#008B7D"
                ],
                // borderColor: [
                //     "#CB252B",
                //     "#1D7A46"
                // ],
                borderWidth: [1, 1, 1, 1, 1]
            }
        ]
    };

    //options
    var options = {
        responsive: true,
        title: {
            display: true,
            position: "top",
            text: "Calories Eaten",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        }
    };

    //create Chart class object
    var chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: data1,
        options: options
    });

});

  