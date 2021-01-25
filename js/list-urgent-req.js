const url = "https://backend-heroku1.herokuapp.com";
(function($) {
  "use strict";

  setUpDataOcc();

  async function setUpDataOcc() {
    const res = await fetch(url + '/help/');
    const data = await res.json();

    let arroz = data.map(el => Object.values(el));

    $(document).ready(function() {
      $('#Table-urgent-req').DataTable({
        "language": {
          "lengthMenu": "Mostrar _MENU_ ocorrências por página",
          "zeroRecords": "Nada encontrado",
          "info": "Mostrar página _PAGE_ de _PAGES_",
          "infoEmpty": "Nenhhuma ocorrência",
          "infoFiltered": "(Filtrado _MAX_ Ocorrências)",
          "search": "Procurar:",
          "paginate": {
            "next": "Próxima",
            "previous": "Anterior"
          }
        },
        data: arroz,
        "lengthMenu": [
          [-1, 10, 25, 50],
          ["Todas", 10, 25, 50]
        ],
      });
    })
  }
})(jQuery);

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
