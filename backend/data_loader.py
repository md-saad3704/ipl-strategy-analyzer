import os
import json
import pandas as pd

# =========================================================
# IPL STRATEGY ANALYZER
# DATA LOADER
# =========================================================

DATA_FOLDER = "data"
OUTPUT_FILE = "processed/master_matches.csv"


def parse_match(match_path):
    """
    Parse a single Cricsheet JSON file
    into ball-by-ball rows.
    """

    with open(match_path, "r", encoding="utf-8") as file:
        match_data = json.load(file)

    info = match_data.get("info", {})

    match_id = os.path.basename(match_path).replace(".json", "")

    venue = info.get("venue", "Unknown")
    city = info.get("city", "Unknown")

    dates = info.get("dates", [])
    match_date = dates[0] if dates else None

    teams = info.get("teams", [])

    innings_data = match_data.get("innings", [])

    rows = []

    # =====================================================
    # LOOP THROUGH INNINGS
    # =====================================================

    for innings_number, innings in enumerate(innings_data, start=1):

        batting_team = innings.get("team")

        overs = innings.get("overs", [])

        # =================================================
        # LOOP THROUGH OVERS
        # =================================================

        for over_data in overs:

            over_number = over_data.get("over")

            deliveries = over_data.get("deliveries", [])

            # =============================================
            # LOOP THROUGH BALLS
            # =============================================

            for ball_index, delivery in enumerate(deliveries, start=1):

                batter = delivery.get("batter")
                bowler = delivery.get("bowler")
                non_striker = delivery.get("non_striker")

                # Runs section
                runs = delivery.get("runs", {})

                batter_runs = runs.get("batter", 0)
                extras_runs = runs.get("extras", 0)
                total_runs = runs.get("total", 0)

                # Extras breakdown
                extras_data = delivery.get("extras", {})

                wides = extras_data.get("wides", 0)
                noballs = extras_data.get("noballs", 0)
                byes = extras_data.get("byes", 0)
                legbyes = extras_data.get("legbyes", 0)

                # Wicket handling
                wickets = delivery.get("wickets", [])

                wicket = 0
                wicket_type = None
                player_out = None

                if wickets:

                    wicket = 1

                    wicket_info = wickets[0]

                    wicket_type = wicket_info.get("kind")
                    player_out = wicket_info.get("player_out")

                # Ball ID
                ball_id = f"{over_number}.{ball_index}"

                # Match phase
                if over_number <= 5:
                    phase = "Powerplay"

                elif over_number <= 15:
                    phase = "Middle"

                else:
                    phase = "Death"

                # Boundary flag
                is_boundary = 1 if batter_runs in [4, 6] else 0

                row = {
                    "match_id": match_id,
                    "date": match_date,
                    "venue": venue,
                    "city": city,

                    "innings": innings_number,
                    "batting_team": batting_team,

                    "over": over_number,
                    "ball": ball_index,
                    "ball_id": ball_id,

                    "batter": batter,
                    "bowler": bowler,
                    "non_striker": non_striker,

                    "runs_off_bat": batter_runs,
                    "extras": extras_runs,
                    "total_runs": total_runs,

                    "wides": wides,
                    "noballs": noballs,
                    "byes": byes,
                    "legbyes": legbyes,

                    "is_boundary": is_boundary,

                    "is_wicket": wicket,
                    "wicket_type": wicket_type,
                    "player_dismissed": player_out,

                    "phase": phase
                }

                rows.append(row)

    return pd.DataFrame(rows)


def load_all_matches():
    """
    Load all IPL JSON files.
    """

    files = [
        file for file in os.listdir(DATA_FOLDER)
        if file.endswith(".json")
    ]

    print(f"\nFound {len(files)} JSON files\n")

    all_matches = []

    for file in files:

        file_path = os.path.join(DATA_FOLDER, file)

        try:

            df = parse_match(file_path)

            all_matches.append(df)

            print(f"Loaded: {file}")

        except Exception as e:

            print(f"Error loading {file}")
            print(e)

    master_df = pd.concat(all_matches, ignore_index=True)

    return master_df


def save_dataset(df):

    os.makedirs("processed", exist_ok=True)

    df.to_csv(OUTPUT_FILE, index=False)

    print(f"\nDataset saved to {OUTPUT_FILE}")


def main():

    print("\n===================================")
    print(" IPL STRATEGY ANALYZER ")
    print(" DATA LOADER STARTED ")
    print("===================================\n")

    df = load_all_matches()

    print("\nTotal Deliveries Loaded:", len(df))

    # Sort properly
    df = df.sort_values(
        by=["match_id", "innings", "over", "ball"]
    )

    save_dataset(df)

    print("\n===================================")
    print(" DATA LOADING COMPLETED ")
    print("===================================\n")


if __name__ == "__main__":
    main()