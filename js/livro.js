async function enviaFormulario() {
    //recuperar as informações do formulario e colocar em objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "anoPublicacao": document.querySelectorAll("input")[3].value,
        "isbn": document.querySelectorAll("input")[4].value,
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusLivroEmprestado": document.querySelectorAll("input")[8].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/livros");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao conectar com o servidor');
        }

        const listaDeLivros = await respostaServidor.json();
        console.log(listaDeLivros)
        criarTabelaLivros(listaDeLivros)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaLivros(livros) {
    const tabela = document.getElementById('tabela')

    livros.forEach(livro => {
        // criando nova linha
        const linha = document.createElement('tr');

        //cria/preenche cada cédula 
        const idLivro = document.createElement('td');
        idLivro.textContent = livro.idLivro; // id do livro

        const titulo = document.createElement('td');
        titulo.textContent = livro.titulo; // titulo do livro

        const autor = document.createElement('td');
        autor.textContent = livro.autor; // autor do livro

        const editora = document.createElement('td');
        editora.textContent = livro.editora; // editora do livro

        const anoPublicacao = document.createElement('td');
        anoPublicacao.textContent = livro.anoPublicacao; // ano de publicação do livro

        const isbn = document.createElement('td');
        isbn.textContent = livro.isbn; // isbn do livro

        const quantTotal = document.createElement('td');
        quantTotal.textContent = livro.quantTotal; // quantidade total de livros

        const quantDisponivel = document.createElement('td');
        quantDisponivel.textContent = livro.quantDisponivel; // quantidade disponivel de livros

        const valorAquisicao = document.createElement('td');
        valorAquisicao.textContent = livro.valorAquisicao; // valor de aquisicao do livro

        const statusLivroEmprestado = document.createElement('td');
        statusLivroEmprestado.textContent = livro.statusLivroEmprestado; // status do livro

        const acoes = document.createElement('td'); // elemento img

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'assets/icons/pencil-square.svg';

        //link para página de edição
        atualizarIcon.addEventListener('click', () => {
            window.location.href = `editar-livro.html`;
        });

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'assets/icons/trash-fill.svg';

        linha.appendChild(idLivro);
        linha.appendChild(titulo);
        linha.appendChild(autor);
        linha.appendChild(editora);
        linha.appendChild(anoPublicacao);
        linha.appendChild(isbn);
        linha.appendChild(quantTotal);
        linha.appendChild(quantDisponivel);
        linha.appendChild(valorAquisicao);
        linha.appendChild(statusLivroEmprestado);
        acoes.appendChild(atualizarIcon);
        linha.appendChild(acoes);
        acoes.appendChild(excluirIcon);

        //adiciona a linha prenchida
        tabela.appendChild(linha);
    });
}
