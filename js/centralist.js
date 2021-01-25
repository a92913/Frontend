const url = "https://backend-heroku1.herokuapp.com";

function dashboard() {
  async function fetchAsync() {

    const responsea = await fetch(url + '/numberPendingReq/');
    const pendingReqs = await responsea.json();
    let pendingReq = pendingReqs.map(el => Object.values(el));

    document.getElementById("req-pend").innerHTML = pendingReq;

    const numberPendReq = parseInt(pendingReq);
    if (numberPendReq === 0) {
      document.getElementById("req_urg").style.backgroundColor = "#1C9100";
    }

    const response1 = await fetch(url + '/numberOccAct/');
    const occurs = await response1.json();
    let occAct = occurs.map(el => Object.values(el));

    document.getElementById("occ-act").innerHTML = occAct;

    const numberOccAct = parseInt(occAct);

    if (numberOccAct === 0) {
      document.getElementById("act-ocur").style.backgroundColor = "#1C9100";
    }

    const response2 = await fetch(url + '/numberHelp/');
    const helps = await response2.json();
    let help = helps.map(el => Object.values(el));
    document.getElementById("urgente").innerHTML = help;

    const numberhelpAct = parseInt(help);
    if (numberhelpAct === 0) {
      document.getElementById("peq_urg").style.backgroundColor = "#1C9100";
    }

    const response19 = await fetch(url + '/numberTratReq/');
    const tratReq = await response19.json();

    let reqTrat = tratReq.map(el => Object.values(el));
    const numberReqTrat = parseInt(reqTrat);

    const response20 = await fetch(url + '/numberTotalReq/');
    const totalReq = await response20.json();

    let reqTotal = totalReq.map(el => Object.values(el));
    const numberReqTotal = parseInt(reqTotal);

    new Chart(document.getElementById("request-number"), {
      type: 'bar',
      data: {
        labels: ["Pendentes", "Tratados", "Totais"],
        datasets: [{
          label: "Pedidos",
          backgroundColor: ["#FAB032", "#1C9100", "#0096C7"],
          data: [numberPendReq, numberReqTrat, numberReqTotal]
        }]
      },
      options: {
        legend: { display: false },

        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

    const response191 = await fetch(url + '/numberOccFin/');
    const occFin = await response191.json();

    let number19 = occFin.map(el => Object.values(el));
    const numberOccFin = parseInt(number19);

    const response201 = await fetch(url + '/numberOccTotal/');
    const occTotal = await response201.json();

    let number20 = occTotal.map(el => Object.values(el));
    const numberOccTotal = parseInt(number20);

    new Chart(document.getElementById("occo-number"), {
      type: 'bar',
      data: {
        labels: ["Ativas", "Concluidas", "Totais"],
        datasets: [{
          label: "Ocorrências",
          backgroundColor: ["#E36414", "#1C9100", "#0096C7"],
          data: [numberOccAct, numberOccFin, numberOccTotal]
        }]
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

  //chama a função fetchAsync()
  fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
};

window.onload = dashboard();


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
