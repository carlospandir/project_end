document.getElementById('recuperarForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const cpfDigitado = document.getElementById('cpf').value.replace(/\D/g, '');
    const loginDigitado = document.getElementById('login').value;
    const mensagem = document.getElementById('mensagemRecuperacao');
  
    const usuario = JSON.parse(localStorage.getItem('usuarioCadastrado'));
  
    if (!usuario) {
      mensagem.textContent = 'Nenhum usuário cadastrado.';
      mensagem.style.color = 'red';
      return;
    }
  
    if (usuario.cpf.replace(/\D/g, '') === cpfDigitado && usuario.login === loginDigitado) {
      mensagem.innerHTML = `Sua senha é: <strong>${usuario.senha}</strong>`;
      mensagem.style.color = 'green';
    } else {
      mensagem.textContent = 'CPF ou Login incorretos.';
      mensagem.style.color = 'red';
    }
  });