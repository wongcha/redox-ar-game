/**
 * Electron Pass: receives each student's answers and adds them to this Google Sheet.
 *
 * Setup (once):
 * 1. Make a new Google Sheet. Click Extensions > Apps Script.
 * 2. Delete the sample code, paste this whole file, and click Save.
 * 3. Click Deploy > New deployment. Choose type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy and allow access when Google asks.
 * 4. Copy the Web app URL (it ends in /exec) and send it to Claude,
 *    or paste it into SHEET_URL at the top of the script in index.html.
 */

const SHEET_NAME = "Responses";
const HEADERS = ["row_id", "timestamp", "session_id", "student_id", "room", "device", "input_mode", "level", "item", "answer", "correct_answer", "correct", "time_ms", "misdrops", "detail"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const data = JSON.parse(e.postData.contents || "{}");
    const incoming = Array.isArray(data.rows) ? data.rows : [];

    // Skip rows already saved (a phone may resend after a weak connection).
    const last = sheet.getLastRow();
    const seen = new Set(last > 1 ? sheet.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0])) : []);
    const rows = incoming
      .filter(r => r && r.row_id && !seen.has(String(r.row_id)))
      .map(r => HEADERS.map(h => (r[h] === undefined || r[h] === null) ? "" : r[h]));

    if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, added: rows.length })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Electron Pass data receiver is running.");
}
