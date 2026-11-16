const formCadastro = document.getElementById("form-cadastro");
const formLogin = document.getElementById("form-login");

// --- TELA DE CADASTRO ---
if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        localStorage.setItem("emailSalvo", email);
        localStorage.setItem("senhaSalva", senha);

        alert("Conta criada com sucesso!");
        window.location.href = "../index.html";
    });
}

// --- TELA DE LOGIN ---
if (formLogin) {
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const emailSalvo = localStorage.getItem("emailSalvo");
        const senhaSalva = localStorage.getItem("senhaSalva");

        if (email === emailSalvo && senha === senhaSalva) {
            alert("Login feito com sucesso!");
            window.location.href = "../index.html";
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
}