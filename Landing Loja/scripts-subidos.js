const configsSite = {
  url: "",
  location: document.querySelector("body").className.split(" "),
};

const breakpoint = {
  desktop: window.matchMedia("(min-width: 1200px)").matches,
  largeTablets: window.matchMedia("(min-width: 992px) and (max-width: 1190px)")
    .matches,
  middleTablets: window.matchMedia(
    "(min-width: 768px) and (max-width: 991.98px)"
  ).matches,
  mobile: window.matchMedia("(min-width: 340px) and (max-width: 767.98px)")
    .matches,
  mobilexs: window.matchMedia("(max-width: 339.98px)").matches,
};

//Ativa ou remove elemento
function setActive(IsVisible, className) {
  if (IsVisible) {
    $(className).css("display", "block");
  } else {
    $(className).remove();
  }
}

//Remove elementos do site
function removeElements(element) {
  var elements = element.length;

  for (i = 0; i < elements; i++) {
    $(element[i]).remove();
  }
}

//Adicionar ou Remove Classe
function createClass(e, c, t) {
  if (t) {
    $(e).addClass(c);
  } else {
    $(e).removeClass(c);
  }
}

function clocandoWrapMeio() {
  $("#wrap-meio-clone").append($(".wrap-meio").clone());
}

//Corrige PosiÃ§Ãµes de elementos
function setDefaultPositions() {
  removeElements([".wrap-corpo", ".wrap-meio"]);
  createClass(".menu", "separaNav", true);
}

function setDefaultPositionsProducts() {
  removeElements(["#banners-meio", "#banners-pequenos"]);
}

//Mostra Parcelas do produtos
(function () {
  var cardPlots = document.querySelectorAll(".preco-produto>div");

  cardPlots.forEach(function (item) {
    var novoItem = document.createElement("span");

    novoItem.className = "parcelas";

    item.append(novoItem);
    novoItem.innerHTML = "Em atÃ© 3x S/Juros";
  });
})();

//Instancia o Mini Cart
(function () {
  $.ajax({
    type: "POST",
    url: "https://high-inox.lojaintegrada.com.br/carrinho/listar_produtos",
    success: function (data) {
      $(".mini-cart").html(data);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    },
  });
})();

//FunÃ§Ã£o Menu Mobile
(function () {
  $(".menu-hamburguer").on("click", function () {
    $(".navigation-mobile-content").toggle("slow");
  });
})();

//Cria o botÃ£o de comprar nos produtos da home
(function () {
  if (
    configsSite.location[0] == "pagina-inicial" ||
    configsSite.location[0] == "pagina-categoria" ||
    configsSite.location[0] == "pagina-busca"
  ) {
    var produtos = document.querySelectorAll(".trustvox-stars");

    produtos.forEach(function (item) {
      var idItem = item.dataset.trustvoxProductCode;
      var href = item.parentNode.getElementsByTagName("a")[0].href;
      $(item)
        .next()
        .after(
          "<div class='botao-comprar'><a href='" + href + "'>Comprar</a></a>"
        );
    });
  } else {
    var produtos = document.querySelectorAll(".info-produto");
    produtos.forEach(function (item) {
      var href = item.parentNode.getElementsByTagName("a")[0].href;
      $(item)
        .next()
        .after(
          "<div class='botao-comprar'><a href='" + href + "'>Comprar</a></a>"
        );
    });
  }
})();

//Pega total de itens no carrinho e adiciona na nova Classe
(function () {
  var totalItems = document.querySelectorAll(".carrinho .qtd-carrinho");
  var itemsInCart = totalItems[0].innerHTML;

  if (itemsInCart > 0) {
    $(".carrinho,.carrinho-mobile").append(
      "<span class='qtd-carrinho'>" + itemsInCart + "</span>"
    );
  }
})();

//cria funÃ§Ã£o de login
(function () {
  var accountUser = document.querySelectorAll(".btn-group .botao");
  if (accountUser.length > 0) {
    var splitUser = accountUser[0].text.split(",");
    var user = splitUser[1];
    $(".itens-dir ul .item1,.item2").remove();
    $(".log").html("<a href='/conta/index'>" + user + "</a>");
    $(".itens-dir ul").append("<li><a href='/conta/logout'>Sair</a></li>");
    // mobile
    $(".navigation-mobile-content li:nth-child(3)").html(
      "<a href='/conta/logout'>Sair</a>"
    );
  } else {
    $(".log").html("<a href='/conta/login'>Login</a>");
    $(".itens-dir ul li:first-child").html(
      "<a href='/conta/index'>Criar conta</a>"
    );
  }
})();

//Cria o novo filtro na pÃ¡gina de categoria
(function () {
  if (
    configsSite.location[0] == "pagina-categoria" ||
    configsSite.location[0] == "pagina-busca"
  ) {
    var items = [
      "<li>Filtrar Por:</li>",
      "<li><a href='?sort=%2Bnome'>Ordem AlfabÃ©tica</a></li>",
      "<li><a href='?sort=mais_vendidos'>Mais Vendidos</a></li>",
      "<li><a href='?sort=%2Bpreco'>Menor PreÃ§o</a></li>",
      "<li><a href='?sort=-preco'>Maior PreÃ§o</a></li>",
    ];
    $(
      ".pagina-categoria .topo .row-fluid, .pagina-busca .topo .row-fluid"
    ).html("<ul class='filtro-categoria'></ul>");

    for (i = 0; i < items.length; i++) {
      $(".filtro-categoria").append(items[i]);
    }
  }
})();

