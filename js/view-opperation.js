const url = "https://backend-heroku1.herokuapp.com";
let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

//EDITAR PASSWORD//
/*let viewop_ps = document.getElementById("viewop-edit-ps");
viewop_ps.addEventListener("click", function() {
    document.getElementById("viewop-ps").disabled = false;
});*/


//EDITAR MORADA OPERACIONAL//
let viewop_adress = document.getElementById("viewop-edit-adress");
viewop_adress.addEventListener("click", function() {
    document.getElementById("viewop-adress").disabled = false;
});

//EDITAR TELEFONE OPERACIONAL//
let viewop_phone = document.getElementById("viewop-edit-phone");
viewop_phone.addEventListener("click", function() {
    document.getElementById("viewop-phone").disabled = false;
});

//EDITAR ORDENADO OPERACIONAL//
let viewop_salary = document.getElementById("viewop-edit-salary");
viewop_salary.addEventListener("click", function() {
    document.getElementById("viewop-salary").disabled = false;
});

//EDITAR EMAIL OPERACIONAL //
let viewop_email = document.getElementById("viewop-edit-email");
viewop_email.addEventListener("click", function() {
    document.getElementById("viewop-email").disabled = false;
});



window.onload =
    async() => {
        let id = localStorage.idopp;
        const response = await fetch(url + `/operationals/` + id)
        const opperation = await response.json();

        for (const opp of opperation) {
            let id = opp.id_operational;
            let name = opp.name;
            let cc = opp.cc;
            let phone = opp.phone_number;
            let entryData = opp.entry_date;
            let adress = opp.adress;
            let functio = opp.speciality;
            let birth = opp.birth_date;
            let salary = opp.pay_per_hour;

            localStorage.setItem("phone", phone);


            let id_login = opp.id;
            localStorage.setItem("idlogin", id_login);
            const response1 = await fetch(url + `/users/` + id_login)
            const login = await response1.json();
            for (const log of login) {
                let email = log.email;

                localStorage.setItem("email", email);

                document.getElementById("viewop-email").value = email;
            }

            let age = `${birth.substr(0,10 )}`;
            let date = `${entryData.substr(0,10 )}`;

            document.getElementById("view-id-opp").value = id;
            document.getElementById("viewop-name").value = name;
            document.getElementById("viewop-cc").value = cc;
            document.getElementById("viewop-phone").value = phone;
            document.getElementById("viewop-adress").value = adress;
            document.getElementById("viewop-function").value = functio;
            document.getElementById("viewop-age").value = age;
            document.getElementById("viewop-salary").value = salary;
            document.getElementById("viewop-entry").value = date;
        }
    }


document.getElementById("opp-save").onclick = function(e) {
    oppedit();
};

