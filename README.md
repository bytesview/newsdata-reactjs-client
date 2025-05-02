<div align="center">
  <h1>NewsData.io React Client</h1>
  <p>A React hook-based wrapper for the <a href="https://newsdata.io/documentation">NewsData.io</a> API</p>
</div>

---

## 🚀 Overview

`newsdataapi` is a lightweight, dependency-free React Hook client for accessing the [NewsData.io API](https://newsdata.io/documentation). It supports all available endpoints and handles validation, pagination, and parameter safety out of the box.

---

## 📦 Installation

```bash
npm install newsdataapi
```

## 📦 Usage 

import useNewsDataApiClient from "newsdataapi";

const { latest, archive, crypto, sources } = useNewsDataApiClient("YOUR_API_KEY");

## 📦 Supported Endpoints

Each function accepts parameters as an object. All parameters are validated against <a href="https://newsdata.io/documentation">NewsData.io Documentation</a>

1. latest(params)

latest({ q: "ai", country: "us", language: "en" });

2. archive(params)

archive({
  q: "elections",
  from_date: "2023-01-01",
  to_date: "2023-03-01"
});

3. crypto(params)

crypto({ q: "bitcoin", coin: "btc"});

4. sources(params)

sources({ country: "us", language: "en" });

