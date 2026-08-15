(function () {
    //const $ = (query: string): HTMLInputElement | null => document.querySelector(query) 
    const btn = document.getElementById('cadastrar');
    const nome = document.getElementById('nome');
    const placa = document.getElementById('placa');
    function patio() {
        function ler() { }
        function adicionar(veiculo) { }
        function remover() { }
        function render() { }
        return { ler, adicionar, remover, render };
    }
    btn?.addEventListener('click', () => {
        const nomeField = nome?.value;
        const placaField = placa?.value.toUpperCase();
        if (!nomeField || !placaField) {
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }
        patio().adicionar({ nome: nomeField, placa: placaField, entrada: new Date() });
    });
})();
export {};
//# sourceMappingURL=script.js.map