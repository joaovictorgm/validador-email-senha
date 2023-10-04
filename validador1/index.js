//função para validar email
function validateEmail(email) {
    // ^: Isso indica o início da linha. A validação deve começar a partir do início da string.
    //[a-zA-Z0-9_]: Este é um conjunto de caracteres permitidos antes do símbolo "@" no endereço de email. Ele inclui letras maiúsculas, letras minúsculas, dígitos de 0 a 9 e o caractere de sublinhado "_".
    //{2,}: Isso quantifica o conjunto de caracteres anterior ( [a-zA-Z0-9_] ) e especifica que deve haver pelo menos 2 ou mais desses caracteres antes do "@".
    //@: Isso corresponde ao caractere "@" literalmente, que é um elemento obrigatório em um endereço de email.[a-zA-Z0-9_]: Este é o conjunto de caracteres permitidos após o símbolo "@" no endereço de email, que é semelhante ao conjunto antes do "@".+: Isso quantifica o conjunto de caracteres após o "@" e especifica que deve haver pelo menos um ou mais desses caracteres.\.: Isso corresponde ao caractere de ponto "." literalmente, que separa o nome de usuário do domínio no endereço de email. Deve ser escapado com "" porque "." tem um significado especial em expressões regulares.[a-zA-Z]{2,}: Este é o conjunto de caracteres permitidos para o domínio do email, que inclui apenas letras maiúsculas e minúsculas. O {2,} especifica que deve haver pelo menos 2 ou mais desses caracteres no domínio.$: Isso indica o final da linha. A validação deve terminar no final da string.
    const regex = /^[a-zA-Z0-9_]{2,}@[a-zA-Z0-9_]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
        throw new Error("Email inválido")
    }
}

//função para validar senha
function validatePassword(password) {
    //^: Isso indica o início da linha.
//(?=.*[a-z]): Isso usa uma "assertiva positiva" (positive lookahead) para garantir que a senha contenha pelo menos uma letra minúscula de "a" a "z".
//(?=.*[A-Z]): Isso usa outra "assertiva positiva" para garantir que a senha contenha pelo menos uma letra maiúscula de "A" a "Z".
//(?=.*\d): Mais uma "assertiva positiva" para garantir que a senha contenha pelo menos um dígito (número de 0 a 9).
//(?=.*[@#$%^&+=!]): Esta "assertiva positiva" assegura que a senha contenha pelo menos um dos caracteres especiais especificados (@, #, $, %, ^, &, +, =, !).
//(?=.*[a-zA-Z0-9@#$%^&+=!]): Esta "assertiva positiva" confirma que a senha contém pelo menos um dos caracteres alfabéticos, numéricos ou especiais especificados.
//{8,}: Isso corresponde a qualquer caractere (.) pelo menos 8 ou mais vezes (representado por {8,}), o que significa que a senha deve ter pelo menos 8 caracteres.
//$: Isso indica o final da linha.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z0-9@#$%^&+=!]).{8,}$/
    if(!passwordRegex.test(password)) {
        throw new Error("A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número, um caractere especial e ter pelo 8 caracteres")
    }
}
// Função para lidar com a submissão do formulário
document.getElementById("registrateForm").addEventListener("submit",function (e)  {
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const emailError = document.getElementById("emailError")
    const passwordError = document.getElementById("passwordError")
     
   
    try {
 // Validar o email
    validateEmail(emailInput.value)
    emailError.textContent = "" // Limpa a mensagem de erro

//  Validar senha 
    validatePassword(passwordInput.value)
    passwordError.textContent = ""

    } catch (erro) {
        e.preventDefault() // Impede o envio do formulário
        if (erro.message) {
            if (erro.message === "Email inválido"){
                emailError.textContent = erro.message
            } else {
                passwordError.textContent = erro.message
            }
        }
    }
         
})