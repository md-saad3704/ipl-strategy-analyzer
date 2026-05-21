import pandas as pd
import os

# =========================================================
# IPL STRATEGY ANALYZER
# OUTCOME EVALUATOR
# =========================================================

MATCHES_FILE = "processed/master_matches.csv"
DECISIONS_FILE = "processed/analyzed_decisions.csv"

OUTPUT_FILE = "processed/final_outcomes.csv"


# =========================================================
# LOAD DATA
# =========================================================

def load_data():
    """
    Load datasets required for evaluation.
    """

    print("\nLoading datasets...\n")

    matches_df = pd.read_csv(MATCHES_FILE)

    decisions_df = pd.read_csv(DECISIONS_FILE)

    return matches_df, decisions_df


# =========================================================
# GET NEXT OVER DATA
# =========================================================

def get_next_over_data(
    match_df,
    match_id,
    innings,
    current_over
):
    """
    Fetch next over deliveries after
    a tactical decision.
    """

    next_over = current_over + 1

    next_over_df = match_df[
        (match_df["match_id"] == match_id)
        &
        (match_df["innings"] == innings)
        &
        (match_df["over"] == next_over)
    ]

    return next_over_df


# =========================================================
# EVALUATE DECISION SUCCESS
# =========================================================

def evaluate_decision(
    next_over_df
):
    """
    Evaluate whether the captain's
    tactical response succeeded.

    Success Conditions:
    - Conceded <= 6 runs
    OR
    - Took wicket
    """

    if next_over_df.empty:

        return {
            "runs_conceded": None,
            "wickets_taken": 0,
            "success": "Unknown"
        }

    runs_conceded = (
        next_over_df["total_runs"]
        .sum()
    )

    wickets_taken = (
        next_over_df["is_wicket"]
        .sum()
    )

    # Tactical success logic
    if (
        runs_conceded <= 6
        or wickets_taken >= 1
    ):

        success = "Successful"

    else:

        success = "Failed"

    return {
        "runs_conceded": runs_conceded,
        "wickets_taken": wickets_taken,
        "success": success
    }


# =========================================================
# AGGRESSION INDEX
# =========================================================

def calculate_aggression_index(
    strategic_decision
):
    """
    Assign aggression score based
    on tactical behavior.
    """

    aggressive_actions = [
        "Aggressive Continuation",
        "Used Spinner in Powerplay"
    ]

    defensive_actions = [
        "Defensive Bowling Change"
    ]

    if strategic_decision in aggressive_actions:

        return 8

    elif strategic_decision in defensive_actions:

        return 4

    return 6


# =========================================================
# PROCESS ALL DECISIONS
# =========================================================

def process_outcomes(
    matches_df,
    decisions_df
):
    """
    Evaluate all captain decisions.
    """

    final_rows = []

    print("\nEvaluating tactical outcomes...\n")

    for _, decision in decisions_df.iterrows():

        match_id = decision["match_id"]

        innings = decision["innings"]

        over = decision["over"]

        strategic_decision = (
            decision["strategic_decision"]
        )

        # =============================================
        # Fetch next over
        # =============================================

        next_over_df = get_next_over_data(
            matches_df,
            match_id,
            innings,
            over
        )

        # =============================================
        # Evaluate result
        # =============================================

        outcome = evaluate_decision(
            next_over_df
        )

        # =============================================
        # Aggression index
        # =============================================

        aggression_index = (
            calculate_aggression_index(
                strategic_decision
            )
        )

        # =============================================
        # Store final result
        # =============================================

        final_rows.append({

            "match_id": match_id,

            "innings": innings,

            "over": over,
            "ball": decision["ball"],

            "pressure_type":
                decision["pressure_type"],

            "bowler":
                decision["bowler"],

            "decision":
                decision["decision"],

            "strategic_decision":
                strategic_decision,

            "phase":
                decision["phase"],

            "runs_conceded_next_over":
                outcome["runs_conceded"],

            "wickets_next_over":
                outcome["wickets_taken"],

            "decision_success":
                outcome["success"],

            "aggression_index":
                aggression_index
        })

    final_df = pd.DataFrame(
        final_rows
    )

    return final_df


# =========================================================
# GENERATE SUMMARY METRICS
# =========================================================

def generate_summary(final_df):
    """
    Print high-level tactical analytics.
    """

    print("\n===================================")
    print(" TACTICAL PERFORMANCE SUMMARY ")
    print("===================================\n")

    total = len(final_df)

    successful = len(
        final_df[
            final_df["decision_success"]
            == "Successful"
        ]
    )

    failed = len(
        final_df[
            final_df["decision_success"]
            == "Failed"
        ]
    )

    success_rate = (
        (successful / total) * 100
        if total > 0 else 0
    )

    avg_aggression = round(
        final_df["aggression_index"]
        .mean(),
        2
    )

    print(f"Total Decisions Evaluated: {total}")

    print(f"Successful Decisions: {successful}")

    print(f"Failed Decisions: {failed}")

    print(
        f"Success Rate: {success_rate:.2f}%"
    )

    print(
        f"Average Aggression Index: "
        f"{avg_aggression}"
    )


# =========================================================
# SAVE RESULTS
# =========================================================

def save_results(df):

    os.makedirs("processed", exist_ok=True)

    df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print(f"\nFinal outcomes saved to:")
    print(OUTPUT_FILE)


# =========================================================
# MAIN EXECUTION
# =========================================================

def main():

    print("\n===================================")
    print(" OUTCOME EVALUATOR STARTED ")
    print("===================================\n")

    matches_df, decisions_df = load_data()

    final_df = process_outcomes(
        matches_df,
        decisions_df
    )

    print("\nTotal outcomes evaluated:")
    print(len(final_df))

    save_results(final_df)

    generate_summary(final_df)

    print("\n===================================")
    print(" OUTCOME EVALUATION COMPLETE ")
    print("===================================\n")


if __name__ == "__main__":
    main()