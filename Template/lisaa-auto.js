const lomake = document.getElementById("form");

function getValue(event) {
  event.preventDefault();

  // Haetaan id-kentän arvo ja muunnetaan se numeroksi
  const id = parseInt(lomake.querySelector('[name="id"]').value),
    merkki = lomake.querySelector('[name="merkki"]').value,
    malli = lomake.querySelector('[name="malli"]').value,
    vuosimalli = lomake.querySelector('[name="vuosimalli"]').value,
    omistaja = lomake.querySelector('[name="omistaja"]').value;

  const values = {
    id: id,
    merkki: merkki,
    malli: malli,
    vuosimalli: vuosimalli,
    omistaja: omistaja
  };
  
  fetch('/lisaa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(response => response.json())
  .then(data => {
    alert('Uusi rivi lisätty tiedostoon.');
  })
  .catch((error) => {
    console.error('Virhe:', error);
  });
}

lomake.addEventListener("submit", getValue);
