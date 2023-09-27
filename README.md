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

I campi `"HOUR"` con numero pari rappresentano le uscite, viceversa i dispari le entrate. ex. `"HOUR2"="13:10"` => uscita alle ore 13:10.

## 2 - Build immagine docker

```sh
docker build -t rambonette/bot-timbratore .
```

## 3 - Run

```sh
docker run -d rambonette/bot-timbratore:latest --name bot-timbratore
```

## 4 - Check logs

```sh
docker logs bot-timbratore
```
