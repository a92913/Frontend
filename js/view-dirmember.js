const url = "https://backend-heroku1.herokuapp.com";
let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

//EDITAR PASSWORD DIRETOR//
/*let dir_ps = document.getElementById("viewdir-edit-ps");
dir_ps.addEventListener("click", function() {
    document.getElementById("viewdir-ps").disabled = false;
});*/


//EDITAR EMAIL DIRETOR//
let dir_email = document.getElementById("viewdir-edit-email");
dir_email.addEventListener("click", function() {
    document.getElementById("viewdir-email").disabled = false;
});


//EDITAR MORADA DIRETOR//
let dir_adress = document.getElementById("viewdir-edit-adress");
dir_adress.addEventListener("click", function() {
    document.getElementById("viewdir-adress").disabled = false;
});

//EDITAR TELEFONE DIRETOR//
let dir_phone = document.getElementById("viewdir-edit-phone");
dir_phone.addEventListener("click", function() {
    document.getElementById("viewdir-phone").disabled = false;
});


window.onload =
    async() => {
        let id = localStorage.iddir;
        const response = await fetch(url + "/managements/" + id);
        const dirs = await response.json();

        for (const dir of dirs) {
            let name = dir.name;
            let num = dir.id_management;
            let cc = dir.cc;
            let date_birth = dir.date_birth;
            let phone = dir.phone_number;
            let adress = dir.adress;

            localStorage.setItem("phone", phone);


            let id_login = dir.id_login;
            localStorage.setItem("idlogin", id_login);
            const response1 = await fetch(url + `/users/` + id_login)
            const login = await response1.json()
            for (const log of login) {
                let ps = log.password;
                let email = log.email;

                localStorage.setItem("email", email);

                document.getElementById("viewdir-email").value = email;
            }

            let age = `${date_birth.substr(0,10 )}`;

            document.getElementById("viewdir-name").value = name;
            document.getElementById("viewdir-cc").value = cc;
            document.getElementById("viewdir-id").value = num;
            document.getElementById("viewdir-phone").value = phone;
            document.getElementById("viewdir-adress").value = adress;
            document.getElementById("viewdir-age").value = age;
        }
    };

document.getElementById("dir-save").onclick = function(e) {
    dir_edit();
};

async function dir_edit() {
    let id = localStorage.iddir;
    let data = {};
    let data1 = {};

    let idlogin = localStorage.idlogin;

    let phone = localStorage.phone;

    let email = localStorage.email;

    data.id_management = document.getElementById("viewdir-id").value;
    data.adress = document.getElementById("viewdir-adress").value;
    data.phone_number = document.getElementById("viewdir-phone").value;


    data1.email = document.getElementById("viewdir-email").value;
    data1.id_login = idlogin;

    if (data.phone_number.length !== 9 ||
        data.adress.length < 5 ||
        data1.email.length < 10 ||
        data1.email.indexOf('@') === -1) {

    }
    else {
        let save = document.getElementById("dir-save");
        save.type = "button";


        if (data1.email !== email) {

            fetch(url + `/usersEmail/` + data1.email)
                .then(response => {
                    if (!response.ok) {
                        console.log(response.status); //=> number 100â€“599
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers
                        console.log(response.url);


                        if (data.phone_number === phone) {


                            fetch(url + `/managements/` + data.id_management, {
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
                                                    window.location.replace("view-dirmember.html");
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
                            fetch(url + `/managementsPhone/` + data.phone_number)
                                .then(response => {
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100â€“599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url);


                                        fetch(url + `/managements/` + data.id_management, {
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
                                                fetch(utl + `/users/` + idlogin, {
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
                                                                window.location.replace("view-dirmember.html");
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


            fetch(url + `/managements/` + data.id_management, {
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
                                    window.location.replace("view-dirmember.html");
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
            fetch(url + `/managementsPhone/` + data.phone_number)
                .then(response => {
                    if (!response.ok) {
                        console.log(response.status); //=> number 100â€“599
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers
                        console.log(response.url);

                        fetch(url + `/managements/` + data.id_management, {
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
                                                window.location.replace("view-dirmember.html");
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


function showThumbnail(filess) {
    var url = filess.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (filess.files && filess.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photo-profile').setAttribute('src', e.target.result);
            alert()
        }
        reader.readAsDataURL(filess.files[0]);
    }
}

/*document.getElementById("button_chhose").onclick = function(e) {
    editPhoto();
};

async function editPhoto() {
    let data = {};
    let id = localStorage.iddir;
    data.foto = localStorage.foto;
    alert(localStorage.foto);

    console.log(data); //debugging para ver os dados que foram enviados

    fetch('https://23c6902811494393ad2cea6ff8f72d75.vfs.cloud9.us-east-1.amazonaws.com/operationalsAvatar/'+ id, {
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
        else {};
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.error(err);
    });
}*/
