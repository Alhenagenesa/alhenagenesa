// Funzione per aprire il menu di navigazione
function openNav() {
  document.body.style.overflow = "hidden";
  document.getElementById("sidenav").style.width = "100%";
  document.getElementById("overlay").classList.add('active');
}

// Funzione per chiudere il menu di navigazione
function closeNav() {
  document.body.style.overflow = "";
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("overlay").classList.remove('active');
}







function includeHTML() {
  const elements = document.querySelectorAll("[data-include-html]");
  elements.forEach(function(el) {
      const file = el.getAttribute("data-include-html");
      if (file) {
          // Fetch the HTML content
          fetch(file)
              .then(response => {
                  if (response.ok) {
                      return response.text();
                  } else {
                      throw new Error('Page not found');
                  }
              })
              .then(data => {
                  el.innerHTML = data; // Inject the content
              })
              .catch(error => {
                  console.error('Error loading HTML: ', error);
                  el.innerHTML = "Content not found.";
              });
      }
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  includeHTML();
});








// Funzione per ottenere il nome della pagina senza i primi 3 caratteri e senza l'estensione .html
function getNomePagina() {
  let path = window.location.pathname;
  let page = path.split("/").pop(); // Ottiene solo il nome del file
  let nomePagina = page.split(".")[0]; // Rimuove l'estensione .html
  
  // Rimuove le prime tre cifre (es: "123Basi" -> "Basi")
  return nomePagina.substring(3);
}

// Funzione per caricare il CSV e generare i prodotti
function caricaProdotti() {
  Papa.parse("prodotti.csv", {
      download: true,
      header: true,
      complete: function(results) {
          let prodotti = results.data;

          // Stampa tutti i dati CSV caricati (prima del filtro)
          console.log("Dati CSV prima del filtro:", prodotti);

          // Ottieni il nome della pagina corrente
          let nomePagina = getNomePagina();

          // Filtro: seleziona solo i prodotti dove la prima colonna (indice) corrisponde al nome della pagina
          prodotti = prodotti.filter(prodotto => {
              // La prima colonna dovrebbe contenere il nome del prodotto
              return prodotto.pagina === nomePagina;
          });

          // Stampa i dati CSV dopo il filtro
          console.log("Dati CSV dopo il filtro per la pagina:", prodotti);

          // Ordina i prodotti in base all'indice (se necessario)
          prodotti.sort((a, b) => parseInt(a.indice) - parseInt(b.indice));

          let contenitoreProdotti = document.getElementById("contenitore-prodotti");

          // Cicla attraverso i prodotti filtrati e crea l'HTML
          prodotti.forEach(prodotto => {
              if (prodotto.nome && prodotto.prezzo && prodotto.immagine) {
                  const imgBasePath = 'img/' + nomePagina + '/' + nomePagina + prodotto.immagine;

                  // Trova la prima immagine disponibile (.jpg o .jpeg) e poi genera il prodotto
                  trovaImmagine(imgBasePath, function(imgPath) {
                      if (imgPath) {
                          generaProdotto(prodotto, imgPath);
                      } else {
                          console.log('Nessuna immagine trovata per il prodotto: ' + prodotto.nome);
                      }
                  });
              }
          });
      }
  });
}

// Funzione per verificare se un'immagine esiste
function checkImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
}

// Funzione per generare il prodotto in HTML
function generaProdotto(prodotto, imgPath) {
  let contenitoreProdotti = document.getElementById("contenitore-prodotti");
  let prodottoHtml = `
      <div class="content-item">
          <img src="${imgPath}" alt="${prodotto.nome}">
          <div class="paragraph-container">
              <p class="left-paragraph">${prodotto.nome}</p>
              <p class="right-paragraph">€${prodotto.prezzo}</p>
          </div>
      </div>
  `;
  contenitoreProdotti.innerHTML += prodottoHtml;
}

// Funzione per trovare la prima immagine disponibile (.jpg o .jpeg)
function trovaImmagine(imgBasePath, callback) {
  checkImageExists(imgBasePath + '.jpg', function(existsJpg) {
      if (existsJpg) {
          callback(imgBasePath + '.jpg');
      } else {
          checkImageExists(imgBasePath + '.jpeg', function(existsJpeg) {
              if (existsJpeg) {
                  callback(imgBasePath + '.jpeg');
              } else {
                  callback(null); // Nessuna immagine trovata
              }
          });
      }
  });
}

// Avvia il caricamento dei prodotti
caricaProdotti();
