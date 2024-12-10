async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const emprestimoDTO = {
        "idAluno": document.querySelectorAll("input")[0].value,
        "idLivro": document.querySelectorAll("input")[1].value,
        "dataEmprestimo": new Date(document.querySelectorAll("input")[2].value).toISOString().split('T')[0],
        "dataDevolucao": new Date(document.querySelectorAll("input")[3].value).toISOString().split('T')[0],
        "statusEmprestimo": document.querySelectorAll("input")[4].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Empréstimo cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao conectar com o servidor');
        }

        const listaDeEmprestimos = await respostaServidor.json();
        console.log(listaDeEmprestimos)
        criarTabelaEmprestimos(listaDeEmprestimos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

function formatarData(data) {
    return new Date(data).toISOString().split('T')[0];
}

async function criarTabelaEmprestimos(emprestimos) {
    const tabela = document.getElementById('tabela')

    emprestimos.forEach(emprestimo => {
        // criando nova linha
        const linha = document.createElement('tr');

        //cria/preenche cada cédula 
        const idEmprestimo = document.createElement('td');
        idEmprestimo.textContent = emprestimo.idEmprestimo; // id do emprestimo

        const idAluno = document.createElement('td');
        idAluno.textContent = emprestimo.idAluno; // id do aluno

        const idLivro = document.createElement('td');
        idLivro.textContent = emprestimo.idLivro; // id do livro

        const dataEmprestimo = document.createElement('td');
        dataEmprestimo.textContent = formatarData(emprestimo.dataEmprestimo); //data de emprestimo

        const dataDevolucao = document.createElement('td');
        dataDevolucao.textContent = formatarData(emprestimo.dataDevolucao); // data de devolucao

        const statusEmprestimo = document.createElement('td');
        statusEmprestimo.textContent = emprestimo.statusEmprestimo; // status do emprestimo

        const acoes = document.createElement('td'); // elemento img

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'assets/icons/pencil-square.svg';

        //link para página de edição
        atualizarIcon.addEventListener('click', () => {
            window.location.href = `devolucao-emprestimo.html`;
        });

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'assets/icons/trash-fill.svg';

        linha.appendChild(idEmprestimo);
        linha.appendChild(idAluno);
        linha.appendChild(idLivro);
        linha.appendChild(dataEmprestimo);
        linha.appendChild(dataDevolucao);
        linha.appendChild(statusEmprestimo);
        acoes.appendChild(atualizarIcon);
        linha.appendChild(acoes);
        acoes.appendChild(excluirIcon);

        //adiciona a linha prenchida
        tabela.appendChild(linha);
    });
}
