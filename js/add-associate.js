const url = "https://backend-heroku1.herokuapp.com";


let filtroTeclas = function(event) {
 return ((event.charCode >= 48 && event.charCode <= 57) || (event.keyCode == 45 || event.charCode == 46))
}

let addassoc = document.getElementById("addas-add");

addassoc.addEventListener("click", function() {

 let data = {};

 data.name = document.getElementById("addas-name").value;
 data.registration_date = document.getElementById("addas-date").value;
 data.date_bith = document.getElementById("addas-age").value;
 data.mail = document.getElementById("addas-email").value;
 data.phone_num = document.getElementById("addas-phone").value;
 data.cc = document.getElementById("addas-cc").value;
 data.adress = document.getElementById("addas-adress").value;
 data.donation = document.getElementById("addas-quota").value;
 data.id_station = "1234";
 if (data.name.length < 2 ||
  data.registration_date.length !== 10 ||
  data.date_bith.length !== 10 ||
  data.mail.length < 10 ||
  data.mail.indexOf('@') === -1 ||
  data.phone_num.length !== 9 ||
  data.cc.length !== 8 ||
  data.adress.length < 5 ||
  data.donation.length === 0
 ) {}
 else {
  addassoc.type = "button";
  let today = new Date().toISOString().slice(0, 10);

  if (today < data.date_bith) {

   swal({
    title: "Data de Nascimento inválida",
    icon: "error",
   });
  }
  else {
   if (today < data.registration_date) {

    swal({
     title: "Data de Registo inválida",
     icon: "error",
    });
   }
   else {
    if (data.date_bith > data.registration_date) {

     swal({
      title: "Data de Registo anterior ao nascimento",
      icon: "error",
     });
    }
    else {

     fetch(url + "/partners/", {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
     }).then(function(response) {

      if (!response.ok) {
       console.log(response.status); //=> number 100–599
       console.log(response.statusText); //=> String
       console.log(response.headers); //=> Headers
       console.log(response.url); //=> String
       if (response.status == 409) {
        newpartner();
        async function newpartner() {
         const response = await fetch(url + `/partnersCC/` + data.cc)
         const partners = await response.json()

         for (const partner of partners) {

          const checkout_date = partner.checkout_date;
          const id = partner.num_partner;
          let string = `${checkout_date.substr(0,10 )}`;

          if (string.toString() != "1111-01-01" ) {

           swal({
             title: "Pretende reinscrever o sócio ?",
             icon: "warning", //warning 
             buttons: ["Sim", "Não"],
             // dangerMode: true, partners
            })
            .then((willDelete) => {
             if (willDelete) {}
             else {
              let data2 = {};
              let idcent = id.toString();
              data2.num_partner = idcent;
              data2.mail = document.getElementById("addas-email").value;
              data2.phone_num = document.getElementById("addas-phone").value;
              data2.adress = document.getElementById("addas-adress").value;
              data2.donation = document.getElementById("addas-quota").value;

              function fetchAsync() {
               fetch(url + '/partnersRes/' + idcent, {
                headers: { 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify(data2)
               }).then(function(response) {
                if (!response.ok) {
                 console.log(response.status); //=> number 100â€“599
                 console.log(response.statusText); //=> String
                 console.log(response.headers); //=> Headers
                 console.log(response.url); //=> String
                 swal({
                  title: "Erro2, por favor tente novamente",
                  icon: "error",
                 });
                }
                else {
                 swal({
                   title: "O associado " + id + " foi inserido novamente!",
                   icon: "success",
                  })
                  .then(() => {
                   window.location.replace("add-associate.html");
                  });
                }
               }).then(function(result) {
                console.log(result);
               }).catch(function(err) {
                console.error(err);
               });
              }
              fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
             }
            });
          }
          else {
           swal({
            title: "Já existe um sócio com este cartão de cidadão",
            icon: "error",
           });
          }
         }
        }
       }
       else {
        swal({
         title: "Erro1, por favor tente novamente",
         icon: "error",
        });
       }
      }
      else {
       swal({
         title: "Sócio adicionado com sucesso",
         icon: "success",
        })
        .then(() => {
         window.location.replace("add-associate.html");
        });
      }
     });
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
