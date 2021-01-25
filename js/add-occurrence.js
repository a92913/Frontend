const url = "https://backend-heroku1.herokuapp.com";

let filtroTeclas = function(event) {
 return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
};

let addocc = document.getElementById("addoc-add");

addocc.addEventListener("click", function() {

 let data = {};

 let today = new Date().toISOString().slice(0, 10);

 data.content = document.getElementById("addoc-firetype").value;
 data.description = document.getElementById("addoc-descrition").value;
 data.phone_number = document.getElementById("addoc-phone").value;
 data.hour = document.getElementById("addoc-hour").value;
 data.adress = document.getElementById("addoc-adress").value;
 data.typology = "Urgente";
 data.difficulty_level = document.getElementById("addoc-level").value;
 data.date = today;

 if (
  data.content.length === 0 ||
  data.phone_number.length !== 9 ||
  data.difficulty_level.length === 0 ||
  data.adress.length < 5 ||
  data.hour.length !== 5) {

 }
 else {
  addocc.type = "button";

  let hour2 = new Date().toISOString().slice(11, 16);

  if (hour2 < data.hour) {

   swal({
    title: "Hora inválida",
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
     swal({
       title: "Ocorrência adicionada com sucesso",
       //text: "",
       icon: "success",
       //buttons: false,
       //timer: 2000
      })
      .then(() => {
       window.location.replace("add-occurrence.html");
      });
    }
   });
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
