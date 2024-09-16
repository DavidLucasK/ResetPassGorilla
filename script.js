document.addEventListener('DOMContentLoaded', () => {
    // Obter os parâmetros da URL e preencher os inputs ocultos
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    if (email && token) {
        document.getElementById('emailInput').value = email;
        document.getElementById('tokenInput').value = token;
    } else {
        console.error('Email ou token não encontrados na URL');
    }

    // Adicionar event listener ao botão de redefinição de senha
    document.getElementById('resetPasswordBtn').addEventListener('click', handleResetPassword);
    document.getElementById('togglePasswords').addEventListener('click', togglePasswordsVisibility);
});

let passwordsVisible = false;

function togglePasswordsVisibility() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const button = document.getElementById('togglePasswords');

    passwordsVisible = !passwordsVisible;

    // Atualiza o tipo dos campos de senha
    newPasswordInput.type = passwordsVisible ? 'text' : 'password';
    confirmPasswordInput.type = passwordsVisible ? 'text' : 'password';

    // Atualiza o texto do botão
    button.textContent = passwordsVisible ? 'Ocultar Senhas' : 'Mostrar Senhas';
}

async function handleResetPassword(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value; // Pega o e-mail do input oculto
    const token = document.getElementById('tokenInput').value; // Pega o token do input oculto

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('result').textContent = 'As senhas não coincidem.';
        return;
    }

    try {
        const response = await fetch('https://pontogorillaback.vercel.app/api/auth/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token, newPassword })
        });

        const data = await response.json();

        console.log("")

        if (response.ok) {
            document.getElementById('result').textContent = 'Senha redefinida com sucesso!<br>Volte ao App';
        } else {
            document.getElementById('result').textContent = data.message || 'Erro ao redefinir a senha.';
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        document.getElementById('result').textContent = 'Erro no servidor. Por favor, tente novamente mais tarde.';
    }
}
