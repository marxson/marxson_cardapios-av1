document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPrato');
    const listaPratosDiv = document.getElementById('listaPratos');
    const nenhumPrato = document.getElementById('nenhumPrato');
  
    let pratos = [];
  
    function verificarSaudavel(calorias) {
      return calorias <= 500;
    }
  
    function renderizarPratos() {
      listaPratosDiv.innerHTML = '';
  
      if (pratos.length === 0) {
        nenhumPrato.style.display = 'block';
        return;
      }
  
      nenhumPrato.style.display = 'none';
  
      pratos.forEach((prato, index) => {
        const div = document.createElement('div');
        div.classList.add('prato-item');
  
        div.innerHTML = `
          <h3>
            ${prato.nome}
            <button class="excluir-btn" data-index="${index}">Excluir</button>
          </h3>
          <p><strong>Ingredientes:</strong> ${prato.ingredientes}</p>
          <p><strong>Calorias:</strong> ${prato.calorias} kcal 
            <span class="${verificarSaudavel(prato.calorias) ? 'saudavel' : 'nao-saudavel'}">
              (${verificarSaudavel(prato.calorias) ? 'Saudável' : 'Não saudável'})
            </span>
          </p>
          <p><strong>Tipo:</strong> ${prato.tipoVegetariano || 'normal'}</p>
        `;
  
        listaPratosDiv.appendChild(div);
      });
  
      // Adiciona evento aos botões de excluir
      document.querySelectorAll('.excluir-btn').forEach(button => {
        button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'));
          excluirPrato(index);
        });
      });
    }
  
    function adicionarPrato(e) {
      e.preventDefault();
  
      const nome = document.getElementById('nome').value.trim();
      const ingredientes = document.getElementById('ingredientes').value.trim();
      const calorias = parseInt(document.getElementById('calorias').value);
      const tipoVegetariano = document.getElementById('tipoVegetariano').value;
  
      if (!nome || !ingredientes || isNaN(calorias) || calorias <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }
  
      pratos.push({ nome, ingredientes, calorias, tipoVegetariano });
      renderizarPratos();
      form.reset();
    }
  
    function excluirPrato(index) {
      pratos.splice(index, 1);
      renderizarPratos();
    }
  
    form.addEventListener('submit', adicionarPrato);
    renderizarPratos();
  });
  