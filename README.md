# IPL Strategy Analyzer

An advanced full-stack cricket analytics platform that analyzes IPL captain decision-making under pressure using real ball-by-ball IPL data from Cricsheet.

The platform detects high-pressure match situations, evaluates tactical captaincy responses, and visualizes strategic intelligence through an interactive analytics dashboard.

---

# Project Objective

The goal of this project is to answer:

> “What tactical decisions do IPL captains make under pressure, and do those decisions actually work?”

Using real IPL ball-by-ball datasets, the system automatically identifies pressure situations, analyzes captain responses, evaluates outcomes, and visualizes tactical patterns.

---

# Current Features

## Pressure Moment Detection

Automatically detects:

- Consecutive boundaries
- Powerplay wickets
- Death-over acceleration
- Batting collapses
- Tactical pressure shifts

---

## Captain Strategy Analysis

Analyzes:

- Bowling changes after pressure
- Aggressive vs defensive captaincy
- Spinner vs pacer usage
- Death-over tactical responses
- Strategic bowling patterns

---

## Tactical Outcome Evaluation

Evaluates whether captain decisions were successful based on:

- Runs conceded after decisions
- Wickets taken after tactical changes
- Pressure recovery effectiveness
- Tactical success rates

---

## Interactive Analytics Dashboard

Modern React-based sports analytics dashboard featuring:

- KPI metric cards
- Pressure analysis charts
- Tactical strategy distribution
- Captain comparison system
- Tactical timeline events
- Animated sports-style UI
- Glassmorphism dashboard design

---

# Captain Comparison System

Compare tactical intelligence between captains such as:

- MS Dhoni
- Rohit Sharma
- Virat Kohli
- Shreyas Iyer

Metrics include:

- Tactical success rate
- Aggression index
- Bowling strategy tendencies
- Pressure handling efficiency

---

# Tech Stack

## Backend

- Python
- Flask
- Pandas
- NumPy

## Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios
- Framer Motion

---

# Project Architecture

```text
Cricsheet IPL JSON Files
            ↓
data_loader.py
            ↓
master_matches.csv
            ↓
pressure_detector.py
            ↓
pressure_moments.csv
            ↓
decision_analyzer.py
            ↓
analyzed_decisions.csv
            ↓
outcome_evaluator.py
            ↓
final_outcomes.csv
            ↓
Flask REST API
            ↓
React Dashboard
```

---

# Data Source

Official IPL ball-by-ball data from:

https://cricsheet.org/

No web scraping is used.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/ipl-strategy-analyzer.git
```

# Folder Structure


```text
ipl-strategy-analyzer/
│
├── backend/
│   ├── app.py
│   ├── data_loader.py
│   ├── pressure_detector.py
│   ├── decision_analyzer.py
│   ├── outcome_evaluator.py
│   │
│   ├── processed/
│   ├── data/
│   └── utils/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── README.md
└── .gitignore
```
---

# Backend setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```
---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Core APIs

```text
/api/decisions
/api/success-metrics
/api/pressure-analysis
/api/strategy-analysis
/api/timeline
/api/captain-comparison
```

---

# Screenshots

Dashboard screenshots will be added soon.

---

# Project Status

## Current Status

- Backend analytics engine completed
- Flask REST API completed
- React analytics dashboard completed
- Captain comparison system implemented
- Tactical visualization system active

## In Progress

- Advanced captain intelligence
- Match simulation engine
- Tactical recommendation system
- Enhanced analytics visualizations

--- 

# Why This Project Matters

This project combines:

- Sports analytics
- Data engineering
- Tactical intelligence
- Full-stack web development
- Data visualization
- Event-driven analytics

It demonstrates how data science and software engineering can be used to analyze strategic decision-making in professional sports.

---

# License

This project is intended for educational purpose only.