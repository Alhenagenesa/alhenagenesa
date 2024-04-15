function openNav() {
  document.getElementById("sidenav").style.width = "100%";
  document.getElementById("overlay").classList.add('active');
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("overlay").classList.remove('active');
}