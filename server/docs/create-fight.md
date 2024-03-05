# Create Fight

## Create a fight

```json
// request body
{
  "kitten1": "Ghota2",
  "kitten2": "Ghota3"
}
```

```json
// response body
{
  "id": 87357
}
```

1. Get name
2. Check if kitten1 and kitten2 exists
3. increment fight left for kitten1
4. init fight object
5. Check if kitten1 is not kitten2
6. Generate fight data
   1. continue fight if no looser
   2. select order fighers (random if equal)
   3.
   4.
7. Save fight
8. Calculate XP
   ```
   Get XP gained (0 for non arena fights)
   (+2 for a win against a brute at least 2 level below you)
   (+1 for a win against a brute at least 10 level below you)
   (+0 otherwise)
   ```
9. Save xp and increase victories to kitten1
10. Create and save a log for winner and for looser
