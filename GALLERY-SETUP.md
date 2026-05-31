# LEC Image Gallery — Setup Guide

## Step 1 — Create the Google Sheet

Create a new Google Sheet with these exact column headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Title | Hebrew Title | Description | Category | Tags | Grade Level | Source | Image Upload | Image URL | Approved | Date Added |

**Publish the sheet:**
File → Share → Publish to web → Sheet 1 → CSV → Publish
Copy the URL. You'll use the Sheet ID (the long string in the URL) in `gallery.html`.

---

## Step 2 — Create the Google Form

Create a Google Form connected to the Sheet above (Responses → Link to Sheet).

Add these questions in order:
1. **Title** — Short answer (required)
2. **Hebrew Title** — Short answer (optional)
3. **Description** — Paragraph (optional)
4. **Category** — Dropdown (required)
   - Jewish Holidays
   - Chasidus
   - Jewish History
   - Hebrew
   - Science
   - Math
   - History
   - Language Arts
5. **Tags** — Short answer — *"Enter keywords separated by commas (e.g. chanukah, menorah, holidays)"*
6. **Grade Level** — Multiple choice (required)
   - All
   - Elementary
   - Middle
   - High
7. **Source / Attribution** — Short answer
8. **Image Upload** — File upload (required) — Allow only image files (JPG, PNG, GIF, WEBP)

Copy the form's public URL and replace `YOUR_GOOGLE_FORM_URL` in `gallery.html`.

---

## Step 3 — Set up the Apps Script

1. Open your Google Sheet
2. Extensions → Apps Script
3. Paste the contents of `appsscript.js` into the editor
4. Save (Ctrl+S)
5. Set up the trigger:
   - Click **Triggers** (clock icon on left sidebar)
   - Add Trigger → Function: `onFormSubmit` → Event source: From spreadsheet → Event type: On form submit
   - Save

---

## Step 4 — Wire up `gallery.html`

In `gallery.html`, replace:
- `YOUR_GOOGLE_SHEET_ID` — the ID from your Sheet URL
- `YOUR_GOOGLE_FORM_URL` — the public form URL

---

## Step 5 — Approving Images

When someone submits the form:
1. The image goes to Google Drive automatically
2. The Apps Script sets **Approved = no**
3. Open the Sheet, review the submission
4. Change **Approved** to **yes** — it immediately appears on the gallery

---

## Column Reference

| Column | Name | Who fills it |
|--------|------|-------------|
| A | Timestamp | Google Forms (auto) |
| B | Title | Submitter |
| C | Hebrew Title | Submitter |
| D | Description | Submitter |
| E | Category | Submitter |
| F | Tags | Submitter |
| G | Grade Level | Submitter |
| H | Source | Submitter |
| I | Image Upload | Google Forms (raw Drive URL) |
| J | Image URL | Apps Script (direct URL, auto) |
| K | Approved | **Admin manually sets yes/no** |
| L | Date Added | Apps Script (auto) |
