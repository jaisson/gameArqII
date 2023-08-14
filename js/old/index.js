$(document).ready(function() {
  $("#song").trigger('play');
  var altura = $(window).height();
  var largura = $(window).width(); 
   

  $("#conteiner").css({height:altura-40 , width:largura-10});

  $("#title").fadeIn(20000, function() {$("#next").fadeIn(10000); });
  
  $("#next").click(function() {
    $("#apresentation").fadeOut(5000, function() {
      $("#selectHero").fadeIn(1000);
    });
  });
  
  $(".selHero").click(function() {
    $("#selectHero").fadeOut(5000, function() {
      $("#loaderGame").fadeIn(5000, function() {
		 $(location).attr("href", "./boss1.html"); 
	  });
    });
    
  });
  
  // $(".attack").click(function() {
    // var target = $(this).attr("data-target");
    // window.setTimeout(function() {
      // $("#target"+target).attr("src", "./img/alvo.png");
    // }, 2000);

    // $("#target"+target).attr("src", "./img/attack.png");
  // });

  //baal 40X90
  //mephisto 50x40
  //diablo 30x50
  //malthael 70x80
  //$("#imgEnemy").css({height:(altura * (40/100)), width:largura * (90/100)});
  
  //$("#musicEnemy").trigger('play');
});

/*

   $("#infoOk").click(function() {
     $("#info").hide();
     
   });
$.getJSON("https://dl.dropboxusercontent.com/u/6061295/stack/json.json", function(json) {
    console.log('id: ' + json.id);
    console.log('nome: ' + json.nome);
});
*/