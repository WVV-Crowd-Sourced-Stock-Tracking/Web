<div align="center">
  <img alt="Header" src="https://i.imgur.com/6MnFlEn.png" width="500px">
    <h1>Crowdsourced Stock Tracking</h1>
  <strong>A Hackathon Project of the German Government 2020 #WirVsVirus #HackAgainsTheVirus</strong>
</div>
<p align="center">
  <a href="https://github.com/WVV-Crowd-Sourced-Stock-Tracking/Web/stargazers">
    <img src="https://img.shields.io/github/stars/WVV-Crowd-Sourced-Stock-Tracking/Web.svg?style=plasticr" alt="stars">
  </a>
  <a href="https://github.com/WVV-Crowd-Sourced-Stock-Tracking/Web/commits/master">
    <img src="https://img.shields.io/github/last-commit/WVV-Crowd-Sourced-Stock-Tracking/Web.svg?style=plasticr" alt="commits">
  </a>
</p>

# Crowdsourced Stock Tracking

This project was initiated by the #WirVsVirus of the German Government in order to track ressources of individual supermarkets located nearby.

<embed width="420" height="315"
src="https://youtu.be/2uvcPGzixnA">

This web application is open source and built on top of [VueJS](https://vuejs.org/) which is triggering a cloud-based [backend](https://github.com/WVV-Crowd-Sourced-Stock-Tracking/Backend) via REST-Endpoints. The Design is made by the utility-first CSS framework [Tailwind](https://tailwindcss.com/).

# Development

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Lints and fixes files

```
npm run lint
```

## You cannot reach the backend? No Problem!

### Run the Mock Server

Open Up a new Terminal and run

```
node mock.js
```

That's all and go `http://localhost:3000/markets`
