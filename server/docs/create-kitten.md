# Create Kitten

## Create a kitten

```json
// request body
{
  "name": "Ghota2",
  "user": "2bbc2904-53a1-4573-9631-35ea4f556703",
  "gender": "male",
  "body": {
    "p2": 5,
    "p3": 0,
    "p4": 2,
    "p7": 3,
    "p1": 0,
    "p1a": 1,
    "p1b": 0,
    "p6": 0,
    "p8": 4,
    "p7b": 1,
    "p5": 1
  },
  "colors": {
    "col0": "#f8d198",
    "col0a": "#f8d198",
    "col0c": "#f8d198",
    "col1": "#df7e37",
    "col1a": "#df7e37",
    "col1b": "#df7e37",
    "col1c": "#df7e37",
    "col1d": "#df7e37",
    "col2": "#fae31f",
    "col2a": "#fff9ae",
    "col2b": "#d5eaff",
    "col3": "#bb1111",
    "col3b": "#b6e7a9",
    "col4": "#df7e37",
    "col4a": "#7a73c8",
    "col4b": "#fff2df"
  },
  "master": null
}
```

```json
// response body
{
  "brute": {
    "id": 87357,
    "name": "Ghota2",
    "deletedAt": null,
    "createdAt": "2024-01-10T18:44:24.807Z",
    "destinyPath": [],
    "previousDestinyPath": [],
    "level": 1,
    "xp": 0,
    "hp": 75,
    "enduranceStat": 4,
    "enduranceModifier": 1,
    "enduranceValue": 4,
    "strengthStat": 3,
    "strengthModifier": 1,
    "strengthValue": 3,
    "agilityStat": 2,
    "agilityModifier": 1,
    "agilityValue": 2,
    "speedStat": 2,
    "speedModifier": 1,
    "speedValue": 2,
    "ranking": 11,
    "gender": "male",
    "userId": "2bbc2904-53a1-4573-9631-35ea4f556703",
    "weapons": [],
    "skills": ["fistsOfFury"],
    "pets": [],
    "masterId": null,
    "pupilsCount": 0,
    "clanId": null,
    "registeredForTournament": false,
    "nextTournamentDate": null,
    "currentTournamentDate": null,
    "currentTournamentStepWatched": 0,
    "lastFight": null,
    "fightsLeft": 6,
    "victories": 0,
    "opponentsGeneratedAt": null,
    "canRankUpSince": null,
    "favorite": false,
    "wantToJoinClanId": null,
    "body": {
      "id": 87372,
      "bruteId": 87357,
      "p2": 5,
      "p3": 0,
      "p4": 2,
      "p7": 3,
      "p1": 0,
      "p1a": 1,
      "p1b": 0,
      "p6": 0,
      "p8": 4,
      "p7b": 1,
      "p5": 1
    },
    "colors": {
      "id": 87371,
      "bruteId": 87357,
      "col0": "#f8d198",
      "col0a": "#f8d198",
      "col0c": "#f8d198",
      "col1": "#df7e37",
      "col1a": "#df7e37",
      "col1b": "#df7e37",
      "col1c": "#df7e37",
      "col1d": "#df7e37",
      "col3": "#bb1111",
      "col2": "#fae31f",
      "col2b": "#d5eaff",
      "col3b": "#b6e7a9",
      "col2a": "#fff9ae",
      "col4": "#df7e37",
      "col4a": "#7a73c8",
      "col4b": "#fff2df"
    }
  },
  "goldLost": 0,
  "newLimit": 3
}
```

1. Get name
2. Check if name is no already taken
3. Generate random stats
4. Default stats is
   ```
   level: 1
   xp: 0
   hp: 0
   enduranceStat: 0
   enduranceModifier: 1
   enduranceValue: 0
   strengthStat: 0
   strengthModifier: 1
   strengthValue: 0
   agilityStat: 0
   agilityModifier: 1
   agilityValue: 0
   speedStat: 0
   speedModifier: 1
   speedValue: 0
   skills: []
   ```
5. Set default available points to 11
6. Define 1 random bonus and add to Kitten (Skill, Pets, Weapon)
7. Add between random(2, 5) endurance and remove it to available points
8. Add min(random(2,5), available points - 2\*2) strength and remove it to available points
9. Add min(random(2,5), available points - 2\*2) agility and remove it to available points
10. Add available points to speed
11. Define hp to floor(50 + max(endurance, 0) + level _ 0.25) _ 6)
12. Save Kitten
13. Save random bonus
14. Register kitten in DB
