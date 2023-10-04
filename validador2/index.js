function validateEmail(email) {
    // Verifica se o email corresponde ao padrão de um email válido
    if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
    // Se não corresponder, cria um erro com uma mensagem
        const err = new Error('Email inválido.')
    // Define a propriedade 'input' no erro para identificar o campo problemático
        err.input = 'email'
    // Lança o erro para interromper o processamento
        throw err
    }
}

function validatePassword(password) {
    // Verifica se a senha atende a certos critérios de validação
    if (
        password.length < 8 ||   // Mínimo de 8 caracteres
        !password.match(/[a-z]/) ||  //Pelo menos uma letra minúscula
        !password.match(/[A-Z]/) || // Pelo menos uma letra maiúscula
        !password.match(/[0-9]/) || // Pelo menos um dígito
        !password.match(/[^a-zA-Z0-9\s]/) // Pelo menos um caractere

    ) {
        // Se a senha não atender aos critérios, cria um erro com uma mensagem
        const err = new Error('Senha inválida.')
        // Define a propriedade 'input' no erro para identificar o campo problemático
        err.input = 'password'
        // Lança o erro para interromper o processamento
        throw err
    }
}

function resetFormStyles() {
        //Remove as classes 'sucess' e 'error' de todos os elementos de entrada de usuário
    Object.entries(userInputs).forEach(([key, value]) => {
        value.classList.remove('success', 'error')
        // Limpa qualquer mensagem de erro associada aos elementos
        document.querySelector(`#${key}-error`).textContent = ''
    })
}
        // Cria um objeto userInputs para armazenar elementos e entrada do usuário
const userInputs = []
        // Associa elementos de entrada do usuário aos campos correspondentes no objeto userInputs
userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector('#email')
userInputs.password = document.querySelector('#password')
        // Obtém uma referência ao formulário HTML
const form = document.querySelector('form')
        //Adiciona um ouvinte de eventos para o evento de envio do formulário
form.addEventListener('submit' , (ev) => {
         // Impede o comportamento padrão de envio do formulário
    ev.preventDefault()
         // Chama a função para redefinir os estilos do formulário
    resetFormStyles()
    try {
          // Adiciona a classe 'sucess' ao campo de nome
        userInputs.name.classList.add('sucess')
          // Chama a função para validar o email
        validateEmail(userInputs.email.value)
          // Adiciona a classe 'sucess' ao campo de email
        userInputs.email.classList.add('sucess')
          // Chama a função para validar a senha
        validatePassword(userInputs.password.value)
          // Adiciona a classe 'sucess' ao campo de senha
        userInputs.password.classList.add('sucess')
    } catch (err) {
          // Se ocorrer um erro de validação, adiciona a classe 'error' ao campo problemático
        userInputs[err.input].classList.add('error')
           // Exibe a mensagem de erro no elemento de erro correspondente
        document.querySelector(`#${err.input}-error`).textContent = err.message
    }
})