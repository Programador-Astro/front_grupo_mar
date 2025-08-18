export async function loginUser(email, pwd) {
  const resposta = await fetch('https://gestor-docker.onrender.com/auth/login', {
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
