// ============================================================
// BANNER LGPD — Clínica Vida
// Cookies gravados:
//   consentimento_lgpd = todos | essenciais | custom
//   cat_analise        = sim | nao
//   cat_marketing      = sim | nao
// ============================================================

var UM_ANO = 31536000;

function definirCookie(nome, valor) {
  document.cookie =
    nome + "=" + encodeURIComponent(valor) +
    "; max-age=" + UM_ANO + "; path=/; SameSite=Lax";
}

function getCookie(nome) {
  var partes = document.cookie ? document.cookie.split(";") : [];
  for (var i = 0; i < partes.length; i++) {
    var par = partes[i].trim();
    if (par.indexOf(nome + "=") === 0) {
      return decodeURIComponent(par.slice(nome.length + 1));
    }
  }
  return null;
}

function jaConsentiu() {
  return getCookie("consentimento_lgpd") !== null;
}

function salvarPreferencias(tipo, analise, marketing) {
  definirCookie("consentimento_lgpd", tipo);
  definirCookie("cat_analise", analise ? "sim" : "nao");
  definirCookie("cat_marketing", marketing ? "sim" : "nao");
  document.getElementById("banner").classList.add("oculto");
  atualizarPainel();
}

// 1. Ao carregar, decide se o banner aparece
window.addEventListener("load", function () {
  if (jaConsentiu()) {
    document.getElementById("banner").classList.add("oculto");
  } else {
    document.getElementById("banner").classList.remove("oculto");
  }
  sincronizarCheckboxes();
  atualizarPainel();
});

// 2. Aceitar todas as categorias
function aceitarTodos() {
  salvarPreferencias("todos", true, true);
}

// 3. Aceitar apenas os essenciais
function aceitarApenasEssenciais() {
  salvarPreferencias("essenciais", false, false);
}

// 4. Salvar a seleção personalizada
function salvarSelecao() {
  var analise = document.getElementById("chk-analise").checked;
  var marketing = document.getElementById("chk-marketing").checked;
  salvarPreferencias("custom", analise, marketing);
}

// 5. Reabrir o banner para mudar de ideia
function reabrirPreferencias() {
  document.getElementById("banner").classList.remove("oculto");
  sincronizarCheckboxes();
}

// 6. Refletir os cookies salvos nos checkboxes
function sincronizarCheckboxes() {
  document.getElementById("chk-analise").checked =
    getCookie("cat_analise") === "sim";
  document.getElementById("chk-marketing").checked =
    getCookie("cat_marketing") === "sim";
}

// 7. Atualizar o painel de status
function atualizarPainel() {
  var painel = document.getElementById("painel-status");

  if (!jaConsentiu()) {
    painel.innerHTML =
      "<p><strong>Status atual:</strong> aguardando consentimento.</p>" +
      "<p>Clique em um dos botões do banner para ver os cookies serem gravados.</p>";
    return;
  }

  var analise = getCookie("cat_analise") === "sim" ? "Ativo" : "Bloqueado";
  var marketing = getCookie("cat_marketing") === "sim" ? "Ativo" : "Bloqueado";

  painel.innerHTML =
    "<p><strong>Essenciais:</strong> Sempre ativos</p>" +
    "<p><strong>Análise:</strong> " + analise + "</p>" +
    "<p><strong>Marketing:</strong> " + marketing + "</p>";
}
