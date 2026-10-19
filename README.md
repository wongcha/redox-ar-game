# Electron Pass

An AR classroom game on redox reactions. Students stand in front of a camera, pinch an electron with their thumb and index finger, and carry it from the **reducing agent** to the **oxidizing agent**. Each species changes into its product once its electrons have moved. It also works with touch on phones and tablets.

**Play:** https://wongcha.github.io/redox-ar-game/

## Levels

| Level | Reaction | Reducing agent | Oxidizing agent |
|---|---|---|---|
| 1 | Zn + Cu²⁺ → Zn²⁺ + Cu | Zn | Cu²⁺ |
| 2 | Mg + 2H⁺ → Mg²⁺ + H₂ | Mg | H⁺ |
| 3 | Fe + 2Ag⁺ → Fe²⁺ + 2Ag | Fe | Ag⁺ |
| 4 | MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O | Fe²⁺ | MnO₄⁻ |

Before each level, students answer two questions: which species is the reducing agent, and which is the oxidizing agent. Each answer gets instant feedback. The options include products and, in Level 4, a spectator (H⁺), so the data shows which misconceptions students hold. The side of the screen where the reducing agent appears is random, so students can't learn a position instead of the idea.

After Level 4, students rate three statements on a 1–5 scale.

## How students play

1. Open the link in Safari (iPhone/iPad) or Chrome, and allow the camera.
2. Type the student ID and room, then tap **Start with camera** (or **Play with touch**).
3. Pinch to press buttons and to grab electrons. Release the pinch over the target to drop.

Tips: good light on the students' faces, hands clearly visible, 1–2 m from the camera. On a phone, prop it up in landscape.

## Research data

Every answer is saved with these columns:

| Column | Meaning |
|---|---|
| student_id, room, session_id | Who played (one session per student run) |
| device, input_mode | iPhone / iPad / Android / Computer, and hand or touch |
| level | 1–4 |
| item | `quiz_reducing_agent`, `quiz_oxidizing_agent`, `transfer`, `survey_q1`–`q3`, `session_start`, `session_end` |
| answer, correct_answer, correct | What the student chose, the right answer, 1 or 0 |
| time_ms | Time to answer a question, or to move all electrons in a level |
| misdrops | Electrons dropped on another reducing-agent species (a sign of confusion) |
| detail | Options order, reducing-agent side, hand vs touch grabs, survey wording |

`session_end` has the final quiz score out of 8 in `answer`.

**Where data goes**

- Always saved on the device. Open **Teacher: data & settings** on the start screen to download a CSV.
- If the Google Sheet is connected, every answer is also sent to one Google Sheet, so data from all students' phones ends up in one place.

### Connect a Google Sheet

1. Create a new Google Sheet, then **Extensions → Apps Script**.
2. Paste the contents of `google-sheet-script.gs`, then **Save**.
3. **Deploy → New deployment → Web app**. Execute as **Me**, access **Anyone**. Deploy and allow access.
4. Copy the web app URL (ends in `/exec`) and put it in `SHEET_URL` near the top of the script in `index.html`.

### Suggested analysis

- Compare correct rates for Level 1 vs Level 4 to see learning across the game.
- Look at which wrong options students pick (products, the spectator H⁺, or the other agent) to find misconceptions.
- Pair this with a paper pretest and posttest and a paired t-test for the classroom research report.

## Technical notes

- Single file: `index.html`. Hand tracking uses MediaPipe Hand Landmarker loaded from jsDelivr, so the device needs internet.
- The camera only works from an `https://` link (GitHub Pages is fine), not from a file opened on the device.
