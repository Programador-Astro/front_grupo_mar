export async function loginUser(email, pwd) {
  const resposta = await fetch('http://127.0.0.1:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pwd }),
  });

  if (!resposta.ok) {
    throw new Error('Erro no login');
  }

  const dados = await resposta.json();
  return dados;
}
