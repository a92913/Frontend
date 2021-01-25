const url = "https://backend-heroku1.herokuapp.com";
let redefinir = document.getElementById("login-forgot");

redefinir.addEventListener("click", function() {
    Swal.fire({
        title: 'Recuperar Palavra-Passe',
        text: "Insira o seu email para que seja enviada uma mensagem com a nova palavra-passe gerada",
        //input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        html: '<input id="txtEmail" class="swal2-input" placeholder="Email">',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        confirmButtonColor: '#390606',
        cancelButtonColor: '#390606',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            const email = document.getElementById('txtEmail').value
            return fetch(url + `/usersEmail/` + email)
                .then(response => {

                    if (!response.ok) {
                        console.log(response.status); //=> number 100–599
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers
                        console.log(response.url); //=> String
                        throw new Error(response.statusText)
                    }

                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Email não encontrado`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {

            let data = {};
            const email = document.getElementById('txtEmail').value;
            data.email = email;
            console.log(data)
            fetch(url + "/emails", {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function(response) {
                console.log(response);

                if (!response.ok) {
                    console.log(response.status); //=> number 100–599
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers
                    console.log(response.url); //=> String
                    throw Error(response.statusText);
                }
                else {}
                Swal.fire({
                    title: "Email enviado com sucesso com sucesso",
                    icon: "success",
                })
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                console.error(err);
            });
        }

    });
});

let btnLogin = document.getElementById("login-btn")
btnLogin.addEventListener("click", function() {
    let data = {}

    const email = document.getElementById("login-email-email").value;
    const pass = document.getElementById("login-ps").value;
    data.email = email;
    data.password = pass;

    if (data.email.indexOf('@') === -1 ||
        data.email.length < 10 ||
        data.password.length < 6) {}
    else {
        btnLogin.type = "button";


        fetch(url + `/usersEmail/` + email)
            .then(response => {
                if (!response.ok) {
                    console.log(response.status); //=> number 100â€“599
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers
                    console.log(response.url);
                    Swal.fire({
                        title: "Este email não existe",
                        icon: "erro",
                    })
                }
                else {
                    a();
                    async function a() {
                        const response2 = await fetch(url + `/usersEmail/` + email)
                        const users = await response2.json();

                        for (const user of users) {
                            let profile = user.profile;
                            let id = user.id;

                            if (profile === "Diretor") {

                                fetch(url + "/signin", {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: "POST",
                                    body: JSON.stringify(data)
                                }).then(function(response) {
                                    console.log(response);
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100–599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url); //=> String
                                        console.log("erro");
                                        Swal.fire({
                                            title: "Palavra passe e/ou email incorretos",
                                            icon: "warning",
                                        })
                                    }
                                    else {
                                        window.location.replace("direction.html");
                                        localStorage.setItem("idlogado", id);
                                    }
                                })
                            }
                            else if (profile === "Centralista") {
                                fetch(url + "/signin", {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: "POST",
                                    body: JSON.stringify(data)
                                }).then(function(response) {
                                    console.log(response);
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100–599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url); //=> String
                                        console.log("erro");
                                        Swal.fire({
                                            title: "Palavra passe e/ou email incorretos",
                                            icon: "warning",
                                        })
                                    }
                                    else {

                                        window.location.replace("centralist.html");
                                        localStorage.setItem("idlogado", id);
                                    }
                                })
                            }
                            else {
                                fetch(url + "/signin", {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: "POST",
                                    body: JSON.stringify(data)
                                }).then(function(response) {
                                    console.log(response);
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100–599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url); //=> String
                                        console.log("erro");
                                        Swal.fire({
                                            title: "Palavra passe e/ou email incorretos",
                                            icon: "warning",
                                        })
                                    }
                                    else {
                                        Swal.fire({
                                                title: "Acesso Negado",
                                                icon: "warning",
                                            })
                                            .then(() => {
                                                window.location.replace("index.html");
                                            });
                                    }

                                })
                            }
                        }


                    }
                }
            })
    }

});
