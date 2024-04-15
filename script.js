function openNav() {
  document.body.style.overflow = "hidden";
  document.getElementById("sidenav").style.width = "100%";
  document.getElementById("overlay").classList.add('active');
}

function closeNav() {
  document.body.style.overflow = "";
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("overlay").classList.remove('active');
}