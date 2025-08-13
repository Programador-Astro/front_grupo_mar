export function validarEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export function validarSenha(senha) {
  return senha.length >= 6;
}
