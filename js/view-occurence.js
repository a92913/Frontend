const url = "https://backend-heroku1.herokuapp.com";
let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

//EDITAR TELEFONE OCORRÊNCIA//
let occu_phone = document.getElementById("occu-edit-phone");
occu_phone.addEventListener("click", function() {
    document.getElementById("viewoc-phone").disabled = false;
});

window.onload =
    async() => {
        let id = localStorage.idocc;
        const response = await fetch(url + `/occurrences/` + id)
        const occs = await response.json()

        for (const occ of occs) {
            let idrequest = occ.id_request;
            let type = occ.occurrence_type;

            localStorage.setItem("idreq", idrequest);

            document.getElementById("viewoc-firetype").value = type;

            const response1 = await fetch(url + `/requests/` + idrequest)
            const reqs = await response1.json();

            for (const req of reqs) {
                let data = req.date;
                let adress = req.adress;
                let phone = req.phone_number;

                let date = `${data.substr(0,10 )}`;

                document.getElementById("viewoc-hour").value = date;
                document.getElementById("viewoc-adress").value = adress;
                document.getElementById("viewoc-phone").value = phone;

            }
        }
    }

document.getElementById("occu-save").onclick = function(e) {
    occ_edit();
}

function occ_edit() {

    let data = {};
    let idrequest = localStorage.idreq;
    data.phone_number = document.getElementById("viewoc-phone").value;
    data.id_request = idrequest;

    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    if (data.phone_number.length !== 9) {

    }
    else {
        let save = document.getElementById("occu-save");
        save.type = "button";
        let idrequest = localStorage.idreq;
        fetch(url + '/requests/' + idrequest, {
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
                        window.location.replace("view-occurence.html");
                    });
            };
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
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
