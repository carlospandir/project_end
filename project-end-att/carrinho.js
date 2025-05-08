let carrinho = [];

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(produto) {
  carrinho.push(produto); // Adiciona o produto no array carrinho
  atualizarCarrinho(); // Atualiza a quantidade e o total do carrinho
}

// Função para atualizar a quantidade e o total do carrinho
function atualizarCarrinho() {
  const quantidadeCarrinho = document.getElementById('quantidadeCarrinho');
  quantidadeCarrinho.textContent = carrinho.length;

  // Atualiza o total de preços
  const totalElement = document.getElementById('total');
  let total = 0;
  for (const produto of carrinho) {
    total += produto.preco;
  }
  totalElement.textContent = total.toFixed(2);
}

// Função para mostrar os itens do carrinho no menu hambúrguer
function mostrarItensCarrinhoMenu() {
  const carrinhoElement = document.getElementById('itensCarrinhoMenu');
  carrinhoElement.innerHTML = ''; // Limpa os itens atuais

  if (carrinho.length === 0) {
    carrinhoElement.innerHTML = "<p>Seu carrinho está vazio.</p>";  // Mensagem caso o carrinho esteja vazio
  } else {
    carrinho.forEach((produto) => {
      const item = document.createElement('div');
      item.classList.add('item-carrinho');
      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div>
          <h4>${produto.nome}</h4>
          <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>
      `;
      carrinhoElement.appendChild(item);
    });

    const totalElement = document.getElementById('totalMenu');
    let total = 0;
    carrinho.forEach(produto => total += produto.preco);
    totalElement.textContent = total.toFixed(2);
  }
}

// Função para alternar a visibilidade do menu hambúrguer
function toggleMenu() {
  const menuCarrinho = document.getElementById('menuCarrinho');
  menuCarrinho.classList.toggle('show'); // Alterna a visibilidade do menu

  // Exibe os itens do carrinho ao abrir o menu
  if (menuCarrinho.classList.contains('show')) {
    mostrarItensCarrinhoMenu();
  }
}

// Função para finalizar a compra
function finalizarCompra() {
  alert("Compra finalizada!");
  // Aqui você pode adicionar lógica para redirecionar para uma página de checkout ou processar a compra.
}

// Adicionar eventos de clique nos botões "Adicionar"
document.querySelectorAll('.adicionar').forEach((botao) => {
  botao.addEventListener('click', (event) => {
    // Verificando qual produto foi clicado
    const produtoElement = event.target.closest('.produto');
    const nome = produtoElement.querySelector('h3').innerText;
    const preco = parseFloat(produtoElement.querySelector('p').innerText.replace('R$', '').replace(',', '.').trim());
    const imagem = produtoElement.querySelector('img').src;  // Obtém o caminho da imagem

    const produto = { nome, preco, imagem };
    adicionarAoCarrinho(produto); // Adiciona o produto ao carrinho
  });
});

// Evento para finalizar a compra
document.getElementById('finalizarCompraMenu').addEventListener('click', finalizarCompra);