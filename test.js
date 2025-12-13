const tomb = [
  { id: 1, nev: "A", cim: "Alma" },
  { id: 2, nev: "B", cim: "Banán" },
  { id: 1, nev: "A", cim: "Alma" },
  { id: 3, nev: "C", cim: "Cseresznye" },
  { id: 2, nev: "B", cim: "Banán" },
  { id: 1, nev: "A", cim: "Alma" },
];

const dict = {};

for (const elem of tomb) {
  const kulcs = elem.id;

  if (dict[kulcs]) {
    dict[kulcs].count++;
  } else {
    dict[kulcs] = {
      adat: elem,
      count: 1,
    };
  }
}

for (const id in dict) {
  console.log(
    `ID: ${id}, név: ${dict[id].adat.nev}, cím: ${dict[id].adat.cim}, előfordulás: ${dict[id].count}`
  );
}
