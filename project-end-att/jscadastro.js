
// -------------------------
function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function validarCelular(celular) {
  return /^\(\d{2}\)\d{8,9}$/.test(celular);
}

function validarLogin(login) {
  return /^[a-zA-Z0-9]{6}$/.test(login);
}

function preencherEndereco(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('estado').value = data.uf;
        document.getElementById('pais').value = 'Brasil';
      } else {
        alert('CEP não encontrado.');
      }
    });
}

document.getElementById('cep')?.addEventListener('blur', function () {
  const cep = this.value.replace(/\D/g, '');
  if (cep.length === 8) {
    preencherEndereco(cep);
  }
});


// Cadastro
document.getElementById('cadastroForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const nascimento = document.getElementById('nascimento').value;
  const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
  const celular = document.getElementById('celular').value;
  const fixo = document.getElementById('fixo').value;
  const cep = document.getElementById('cep').value;
  const pais = document.getElementById('pais').value;
  const estado = document.getElementById('estado').value;
  const logradouro = document.getElementById('logradouro').value;
  const numero = document.getElementById('numero').value;
  const referencia = document.getElementById('referencia').value;
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (nome.length < 15 || nome.length > 80) {
    alert('Nome deve ter entre 15 e 80 caracteres.');
    return;
  }

  if (cpf.length !== 11) {
    alert('CPF deve conter exatamente 11 dígitos.');
    return;
  }

  if (!validarCelular(celular)) {
    alert('Celular no formato incorreto. Use o formato (21)987654321');
    return;
  }

  if (!validarLogin(login)) {
    alert('Login deve ter exatamente 6 caracteres alfanuméricos.');
    return;
  }

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const novoUsuario = {
    nome,
    nascimento,
    cpf: formatarCPF(cpf),
    celular,
    fixo,
    cep,
    pais,
    estado,
    logradouro,
    numero,
    referencia,
    login,
    senha,
    tipo: "usuario"
  };

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.login === login)) {
    alert('Já existe um usuário com esse login.');
    return;
  }

  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html';
});

// -------------------------
// Login
// -------------------------
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuario = usuarios.find(user => user.login === login && user.senha === senha);

  if (usuario) {
    alert(`Login bem-sucedido! Bem-vindo, ${usuario.tipo === "admin" ? "Administrador" : "Usuário"}!`);
    window.location.href = 'dashboard.html';
  } else {
    alert('Login ou senha inválidos.');
  }
});