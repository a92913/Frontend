const url = "https://backend-heroku1.herokuapp.com";
(function($) {
  "use strict";


  setUpDataAssoc();

  async function setUpDataAssoc() {

    const res = await fetch(url + '/partners/');
    const data = await res.json();

    let assoc = data.map(el => Object.values(el));

    $(document).ready(function() {

      $('#Table-associate').DataTable({
        "language": {
          "lengthMenu": "Mostrar _MENU_ associados por página",
          "zeroRecords": "Nada encontrado",
          "info": "Mostrar página _PAGE_ de _PAGES_",
          "infoEmpty": "Nenhhum associado",
          "infoFiltered": "(Filtrado _MAX_ sócios)",
          "search": "Procurar:",
          "paginate": {
            "next": "Próxima",
            "previous": "Anterior"
          }
        },
        data: assoc,
        "lengthMenu": [
          [-1, 10, 25, 50],
          ["Todos", 10, 25, 50]
        ],
      });

      //-------------------------------------------------------------------------------//
      let tabela = document.getElementById("Table-associate");
      let linhas = tabela.getElementsByTagName("tr");

      for (let i = 0; i < linhas.length; i++) {
        var linha = linhas[i];
        linha.addEventListener("click", function() {
          //Adicionar ao atual
          selLinha(this, false); //Selecione apenas um
          //selLinha(this, true); //Selecione quantos quiser
        });
      }

      /**
      Caso passe true, você pode selecionar multiplas linhas.
      Caso passe false, você só pode selecionar uma linha por vez.
      **/
      function selLinha(linha, multiplos) {
        if (!multiplos) {
          let linhas = linha.parentElement.getElementsByTagName("tr");
          for (let i = 0; i < linhas.length; i++) {
            var linha_ = linhas[i];
            linha_.classList.remove("selecionado");
          }
        }
        linha.classList.toggle("selecionado");
      }

      /**
      Exemplo de como capturar os dados
      **/

      let btnVisualizar = document.getElementById("view-data-assoc");

      btnVisualizar.addEventListener("click", function() {
        let selecionados = tabela.getElementsByClassName("selecionado");
        //Verificar se eestá selecionado
        if (selecionados.length < 1) {
          swal({
            title: "Selecione uma linha!",
            icon: "info",
          });
          return false;
        }

        for (let i = 0; i < selecionados.length; i++) {
          let selecionado = selecionados[i];
          selecionado = selecionado.getElementsByTagName("td");

          window.location.replace("view-associate.html");
          localStorage.setItem("idassoc", selecionado[0].innerHTML);
        }
      });

      let btnEliminar = document.getElementById("assoc-delete");

      btnEliminar.addEventListener("click", function() {

        let selecionados = tabela.getElementsByClassName("selecionado");
        //Verificar se está selecionado
        if (selecionados.length < 1) {
          swal({
            title: "Selecione uma linha!",
            icon: "info",
          });
          return false;
        }

        for (let i = 0; i < selecionados.length; i++) {
          let selecionado = selecionados[i];
          selecionado = selecionado.getElementsByTagName("td");
          for (const ln of selecionados) {

            swal({
                title: "Pretende eliminar o sócio " + selecionado[0].innerHTML + " ?",
                icon: "warning", //warning 
                buttons: ["Sim", "Não"],
                // dangerMode: true, partners
              })
              .then((willDelete) => {
                if (willDelete) {}
                else {
                  $(document).ready(function() {
                    setUpDataTable1();
                  })
                  async function setUpDataTable1() {
                    let a = selecionado[0].innerHTML;
                    await fetch(url + '/checkOutPartners/' + a, { method: "PUT" })
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
                          swal({
                            title: "O associado " + selecionado[0].innerHTML + " foi removido com sucesso!",
                            icon: "success",
                          });
                          ln.remove();
                        }
                      });
                  }
                }
              });
          }
        }
      });
    });
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
