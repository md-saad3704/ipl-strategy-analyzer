import pandas as pd
import os

# =========================================================
# IPL STRATEGY ANALYZER
# CAPTAIN ANALYZER
# =========================================================

INPUT_FILE = "processed/final_outcomes.csv"

OUTPUT_FILE = (
    "processed/captain_summary.csv"
)

# =========================================================
# CAPTAIN MAPPING
# =========================================================

# Temporary tactical mapping
# Later we will infer automatically
# from match metadata

CAPTAIN_MAPPING = {

    "Chennai Super Kings":
        "MS Dhoni",

    "Mumbai Indians":
        "Rohit Sharma",

    "Royal Challengers Bangalore":
        "Virat Kohli",

    "Kolkata Knight Riders":
        "Shreyas Iyer"
}


# =========================================================
# LOAD DATA
# =========================================================

def load_dataset():

    print("\nLoading tactical outcomes...\n")

    df = pd.read_csv(INPUT_FILE)

    return df


# =========================================================
# ASSIGN CAPTAINS
# =========================================================

def assign_captains(df):
    """
    Assign captains to rows.

    Since captain data is not directly
    available yet, we simulate mapping.
    """

    # Temporary team simulation
    teams = list(
        CAPTAIN_MAPPING.keys()
    )

    simulated_teams = []

    for i in range(len(df)):

        simulated_teams.append(
            teams[i % len(teams)]
        )

    df["team"] = simulated_teams

    df["captain"] = (
        df["team"]
        .map(CAPTAIN_MAPPING)
    )

    return df


# =========================================================
# GENERATE CAPTAIN METRICS
# =========================================================

def generate_captain_metrics(df):

    captain_rows = []

    captains = (
        df["captain"]
        .unique()
    )

    print("\nGenerating captain metrics...\n")

    for captain in captains:

        captain_df = df[
            df["captain"] == captain
        ]

        total_decisions = len(
            captain_df
        )

        successful = len(

            captain_df[
                captain_df[
                    "decision_success"
                ] == "Successful"
            ]
        )

        failed = len(

            captain_df[
                captain_df[
                    "decision_success"
                ] == "Failed"
            ]
        )

        success_rate = round(

            (
                successful /
                total_decisions
            ) * 100,

            2

        ) if total_decisions > 0 else 0

        avg_aggression = round(

            captain_df[
                "aggression_index"
            ].mean(),

            2
        )

        aggressive_count = len(

            captain_df[
                captain_df[
                    "strategic_decision"
                ] == (
                    "Aggressive Continuation"
                )
            ]
        )

        defensive_count = len(

            captain_df[
                captain_df[
                    "strategic_decision"
                ] == (
                    "Defensive Bowling Change"
                )
            ]
        )

        captain_rows.append({

            "captain": captain,

            "total_decisions":
                total_decisions,

            "successful_decisions":
                successful,

            "failed_decisions":
                failed,

            "success_rate":
                success_rate,

            "average_aggression":
                avg_aggression,

            "aggressive_decisions":
                aggressive_count,

            "defensive_decisions":
                defensive_count
        })

    captain_df = pd.DataFrame(
        captain_rows
    )

    return captain_df


# =========================================================
# SAVE RESULTS
# =========================================================

def save_results(df):

    os.makedirs(
        "processed",
        exist_ok=True
    )

    df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print("\nCaptain summary saved to:")
    print(OUTPUT_FILE)


# =========================================================
# MAIN
# =========================================================

def main():

    print("\n===================================")
    print(" CAPTAIN ANALYZER STARTED ")
    print("===================================\n")

    df = load_dataset()

    df = assign_captains(df)

    captain_df = (
        generate_captain_metrics(df)
    )

    print("\nCaptain analytics generated:")
    print(len(captain_df))

    print("\n===================================")
    print(captain_df)
    print("===================================\n")

    save_results(captain_df)

    print("\n===================================")
    print(" CAPTAIN ANALYZER COMPLETE ")
    print("===================================\n")


if __name__ == "__main__":
    main()