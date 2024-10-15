import csv
import json

# Define the column mappings
column_mappings = {
    "friendlyName": "",
    "id": "#:",
    "types": ["Type"],  # Will split and lowercase later
    "hp": "HP",
    "attack": "ATK",
    "defence": "DEF",
    "specialAttack": "SPA",
    "specialDefence": "SPD",
    "speed": "SPE",
    "baseStatsTotal": "BST",
    "abilities": "ABILITIES",
    "hiddenAbility": "Hidden Ability",
    "evolutionMethod": " Evolution",
    "heldItems": "Held Item"
}

# Hardcoded CSV file path
csv_file_path = './seaglass.csv'
json_file_path = 'output.json'  # You can change this if needed

data = []

try:
    with open(csv_file_path, mode='r', newline='') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            friendly_name = row[column_mappings["friendlyName"]]
            # Create a new dictionary for the parsed data
            parsed_row = {
                "friendlyName": friendly_name,
                "pokeapiId": friendly_name.lower(),  # Convert to lowercase for pokeapiId
                "id": row[column_mappings["id"]],
                "types": [t.lower() for t in row[column_mappings["types"][0]].split('/')],
                "hp": row[column_mappings["hp"]],
                "attack": row[column_mappings["attack"]],
                "defence": row[column_mappings["defence"]],
                "specialAttack": row[column_mappings["specialAttack"]],
                "specialDefence": row[column_mappings["specialDefence"]],
                "speed": row[column_mappings["speed"]],
                "baseStatsTotal": row[column_mappings["baseStatsTotal"]],
                "abilities": [ability.strip() for ability in row[column_mappings["abilities"]].split(',')],
                "hiddenAbility": row[column_mappings["hiddenAbility"]],
                "evolutionMethod": row[column_mappings["evolutionMethod"]],
                "heldItems": row[column_mappings["heldItems"]] if row[column_mappings["heldItems"]] != '' else None
            }
            data.append(parsed_row)

    # Write to JSON file
    with open(json_file_path, mode='w') as json_file:
        json.dump(data, json_file, indent=2)

    print(f'JSON file has been saved as {json_file_path}')

except FileNotFoundError:
    print("Error: The specified CSV file was not found. Please check the path and try again.")
except Exception as e:
    print(f"An error occurred: {e}")
