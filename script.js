let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // renderizarCards(dados);
    
    // Adiciona o ouvinte de evento para o campo de busca
    const campoBusca = document.getElementById("busca");
    campoBusca.addEventListener("input", iniciarBusca);
}

function iniciarBusca(evento) {
    const termoBusca = evento.target.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let dado of cardsParaRenderizar){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2> 
        <p>${dado.data_criacao}</p> 
        <p>${dado.descricao}.</p> 
        <p><a href="${dado.link}" target="_blank">Saiba mais</a></p>
        `

        cardContainer.appendChild(article);
    }
}

carregarDados();