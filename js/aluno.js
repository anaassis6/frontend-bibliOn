async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": new Date(document.querySelectorAll("input")[2].value).toISOString().split('T')[0],
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao conectar com o servidor');
        }

        const listaDeAlunos = await respostaServidor.json();
        console.log(listaDeAlunos)
        criarTabelaAlunos(listaDeAlunos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaAlunos(alunos) {
    const tabela = document.getElementById('tabela')

    alunos.forEach(aluno => {
        // criando nova linha
        const linha = document.createElement('tr');

        //cria/preenche cada cédula 
        const id = document.createElement('td');
        id.textContent = aluno.idAluno; // id do aluno

        const ra = document.createElement('td');
        ra.textContent = aluno.ra; // ra do aluno

        const nome = document.createElement('td');
        nome.textContent = aluno.nome; // nome do aluno

        const sobrenome = document.createElement('td');
        sobrenome.textContent = aluno.sobrenome; // sobrenome do aluno

        const dataNascimento = document.createElement('td');
        //Formatação de data
        const dataFormatada = new Date(aluno.dataNascimento).toISOString().split('T')[0];
        dataNascimento.textContent = dataFormatada; // data de nascimento formatada

        const endereco = document.createElement('td');
        endereco.textContent = aluno.endereco; // endereco do aluno

        const email = document.createElement('td');
        email.textContent = aluno.email; // email do aluno

        const celular = document.createElement('td');
        celular.textContent = aluno.celular // celular do aluno

        const acoes = document.createElement('td'); // elemento img

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'assets/icons/pencil-square.svg';

        //link para página de edição
        atualizarIcon.addEventListener('click', () => {
            window.location.href = `editar-aluno.html`;
        });

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'assets/icons/trash-fill.svg';

        linha.appendChild(id);
        linha.appendChild(ra);
        linha.appendChild(nome);
        linha.appendChild(sobrenome);
        linha.appendChild(dataNascimento);
        linha.appendChild(endereco);
        linha.appendChild(email);
        linha.appendChild(celular);
        acoes.appendChild(atualizarIcon);
        linha.appendChild(acoes);
        acoes.appendChild(excluirIcon);

        //adiciona a linha prenchida
        tabela.appendChild(linha);
    });
}
