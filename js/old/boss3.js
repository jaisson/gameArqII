var data = queryString("data");

$(document).ready(function() {
  prgUsadasAnt();

  window.setInterval(function() {
    var vida = $("#lifePerson").width() / $("tfoot").width() * 100;

    vida = vida - 25;
    $("#lifePerson").css({"width":vida+"%"});

    $("#danoPrn").fadeIn(200, function() {
      $("#pain").trigger("play");
      $("#danoPrn").fadeOut(200);
    });
	
    proximoAtaque()
  }, 10000);

  $("#acertoAcm").val(queryString("acerto"));
  $("#errosAcm").val(queryString("erros"));

  $("#song").trigger('play');
  var altura = $(window).height();
  var largura = $(window).width();

  carregarAtaque();

  $(".attack").click(function() {
    $("#pergunta").empty();
    $("#attack1").empty();
    $("#attack2").empty();
    $("#attack3").empty();
    $("#attack4").empty();

    $("#attack").trigger("play");
    var questao  = $(this).attr("data-target");
    var resposta = $("#pergunta").attr("id-hint");

    var target = $(this).attr("data-target");
    window.setTimeout(function() {
      $("#target"+target).attr("src", "./img/alvo.png");
	  $("#target"+target).css({height:50, width:50, "background":"none"});

      if (questao == resposta) {
        $("#painEnemy").trigger("play");
        var vida = $("#lifeEnemy").width() / $("#enemyBaal").width() * 100;
        vida = vida - 25;
        $("#lifeEnemy").css({"width":vida+"%"});
        $("#acerto").val(parseInt($("#acerto").val()) +1);
	  } else {
        $("#erros").val(parseInt($("#erros").val()) +1);
      }
	  
      proximoAtaque();
      carregarAtaque();
    }, 2000);

    $("#target"+target).attr("src", "./img/attack.png");
    $("#target"+target).css({"height":"80", "width":"80", "background":"linear-gradient(to bottom,  #f9f271 0%,#cec10c 100%)", "border-radius": "50px"});
  });
});

function carregarAtaque() {
  var rdm = (Math.floor(Math.random() * perguntas.length));
  rdm = parseInt(rdm);
  if (rdm >= 0 && rdm <= 20) {
    var prg = perguntas[rdm];

    if (typeof Object.keys(prg) !== 'undefined' && Object.keys(prg).length > 0) {
      var key = Object.keys(prg);
      key = key[0];

      if ( prg[key].lido == 1) {
        carregarAtaque();
        return false;
	  }

      $("#pergunta").text(key);
      $("#pergunta").attr("id-hint", prg[key].gabarito);

      $("#attack1").text(prg[key].resposta1);
      $("#attack2").text(prg[key].resposta2);
      $("#attack3").text(prg[key].resposta3);
      $("#attack4").text(prg[key].resposta4);

      prg[key].lido = 1;
    }
  }
}

function proximoAtaque() {
  if ($("#lifePerson").width() / $("tfoot").width() * 100 > 0 && $("#lifeEnemy").width() / $("#enemyBaal").width() * 100 <= 0) {
	$("#endFigth").empty();
    $("#endFigth").html("Voce Venceu, derrote o proximo Lord<br />Total de acertos: " + $("#acerto").val() + ", Total de Erros: " + $("#erros").val());
    $("#endFigth").show();
	$("#attacks").hide();

    window.setTimeout(function() {
      if (confirm("Deseja Enfrentar o Próximo Lord?")) {
        $(location).attr("href", "./boss3.html?acerto="+$("#acertoAcm").val() + "&erros="+ $("#errosAcm").val() + "&data=" +  prgUsadas());
	  } else {
	    $("#endFigth").empty();
        $("#endFigth").html("Covarde!<br />Santuario foi destruído devida a sua falta de fe!");
        $("#endFigth").show();
	  }
    }, 5000);
    return false;
  }

  if ($("#lifePerson").width() / $("tfoot").width() * 100 <= 0) {
	$("#endFigth").empty();
    $("#endFigth").html("Voce foi Derrotado e sua alma foi tragada por Malthael<br />Total de acertos: " + $("#acerto").val() + ", Total de Erros: " + $("#erros").val());
    $("#endFigth").show();
	$("#attacks").hide();
    return false;
  }
}

function queryString(parameter) {
  var loc = location.search.substring(1, location.search.length);
  var param_value = false;
  var params = loc.split("&");

  for (i=0; i<params.length;i++) {
    param_name = params[i].substring(0,params[i].indexOf('='));

    if (param_name == parameter) {
      return params[i].substring(params[i].indexOf('=')+1);
    }
  }

  return false;
}

function prgUsadasAnt() {
	
  var arrData = data.split(",");

  var lidos = "";
  for(i = 0; i < perguntas.length; i++) {
    var prg = perguntas[i];
    var key = Object.keys(prg);
    key = key[0];

    for(j = 0; j < arrData.length-1; j++) {
      if (i == arrData[j]) {
        prg[key].lido = 1;
	  }
	}
  }
}

function prgUsadas() {
  var lidos = "";
  for(i = 0; i < perguntas.length; i++) {
    var prg = perguntas[i];
    var key = Object.keys(prg);
    key = key[0];
	
    if (prg[key].lido == 1) {
      lidos += i + ",";
	}
  }
  lidos = lidos.substring(0, lidos.length -1);
  return lidos;
}