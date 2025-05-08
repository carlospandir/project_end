let carrinho = [];

function toggleCarrinho() {
  document.getElementById('carrinhoPainel').classList.toggle('hidden');
}

function atualizarCarrinho() {
  const quantidadeSpan = document.getElementById('quantidadeCarrinho');
  const itensContainer = document.getElementById('itensCarrinho');
  const totalSpan = document.getElementById('totalCarrinho');

  quantidadeSpan.textContent = carrinho.length;
  itensContainer.innerHTML = '';

  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco;

    const item = document.createElement('div');
    item.classList.add('item-carrinho');
    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div>
        <strong>${produto.nome}</strong>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button class="remover" onclick="removerItem(${index})">Remover</button>
      </div>
    `;
    itensContainer.appendChild(item);
  });

  totalSpan.textContent = total.toFixed(2);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

document.querySelectorAll('.adicionar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const produtoEl = e.target.closest('.produto');
    const nome = produtoEl.querySelector('h3').innerText;
    const preco = parseFloat(produtoEl.querySelector('p').innerText.replace('R$', '').replace(',', '.'));
    const imagem = produtoEl.querySelector('img').src;

    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
  });
});

document.getElementById('finalizarCompra').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Compra finalizada!");
  carrinho = [];
  atualizarCarrinho();
  toggleCarrinho();
});
