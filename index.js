const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');

// Function to get today's date in format YYYY-MM-DD
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to create or append to a log file
function updateLogFile(logFileName, category, logContent) {
  const logsDir = path.join(__dirname, 'Logs');
  const filePath = path.join(logsDir, logFileName);
  let fileContent = '';

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  if (fs.existsSync(filePath)) {
    // If log file exists, read its content
    fileContent = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(`(${category}:\\n(?:\\[.+\\].*\\n?)*)`, 'i'); // This regex shit makes me wanna end it all bro
    const match = fileContent.match(regex);

    if (match) {
      // If category already exists, append the new log content
      const existingContent = match[1];
      const newContent = `${existingContent}${logContent}\n`;
      fileContent = fileContent.replace(existingContent, newContent);
    } else {
      // If category doesn't exist, append new category and content
      fileContent += `\n${category}:\n${logContent}\n`; // Add newline before new category
    }
  } else {
    // If log file doesn't exist, create new log with category and content
    fileContent = `${category}:\n${logContent}\n`;
  }

  // Write the updated content to the log file
  fs.writeFileSync(filePath, fileContent.trim() + '\n'); // Ensure final newline
}

// Function to check if log file for today already exists
function doesLogFileExist(logFileName) {
  const logsDir = path.join(__dirname, 'Logs');
  const filePath = path.join(logsDir, logFileName);
  return fs.existsSync(filePath);
}

// Function to get update details from the user
function getUpdateDetails() {
  let category = '';
  let description = '';

  // Continue prompting until a non-empty category is provided
  while (category.trim() === '') {
    category = readlineSync.question('Enter update category: ');
  }

  // Continue prompting until a non-empty description is provided
  while (description.trim() === '') {
    description = readlineSync.question('Enter update description (use commas to separate lines): ');
  }

  // Trim leading and trailing whitespaces
  category = category.trim();
  description = description.trim();

  // We want to have special prefixes that can be written in front of the description to determine what type it is (+ for additions, - for deletions, * for changes, ! for bug fixes, and # for miscellaneous changes).
  // Determining the type of description then adding the appropriate prefix enclosed in square brackets

  const lines = description.split(',').map(line => {
    const validPrefixes = ['+', '-', '#', '!', '*'];

    const prefix = line.trim().charAt(0);
    var content = line.trim().substring(1);

    if (!validPrefixes.includes(prefix)) {
      content = line.trim();
    }

    const formattedPrefix = validPrefixes.includes(prefix) ? prefix : 'No Prefix Specified.';
    const formattedContent = prefix ? content : line.trim();
    return `[${formattedPrefix}] ${formattedContent}`;
  }).join('\n');

  // Sorting the lines so that they are in the following order (prefixes): +, -, *, !, #
  const sortedLines = lines.split('\n').sort((a, b) => {
    const order = ['+', '-', '*', '!', '#'];
    return order.indexOf(a.charAt(1)) - order.indexOf(b.charAt(1));
  });

  // Add a newline character before the lines
  const formattedDescription = `\n${lines}`;

  return `${category}:\n${formattedDescription}\n`;
}

// Main function to create/update the log file
function createUpdateLog() {
  const todayDate = getTodayDate();
  const logFileName = `${todayDate}.log`;
  let logContent = '';

  console.log('Enter update details for today (press Ctrl + C to finish):\n');

  // Check if log file for today already exists
  const isLogFileExists = doesLogFileExist(logFileName);

  if (isLogFileExists) {
    console.log(`Log file for ${todayDate} already exists. Appending updates to it.`);
  } else {
    logContent += `${todayDate}\n`;
  }

  // Continuously gather update details until the user terminates
  while (true) {
    const update = getUpdateDetails();
    const category = update.split(':')[0].trim(); // Extract category from update
    const content = update.split(':')[1].trim(); // Extract content from update    

    updateLogFile(logFileName, category, content); // Update log file with category and content
    
    const continueOption = readlineSync.keyInYNStrict('Do you want to add another update? ');
    if (!continueOption) {
      break;
    }
  }

  console.log(`Update log for ${todayDate} has been created/updated.`);
}

// Call the main function
console.log(`Welcome to Update Log Creator by hzlism.\n`)
console.log(`Example Usage After Writing a Category: 
  +: Added a new feature or content.
  -: Removed a feature or content.
  *: Modified or changed existing feature or content.
  !: Fixed a bug or issue.
  #: Miscellaneous changes or updates.\n`);
console.log(`Refrain from using ":" in script as it is reserved to format text.\n`)

createUpdateLog();
