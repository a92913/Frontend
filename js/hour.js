setInterval(function(){
  var hora = new Date().toLocaleTimeString();
  document.querySelector('#app').innerHTML = hora;
}, 100);