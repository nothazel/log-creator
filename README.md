## Usage

1. Run the script using Node.js:
   ```bash
   node .
   ```

2. Follow the instructions when prompted. Press `Ctrl + C` to exit.

## Update Categories

- `+`: Added a new feature or content.
- `-`: Removed a feature or content.
- `*`: Modified or changed existing feature or content.
- `!`: Fixed a bug or issue.
- `#`: Miscellaneous changes or updates.

Refrain from using ":" in the script as it is reserved to format text.

## Example Usage

```plaintext
Welcome to Update Log Creator by hzlism.

Example Usage After Writing a Category:
  +: Added a new feature or content.
  -: Removed a feature or content.
  *: Modified or changed existing feature or content.
  !: Fixed a bug or issue.
  #: Miscellaneous changes or updates.

Refrain from using ":" in script as it is reserved to format text.

Enter update details for today (press Ctrl + C to finish):

Enter update category: Catagory Name (Skins)
Enter update description (use commas to separate lines): +Added SkinName, *Changed SkinName's Armor
Do you want to add another update? [y/n]: n
Update log for 2024-05-30 has been created/updated.
```

## Notes

- Update logs are organized by date and stored in separate log files.
- Existing log files are merged with new updates if updated in same date.
- Not using any prefix will result in `[No Prefix Specified.]`.
- Using `":"` in any point of category or category description will result in anything beyond `":"` not registering in the text file.
