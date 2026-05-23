import pandas as pd
import os

# =========================================================
# IPL STRATEGY ANALYZER
# PRESSURE DETECTOR
# =========================================================

INPUT_FILE = "processed/master_matches.csv"
OUTPUT_FILE = "processed/pressure_moments.csv"


def load_dataset():
    """
    Load processed master dataset.
    """

    print("\nLoading master dataset...\n")

    df = pd.read_csv(INPUT_FILE)

    return df


# =========================================================
# PRESSURE TYPE 1
# CONSECUTIVE BOUNDARIES
# =========================================================

def detect_consecutive_boundaries(df):
    """
    Detects 3 consecutive boundaries.
    """

    pressure_events = []

    grouped = df.groupby(["match_id", "innings"])

    for (match_id, innings), group in grouped:

        group = group.sort_values(
            by=["over", "ball"]
        ).reset_index(drop=True)

        consecutive_count = 0

        for i in range(len(group)):

            current_ball = group.iloc[i]

            if current_ball["is_boundary"] == 1:

                consecutive_count += 1

            else:

                consecutive_count = 0

            # Pressure trigger
            if consecutive_count >= 3:

                event = current_ball.to_dict()

                event["pressure_type"] = (
                    "Consecutive Boundaries"
                )

                event["runs"] = (
                    current_ball["total_runs"]
                )

                pressure_events.append(event)

    return pressure_events


# =========================================================
# PRESSURE TYPE 2
# POWERPLAY WICKETS
# =========================================================

def detect_powerplay_wickets(df):
    """
    Detect wickets in powerplay overs.
    """

    pressure_events = []

    wickets = df[
        (df["is_wicket"] == 1)
        &
        (df["over"] <= 5)
    ]

    for _, row in wickets.iterrows():

        event = row.to_dict()

        event["pressure_type"] = (
            "Powerplay Wicket"
        )

        event["runs"] = (
            row["total_runs"]
        )

        pressure_events.append(event)

    return pressure_events


# =========================================================
# PRESSURE TYPE 3
# DEATH OVER PRESSURE
# =========================================================

def detect_death_over_pressure(df):
    """
    Detect pressure in overs 17-20.
    """

    pressure_events = []

    death_overs = df[
        (df["over"] >= 16)
    ]

    grouped = death_overs.groupby(
        ["match_id", "innings"]
    )

    for (match_id, innings), group in grouped:

        total_runs = 0

        for _, row in group.iterrows():

            total_runs += row["total_runs"]

            # High scoring pressure
            if total_runs >= 15:

                event = row.to_dict()

                event["pressure_type"] = (
                    "Death Over Acceleration"
                )

                event["runs"] = total_runs

                pressure_events.append(event)

                # Reset counter
                total_runs = 0

    return pressure_events


# =========================================================
# PRESSURE TYPE 4
# QUICK COLLAPSE
# =========================================================

def detect_batting_collapse(df):
    """
    Detects 2 wickets in short span.
    """

    pressure_events = []

    grouped = df.groupby(
        ["match_id", "innings"]
    )

    for (match_id, innings), group in grouped:

        group = group.sort_values(
            by=["over", "ball"]
        ).reset_index(drop=True)

        wicket_indices = []

        for i in range(len(group)):

            row = group.iloc[i]

            if row["is_wicket"] == 1:

                wicket_indices.append(i)

        for i in range(1, len(wicket_indices)):

            prev_idx = wicket_indices[i - 1]
            current_idx = wicket_indices[i]

            # Collapse trigger
            if (current_idx - prev_idx) <= 12:

                wicket_row = group.iloc[current_idx]

                event = wicket_row.to_dict()

                event["pressure_type"] = (
                    "Batting Collapse"
)
                
                event["runs"] = (
                    wicket_row["total_runs"]
                )

                pressure_events.append(event)

    return pressure_events


# =========================================================
# SAVE RESULTS
# =========================================================

def save_pressure_events(events):

    pressure_df = pd.DataFrame(events)

    os.makedirs("processed", exist_ok=True)

    pressure_df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print(f"\nPressure moments saved to:")
    print(OUTPUT_FILE)


# =========================================================
# MAIN EXECUTION
# =========================================================

def main():

    print("\n===================================")
    print(" PRESSURE DETECTOR STARTED ")
    print("===================================\n")

    df = load_dataset()

    all_events = []

    # Consecutive boundaries
    print("Detecting consecutive boundaries...")
    all_events.extend(
        detect_consecutive_boundaries(df)
    )

    # Powerplay wickets
    print("Detecting powerplay wickets...")
    all_events.extend(
        detect_powerplay_wickets(df)
    )

    # Death over pressure
    print("Detecting death over pressure...")
    all_events.extend(
        detect_death_over_pressure(df)
    )

    # Batting collapse
    print("Detecting batting collapses...")
    all_events.extend(
        detect_batting_collapse(df)
    )

    print(f"\nTotal pressure moments found:")
    print(len(all_events))

    save_pressure_events(all_events)

    print("\n===================================")
    print(" PRESSURE DETECTION COMPLETED ")
    print("===================================\n")


if __name__ == "__main__":
    main()