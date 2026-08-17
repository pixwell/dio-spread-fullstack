(function () {
    const form = document.getElementById('envia-veiculo');
    const nome = document.getElementById('nome');
    const placa = document.getElementById('placa');
    function patio() {
        const patioTable = document.getElementById('patio');
        //Recuperar os dados do localStorage e transformar de JSON para objetos
        function ler() { }
        //Receber um veículo conforme VeiculoProps e persistir os dados
        function adicionar(veiculo) { }
        //Remover um veículo dos dados persistidos
        function remover() { }
        //Refletir os dados na tabela (<tbody>)
        function render(veiculo) {
            const tr = document.createElement('tr');
            // td Nome
            const tdNome = document.createElement('td');
            tdNome.classList.add('text-center');
            tdNome.innerHTML = veiculo.nome;
            // td placa
            const tdPlaca = document.createElement('td');
            tdPlaca.classList.add('text-center');
            tdPlaca.innerHTML = veiculo.placa;
            // td Entrada
            const tdEntrada = document.createElement('td');
            tdEntrada.classList.add('text-center');
            tdEntrada.innerHTML = veiculo.entrada.toLocaleDateString('pt-BR');
            //Botao delete
            const buttonDel = document.createElement('button');
            buttonDel.setAttribute('data-placa', veiculo.placa);
            buttonDel.classList.add('btn-delete');
            buttonDel.innerHTML = 'x';
            // td acao
            const tdAcao = document.createElement('td');
            tdAcao.classList.add('text-center');
            tdAcao.append(buttonDel);
            //Nova linha
            tr.append(tdNome, tdPlaca, tdEntrada, tdAcao);
            //Adiciona linha na tabela
            patioTable?.appendChild(tr);
        }
        return { ler, adicionar, remover, render };
    }
    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const nomeField = nome?.value;
        const placaField = placa?.value.toUpperCase();
        if (!nomeField || !placaField) {
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }
        //patio().adicionar({nome: nomeField, placa: placaField, entrada: new Date()})
        patio().render({ nome: nomeField, placa: placaField, entrada: new Date() });
        // Limpa os campos
        form.reset();
    });
})();
export {};
//# sourceMappingURL=script.js.map