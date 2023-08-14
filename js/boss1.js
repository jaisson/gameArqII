$(document).ready(function() {
  $("#song").trigger('play');
  var altura = $(window).height();
  var largura = $(window).width();

  $("#imgEnemyBaal").css({height:(altura * (50/100)), width:largura * (80/100)});

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
        vida = vida - 34;
        $("#lifeEnemy").css({"width":vida+"%"});
        $("#acerto").val(parseInt($("#acerto").val()) +1);
	  } else {
        var vida = $("#lifePerson").width() / $("tfoot").width() * 100;

        vida = vida - 34;
        $("#lifePerson").css({"width":vida+"%"});
        $("#erros").val(parseInt($("#erros").val()) +1);

        $("#danoPrn").fadeIn(200, function() {
          $("#pain").trigger("play");
          $("#danoPrn").fadeOut(200);
		});
      }

      proximoAtaque();
      carregarAtaque();
      if ($("#attack1").text().length < 2) {
        carregarAtaque();
	  }
    }, 2000);

    $("#target"+target).attr("src", "./img/attack.png");
    $("#target"+target).css({"height":"80", "width":"80", "background":"linear-gradient(to bottom,  #f9f271 0%,#cec10c 100%)", "border-radius": "50px"});
  });
});

function carregarAtaque() {
  var rdm = (Math.floor(Math.random() * perguntas.length));
  rdm = parseInt(rdm);
  if (rdm >= 0 && rdm <= 15) {
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
    $("#endFigth").html("Você Venceu, derrote o próximo Lord<br />Total de acertos: " + $("#acerto").val() + ", Total de Erros: " + $("#erros").val());
    $("#endFigth").show();
	$("#attacks").hide();

    window.setTimeout(function() {
      if (confirm("Deseja Enfrentar o Próximo Lord?")) {
        $(location).attr("href", "./boss2.html?acerto="+$("#acerto").val() + "&erros="+ $("#erros").val() + "&data=" + prgUsadas());
	  } else {
	    $("#endFigth").empty();
        $("#endFigth").html("<h1>Covarde!<br />Santuário foi destruído devida a sua falta de fé!</h1>");
        $("#endFigth").show();
	  }
    }, 5000);
    return false;
  }

  if ($("#lifePerson").width() / $("tfoot").width() * 100 <= 0) {
	$("#endFigth").empty();
    $("#endFigth").html("Você foi Derrotado e sua alma foi consumida por Lord Baal<br />Total de acertos: " + $("#acerto").val() + ", Total de Erros: " + $("#erros").val());
    $("#endFigth").show();
	$("#attacks").hide();
    return false;
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
