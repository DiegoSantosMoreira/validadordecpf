var btn = document.getElementById('btn');
var mascaraCPF = document.querySelector('#cpf');

function autoRefresh(){
    window.location = window.location.href;
}
function validarPrimeiroDigito(cpfConvertido){
    var sum = 0;
    for(var i =0; i < 9; i++){
        sum += cpfConvertido[i] * (10 - i);
    }
    var resto = (sum * 10) % 11;
    if(resto < 10){
        return cpfConvertido[9] == resto;
    }
    
        return cpfConvertido[9] == 0;
 
}
function validarSegundoDigito(cpfConvertido){
    var sum = 0;
    for(var i =0; i < 10; i++){
        sum += cpfConvertido[i] * (11 - i);
    }
    var resto = (sum * 10) % 11;
    if(resto < 10){
        return cpfConvertido[10] == resto;
    }
    
        return cpfConvertido[10] == 0;
 
}
function validarCaracterRepetido(cpfConvertido){
    var primeiro = cpfConvertido[0];
    var diferente = false;
    for (var i = 1; i < cpfConvertido.length; i++){
        if(cpfConvertido[i] != primeiro){
            diferente = true;
        }
        
    }
    return diferente;
}

mascaraCPF.addEventListener('keydown', function (e) {
    if ((((e.keyCode < 48 || e.keyCode > 105)) || !(e.keyCode > 57 && e.keyCode < 96))){
        let mascaraLenght = mascaraCPF.value.length;

     if(mascaraLenght === 3 || mascaraLenght === 7){
         mascaraCPF.value += ".";
     }else if(mascaraLenght === 11){
         mascaraCPF.value += "-";
     }
   }
   else{
    Swal.fire({
        icon: 'info',
        
        text: 'O campo aceita apenas números!'
        })
    e.preventDefault();
    }
})

btn.addEventListener('click', function validar(){
    let cpf = document.getElementById('cpf').value.replace(/[^0-9]/g,'');
    if(cpf.length != 11){
        //alert("Digite o CPF completo!")
        Swal.fire({
            icon: 'info',
            
            text: 'CPF Incompleto! Certifique-se de digitar 11 algarismos!'
            })
    }else{
    let cpfConvertido = cpf.split('').map((e) => parseInt(e));
    let primeiroDigito = validarPrimeiroDigito(cpfConvertido);
    let segundoDigito = validarSegundoDigito(cpfConvertido);
    let caracterRepetido = validarCaracterRepetido(cpfConvertido);
    
    console.log(cpf.length, cpfConvertido.length, cpf, cpfConvertido);
    console.log(primeiroDigito,1);
    console.log(segundoDigito,2);
    console.log(caracterRepetido,3);

    if (primeiroDigito && segundoDigito && caracterRepetido){
        //alert("CPF válido");
        Swal.fire({
            icon: 'success',
            
            text: 'CPF Válido!'
            })
    }else{
        //alert("CPF inválido");
        Swal.fire({
            icon: 'error',
            
            text: 'CPF Inválido!'
            })
    }
}
})
