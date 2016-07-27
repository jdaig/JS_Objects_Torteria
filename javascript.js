$( document ).ready(function() {
  $(".create-oven").click("submit", function(event){
    event.preventDefault();
    console.log("hizo click");
    $(".oven").css("visibility", "visible")
  });

  $("#order").submit(function(event){
    event.preventDefault();

    var taste_select = $("#taste").val(); //Esta se toma como una variable local
    time = $("#time").val(); //De esta forma se toma como una variable global
    // console.log(taste);
    // console.log(time);
    torta1 = new Torta(taste_select);
    // console.log(torta1);
    countdown(time)
  });
})

// Class Torta
var Torta = function (taste) {
  console.log('Torta');
  this.taste = taste;
};

Torta.prototype.perfectcook = function() {
  console.log("tiempos perfectos");
  if (torta1.taste == "milanesa"){
    return 10
  } else if (torta1.taste == "jamon"){
    return 8
  } else if (torta1.taste == "queso"){
    return 5
  } else {
    return 8
  }
};

// Class TortaBatch
var TortaBatch = function () {
  console.log('TortaBatch');
};

// Class Oven
var Oven = function () {
  console.log('Oven');
};

function countdown(time_select){
    console.log("inside countdown");
    
    var counter = time_select;
    var start_count = setInterval(function () {
    counter--;
    $("#countdown").html(counter)
    cookstatus(counter);
    if (counter === 0) { 
      console.log("es cero");
      clearInterval(start_count);
      bath();
      // $(document).on('keyup', getKey);
    };
    }, 1000);
  };

  function cookstatus(current_time) {
    console.log("checa la orden");
    console.log("**************");
    console.log(current_time)

    if (time - torta1.perfectcook() == 0) {
      console.log("Entra al match")
      if (current_time == 0){
      $("#timer").removeClass()
      $("#timer").addClass("LISTO")
      $("#status").html("LISTO")
      } else {
      $("#timer").removeClass()
      $("#timer").addClass("Casi-listo")
      $("#status").html("Casi-listo")
      }
    } else if (time - torta1.perfectcook() > 0){
        if (time - torta1.perfectcook() > current_time){
          $("#timer").removeClass()
          $("#timer").addClass("QUEMADO")
          $("#status").html("QUEMADO")
        } else if (time - torta1.perfectcook() == current_time){
          $("#timer").removeClass()
          $("#timer").addClass("LISTO")
          $("#status").html("LISTO")
        } else{
          $("#timer").removeClass()
          $("#timer").addClass("Casi-listo")
          $("#status").html("Casi-listo")
        } 
    } else if (time - torta1.perfectcook() < 0){
        if (current_time == 0){
          $("#timer").removeClass()
          $("#timer").addClass("Crudo")
          $("#status").html("Crudo")
        } else{
          $("#timer").removeClass()
          $("#timer").addClass("Casi-listo")
          $("#status").html("Casi-listo")
        } 
    } 
};

function bath(){
  var st = $("#timer").attr("class");
  $("#history").css("visibility", "visible");
  $("#history").addClass("recien-salidas");
  $("#out").append("<ol>"+torta1.taste + " * " + st +"</ol>");
  $("#taste").val("");
  $("#time").val("");
}