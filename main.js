const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());

app.use(express.static("Template"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/autot", (_req, res) => {
  res.sendFile(path.join(__dirname, "Template/auto.html"));
});

app.get("/lisaa-auto", (_req, res) => {
  res.sendFile(path.join(__dirname, "Template/lisaa-auto.html"));
});

// Lista autoista
app.get("/auto-lista", (_req, res) => {
  fs.readFile("autot.json", "utf8", function (err, data) {
    if (err) {
      console.log("tapahtui virhe");
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
});

// Hakee tietyn auton idllä
app.get("/auto-lista/:id", (req, res) => {
  const autonId = req.params.id;

  fs.readFile("autot.json", "utf8", (err, data) => {
    if (err) {
      console.error("Virhe luettaessa tiedostoa:", err);
      res.status(500).json({ error: "Tiedoston luku epäonnistui" });
      return;
    }

    const autot = JSON.parse(data);
    const auto = autot.find((a) => String(a.id) === autonId);

    if (auto) {
      res.json(auto);
    } else {
      res.status(404).json({ error: "Autoa ei löytynyt" });
    }
  });
});

app.post("/lisaa", (req, res) => {
  const values = req.body;

  // Luetaan nykyinen sisältö JSON-tiedostosta
  fs.readFile("autot.json", "utf8", (err, data) => {
    if (err) {
      console.error("Virhe luettaessa tiedostoa:", err);
      res.status(500).json({ error: "Tiedoston luku epäonnistui" });
      return;
    }

    let autot = [];
    if (data) {
      autot = JSON.parse([data]);
    }

    // Lisätään uusi rivi
    autot.push(values);

    // Tallennetaan päivitetty sisältö tiedostoon
    fs.writeFile("autot.json", JSON.stringify(autot), (err) => {
      if (err) {
        console.error("Virhe tallennettaessa tiedostoa:", err);
        res.status(500).json({ error: "Tiedoston tallennus epäonnistui" });
        return;
      }
      console.log("Uusi rivi lisätty tiedostoon.");
      res.json({ message: "Uusi rivi lisätty tiedostoon" });
    });
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
