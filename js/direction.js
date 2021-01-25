const url = "https://backend-heroku1.herokuapp.com";


google.charts.load('current', { packages: ['corechart', 'bar'] });

function numberAssoc() {
  async function fetchAsync() {

    const response = await fetch(url + '/numberPartner/');
    const assocs = await response.json();
    let assoc = assocs.map(el => Object.values(el));
    document.getElementById("numberAssoc").innerHTML = assoc;
    const numberPart21 = parseInt(assoc);


    const responsea = await fetch(url + '/numberOperationals/');
    const firemans = await responsea.json();
    let fireman = firemans.map(el => Object.values(el));
    document.getElementById("numberFireman").innerHTML = fireman;

    const numberBomb21 = parseInt(fireman);

    const responseb = await fetch(url + '/numberCentralist/');
    const cents = await responseb.json();
    let cent = cents.map(el => Object.values(el));
    document.getElementById("numberCentralist").innerHTML = cent;
    const numberCent21 = parseInt(cent);

    const response19 = await fetch(url + '/numberPerDatePartner/' + "2020-01-01");
    const part19 = await response19.json();

    let number19 = part19.map(el => Object.values(el));
    const numberPart19 = parseInt(number19);

    const response20 = await fetch(url + '/numberPerDatePartner/' + "2021-01-01");
    const bomb20 = await response20.json();

    let number20 = bomb20.map(el => Object.values(el));
    const numberPart20 = parseInt(number20);

    new Chart(document.getElementById("numberAssoci"), {
      type: 'bar',
      data: {
        labels: ["2019", "2020", "2021"],
        datasets: [{
          label: "Sócios",
          backgroundColor: ["#E36414", "#E36414", "#E36414"],
          data: [numberPart19, numberPart20, numberPart21]
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


    const response19a = await fetch(url + '/numberPerDateOperationals/' + "2020-01-01");
    const bomb19 = await response19a.json();

    let number19a = bomb19.map(el => Object.values(el));
    const numberBomb19 = parseInt(number19a);

    const response20a = await fetch(url + '/numberPerDateOperationals/' + "2021-01-01");
    const bomb20a = await response20a.json();

    let number20a = bomb20a.map(el => Object.values(el));
    const numberBomb20 = parseInt(number20a);

    new Chart(document.getElementById("numberfire"), {
      type: 'bar',
      data: {
        labels: ["2019", "2020", "2021"],
        datasets: [{
          label: "Bombeiros",
          backgroundColor: ["#AF171B", "#AF171B", "#AF171B"],
          data: [numberBomb19, numberBomb20, numberBomb21]
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

    const response19b = await fetch(url + '/numberPerDateCentralist/' + "2020-01-01");
    const cent19 = await response19b.json();

    let number19b = cent19.map(el => Object.values(el));
    const numberCent19 = parseInt(number19b);

    const response20b = await fetch(url + '/numberPerDateCentralist/' + "2021-01-01");
    const cent20 = await response20b.json();

    let number20b = cent20.map(el => Object.values(el));
    const numberCent20 = parseInt(number20b);

    new Chart(document.getElementById("numbercent"), {
      type: 'bar',
      data: {
        labels: ["2019", "2020", "2021"],
        datasets: [{
          label: "Centralistas",
          backgroundColor: ["#FAB032", "#FAB032", "#FAB032"],
          data: [numberCent19, numberCent20, numberCent21]
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




    const content1 = "florestal";
    const content2 = "urbano";
    const content3 = "Transporte de doentes";
    const content4 = "Queimadas";
    const content5 = "Enchimento de Reservatórios";

    //2019
    const response1 = await fetch(url + '/numberTotalPerDateReq2019/' + content1);
    const florestal2019 = await response1.json();

    const response2 = await fetch(url + '/numberTotalPerDateReq2019/' + content2);
    const urbano2019 = await response2.json();

    const response3 = await fetch(url + '/numberTotalPerDateReq2019/' + content3);
    const transporte2019 = await response3.json();

    const response4 = await fetch(url + '/numberTotalPerDateReq2019/' + content4);
    const queimadas2019 = await response4.json();

    const response5 = await fetch(url + '/numberTotalPerDateReq2019/' + content5);
    const encher2019 = await response5.json();


    let florestal2k19 = florestal2019.map(el => Object.values(el));
    const numberflo2019 = parseInt(florestal2k19);


    let urbano2k19 = urbano2019.map(el => Object.values(el));
    const numberurbn2019 = parseInt(urbano2k19);


    let transporte2k19 = transporte2019.map(el => Object.values(el));
    const numbertrans2019 = parseInt(transporte2k19);

    let queimadas2k19 = queimadas2019.map(el => Object.values(el));
    const numberquei2019 = parseInt(queimadas2k19);

    let encher2k19 = encher2019.map(el => Object.values(el));
    const numberencher2019 = parseInt(encher2k19);


    //2020
    const response11 = await fetch(url + '/numberTotalPerDateReq2020/' + content1);
    const florestal2020 = await response11.json();

    const response22 = await fetch(url + '/numberTotalPerDateReq2020/' + content2);
    const urbano2020 = await response22.json();

    const response33 = await fetch(url + '/numberTotalPerDateReq2020/' + content3);
    const transporte2020 = await response33.json();

    const response44 = await fetch(url + '/numberTotalPerDateReq2020/' + content4);
    const queimadas2020 = await response44.json();

    const response55 = await fetch(url + '/numberTotalPerDateReq2020/' + content5);
    const encher2020 = await response55.json();


    let florestal2k20 = florestal2020.map(el => Object.values(el));
    const numberflo2020 = parseInt(florestal2k20);


    let urbano2k20 = urbano2020.map(el => Object.values(el));
    const numberurbn2020 = parseInt(urbano2k20);


    let transporte2k20 = transporte2020.map(el => Object.values(el));
    const numbertrans2020 = parseInt(transporte2k20);

    let queimadas2k20 = queimadas2020.map(el => Object.values(el));
    const numberquei2020 = parseInt(queimadas2k20);

    let encher2k20 = encher2020.map(el => Object.values(el));
    const numberencher2020 = parseInt(encher2k20);


    //2021
    const response111 = await fetch(url + '/numberTotalPerDateReq2021/' + content1);
    const florestal2021 = await response111.json();

    const response222 = await fetch(url + '/numberTotalPerDateReq2021/' + content2);
    const urbano2021 = await response222.json();

    const response333 = await fetch(url + '/numberTotalPerDateReq2021/' + content3);
    const transporte2021 = await response333.json();

    const response444 = await fetch(url + '/numberTotalPerDateReq2021/' + content4);
    const queimadas2021 = await response444.json();

    const response555 = await fetch(url + '/numberTotalPerDateReq2021/' + content5);
    const encher2021 = await response555.json();


    let florestal2k21 = florestal2021.map(el => Object.values(el));
    const numberflo2021 = parseInt(florestal2k21);


    let urbano2k21 = urbano2021.map(el => Object.values(el));
    const numberurbn2021 = parseInt(urbano2k21);


    let transporte2k21 = transporte2021.map(el => Object.values(el));
    const numbertrans2021 = parseInt(transporte2k21);

    let queimadas2k21 = queimadas2021.map(el => Object.values(el));
    const numberquei2021 = parseInt(queimadas2k21);

    let encher2k21 = encher2021.map(el => Object.values(el));
    const numberencher2021 = parseInt(encher2k21);

    var data = google.visualization.arrayToDataTable([
      ["Ano", 'Incêndio Florestal', 'Incêndio Urbano', 'Queimadas', 'Transporte de doentes',
        'Enchimento de reservatórios', { role: 'annotation' }

      ],
      ['2019', numberflo2019, numberurbn2019, numberquei2019, numbertrans2019, numberencher2019, ""],
      ['2020', numberflo2020, numberurbn2020, numberquei2020, numbertrans2020, numberencher2020, ""],
      ['2021', numberflo2021, numberurbn2021, numberquei2021, numbertrans2021, numberencher2021, ""]
    ]);

    var options = {
      width: "100%",
      height: 188,
      legend: { position: 'top', maxLines: 5, textStyle: { fontSize: 14 } },
      bar: { groupWidth: '75%' },
      isStacked: true,
      colors: ['#AF171B', '#E36414', '#FAB032', '#1C9100', '#0096C7']
    };
    var chart = new google.visualization.BarChart(document.getElementById('numberTypeRequest'));
    chart.draw(data, options);


  }
  //chama a função fetchAsync()
  fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
};

let a = document.getElementById("menu-logout");

a.addEventListener("click", login);

async function login () {
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

window.onload = numberAssoc();
