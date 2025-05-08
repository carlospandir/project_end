  //escuro
  const toggle = document.getElementById('escuro');

function atualizarTextoBotao() {
  if (document.body.classList.contains('dark-mode')) {
    toggle.textContent = '☀️';
  } else {
    toggle.textContent = '🌙';
  }
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Salvar no localStorage
  const modoAtual = document.body.classList.contains('dark-mode') ? 'escuro' : 'claro';
  localStorage.setItem('modo', modoAtual);

  atualizarTextoBotao();
});

window.addEventListener('load', () => {
  const modoSalvo = localStorage.getItem('modo');
  if (modoSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
  }
  atualizarTextoBotao();
});