//Corrige a imagem do slide na pÃ¡gina de produto
function corrigeImagemSlide() {
  if (
    breakpoint.desktop ||
    breakpoint.largeTablets ||
    breakpoint.largeTablets
  ) {
    var getMiniaturas = document.querySelectorAll(
      ".pagina-produto .miniaturas li a img"
    );

    var getLiImagens = document.querySelectorAll(".miniaturas li");
    if (getLiImagens.length > 0) {
      getLiImagens[0].classList.add("active");
    }

    getMiniaturas.forEach(function (item) {
      var imagem = item.dataset.largeimg;
      item.src = imagem;
    });
  }
}

//Corrige BotÃ£o de CEP
(function () {
  $("div.input-append.input-prepend button")
    .removeClass("btn")
    .addClass("btn-cep");
})();

//Corrige PosiÃ§Ã£o da descriÃ§Ã£o - pÃ¡gina de produtos
function corrigePosicaoDescricao() {
  $(".pagina-produto .tab-content:first-child").prepend(
    "<div class='navegacao-tab'><button class='t-descricao active' >DescriÃ§Ã£o</button><button class='t-caracteristicas'>CaracterÃ­sticas</button></div>"
  );
  $(".pagina-produto .caracteristicas").css("display", "none");

  var heightDescricao =
    $(".pagina-produto .abas-custom .tab-content").height() + 40;

  $("div.listagem.aproveite-tambem.borda-alpha").css(
    "margin-top",
    heightDescricao
  );
}

$(document).ready(function () {
  removeElements([
    ".barra-inicial",
    "#cabecalho",
    ".institucional",
    "#barraTopo",
    ".pagamento-selos",
    ".bandeiras-produto",
    "#rodape",
  ]);

  //Verifica em qual pÃ¡gina estou e realiza as alteraÃ§Ãµes
  switch (configsSite.location[0]) {
    case "pagina-inicial":
      break;

    case "pagina-produto":
      clocandoWrapMeio();
      removeElements([".banner-mobile"]);
      setDefaultPositionsProducts();
      break;

    case "pagina-carrinho":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-categoria":
      setDefaultPositions();
      removeElements(["div.coluna.span3"]);
      $("div.conteudo.span9").removeClass("span9").addClass("span12");
      createCarousel([".listagem-linha", ".flexslider2"]);
      break;

    case "pagina-busca":
      setDefaultPositions();
      removeElements([".banner-mobile"]);
      removeElements(["div.coluna.span3"]);
      $("div.conteudo.span9").removeClass("span9").addClass("span12");
      createCarousel([".listagem-linha", ".flexslider2"]);
      break;

    case "pagina-login":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-cadastro":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-conta":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-pedido-listar":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-favorito-listar":
      removeElements([".banner-mobile"]);
      setDefaultPositions();
      break;

    case "pagina-pagina":
      removeElements([".banner-mobile"]);
      removeElements([".wrap-corpo"]);
      break;
  }

  //Transforma slide horizontal em vertical e etc
  if (configsSite.location[0] == "pagina-produto") {
    $(".codigo-produto").append(
      "<span><i class='fas fa-lock' aria-hidden='true'></i> COMPRA SEGURA</span>"
    );
    $(".principal .info-principal-produto").append(
      "<div class='resumo-produto'></div>"
    );
    $(".resumo-produto").html($(".resumo").html());

    if (
      breakpoint.desktop ||
      breakpoint.largeTablets ||
      breakpoint.largeTablets
    ) {
      createClass(".produto-thumbs", "thumbs-horizontal", false);
      createClass(".produto-thumbs", "thumbs-vertical", true);
    }
  }

  //Instancia a funÃ§Ã£o que corrige a imagem dos produtos
  corrigeImagemSlide();

  //Corrige PosiÃ§Ã£o da descriÃ§Ã£o - PÃ¡gina de produtos
  corrigePosicaoDescricao();

  $(".t-descricao").click(function () {
    if (!$(".descricao").is(":visible")) {
      $(".descricao").toggle();
      $(".caracteristicas").toggle();
      $(this).addClass("active");
      $(".t-caracteristicas").removeClass("active");
    }
  });

  $(".t-caracteristicas").click(function () {
    if (!$(".caracteristicas").is(":visible")) {
      $(".descricao").toggle();
      $(".caracteristicas").toggle();
      $(this).addClass("active");
      $(".t-descricao").removeClass("active");
    }
  });
});

// Mudando o breadcrumb de lugar
var bread = $(".breadcrumbs").html();
$(".produto").before('<div class="breadcrumbs">' + bread + "</div> ");

// Inserindo uma linha de baixo do nome do produto
$(".info-principal-produto .nome-produto").after('<span class="linha"></span>');

// Mudando o slide DESKTOP de lugar
var divBanner = $(".cheio .span12").html();
// div nova banner
$(".banner").html(divBanner);

// Colocando o banner linha de cuba na pÃ¡gina de produto
$(".tab-content .tab-pane").after("<div id='wrap-meio-clone'></div> ");

// Adicionando banner mobile
if ($(window).width() < 768) {
  $(".banner-img-mobile").html(
    '<img src="https://cdn.awsli.com.br/1264/1264240/arquivos/banner-mobile.png">'
  );
}

console.log("oi");
