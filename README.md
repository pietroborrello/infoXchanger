#Specifiche Progetto
Il progetto prevede lo sviluppo di una Web Application che riguarda lo scambio di informazioni personali, attraverso l'uso di QRCode.
Ogni utente deve essere autenticato e possiede un insieme di dati personali tra cui:
* Nome, Cognome, Residenza, Data e Luogo di nascita 
* Numeri Di Telefono, Email, Sito Web, link a Profili Social 
* Codice Fiscale, Numero di Carta d'Identità
* Numero di Patente, Codice e Compagnia Assicurativa, targa Automobile
* Posizione in tempo reale
* Altezza, Peso, Taglia, Gruppo Sanguigno

L'utente può generare un QRCode che autorizzi l'accesso ad un sottoinsieme dei propri dati personali, selezionando quali voglia condividere. Il QRCode contiene un codice, che rappresenta un token, da presentare al server che ne verifica la validità e risponde presentando i dati richiesti. Il QRCode garantisce, nel tempo, l'accesso ai dati dinamicamente, non solo al contenuto nel momento in cui viene richiesto. Perciò se i dati dovessero venire aggiornati dall'utente di origine, l'utente destinatario avrebbe comunque accesso al contenuto aggiornato.
L'interfaccia dell'applicazione consente la scannerizzazione dei QRCode per l'accesso ai dati. Il codice ottenuto dal QRCode viene poi inviato al Server per la richiesta di accesso.
L'applicazione presenta all'utente una lista degli altri utenti per cui ha accesso ai dati, consentendone la visualizzazione, ed il salvataggio in locale.
Il profilo di un utente conosciuto ne contiene i dati, divisi per categorie, e può essere condiviso ancora attraverso l'uso di un QRCode ad un utente terzo, fatta eccezione per la posizione in tempo reale. Tale posizione, se accessibile, è visualizzata su di una mappa, quando richiesta. 


