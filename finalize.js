const fs = require('fs');
const path = require('path');

// Function to get the current date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// Function to merge log files in "Logs" folder
function mergeLogFiles() {
  const logsDir = path.join(__dirname, 'Logs');
  const todayDate = getTodayDate();
  const mergedLogFileName = `merged_logs_${todayDate}.log`;
  const mergedLogFilePath = path.join(logsDir, mergedLogFileName);
  let mergedContent = '';

  if (!fs.existsSync(logsDir)) {
    console.log('Logs directory does not exist. No logs to merge.');
    return;
  }

  const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log') && file !== mergedLogFileName);

  if (logFiles.length === 0) {
    console.log('No log files found in the Logs directory.');
    return;
  }

  logFiles.forEach(logFile => {
    const filePath = path.join(logsDir, logFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    mergedContent += `\n--- ${logFile} ---\n${fileContent}\n`;
  });

  // Write the merged content to the merged log file
  fs.writeFileSync(mergedLogFilePath, mergedContent.trim() + '\n'); // Ensure final newline

  console.log(`All log files have been merged into ${mergedLogFileName}.`);
}

// Call the merge function
mergeLogFiles();