async function oppedit() {

    let id = localStorage.idopp;
    let data = {};
    let data1 = {}


    let idlogin = localStorage.idlogin;

    let phone = localStorage.phone;
    let email = localStorage.email;

    data.id_operational = document.getElementById("view-id-opp").value;
    data.adress = document.getElementById("viewop-adress").value;
    data.phone_number = document.getElementById("viewop-phone").value;
    data.pay_per_hour = document.getElementById("viewop-salary").value;

    data1.email = document.getElementById("viewop-email").value;
    data1.id = idlogin;



    if (data.phone_number.length !== 9 ||
        data.adress.length < 5 ||
        data1.email.length < 10 ||
        data1.email.indexOf('@') === -1) {

    }
    else {
        let save = document.getElementById("opp-save");
        save.type = "button";
        if (data.pay_per_hour.length === 0) {
            swal({
                title: "Por favor preencha o valor do salario",
                icon: "info",
            });
        }

        else {

            if (data1.email !== email) {

                fetch(url + `/usersEmail/` + data1.email)
                    .then(response => {
                        if (!response.ok) {
                            console.log(response.status); //=> number 100â€“599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url);


                            if (data.phone_number === phone) {


                                fetch(url + `/operationals/` + id, {
                                    headers: { 'Content-Type': 'application/json' },
                                    method: 'PUT',
                                    body: JSON.stringify(data)
                                }).then(function(response) {
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
                                        fetch(url + `/users/` + idlogin, {
                                            headers: { 'Content-Type': 'application/json' },
                                            method: 'PUT',
                                            body: JSON.stringify(data1)
                                        }).then(function(response) {
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
                                                swal({
                                                        title: "Alterações gravadas com sucesso",
                                                        icon: "success",
                                                    })
                                                    .then(() => {
                                                        window.location.replace("view-opperation.html");
                                                    });
                                            };
                                        }).then(function(result) {
                                            console.log(result);
                                        }).catch(function(err) {
                                            console.error(err);
                                        });
                                    };
                                })
                            }

                            else {
                                fetch(url + `/operationalsPhone/` + data.phone_number)
                                    .then(response => {
                                        if (!response.ok) {
                                            console.log(response.status); //=> number 100â€“599
                                            console.log(response.statusText); //=> String
                                            console.log(response.headers); //=> Headers
                                            console.log(response.url);


                                            fetch(url + `/operationals/` + id, {
                                                headers: { 'Content-Type': 'application/json' },
                                                method: 'PUT',
                                                body: JSON.stringify(data)
                                            }).then(function(response) {
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
                                                    fetch(url + `/users/` + idlogin, {
                                                        headers: { 'Content-Type': 'application/json' },
                                                        method: 'PUT',
                                                        body: JSON.stringify(data1)
                                                    }).then(function(response) {
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
                                                            swal({
                                                                    title: "Alterações gravadas com sucesso",
                                                                    icon: "success",
                                                                })
                                                                .then(() => {
                                                                    window.location.replace("view-opperation.html");
                                                                });
                                                        };
                                                    }).then(function(result) {
                                                        console.log(result);
                                                    }).catch(function(err) {
                                                        console.error(err);
                                                    });
                                                };
                                            }).then(function(result) {
                                                console.log(result);
                                            }).catch(function(err) {
                                                console.error(err);
                                            });
                                        }

                                        else {
                                            swal({
                                                title: "O Telefone já se encontra registado",
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

                        else {
                            swal({
                                title: "O Email já se encontra registado",
                                icon: "error",
                            });
                        }

                    }).then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        console.error(err);
                    });
            }
            else
            if (data.phone_number === phone) {


                fetch(url + `/operationals/` + id, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT',
                    body: JSON.stringify(data)
                }).then(function(response) {
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
                        fetch(url + `/users/` + idlogin, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'PUT',
                            body: JSON.stringify(data1)
                        }).then(function(response) {
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
                                swal({
                                        title: "Alterações gravadas com sucesso",
                                        icon: "success",
                                    })
                                    .then(() => {
                                        window.location.replace("view-opperation.html");
                                    });
                            };
                        }).then(function(result) {
                            console.log(result);
                        }).catch(function(err) {
                            console.error(err);
                        });
                    };
                })
            }

            else {
                fetch(url + `/operationalsPhone/` + data.phone_number)
                    .then(response => {
                        if (!response.ok) {
                            console.log(response.status); //=> number 100â€“599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url);


                            fetch(url + `/operationals/` + id, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'PUT',
                                body: JSON.stringify(data)
                            }).then(function(response) {
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
                                    fetch(url + `/users/` + idlogin, {
                                        headers: { 'Content-Type': 'application/json' },
                                        method: 'PUT',
                                        body: JSON.stringify(data1)
                                    }).then(function(response) {
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
                                            swal({
                                                    title: "Alterações gravadas com sucesso",
                                                    icon: "success",
                                                })
                                                .then(() => {
                                                    window.location.replace("view-opperation.html");
                                                });
                                        };
                                    }).then(function(result) {
                                        console.log(result);
                                    }).catch(function(err) {
                                        console.error(err);
                                    });
                                };
                            }).then(function(result) {
                                console.log(result);
                            }).catch(function(err) {
                                console.error(err);
                            });
                        }

                        else {
                            swal({
                                title: "O Telefone já se encontra registado",
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

document.getElementById("button_chhose").onclick = function(e) {
    editPhoto();
};

async function editPhoto() {
    let data = {};
    let id = localStorage.iddir;
    data.foto = localStorage.foto;

    console.log(data); //debugging para ver os dados que foram enviados

    fetch('https://23c6902811494393ad2cea6ff8f72d75.vfs.cloud9.us-east-1.amazonaws.com/upload', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POSt',

    }).then(function(response) {
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
        else {};
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.error(err);
    });
}

function saveAvatar() {
    //console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch("https://bdc5dcf6bca04b39ab10a706cdb79f29.vfs.cloud9.us-east-1.amazonaws.com/operationalsAvatar/30", {
        method: 'PUT',
    }).then(function(response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        alert("Submission error");
        console.error(err);
    });
}

document.getElementById("teste").addEventListener("click", function() {
    saveAvatar();

});


