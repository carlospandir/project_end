// Cria e salva a conta do admin separadamente 
const admin = {
    nome: "Administrador",
    nascimento: "01/01/1980",
    cpf: "123.456.789-00",
    celular: "(11)987654321",
    fixo: "(11)12345678",
    cep: "01001000",
    pais: "Brasil",
    estado: "SP",
    logradouro: "Rua Admin",
    numero: "1",
    referencia: "Painel de controle",
    login: "admin123",
    senha: "admin123",
    tipo: "admin"
  };
  
  // admin
  if (!localStorage.getItem('contaAdmin')) {
    localStorage.setItem('contaAdmin', JSON.stringify(admin));
  }