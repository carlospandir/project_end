// limpa os campos
function limparCampos() {
  document.getElementById('login').value = '';
  document.getElementById('senha').value = '';
  document.getElementById('mensagemErro').textContent = '';
}

// evento de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  // busca os usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // busca o admin separado
  const contaAdmin = JSON.parse(localStorage.getItem('contaAdmin'));

  // junta todos os usuários num só array
  const todosUsuarios = [...usuarios];
  if (contaAdmin) {
    todosUsuarios.push(contaAdmin);
  }

  // procura o usuário correto
  const usuario = todosUsuarios.find(user => user.login === login && user.senha === senha);

  if (usuario) {
    // login válido
    alert(`Bem-vindo, ${usuario.tipo === "admin" ? "Administrador" : "Usuário"}!`);
    window.location.href = 'loja.html'; // redireciona para loja ou dashboard
  } else {
    // login inválido
    document.getElementById('mensagemErro').textContent = 'Login ou senha incorretos. Tente novamente.';
  }
});