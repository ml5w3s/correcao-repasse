// js/ui/laudo/form-to-json.js

export function extrairDadosDoFormulario() {
  const form = document.getElementById('cadastro-form');

  const dados = {
    meta: {
      data: form['data'].value,
      cidade: form['cidade'].value,
      empresa: {
        nome: form['empresa'].value,
        cnpj: form['empresa-cnpj'].value
      },
      cliente: {
        nome: form['entidade'].value,
        cnpj: form['cnpj'].value,
        cnes: form['cnes'].value,
        processo: form['numero-processo'].value
      }
    }
  };

  return dados;
}
