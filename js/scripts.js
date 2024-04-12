const Grafico = document.getElementById('grafico');

fetch(
    'http://localhost:4000/dati',
)
    .then(response => response.json())
    .then(dati => {
        const serie = dati[0]; // {x: [...], y: [...]}
        const serieX = serie.x; // [12, 15, 18, 21, 24, 27]
        const serieY = serie.y; // [10, 25, 15, 60, 70, 80]

        // punto al nodo con id 'tabella-dati'
        const tabella = document.getElementById('tabella-dati');
        const somma1Element = document.getElementById('somma1');
        const somma2Element = document.getElementById('somma2');
        const somma3Element = document.getElementById('somma3');

        const tempo = document.getElementById('tempo');
        const dato1 = document.getElementById('dato1');
        const dato2 = document.getElementById('dato2');
        const dato3 = document.getElementById('dato3');
        const btnAggiungi = document.getElementById('aggiungi');

        // funzione che gestisce l'aggiunta di valori alle serie
        const aggiungiValori = (event) => {

            // blocco l'esecuzione dell'evento di default
            event.preventDefault();

            // aggiungo alle serie Y (valori) il valore dei singoli campi di input
            dati[0].y.push(dato1.value)
            dati[1].y.push(dato2.value)
            dati[2].y.push(dato3.value)

            // aggiungo alle serie X (tempo) sempre lo stesso valore del campo tempo
            dati[0].x.push(tempo.value)
            dati[1].x.push(tempo.value)
            dati[2].x.push(tempo.value)

            // rilancio l'aggiornamento dell'interfaccia
            updateView();
        }

        // aggiungo un event listener che esegue la funzione aggiungiValori quando
        // si scatena l'evento di click
        btnAggiungi.addEventListener('click', aggiungiValori)
        // btnAggiungi.addEventListener('click', () => aggiungiValori())

        const updateView = () => {
            tabella.innerHTML = '';

            // @todo inizializzo le tre variabili
            let somma1 = 0;
            let somma2 = 0;
            let somma3 = 0;

            // loop per ogni elemento della serie
            serieX.forEach((valoreX, idx) => {
                // creo i nodi tr e 2 td
                const row = document.createElement('tr');
                const col1 = document.createElement('td');
                const col2 = document.createElement('td');

                // scrivo il contenuto delle due colonne
                col1.innerText = valoreX;
                col2.innerText = serieY[idx];

                // inserisco le colonne nella riga appena creata
                row.appendChild(col1);
                row.appendChild(col2);

                // row.addEventListener('click', function() {...})
                row.addEventListener('click', () => {
                    if(confirm('Vuoi cancellare la riga?')){
                        dati[0].x.splice(idx, 1);
                        dati[0].y.splice(idx, 1);
                        dati[1].x.splice(idx, 1);
                        dati[1].y.splice(idx, 1);
                        dati[2].x.splice(idx, 1);
                        dati[2].y.splice(idx, 1);
                        updateView();
                    }
                })

                // inserisco la riga appena creata nella tabella
                tabella.appendChild(row);

                // sommo i singoli valori delle singole serie nelle tre variabili
                // ad esempio alla prima serie sommo dati[0].y[idx]
                // ad esempio alla seconda serie sommo dati[1].y[idx]
                // ...

                somma1 += dati[0].y[idx];
                somma2 += dati[1].y[idx];
                somma3 += dati[2].y[idx];
            });

            // crea grafico con i dati ricevuti
            Plotly.newPlot(
                Grafico,
                dati,
                { margin: { t: 0 } },
                { responsive: true }
            );

            // aggiorno i valori delle 3 widget
            somma1Element.innerText = somma1;
            somma2Element.innerText = somma2;
            somma3Element.innerText = somma3;
        }

        updateView();
    });  