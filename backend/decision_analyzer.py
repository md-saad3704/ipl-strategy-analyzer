import pandas as pd
import os

# =========================================================
# IPL STRATEGY ANALYZER
# DECISION ANALYZER
# =========================================================

MATCHES_FILE = "processed/master_matches.csv"
PRESSURE_FILE = "processed/pressure_moments.csv"

OUTPUT_FILE = "processed/analyzed_decisions.csv"


# =========================================================
# LOAD DATA
# =========================================================

def load_data():

    print("\nLoading datasets...\n")

    matches_df = pd.read_csv(MATCHES_FILE)

    pressure_df = pd.read_csv(PRESSURE_FILE)

    return matches_df, pressure_df


# =========================================================
# DETECT BOWLING CHANGE
# =========================================================

def detect_bowling_change(
    match_df,
    match_id,
    innings,
    over,
    ball
):
    """
    Detect whether captain changed bowler
    after pressure moment.
    """

    current_ball = match_df[
        (match_df["match_id"] == match_id)
        &
        (match_df["innings"] == innings)
        &
        (match_df["over"] == over)
        &
        (match_df["ball"] == ball)
    ]

    if current_ball.empty:
        return "Unknown"

    current_ball = current_ball.iloc[0]

    current_bowler = current_ball["bowler"]

    # Next over
    next_over = over + 1

    next_over_data = match_df[
        (match_df["match_id"] == match_id)
        &
        (match_df["innings"] == innings)
        &
        (match_df["over"] == next_over)
    ]

    if next_over_data.empty:
        return "No Next Over"

    next_bowler = next_over_data.iloc[0]["bowler"]

    if current_bowler != next_bowler:
        return "Bowling Change"

    return "Bowler Continued"


# =========================================================
# DETECT BOWLER TYPE
# =========================================================

def classify_bowler(bowler_name):
    """
    Very basic bowler classification.
    Later we can improve using real player data.
    """

    spinners = [
        "R Ashwin",
        "Harbhajan Singh",
        "Ravindra Jadeja",
        "Sunil Narine",
        "Yuzvendra Chahal",
        "Kuldeep Yadav",
        "Piyush Chawla",
        "M Kartik",
        "SB Joshi"
    ]

    if bowler_name in spinners:
        return "Spinner"

    return "Pacer"


# =========================================================
# ANALYZE CAPTAIN DECISION
# =========================================================

def analyze_decisions(matches_df, pressure_df):

    analyzed_rows = []

    print("\nAnalyzing captain decisions...\n")

    for _, pressure in pressure_df.iterrows():

        match_id = pressure["match_id"]
        innings = pressure["innings"]

        over = pressure["over"]
        ball = pressure["ball"]

        bowler = pressure["bowler"]

        pressure_type = pressure["pressure_type"]

        # =============================================
        # Bowling change detection
        # =============================================

        bowling_decision = detect_bowling_change(
            matches_df,
            match_id,
            innings,
            over,
            ball
        )

        # =============================================
        # Bowler type
        # =============================================

        bowler_type = classify_bowler(
            bowler
        )

        # =============================================
        # Match phase
        # =============================================

        if over <= 5:
            phase = "Powerplay"

        elif over <= 15:
            phase = "Middle"

        else:
            phase = "Death"

        # =============================================
        # Strategic decision inference
        # =============================================

        strategic_decision = ""

        # Spinner in powerplay
        if phase == "Powerplay" and bowler_type == "Spinner":

            strategic_decision = (
                "Used Spinner in Powerplay"
            )

        # Death over specialist
        elif phase == "Death":

            strategic_decision = (
                "Death Over Bowling Strategy"
            )

        # Bowling change after boundaries
        elif (
            pressure_type == "Consecutive Boundaries"
            and bowling_decision == "Bowling Change"
        ):

            strategic_decision = (
                "Defensive Bowling Change"
            )

        # Continue aggressive attack
        elif (
            pressure_type == "Consecutive Boundaries"
            and bowling_decision == "Bowler Continued"
        ):

            strategic_decision = (
                "Aggressive Continuation"
            )

        else:

            strategic_decision = (
                "Standard Tactical Decision"
            )

        # =============================================
        # Store result
        # =============================================

        decision_row = pressure.to_dict()

        decision_row["bowler_type"] = (
            bowler_type
        )

        decision_row["decision"] = (
            bowling_decision
        )

        decision_row["strategic_decision"] = (
            strategic_decision
        )

        decision_row["phase"] = phase

        analyzed_rows.append(
            decision_row
        )

    analyzed_df = pd.DataFrame(
        analyzed_rows
    )

    return analyzed_df


# =========================================================
# SAVE RESULTS
# =========================================================

def save_results(df):

    os.makedirs("processed", exist_ok=True)

    df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print(f"\nDecision analysis saved to:")
    print(OUTPUT_FILE)


# =========================================================
# MAIN EXECUTION
# =========================================================

def main():

    print("\n===================================")
    print(" DECISION ANALYZER STARTED ")
    print("===================================\n")

    matches_df, pressure_df = load_data()

    analyzed_df = analyze_decisions(
        matches_df,
        pressure_df
    )

    print("\nTotal decisions analyzed:")
    print(len(analyzed_df))

    save_results(analyzed_df)

    print("\n===================================")
    print(" DECISION ANALYSIS COMPLETE ")
    print("===================================\n")


if __name__ == "__main__":
    main()