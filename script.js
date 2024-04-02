function openNav() {
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("overlay").classList.add('active'); // Mostra l'overlay
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("overlay").classList.remove('active'); // Nascondi l'overlay
}