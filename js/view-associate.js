const url = "https://backend-heroku1.herokuapp.com";
let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

//EDITAR MORADA SÓCIO//
let assoc_adress = document.getElementById("assoc-edit-adress");
assoc_adress.addEventListener("click", function() {
    document.getElementById("viewas-adress").disabled = false;
});

//EDITAR COTA SÓCIO//
let assoc_cota = document.getElementById("assoc-edit-cota");
assoc_cota.addEventListener("click", function() {
    document.getElementById("viewas-quota").disabled = false;
});

//EDITAR TELEFONE SÓCIO//
let assoc_phone = document.getElementById("assoc-edit-phone");
assoc_phone.addEventListener("click", function() {
    document.getElementById("viewas-phone").disabled = false;
});

//EDITAR EMAIL SÓCIO //
let assoc_email = document.getElementById("assoc-edit-email");
assoc_email.addEventListener("click", function() {
    document.getElementById("viewas-email").disabled = false;
});


window.onload =
    async() => {
        let id = localStorage.idassoc;
        const response = await fetch(url + `/partners/` + id)
        const partners = await response.json()

        for (const partner of partners) {

            let num = partner.num_partner;
            let name = partner.name;
            let cc = partner.cc;
            let phone = partner.phone_num;
            let adress = partner.adress;
            let donation = partner.donation;
            let date_bith = partner.date_bith;
            let registration_date = partner.registration_date;
            let email = partner.mail;

            let age = `${date_bith.substr(0,10 )}`;
            let date = `${registration_date.substr(0,10 )}`;
            document.getElementById('viewas-name').value = name;
            document.getElementById('viewas-adress').value = adress;
            document.getElementById('viewas-cc').value = cc;
            document.getElementById('viewas-quota').value = donation;
            document.getElementById('viewas-id').value = num;
            document.getElementById('viewas-age').value = age;
            document.getElementById('viewas-phone').value = phone;
            document.getElementById('viewas-date').value = date;
            document.getElementById('viewas-email').value = email;

        }
    };

document.getElementById("assoc-save").onclick = function(e) {
    assoc_edit();
};

function assoc_edit() {
    let id = localStorage.idassoc;
    let data = {};

    data.num_partner = document.getElementById("viewas-id").value;
    data.phone_num = document.getElementById("viewas-phone").value;
    data.donation = document.getElementById("viewas-quota").value;
    data.adress = document.getElementById("viewas-adress").value;
    data.mail = document.getElementById("viewas-email").value;
    console.log(data);

    if (data.phone_num.length !== 9 ||
        data.adress.length < 5 ||
        data.mail.length === 0 ||
        data.mail.indexOf('@') === -1) {

    }
    else {
        let save = document.getElementById("assoc-save");
        save.type = "button";
        if (data.donation.length === 0) {
            swal({
                title: "Por favor preencha o valor da cota",
                icon: "info",
            });
        }
        else {
            save.type = "button";
            fetch(url + `/partners/` + id, {
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
                    swal({
                            title: "Alterações gravadas com sucesso",
                            icon: "success",
                        })
                        .then(() => {
                            window.location.replace("view-associate.html");
                        });
                };
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
