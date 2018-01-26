// Materialize //

$(document).ready(function() {
    Materialize.updateTextFields();
  });

$(document).ready(function(){
      $('.parallax').parallax();
    });

// Buscar Endereço //

var buscaCep = $('#logradouro, #localidade, #uf');
var buscaRua = $('#cep');
var validacao = /^[0-9]{8}$/;

function limparDados(alerta){
  if(alerta !== undefined){
    alert(alerta);
  }
  buscaCep.val('');
}

function get(url){
  $.get(url, function(data){
    if(!("erro" in data)){
      if(Object.prototype.toString.call(data) === '[object Array]'){
        var data = data[0];
      }
      
      $.each(data, function(nome, info){
        $('#' + nome).val(nome === 'cep' ? info.replace(/\D/g, '') : info).attr('info', nome === 'cep' ? info.replace(/\D/g, '') : info);
      });
      console.log('erro');
    } else {
      limparDados("Não foi possivel localizar o seu Cep.");
    }
  });
}

// Pesquisando por endereço //

$('#pesquisarEndereco').on('click', function(e){
  if($('#logradouro').val() !== '' && $('#logradouro').val() !== $('#logradouro').attr('info') && $('#localidade').val() !== '' && $('#localidade').val() !== $('#localidade').attr('info') && $('#uf').val() !== '' && $('#uf').val() !== $('#uf').attr('info')) {
    
    buscaRua.val('Buscando...');
    get('https://viacep.com.br/ws/' + $('#uf').val() + '/' + $('#localidade').val() + '/' + $('#logradouro').val() + '/json/');    
  }   
e.preventDefault();
});

// Buscando por cep //

$('#pesquisarCep').on('click', function(e){
  
  var cep = $('#cep').val().replace(/\D/g, '');
  if(cep !== "" && validacao.test(cep)){
    buscaCep.val('Buscando...');
    get('https://viacep.com.br/ws/' + cep + '/json');
  } else {
    limparDados(cep == "" ? undefined : "Formato de Cep inválido!");
  }
  e.preventDefault();
});






       
