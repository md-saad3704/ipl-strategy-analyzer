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

CAPTAIN_FILE = "processed/captain_summary.csv"

PRESSURE_FILE = "processed/pressure_moments.csv"

try:

    df = pd.read_csv(DATA_FILE)

    captain_df = pd.read_csv(CAPTAIN_FILE)

    pressure_df = pd.read_csv(PRESSURE_FILE)

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

    return jsonify(
        {
            "project": "IPL Strategy Analyzer",
            "status": "API Running",
            "total_records": len(df),
        }
    )


# =========================================================
# ALL DECISIONS
# =========================================================


@app.route("/api/decisions")
def get_all_decisions():

    data = df.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# SUCCESS METRICS
# =========================================================


@app.route("/api/success-metrics")
def success_metrics():

    total = len(df)

    successful = len(df[df["decision_success"] == "Successful"])

    failed = len(df[df["decision_success"] == "Failed"])

    success_rate = round((successful / total) * 100, 2) if total > 0 else 0

    avg_aggression = round(df["aggression_index"].mean(), 2)

    return jsonify(
        {
            "total_decisions": total,
            "successful_decisions": successful,
            "failed_decisions": failed,
            "success_rate": success_rate,
            "average_aggression": avg_aggression,
        }
    )


# =========================================================
# PRESSURE TYPE ANALYTICS
# =========================================================


@app.route("/api/pressure-analysis")
def pressure_analysis():

    grouped = df.groupby("pressure_type").size().reset_index(name="count")

    data = grouped.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# PHASE ANALYTICS
# =========================================================


@app.route("/api/phase-analysis")
def phase_analysis():

    grouped = df.groupby("phase").size().reset_index(name="count")

    data = grouped.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# STRATEGIC DECISION ANALYTICS
# =========================================================


@app.route("/api/strategy-analysis")
def strategy_analysis():

    grouped = df.groupby("strategic_decision").size().reset_index(name="count")

    data = grouped.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# AGGRESSION ANALYTICS
# =========================================================


# =========================================================
# SUCCESS RATE BY STRATEGY
# =========================================================


@app.route("/api/strategy-success")
def strategy_success():

    grouped = (
        df.groupby(["strategic_decision", "decision_success"])
        .size()
        .reset_index(name="count")
    )

    data = grouped.to_dict(orient="records")

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
            "decision_success",
        ]
    ]

    data = timeline.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# ALL CAPTAINS
# =========================================================


@app.route("/api/captains")
def get_captains():

    data = captain_df.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# CAPTAIN COMPARISON
# =========================================================


@app.route("/api/captain-comparison")
def captain_comparison():

    comparison = captain_df[
        ["captain", "success_rate", "average_aggression", "total_decisions"]
    ]

    comparison = comparison.rename(
        columns={"average_aggression": "aggression", "total_decisions": "decisions"}
    )

    data = comparison.to_dict(orient="records")

    return jsonify(data)


# =========================================================
# SINGLE CAPTAIN PROFILE
# =========================================================


@app.route("/api/captain/<name>")
def captain_profile(name):

    captain = captain_df[captain_df["captain"] == name]

    if captain.empty:

        return jsonify({"error": "Captain not found"}), 404

    data = captain.to_dict(orient="records")[0]

    return jsonify(data)


# =========================================================
# EXECUTIVE SUMMARY
# =========================================================


@app.route("/api/executive-summary")
def executive_summary():

    valid_captains = captain_df[captain_df["captain"].notna()]

    # Most Successful Captain

    most_successful = valid_captains.sort_values(
        by="success_rate", ascending=False
    ).iloc[0]

    # Best Pressure Handler

    best_handler = valid_captains.sort_values(
        by="successful_decisions", ascending=False
    ).iloc[0]

    # Most Pressure Situations

    pressure_leader = valid_captains.sort_values(
        by="total_decisions", ascending=False
    ).iloc[0]

    # Total Pressure Events

    total_pressure_events = len(pressure_df)

    # Most Common Pressure Event

    common_pressure = (
    pressure_df["pressure_type"]
    .value_counts()
    .reset_index(name="count")
)

    common_pressure.columns = [
        "pressure_type",
        "count"
]

    most_common_event = common_pressure.iloc[0]

    return jsonify(
        {
            "most_successful_captain": {
                "captain": most_successful["captain"],
                "success_rate": round(most_successful["success_rate"], 2),
            },
            "best_pressure_handler": {
                "captain": best_handler["captain"],
                "successful_responses": int(best_handler["successful_decisions"]),
            },
            "most_pressure_situations": {
                "captain": pressure_leader["captain"],
                "total_responses": int(pressure_leader["total_decisions"]),
            },
            "total_pressure_events": int(total_pressure_events),
            "most_common_pressure_event": {
                "type": most_common_event["pressure_type"],
                "count": int(most_common_event["count"]),
            },
        }
    )


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    print("\n===================================")
    print(" IPL STRATEGY ANALYZER API ")
    print(" SERVER STARTED ")
    print("===================================\n")

    app.run(debug=True, host="0.0.0.0", port=5000)
