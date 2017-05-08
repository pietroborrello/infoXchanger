<h1>Specifiche (2)</h1>

<p>
Il progetto prevede lo sviluppo di una Web Application che riguarda lo 
scambio di informazioni personali attraverso l'uso di un QRCode 
appositamente generato.<br><br>

Viene implementato un meccanismo di autenticazione degli utenti: 
per accedere ai servizi devono registrarsi tramite un nomeUtente, 
una mail e una password o tramite le credenziali di Facebook, come di 
un analogo servizio di autenticazione. La mail deve essere valida e 
viene verificate mediante l’invio di un codice necessario per completare 
la registrazione stessa.<br><br>

Ogni utente ha un suo profilo dove può inserire le informazioni personali 
e, selezionandone un sottoinsieme, chiedere al server di generare un 
QRCode che le riferisca. In particolare, questo QRCode contiene un token 
a cui il server stesso ha associato le informazioni di un particolare 
utente. <br><br>

L'interfaccia dell'applicazione consente la scannerizzazione dei QRCode 
per l'accesso ai dati. Quando un QRCode viene scansionato e inviato, il 
server controlla che il token esista, sia valido, e recupera in quel 
momento dalla base di dati le informazioni associate che saranno quindi 
sempre aggiornate. Le presenta poi in risposta al richiedente sotto 
forma di pagina html, eventualmente esportabile come PDF per poter 
effettuare un salvataggio in locale.<br><br>

<p>Tra le informazioni figurano:</p>
<ul>
<li>Nome, Cognome, Residenza, Data e Luogo di nascita</li>
<li>Numeri Di Telefono, Email, Sito Web, link a Profili Social</li>
<li>Codice Fiscale, Numero di Carta d'Identità</li>
<li>Numero di Patente, Codice e Compagnia Assicurativa, targa Automobile</li>
<li>Altezza, Peso, Taglia, Gruppo Sanguigno</li>
</ul>

E’ possibile inserire nuove informazioni o aggiornarle in qualsiasi momento.<br><br>

Inoltre ogni profilo presenta la lista dei QRCode che l’utente possiede, 
con le rispettive informazioni associate, e la lista degli utenti che 
hanno richiesto sue informazioni e possiedono QrCode da lui generati.<br><br>

I QRCode di un utente possono essere inoltrati a un utente terzo solo se ne 
è stata autorizzata la condivisione. <br><br>

Un QRCode può essere esportato in un formato compatibile ad esempio per 
essere inserito in una pagina web (del tipo "Contattaci") o in un 
qualsiasi altro form, in modo che non sia necessaria la presenza fisica 
dell'utente che lo voglia scansionare, per richiedere l'accesso ai dati. <br><br>

Tutte le informazioni sono salvate in una base di dati lato sever. 
Abbiamo la tabella ‘Utente’ che mantiene il codice univoco dell’utente 
e le informazioni che ha scritto nel suo profilo; la tabella ‘Token’ 
mantiene, invece, per ogni utente i token che ha condiviso. E’ presente 
una ulteriore tabella che ad ogni token associa l’utente che lo ha 
scansionato e il server si occupa di inviare una notifica all’utente 
proprietario dei dati quando qualcuno di nuovo richiede l’accesso a 
quelle informazioni.<br><br>

Gli utenti hanno la possibilità di dismettere dei QRCode che avevano 
generato chiedendo al server di cancellare il corrispettivo record dalla 
base di dati. Possono anche decidere di rimuoversi dal sistema; allora 
il server invaliderà tutti i QRCode da lui generati e ogni sua informazione 
personale non sarà più accessibile. <br><br>

Ad un utente non registrato l'applicazione non offre alcun servizio: 
presenta, invece, una HomePage con la spiegazione dei servizi offerti 
dal sito e una form per la registrazione. <br><br>

Per accedere ai servizi dell'applicazione un utente deve registrarsi 
inserendo almeno un'email, con cui può essere identificato. Non c'è 
necessità di altri dati per usare il servizio.
<br>
</p>

