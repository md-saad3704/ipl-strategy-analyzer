import pandas as pd
import os

# =========================================================
# IPL STRATEGY ANALYZER
# CAPTAIN ANALYZER
# =========================================================

INPUT_FILE = "processed/final_outcomes.csv"

OUTPUT_FILE = "processed/captain_summary.csv"

# =========================================================
# CAPTAIN MAPPING
# =========================================================

CAPTAIN_FILE = "data/ipl_captains.csv"


# =========================================================
# LOAD DATA
# =========================================================


def load_dataset():

    print("\nLoading tactical outcomes...\n")

    df = pd.read_csv(INPUT_FILE)

    return df


# =========================================================
# LOAD CAPTAIN DATA
# =========================================================


def load_captain_data():

    print("\nLoading IPL captain dataset...\n")

    captain_df = pd.read_csv(CAPTAIN_FILE)

    return captain_df


# =========================================================
# ASSIGN REAL CAPTAINS
# =========================================================


def assign_real_captains(df, captain_df):
    """
    Merge captain history
    with tactical match data.
    """

    print("\nAssigning real captains...\n")

    # Ensure season types match

    df["season"] = df["season"].astype(str)

    captain_df["season"] = captain_df["season"].astype(str)

    # Merge on:
    # season + batting team

    merged_df = pd.merge(
        df,
        captain_df,
        left_on=["season", "batting_team"],
        right_on=["season", "team"],
        how="left",
    )

    # Cleanup

    merged_df.drop(columns=["team"], inplace=True)

    # Remove unmatched captain rows

    merged_df = merged_df[merged_df["captain"].notna()]

    return merged_df


# =========================================================
# GENERATE CAPTAIN METRICS
# =========================================================


def generate_captain_metrics(df):

    captain_rows = []

    captains = df["captain"].unique()

    print("\nGenerating captain metrics...\n")

    for captain in captains:

        captain_df = df[df["captain"] == captain]

        total_decisions = len(captain_df)

        successful = len(captain_df[captain_df["decision_success"] == "Successful"])

        failed = len(captain_df[captain_df["decision_success"] == "Failed"])

        success_rate = (
            round((successful / total_decisions) * 100, 2) if total_decisions > 0 else 0
        )

        avg_aggression = round(captain_df["aggression_index"].mean(), 2)

        aggressive_count = len(
            captain_df[
                captain_df["strategic_decision"].str.contains("Aggressive", na=False)
            ]
        )

        defensive_count = len(
            captain_df[
                captain_df["strategic_decision"].str.contains("Defensive", na=False)
            ]
        )

        captain_rows.append(
            {
                "captain": captain,
                "total_decisions": total_decisions,
                "successful_decisions": successful,
                "failed_decisions": failed,
                "success_rate": success_rate,
                "average_aggression": avg_aggression,
                "aggressive_decisions": aggressive_count,
                "defensive_decisions": defensive_count,
            }
        )

    captain_df = pd.DataFrame(captain_rows)

    return captain_df


# =========================================================
# SAVE RESULTS
# =========================================================


def save_results(df):

    os.makedirs("processed", exist_ok=True)

    df.to_csv(OUTPUT_FILE, index=False)

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

    captain_lookup_df = load_captain_data()

    df = assign_real_captains(df, captain_lookup_df)

    captain_summary_df = generate_captain_metrics(df)

    captain_df = generate_captain_metrics(df)

    print("\nCaptain analytics generated:")
    print(len(captain_summary_df))

    print("\n===================================")
    print(captain_summary_df)
    print("===================================\n")

    save_results(captain_summary_df)

    print("\n===================================")
    print(" CAPTAIN ANALYZER COMPLETE ")
    print("===================================\n")


if __name__ == "__main__":
    main()
