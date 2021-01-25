const url = "https://backend-heroku1.herokuapp.com";
window.onload =
    async() => {
        let id = localStorage.idreqs;
        const response = await fetch(url + `/requests/` + id)
        const requests = await response.json()

        for (const request of requests) {

            let id = request.id_request;
            let adress = request.adress;
            let phone = request.phone_number;
            let hour = request.hour;
            let name = request.name;
            let date = request.date;
            let email = request.mail;
            let content = request.content;
            let descrition = request.description;

            const response1 = await fetch(url + `/requeststype/` + id)
            const reqs = await response1.json()

            for (const req of reqs) {
                let type = req.typology;
                let level = req.difficulty_level;
                document.getElementById('viewreq-type').value = type;
                document.getElementById('viewreq-level').value = level;

            }
            // let level = request.difficulty_level;

            let date2 = `${date.substr(0,10 )}`;
            let hour2 = `${hour.substr(0,5 )}`;
            /* let date = `${registration_date.substr(0,10 )}`;*/
            document.getElementById('viewreq-id').value = id;
            document.getElementById('viewreq-adress').value = adress;
            document.getElementById('viewreq-phone').value = phone;
            document.getElementById('viewreq-hour').value = hour2;
            document.getElementById('viewreq-date').value = date2;
            document.getElementById('viewreq-email').value = email;
            document.getElementById('viewreq-descrition').value = descrition;
            document.getElementById('viewreq-name').value = name;
            if (content === "florestal" || "urbano") {
                document.getElementById("viewreq-typereq").value = "Incêndio " + content;
            }
            else {
                document.getElementById("viewreq-typereq").value = content;
            }

        }
    };

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
