const url = "https://backend-heroku1.herokuapp.com";

let filtroTeclas = function(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

let addreq = document.getElementById("request-submit");

addreq.addEventListener("click", function() {

    let data = {};
    let data2 = {};


    data.description = document.getElementById("request-descrition").value;
    data.content = document.getElementById("request-type").value;
    data.name = document.getElementById("request-name").value;
    data.mail = document.getElementById("request-email").value;
    data.phone_number = document.getElementById("request-phone").value;
    data.date = document.getElementById("request-date").value;
    data.adress = document.getElementById("request-adress").value;
    data.hour = document.getElementById("request-hour").value;

    data.typology = "Não urgente";
    data.difficulty_level = "1";

    data2.email = document.getElementById("request-email").value;
    data2.name = document.getElementById("request-name").value;


    if (data.content.length === 0 ||
        data.phone_number.length !== 9 ||
        data.difficulty_level.length === 0 ||
        data.adress.length < 5 ||
        data.hour.length !== 5 ||
        data.date.length !== 10 ||
        data.mail.length < 10 ||
        data.mail.indexOf('@') === -1) {

    }
    else {
        addreq.type = "button";


        let today = new Date().toISOString().slice(0, 10);

        if (today > data.date) {

            swal({
                title: "Data de Pedido inválida",
                //text: "",
                icon: "error",
                //buttons: false,
                //timer: 2000
            });
        }
        else {
            fetch(url + "/requeststype/", {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function(response) {

                if (!response.ok) {
                    console.log(response.status); //=> number 100–599
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

                    fetch(url + "/emails2", {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify(data2)
                    }).then(function(response) {

                        if (!response.ok) {
                            console.log(response.status); //=> number 100–599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String

                            throw Error(response.statusText);
                        }
                    });
                    swal({
                            title: "Pedido submetido com sucesso",
                            //text: "",
                            icon: "success",
                            //buttons: false,
                            //timer: 2000
                        })
                        .then(() => {
                            window.location.replace("request.html");
                        })
                }
            });
        }
    }
});

