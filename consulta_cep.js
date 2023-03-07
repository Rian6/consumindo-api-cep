const isNumber = (numero) => {
    return /^[0-9]+$/.test(numero);
}

const cepValido = (cep) => {
    return cep.length == 8 && isNumber(cep)
}

const pesquisarCEP = () => {
    const cep = document.getElementById("cep").value.replace("-", "")

    if (cepValido) {
        fetch("https://viacep.com.br/ws/" + cep + "/json/")
            .then((res) => {
                const endereco = res.json();
                return endereco;
            })
            .then((endereco) => {
                endereco.erro
                    ? limparDados()
                    : preencherFormulario(endereco)
            })
    }
}

const limparDados = () => {
    document.getElementById("endereco").value = ""
    document.getElementById("bairro").value = ""
    document.getElementById("cidade").value = ""
    document.getElementById("estado").value = ""
    document.getElementById("email").value = ""
    document.getElementById("numero").value = ""
    document.getElementById("nome").value = ""
    document.getElementById("cep").value = ""
    document.getElementById("ibge").value = ""
    document.getElementById("ddd").value = ""
    document.getElementById("siafi").value = ""
}

const preencherFormulario = (endereco) => {
    document.getElementById("endereco").value = endereco.logradouro ? endereco.logradouro : ""
    document.getElementById("bairro").value = endereco.bairro ? endereco.bairro : ""
    document.getElementById("cidade").value = endereco.localidade ? endereco.localidade : ""
    document.getElementById("estado").value = endereco.uf ? endereco.uf : ""
    document.getElementById("ibge").value = endereco.ibge ? endereco.ibge : ""
    document.getElementById("ddd").value = endereco.ddd ? endereco.ddd : ""
    document.getElementById("siafi").value = endereco.siafi ? endereco.siafi : ""

}


const salvar = () => {
    const obj = mapOnSave();

    alert(
        '\nNome: ' + obj.nome +
        '\nEmail: ' + obj.email +
        '\nCEP: ' + obj.cep +
        '\nNumero: ' + obj.numero +
        '\nEndereço: ' + obj.endereco +
        '\nBairro: ' + obj.bairro +
        '\nCidade: ' + obj.cidade +
        '\nEstado: ' + obj.estado +
        '\nIBGE: ' + obj.ibge +
        '\nDDD: ' + obj.ddd +
        '\nSiafi: ' + obj.siafi
    );
}

const mapOnSave = () => {
    const obj =
    {
        endereco: document.getElementById("endereco").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        email: document.getElementById("email").value,
        numero: document.getElementById("numero").value,
        nome: document.getElementById("nome").value,
        cep: document.getElementById("cep").value,
        ibge: document.getElementById("ibge").value,
        siafi: document.getElementById("siafi").value,
        ddd: document.getElementById("ddd").value
    }

    return obj;;
}

document.getElementById("salvar").addEventListener("click", salvar);
document.getElementById("cep").addEventListener("focusout", pesquisarCEP);
document.getElementById("limpar").addEventListener("click", limparDados);