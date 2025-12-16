const tabelaResultadoLivros = document.getElementById('tabelaResultadoLivros');

async function cadastrarLivro(event) {
  event.preventDefault();

  const id = document.getElementById('id').value;
  const titulo = document.getElementById('titulo').value;
  const anoPublicacao = document.getElementById('anoPublicacao').value;
  const numeroPaginas = document.getElementById('numeroPaginas').value;

  const apiUrl = 'http://localhost:3000/livros';

  const livro = {
    id,
    titulo,
    anoPublicacao,
    numeroPaginas
  }

  const request = new Request(apiUrl, {
    method: 'POST',
    body: JSON.stringify(livro),
    headers: new Headers(
      { 'Content-Type': 'application/json' }
    )
  })

  const response = await fetch(request);

  if (response.ok) {
    alert('Cadastrado com sucesso');
    window.location.href = './livros.html';
  }
}

async function listarLivros() {

  const response = await fetch('http://localhost:3000/livros');

  const livros = await response.json();

  livros.forEach(function (livro) {
    tabelaResultadoLivros.insertAdjacentHTML('beforeend',
      `
            <tr>
                <td>${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.anoPublicacao}</td>
                <td>${livro.numeroPaginas}</td>
                <td>
                    <button class="btn btn-sm btn-info text-white me-1">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <a href="./edicao.html?id=${livro.id}" class="btn btn-sm btn-warning text-white me-1">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                    <button class="btn btn-sm btn-danger" onclick="excluirAluno('${livro.id}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
            `
    )
  })
}

async function excluirAluno(id) {
  const apiUrl = `http://localhost:3000/livros/${id}`;

  const request = new Request(apiUrl, {
    method: 'DELETE'
  })

  if (confirm(`Deseja excluir o livro ${id} ?`)) {
    const response = await fetch(request);
    const livro = await response.json();

    tabelaResultadoLivros.innerHTML = '';
    listarLivros();
  }
}
listarLivros();
