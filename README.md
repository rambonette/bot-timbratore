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
docker build -t --rm rambonette/bot-timbratore .
```

## 3 - Run

```sh
docker run -d --name bot-timbratore rambonette/bot-timbratore:latest
```

## 4 - Check logs

```sh
docker logs bot-timbratore
```
