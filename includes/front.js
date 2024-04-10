async function haeAuto() {
  const Id = document.getElementById("Id").value;
  const response = await fetch(`/autot/${Id}`);
  const data = await response.json();
  document.getElementById("Tulos").innerHTML = JSON.stringify(data);
}

async function haeKaikkiAutot() {
  const response = await fetch("/autot");
  const data = await response.json();
  document.getElementById("Tulos").innerHTML = JSON.stringify(data);
}

const lomake = document.getElementById("form");

function lisääAuto(e) {
  e.preventDefault();
  const id = parseInt(lomake.querySelector('[name="id"]').value),
    merkki = lomake.querySelector('[name="merkki"]').value,
    malli = lomake.querySelector('[name="malli"]').value,
    vuosimalli = lomake.querySelector('[name="vuosimalli"]').value,
    omistaja = lomake.querySelector('[name="omistaja"]').value;

  const uusiAuto = {
    id: id,
    merkki: merkki,
    malli: malli,
    vuosimalli: vuosimalli,
    omistaja: omistaja,
  }

  fetch("/autot/uusi", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uusiAuto),
  })
  .then(response => response.json())
  .then(data => {
    alert('Uusi rivi lisätty tiedostoon.');
  })
  .catch((error) => {
    console.error('Virhe:', error);
  });
}
lomake.addEventListener("submit", lisääAuto);
document.getElementById("Tulos").innerHTML = JSON.stringify(uusiAuto);
  
  
// const message = await response.text();  
// alert(message);

