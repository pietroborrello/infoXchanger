<h1>Specifiche (2)<h1>

<p>
Il progetto prevede lo sviluppo di una Web Application che riguarda lo 
scambio di informazioni personali attraverso l'uso di un QRCode 
appositamente generato.<br><br>

Ogni utente deve essere autenticato per poter condividere sue informazioni 
e per ricevere quelle di altri utenti. Nel suo profilo può inserire le 
informazioni personali e, selezionandone un sottoinsieme, chiedere al 
server di generare un QRCode che le contenga; in particolare, questo 
QRCode contiene un token a cui il server stesso ha associato le 
informazioni di un particolare utente. <br><br>

Quando un QRCode viene scansionato, il server controlla che il token sia 
valido, esista, recupera dalla basi di dati le informazioni associate 
che saranno quindi sempre aggiornate e le presenta in risposta sotto 
forma di pagina html, eventualmente stampabile come PDF per poter 
effettuare un salvataggio in locale.<br><br>

Per quanto riguarda il profilo utente: contiene la lista delle proprie 
informazioni, la lista dei QRCode con i rispettivi utenti da cui li ha 
ricevuti e una lista per memorizzare i token che lui stesso ha condiviso 
e con chi. <br><br>

Tutte le informazioni personali, tutti i token, sono salvati in una base 
di dati lato server; il server potrebbe mantenere per ogni utente una 
tabella a due colonne (token,utente_che_lo_ha_scansionato) e inviare una 
notifica all’interessato ogni volta che un utente chiede la scansione di 
un token e la coppia non è nella tabella.<br><br>

Ogni utente, ogni dato hanno associato un codice univoco: il token è la 
composizione dei codici oppure ha una struttura fissa con codice utente 
seguito da sequenza di bit dove ognuno è associato a un dato ed è 1 se è 
condiviso, 0 altrimenti.<br><br>

All’atto della registrazione è richiesto nome utente, password, email 
che deve essere valida, controllo effettuato inviando un codice di accesso.
<br>
</p>

