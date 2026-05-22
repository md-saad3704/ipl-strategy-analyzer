from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

# =========================================================
# IPL STRATEGY ANALYZER
# FLASK API SERVER
# =========================================================

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)

# =========================================================
# LOAD DATASET
# =========================================================

DATA_FILE = "processed/final_outcomes.csv"

try:

    df = pd.read_csv(DATA_FILE)

    print("\n===================================")
    print(" FINAL OUTCOMES DATA LOADED ")
    print("===================================\n")

except Exception as e:

    print("\nERROR LOADING DATASET")
    print(e)

    df = pd.DataFrame()


# =========================================================
# HOME ROUTE
# =========================================================

@app.route("/")
def home():

    return jsonify({

        "project": "IPL Strategy Analyzer",

        "status": "API Running",

        "total_records": len(df)
    })


# =========================================================
# ALL DECISIONS
# =========================================================

@app.route("/api/decisions")
def get_all_decisions():

    data = df.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# SUCCESS METRICS
# =========================================================

@app.route("/api/success-metrics")
def success_metrics():

    total = len(df)

    successful = len(
        df[
            df["decision_success"]
            == "Successful"
        ]
    )

    failed = len(
        df[
            df["decision_success"]
            == "Failed"
        ]
    )

    success_rate = round(
        (successful / total) * 100,
        2
    ) if total > 0 else 0

    avg_aggression = round(
        df["aggression_index"].mean(),
        2
    )

    return jsonify({

        "total_decisions": total,

        "successful_decisions":
            successful,

        "failed_decisions":
            failed,

        "success_rate":
            success_rate,

        "average_aggression":
            avg_aggression
    })


# =========================================================
# PRESSURE TYPE ANALYTICS
# =========================================================

@app.route("/api/pressure-analysis")
def pressure_analysis():

    grouped = (
        df.groupby("pressure_type")
        .size()
        .reset_index(name="count")
    )

    data = grouped.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# PHASE ANALYTICS
# =========================================================

@app.route("/api/phase-analysis")
def phase_analysis():

    grouped = (
        df.groupby("phase")
        .size()
        .reset_index(name="count")
    )

    data = grouped.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# STRATEGIC DECISION ANALYTICS
# =========================================================

@app.route("/api/strategy-analysis")
def strategy_analysis():

    grouped = (
        df.groupby(
            "strategic_decision"
        )
        .size()
        .reset_index(name="count")
    )

    data = grouped.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# AGGRESSION ANALYTICS
# =========================================================

@app.route("/api/aggression-analysis")
def aggression_analysis():

    grouped = (
        df.groupby(
            "strategic_decision"
        )["aggression_index"]
        .mean()
        .reset_index()
    )

    grouped["aggression_index"] = (
        grouped["aggression_index"]
        .round(2)
    )

    data = grouped.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# SUCCESS RATE BY STRATEGY
# =========================================================

@app.route("/api/strategy-success")
def strategy_success():

    grouped = (
        df.groupby(
            [
                "strategic_decision",
                "decision_success"
            ]
        )
        .size()
        .reset_index(name="count")
    )

    data = grouped.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# TIMELINE DATA
# =========================================================

@app.route("/api/timeline")
def timeline_data():

    timeline = df[
        [
            "match_id",
            "innings",
            "over",
            "ball",
            "pressure_type",
            "strategic_decision",
            "decision_success"
        ]
    ]

    data = timeline.to_dict(
        orient="records"
    )

    return jsonify(data)


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    print("\n===================================")
    print(" IPL STRATEGY ANALYZER API ")
    print(" SERVER STARTED ")
    print("===================================\n")

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )