# Bot Timbratore

Semplice bot timbratore in Node.js + Docker per la piattaforma infinity z\*cchetti.

## 0 - Download repo

```sh
git clone https://github.com/rambonette/bot-timbratore.git && cd bot-timbratore
```

## 1 - Setup `.env`

Copiare e compilare file `.env`

```sh
cp .env-example .env
```

I campi `HOUR` con numero pari rappresentano le uscite, viceversa i dispari le entrate. ex. `HOUR2="13:10"` => uscita alle ore 13:10.

Il campo `WEEK_DAYS` indica i giorni della settimana nei quali si vuole attivare la timbratura. Si utilizza la convenzione di CRON, quindi `1` rappresenta Lunedì, etc...

Il campo `TIMEZONE` serve ad indicare il fuso orario. Questo campo accetta i segenti formati di fusi:

- `IANA`: 'America/New_York'
- `UTC`: 'utc'
- `fixed offset`: 'UTC+7'

## 2 - Build immagine docker

```sh
docker build --rm -t rambonette/bot-timbratore .
```

## 3 - Run

```sh
docker run --rm -d --name bot-timbratore rambonette/bot-timbratore:latest
```

## 4 - Check logs

```sh
docker logs bot-timbratore
```

## 5 - Stop

```sh
docker stop bot-timbratore
```

## Contribute

Se trovi un bug puoi segnalarlo aprendo una [Issue](https://github.com/rambonette/bot-timbratore/issues "Apri Issues"). Descrivi gli step che hanno generato il problema e allega il messaggio di errore.

### Vuoi contribuire migliorie?

1. Esegui una [fork](https://github.com/rambonette/bot-timbratore/fork "Esegui fork") del progetto.

2. Stacca un branch dal branch `develop`:

```sh
git checkout -b la-mia-feature develop
```

3. Imposta il `remote`

```sh
git remote add upstream https://github.com/rambonette/bot-timbratore/tree/develop
```

4. Aggiungi la nuova feature ed effettua un push

5. Crea pull request sull'interfaccia di Github
