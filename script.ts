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
        function adicionar(veiculo: VeiculoProps){
            localStorage.setItem(storageKey, JSON.stringify([...ler(), veiculo]))
        }

        //Remover um veículo dos dados persistidos
        function remover(id: string){
            const veiculoList = ler().filter( item => item.id !== id )
            localStorage.setItem(storageKey, JSON.stringify(veiculoList))
        }

        //Refletir os dados na tabela (<tbody>)
        function render(veiculo: VeiculoProps){
            //Se a tabela estiver sem veículos, apague o tr com o aviso
            document.getElementById('storage-vazio')?.remove()
            //E depois inicie a criacao da nova linha
            
            //Linha
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
            tdEntrada.innerHTML = date.toLocaleDateString('pt-BR', {
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            })

            //Botao delete
            const buttonDel = document.createElement('button')
            buttonDel.setAttribute('data-id', veiculo.id)
            buttonDel.classList.add('btn-delete')
            buttonDel.innerHTML = '<span>x</span>'

            // td acao
            const tdAcao = document.createElement('td')
            tdAcao.classList.add('text-center')
            tdAcao.append(buttonDel)

            //Nova linha
            tr.append(tdNome, tdPlaca, tdEntrada, tdAcao)

            //Adiciona linha na tabela
            patioTable?.appendChild(tr)
        }

        function renderVazio(){
            const tr = document.createElement('tr')
            tr.id = 'storage-vazio'

            const td = document.createElement('td')
            td.setAttribute('colspan', '4')
            td.classList.add('text-center')
            td.innerText = 'Nenhum veículo registrado.'

            tr.append(td)
            patioTable?.appendChild(tr)
        }

        return {ler, adicionar, remover, render, renderVazio}
    }

    //Faz a primeira leitura do localStorage
    const veiculoList = patio().ler()
    
    if(veiculoList.length > 0){
        veiculoList.forEach( item => {
            patio().render(item)
        })
    } else {
        patio().renderVazio()
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

        patio().adicionar(veiculo)
        patio().render(veiculo)

        // Limpa os campos
        form.reset()
    })

    patioTable?.addEventListener('click', (event) => {
        const clickTarget = event.target as HTMLElement
        const btnDelete = clickTarget.closest('.btn-delete') as HTMLButtonElement

        if(btnDelete && btnDelete.dataset.id){
            //Remove o veiculo e atualiza a lista do localStorage
            patio().remover(btnDelete.dataset.id)
            //Exclui a linha da tabela
            btnDelete.closest('tr')?.remove()
            //Verifica se o storage está vazio
            if(patio().ler().length === 0){
                patio().renderVazio()
            }
        }
    })

})();