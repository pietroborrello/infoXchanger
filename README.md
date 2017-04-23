# Specifiche Progetto

Il progetto prevede lo sviluppo di una Web Application che riguarda lo scambio di informazioni personali attraverso l'uso di QRCode appositamente generati.

Ogni utente deve essere autenticato per poter condividere sue informazioni e per ricevere quelle di altri utenti. Nel suo profilo può inserire le informazioni personali e, selezionandone un sottoinsieme, chiedere al server di generare un QRCode che le riferisca. In particolare, questo QRCode contiene un token a cui il server stesso ha associato le informazioni di un particolare utente.

L'interfaccia dell'applicazione consente la scannerizzazione dei QRCode per l'accesso ai dati. Quando un QRCode viene scansionato e inviato, il server controlla che il token sia valido, esista, e recupera dalla base di dati le informazioni associate che saranno quindi sempre aggiornate. Le presenta poi in risposta sotto forma di pagina html, eventualmente esportabile come PDF per poter effettuare un salvataggio in locale.

Tra le informazioni figurano:
* Nome, Cognome, Residenza, Data e Luogo di nascita
* Numeri Di Telefono, Email, Sito Web, link a Profili Social
* Codice Fiscale, Numero di Carta d'Identità
* Numero di Patente, Codice e Compagnia Assicurativa, targa Automobile
* Altezza, Peso, Taglia, Gruppo Sanguigno

Inoltre ogni utente, oltre alla lista delle proprie informazioni, possiede la lista dei QRCode scansionati, con le rispettive informazioni, e la lista degli utenti che hanno richiesto le informazioni dell'utente stesso, attraverso QrCode da lui generati.
Il profilo di un utente conosciuto ne contiene i dati, divisi per categorie, e può essere condiviso ancora attraverso l'uso di un QRCode ad un utente terzo.

Tutte le informazioni personali, e tutti i token, sono salvati in una base di dati lato server. Il server mantiene una tabella a due colonne [token (che contiene l'informazione dell'utente a cui è riferito), utente_che_lo_ha_scansionato] e invia una notifica all’utente interessato ogni volta che un altro utente chiede la scansione di un token e la coppia non è nella tabella.

All’atto della registrazione è richiesto nome utente, password, email che deve essere valida, controllo effettuato inviando un codice di accesso. E' inoltre possibile registrarsi attraverso Facebook o servizi analoghi di autenticazione.
