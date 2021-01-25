const url = "https://backend-heroku1.herokuapp.com";

let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

let addop = document.getElementById("addop-add");

addop.addEventListener("click", function() {

    let data = {};
    data.name = document.getElementById("addop-name").value;
    data.birth_date = document.getElementById("addop-birth").value;
    data.adress = document.getElementById("addop-adress").value;
    data.entry_date = document.getElementById("adopp-entry-date").value;
    data.cc = document.getElementById("addop-cc").value;
    data.phone_number = document.getElementById("addop-phone").value;
    data.pay_per_hour = document.getElementById("addop-salary").value;
    data.operational_type = "Profissional";
    data.speciality = document.getElementById("addop-function").value;

    let data1 = {};
    data1.email = document.getElementById("addop-email").value;
    data1.password = document.getElementById("addop-ps").value;
    data1.profile = "Operacional";

    if (data1.email.length < 10 ||
        data1.email.indexOf('@') === -1 ||
        data1.password.length < 6 ||

        data.name.length < 2 ||
        data.birth_date.length !== 10 ||
        data.adress.length < 5 ||
        data.entry_date.length !== 10 ||
        data.cc.length !== 8 ||
        data.phone_number.length !== 9 ||
        data.pay_per_hour.length === 0 ||
        data.speciality.length === 0) {

    }
    else {
        addop.type = "button";

        let today = new Date().toISOString().slice(0, 10);

        if (today < data.birth_date) {

            swal({
                title: "Data de Nascimento inválida",
                //text: "",
                icon: "error",
                //buttons: false,
                //timer: 2000
            });
        }
        else {
            if (today < data.entry_date) {

                swal({
                    title: "Data de Entrada inválida",
                    //text: "",
                    icon: "error",
                    //buttons: false,
                    //timer: 2000
                });
            }
            else {
                var diaNasc = data.birth_date.slice(9, 10);
                var mesNasc = data.birth_date.slice(5, 7);
                var anoNasc = data.birth_date.slice(0, 4);

                var diaEntr = data.entry_date.slice(9, 10);
                var mesEntr = data.entry_date.slice(5, 7);
                var anoEntr = data.entry_date.slice(0, 4);

                var idade = anoEntr - anoNasc;
                if (mesEntr < mesNasc) {
                    idade--;
                }
                else {
                    if (mesEntr == mesNasc) {
                        if (diaEntr < diaNasc) {
                            idade--;
                        }
                    }
                }
                if (idade < 18) {
                    swal({
                        title: "Menor de idade",
                        //text: "",
                        icon: "error",
                        //buttons: false,
                        //timer: 2000
                    });
                }

                else {
                    if (data.birth_date > data.entry_date) {
                        swal({
                            title: "Data de Entrada anterior ao nascimento",
                            //text: "",
                            icon: "error",
                            //buttons: false,
                            //timer: 2000
                        });
                    }
                    else {
                        if (data.speciality === "Bombeiro") {
                            console.log(JSON.stringify(data));

                            fetch(url + `/usersEmail/` + data.email)
                                .then(response => {
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100â€“599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url);

                                        fetch(url + `/operationalsCc/` + data.cc)
                                            .then(response => {
                                                if (!response.ok) {
                                                    console.log(response.status); //=> number 100â€“599
                                                    console.log(response.statusText); //=> String
                                                    console.log(response.headers); //=> Headers
                                                    console.log(response.url);

                                                    fetch(url + `/operationalsPhone/` + data.phone_number)
                                                        .then(response => {
                                                            if (!response.ok) {
                                                                console.log(response.status); //=> number 100â€“599
                                                                console.log(response.statusText); //=> String
                                                                console.log(response.headers); //=> Headers
                                                                console.log(response.url);

                                                                fetch(url + "/signup", {
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    method: 'POST',
                                                                    body: JSON.stringify(data1)
                                                                }).then(function(response) {

                                                                    if (!response.ok) {
                                                                        console.log(response.status); //=> number 100–599
                                                                        console.log(response.statusText); //=> String
                                                                        console.log(response.headers); //=> Headers
                                                                        console.log(response.url); //=> String
                                                                        if (response.status === 409) {
                                                                            swal({
                                                                                title: "Dados duplicados",
                                                                                icon: "error",
                                                                            });
                                                                        }
                                                                        else {
                                                                            swal({
                                                                                title: "Erro, por favor tente novamente",
                                                                                icon: "error",
                                                                            });
                                                                        }
                                                                        throw Error(response.statusText);
                                                                    }
                                                                    else {

                                                                        fetch(url + "/operationals/", {
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            method: 'POST',
                                                                            body: JSON.stringify(data)
                                                                        }).then(function(response) {

                                                                            if (!response.ok) {
                                                                                console.log(response.status); //=> number 100–599
                                                                                console.log(response.statusText); //=> String
                                                                                console.log(response.headers); //=> Headers
                                                                                console.log(response.url); //=> String
                                                                                if (response.status === 409) {
                                                                                    swal({
                                                                                        title: "Dados duplicados",
                                                                                        icon: "error",
                                                                                    });

                                                                                }
                                                                                else {
                                                                                    swal({
                                                                                        title: "Erro, por favor tente novamente",
                                                                                        icon: "error",
                                                                                    });
                                                                                }
                                                                                throw Error(response.statusText);
                                                                            }
                                                                            else {
                                                                                swal({
                                                                                        title: "Operacional adicionando com sucesso",
                                                                                        icon: "success",
                                                                                    })
                                                                                    .then(() => {
                                                                                        window.location.replace("add-opperation.html");
                                                                                    });
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                swal({
                                                                    title: "Já existe um Bombeiro com esse telefone",
                                                                    icon: "error",
                                                                });
                                                            }
                                                        }).then(function(result) {
                                                            console.log(result);
                                                        }).catch(function(err) {
                                                            console.error(err);
                                                        });
                                                }
                                                else {
                                                    swal({
                                                        title: "Este cartão de cidadado já se encontra registado",
                                                        icon: "error",
                                                    });
                                                }
                                            }).then(function(result) {
                                                console.log(result);
                                            }).catch(function(err) {
                                                console.error(err);
                                            });
                                    }
                                    else {
                                        swal({
                                            title: "Este email já se encontra registado",
                                            icon: "error",
                                        });
                                    }
                                }).then(function(result) {
                                    console.log(result);
                                }).catch(function(err) {
                                    console.error(err);
                                });
                        }

                        else {
                            data1.profile = "Centralista";

                            fetch(url + `/usersEmail/` + data.email)
                                .then(response => {
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100â€“599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url);

                                        fetch(url + `/centralistsCc/` + data.cc)
                                            .then(response => {
                                                if (!response.ok) {
                                                    console.log(response.status); //=> number 100â€“599
                                                    console.log(response.statusText); //=> String
                                                    console.log(response.headers); //=> Headers
                                                    console.log(response.url);

                                                    fetch(url + `/centralistsPhone/` + data.phone_number)
                                                        .then(response => {
                                                            if (!response.ok) {
                                                                console.log(response.status); //=> number 100â€“599
                                                                console.log(response.statusText); //=> String
                                                                console.log(response.headers); //=> Headers
                                                                console.log(response.url);


                                                                fetch(url + "/signup", {
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    method: 'POST',
                                                                    body: JSON.stringify(data1)
                                                                }).then(function(response) {

                                                                    if (!response.ok) {
                                                                        console.log(response.status); //=> number 100–599
                                                                        console.log(response.statusText); //=> String
                                                                        console.log(response.headers); //=> Headers
                                                                        console.log(response.url); //=> String
                                                                        if (response.status === 409) {
                                                                            swal({
                                                                                title: "Dados duplicados",
                                                                                icon: "error",
                                                                            });
                                                                        }
                                                                        else {
                                                                            swal({
                                                                                title: "Erro, por favor tente novamente",
                                                                                icon: "error",
                                                                            });
                                                                        }
                                                                        throw Error(response.statusText);
                                                                    }
                                                                    else {

                                                                        fetch(url + "/centralists/", {
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            method: 'POST',
                                                                            body: JSON.stringify(data)
                                                                        }).then(function(response) {

                                                                            if (!response.ok) {
                                                                                console.log(response.status); //=> number 100–599
                                                                                console.log(response.statusText); //=> String
                                                                                console.log(response.headers); //=> Headers
                                                                                console.log(response.url); //=> String
                                                                                if (response.status === 409) {
                                                                                    swal({
                                                                                        title: "Dados duplicados",
                                                                                        icon: "error",
                                                                                    });

                                                                                }
                                                                                else {
                                                                                    swal({
                                                                                        title: "Erro, por favor tente novamente",
                                                                                        icon: "error",
                                                                                    });
                                                                                }
                                                                                throw Error(response.statusText);
                                                                            }
                                                                            else {
                                                                                swal({
                                                                                        title: "Centralista adicionando com sucesso",
                                                                                        icon: "success",
                                                                                    })
                                                                                    .then(() => {
                                                                                        window.location.replace("add-opperation.html");
                                                                                    });
                                                                            }
                                                                        });
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                swal({
                                                                    title: "Já existe um Centralista com esse telefone",
                                                                    icon: "error",
                                                                });
                                                            }
                                                        }).then(function(result) {
                                                            console.log(result);
                                                        }).catch(function(err) {
                                                            console.error(err);
                                                        });
                                                }
                                                else {
                                                    swal({
                                                        title: "Este cartão de cidadado já se encontra registado",
                                                        icon: "error",
                                                    });
                                                }
                                            }).then(function(result) {
                                                console.log(result);
                                            }).catch(function(err) {
                                                console.error(err);
                                            });
                                    }
                                    else {
                                        swal({
                                            title: "Este email já se encontra registado",
                                            icon: "error",
                                        });
                                    }
                                }).then(function(result) {
                                    console.log(result);
                                }).catch(function(err) {
                                    console.error(err);
                                });
                        }

                    }
                }
            }
        }
    }
});

let a = document.getElementById("menu-logout");

a.addEventListener("click", login);

async function login() {
    await fetch(url + `/logout`)
        .then(function(response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100â€“599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                swal({
                    title: "Erro, por favor tente novamente",
                    icon: "error",
                });
                throw Error(response.statusText);
            }
            else {
                console.log("logout")
                localStorage.clear();
                window.location.replace("index.html");
            }
        })
};
