# Mobileria Luli

React (CRA + SASS) në frontend, Express + MongoDB në backend.

## Nisja

Duhet MongoDB i ndezur në `localhost:27017`.

### Backend

```bash
cd backend
npm install
cp .env.example .env      # pastaj vendos nje JWT_SECRET te vertete
npm start                 # http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm start                 # http://localhost:3000
```

Nëse backend-i nuk është në `localhost:4000`, vendos `REACT_APP_API_URL` në `frontend/.env`.

## Rolet

Çdo llogari e re regjistrohet me rolin `user`. Vetëm një `admin` mund të shtojë produkte —
kufizimi zbatohet në backend te `middleware/requireAdmin.js`, jo vetëm në ndërfaqe.

Për ta bërë dikë admin, regjistroje si zakonisht dhe pastaj:

```bash
cd backend
npm run admin -- perdoruesi@shembull.com
```

Pas kësaj, kur ai përdorues kyçet, i shfaqet linku "Shto Produkt" dhe ruta `/shto`.

## Struktura e stileve

```
frontend/src/styles/
  _variables.scss   ngjyrat, hapesirat, breakpoint-et
  _mixins.scss      shell(), button(), respond-below()
  _base.scss        reset dhe layout-i i faqes
  _header.scss  _footer.scss  _ballina.scss  _forms.scss
  main.scss         i bashkon te gjitha me @use
```
