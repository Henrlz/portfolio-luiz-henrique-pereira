// Seleção dos elementos usados nas interações da página
const botaoMenu = document.querySelector('#botaoMenu');
const menuPrincipal = document.querySelector('#menuPrincipal');
const botaoTema = document.querySelector('#botaoTema');
const formulario = document.querySelector('#formContato');

// Abre e fecha o menu responsivo em telas menores
botaoMenu.addEventListener('click', () => {
  const menuAberto = menuPrincipal.classList.toggle('menu--aberto');
  botaoMenu.setAttribute('aria-expanded', String(menuAberto));
});

// Fecha o menu após o clique em algum link, melhorando a navegação no celular
menuPrincipal.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuPrincipal.classList.remove('menu--aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});

// Alterna entre tema claro e escuro sem usar bibliotecas externas
botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('tema-escuro');
  const temaEscuroAtivo = document.body.classList.contains('tema-escuro');
  botaoTema.textContent = temaEscuroAtivo ? 'Tema claro' : 'Tema escuro';
});

function mostrarErro(idElemento, mensagem) {
  document.querySelector(idElemento).textContent = mensagem;
}

function limparErros() {
  mostrarErro('#erroNome', '');
  mostrarErro('#erroEmail', '');
  mostrarErro('#erroMensagem', '');
  document.querySelector('#mensagemSucesso').textContent = '';
}

function emailValido(email) {
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padraoEmail.test(email);
}

// Validação obrigatória do formulário e simulação de envio
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  limparErros();

  const nome = document.querySelector('#nome').value.trim();
  const email = document.querySelector('#email').value.trim();
  const mensagem = document.querySelector('#mensagem').value.trim();
  let formularioValido = true;

  if (nome === '') {
    mostrarErro('#erroNome', 'Informe seu nome.');
    formularioValido = false;
  }

  if (email === '') {
    mostrarErro('#erroEmail', 'Informe seu e-mail.');
    formularioValido = false;
  } else if (!emailValido(email)) {
    mostrarErro('#erroEmail', 'Digite um e-mail válido, como usuario@dominio.com.');
    formularioValido = false;
  }

  if (mensagem === '') {
    mostrarErro('#erroMensagem', 'Escreva uma mensagem.');
    formularioValido = false;
  }

  if (formularioValido) {
    formulario.reset();
    document.querySelector('#mensagemSucesso').textContent = 'Mensagem enviada com sucesso!';
    alert('Mensagem enviada com sucesso!');
  }
});
