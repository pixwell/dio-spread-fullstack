interface VeiculoProps{
    id: string;
    nome: string;
    placa: string;
    entrada: Date;
}

(function(){
    const form = document.getElementById('envia-veiculo') as HTMLFormElement
    const nome = document.getElementById('nome') as HTMLInputElement
    const placa = document.getElementById('placa') as HTMLInputElement
    const patioTable = document.getElementById('patio')
    const storageKey = 'patio'
    
    function patio(){

        //Recuperar os dados do localStorage e transformar de JSON para objetos
        function ler(): VeiculoProps[]{
            const storage = localStorage.getItem(storageKey)
            return storage ? JSON.parse(storage) : []
        }

        //Receber um veículo conforme VeiculoProps e persistir os dados
        function salvar(veiculo: VeiculoProps){
            localStorage.setItem(storageKey, JSON.stringify([...ler(), veiculo]))
        }

        //Remover um veículo dos dados persistidos
        function remover(){}

        //Refletir os dados na tabela (<tbody>)
        function render(veiculo: VeiculoProps){
            const tr = document.createElement('tr')

            // td Nome
            const tdNome = document.createElement('td')
            tdNome.classList.add('text-center')
            tdNome.innerHTML = veiculo.nome

            // td placa
            const tdPlaca = document.createElement('td')
            tdPlaca.classList.add('text-center')
            tdPlaca.innerHTML = veiculo.placa

            // td Entrada
            const tdEntrada = document.createElement('td')
            tdEntrada.classList.add('text-center')
            const date = new Date(veiculo.entrada)
            tdEntrada.innerHTML = date.toLocaleDateString('pt-BR')

            //Botao delete
            const buttonDel = document.createElement('button')
            buttonDel.setAttribute('data-id', veiculo.id)
            buttonDel.classList.add('btn-delete')
            buttonDel.innerHTML = 'x'

            // td acao
            const tdAcao = document.createElement('td')
            tdAcao.classList.add('text-center')
            tdAcao.append(buttonDel)

            //Nova linha
            tr.append(tdNome, tdPlaca, tdEntrada, tdAcao)

            //Adiciona linha na tabela
            patioTable?.appendChild(tr)
        }

        return {ler, salvar, remover, render}    
    }

    const veiculoList = patio().ler()
    
    if(veiculoList.length > 0){
        veiculoList.forEach( item => {
            patio().render(item)
        })
    }

    form?.addEventListener('submit', (event) => {
        event.preventDefault()

        const nomeField = nome?.value
        const placaField = placa?.value.toUpperCase()

        if(!nomeField || !placaField){
            alert('Os campos nome e placa são obrigatórios!')
            return
        }

        const veiculo = {
            id: crypto.randomUUID(), 
            nome: nomeField, 
            placa: placaField, 
            entrada: new Date()
        }

        patio().salvar(veiculo)
        patio().render(veiculo)

        // Limpa os campos
        form.reset()
    })

})();