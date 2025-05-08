document.addEventListener('DOMContentLoaded', () => {
    const formCadastroPrato = document.getElementById('form-cadastro-prato');
    const listaPratos = document.getElementById('lista-pratos');
    const listaSaudaveis = document.getElementById('lista-saudaveis');
    const btnListarSaudaveis = document.getElementById('btn-listar-saudaveis');
    const mensagemCadastro = document.getElementById('mensagem-cadastro');

    let pratos = [];

    // Função para exibir mensagens
    function exibirMensagem(texto, tipo) {
        mensagemCadastro.textContent = texto;
        mensagemCadastro.className = `mensagem ${tipo}`;
        setTimeout(() => {
            mensagemCadastro.textContent = '';
            mensagemCadastro.className = 'mensagem';
        }, 3000);
    }

    // Função para adicionar um novo prato
    formCadastroPrato.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome-prato').value.trim();
        const ingredientes = document.getElementById('ingredientes').value.trim();
        const calorias = parseInt(document.getElementById('calorias').value);

        if (nome && ingredientes && !isNaN(calorias)) {
            const novoPrato = {
                id: Date.now(), // Simples gerador de ID único
                nome,
                ingredientes: ingredientes.split(',').map(item => item.trim()),
                calorias
            };
            pratos.push(novoPrato);
            atualizarListaPratos();
            formCadastroPrato.reset();
            exibirMensagem('Prato cadastrado com sucesso!', 'sucesso');
        } else {
            exibirMensagem('Por favor, preencha todos os campos corretamente.', 'erro');
        }
    });

    // Função para atualizar a lista de pratos na tela
    function atualizarListaPratos() {
        listaPratos.innerHTML = '';
        pratos.forEach(prato => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${prato.nome} (${prato.calorias} kcal)</span>
                <button onclick="removerPrato(${prato.id})">Remover</button>
            `;
            listaPratos.appendChild(listItem);
        });
    }

    // Função para remover um prato
    window.removerPrato = (id) => {
        pratos = pratos.filter(prato => prato.id !== id);
        atualizarListaPratos();
        atualizarListaSaudaveis(); // Atualiza a lista de saudáveis também
        exibirMensagem('Prato removido.', 'sucesso');
    };

    // Função para listar refeições saudáveis (até 300 calorias)
    btnListarSaudaveis.addEventListener('click', () => {
        atualizarListaSaudaveis();
    });

    function atualizarListaSaudaveis() {
        listaSaudaveis.innerHTML = '';
        const pratosSaudaveis = pratos.filter(prato => prato.calorias <= 300);
        if (pratosSaudaveis.length > 0) {
            pratosSaudaveis.forEach(prato => {
                const listItem = document.createElement('li');
                listItem.textContent = `${prato.nome} (${prato.calorias} kcal)`;
                listaSaudaveis.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'Nenhuma refeição saudável cadastrada.';
            listaSaudaveis.appendChild(listItem);
        }
    }

    // Inicializa a lista de pratos ao carregar a página
    atualizarListaPratos();
    atualizarListaSaudaveis();
});