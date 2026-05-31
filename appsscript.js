/**
 * LEC Image Gallery — Google Apps Script
 * ========================================
 * Paste this into the Script Editor of your Google Sheet:
 *   Extensions → Apps Script → paste this code → Save
 *
 * Then set up the trigger:
 *   Triggers → Add Trigger → onFormSubmit → From spreadsheet → On form submit
 *
 * COLUMN MAP — adjust numbers if your sheet columns are in a different order:
 */
const COL = {
  TIMESTAMP:    1,   // A — auto-filled by Forms
  TITLE:        2,   // B
  HEBREW_TITLE: 3,   // C
  DESCRIPTION:  4,   // D
  CATEGORY:     5,   // E
  TAGS:         6,   // F
  GRADE_LEVEL:  7,   // G
  SOURCE:       8,   // H
  IMAGE_UPLOAD: 9,   // I — raw Drive URL from form upload
  IMAGE_URL:    10,  // J — direct URL, filled by this script
  APPROVED:     11,  // K — "yes" / "no", admin sets this
  DATE_ADDED:   12,  // L — filled by this script
};

/**
 * Runs automatically when a form is submitted.
 * Extracts the Drive file ID from the upload URL,
 * builds a direct image URL, sets approved=no, records date.
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();

    // Get the raw Drive URL from the form upload column
    const rawUrl = sheet.getRange(lastRow, COL.IMAGE_UPLOAD).getValue();

    if (rawUrl) {
      // Extract file ID from Drive URL formats:
      //   https://drive.google.com/open?id=FILEID
      //   https://drive.google.com/file/d/FILEID/view
      const match = rawUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]{25,})/);
      if (match) {
        const fileId = match[1];
        // Make the file publicly viewable
        try {
          DriveApp.getFileById(fileId).setSharing(
            DriveApp.Access.ANYONE_WITH_LINK,
            DriveApp.Permission.VIEW
          );
        } catch (err) {
          // File may already be shared — continue
        }
        // Build direct image URL
        const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        sheet.getRange(lastRow, COL.IMAGE_URL).setValue(directUrl);
      }
    }

    // Set approved = no (admin must review before it appears on gallery)
    sheet.getRange(lastRow, COL.APPROVED).setValue('no');

    // Record submission date
    sheet.getRange(lastRow, COL.DATE_ADDED).setValue(new Date());

    // Optional: email notification to admin
    // MailApp.sendEmail('admin@lecfl.com', 'New image submitted', `Review: ${rawUrl}`);

  } catch (err) {
    Logger.log('onFormSubmit error: ' + err);
  }
}

/**
 * Approve all pending images at once — run manually from the Script Editor
 * if you want to bulk-approve a batch. Not used in normal workflow.
 */
function bulkApprove() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    const approved = sheet.getRange(i, COL.APPROVED).getValue();
    if (approved === 'no') {
      sheet.getRange(i, COL.APPROVED).setValue('yes');
    }
  }
}
