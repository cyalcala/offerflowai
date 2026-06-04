# OfferFlow AI Landing Page

OfferFlow AI is a high-converting, single-page website for productized AI UGC services. It is designed around the philosophy of offer-clarity and trust-building systems, using short-form videos as the strategic asset to turn vague service offers into clear, trust-building sequences before sales calls.

Built with semantic HTML5, clean vanilla CSS, and lightweight viewport-aware JavaScript.

## Folder Structure

```
/
├── index.html       # Single-page layout containing all 10 sections
├── styles.css       # Premium B2B SaaS Glassmorphism styles
├── script.js        # Intersection Observer video control, mobile menu & accordion logic
├── README.md        # Documentation and deployment guide
└── videos/          # Local video folder containing the 7 sequence MP4s
    ├── 1.mp4        # Hook
    ├── 2.mp4        # Problem
    ├── 3.mp4        # Offer
    ├── 4.mp4        # Objection
    ├── 5.mp4        # Before/After
    ├── 6.mp4        # Angle Test
    └── 7.mp4        # Sample Scenario
```

---

## 📹 Video Asset Guidelines & Compression

To ensure the landing page loads instantly and works flawlessly on mobile devices, please optimize the 7 video files before deploying them.

### Target Specifications:
* **Format**: `.mp4`
* **Codec**: H.264 video with AAC audio (standard web format)
* **Resolution**: 720p vertical (`720x1280`) is the ideal sweet spot for high-clarity on mobile without bloat.
* **File Size**: Target **under 5–10 MB per video**.
* **Folder Size**: Target **under 50–70 MB total** for the `/videos` directory.
* **Aspect Ratio**: Strict `9:16` vertical layout.

### Tools for Easy Compression:
1. **Handbrake** (Free, Open-source desktop app): Use the "Creator" or "Web" presets, set size to `720x1280` or keep source size and adjust the Constant Quality slider (RF 22-24).
2. **FFmpeg** (Command line): Run this command to compress files:
   ```bash
   ffmpeg -i input.mp4 -vf "scale=720:1280" -vcodec libx264 -crf 24 -acodec aac -b:a 128k videos/1.mp4
   ```

---

## 🛠️ Local Development & Preview

To run the project locally and view changes:

### Option A: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Click **Go Live** in the bottom right status bar (requires the "Live Server" extension).
3. The browser will open the site automatically at `http://127.0.0.1:5500`.

### Option B: Local HTTP Server (Python)
If you have Python installed, open your terminal in the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🚀 Pushing to GitHub

Ensure you have initialized git and linked your remote repository.

1. **Check Remote Configurations**:
   ```bash
   git remote -v
   ```
   *It should match `https://github.com/cyalcala/offerflowai.git`.*

2. **Add Files & Commit**:
   ```bash
   git add .
   git commit -m "feat: implement premium OfferFlow AI landing page"
   ```

3. **Rename Default Branch (if not already main)**:
   ```bash
   git branch -M main
   ```

4. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

---

## ☁️ Deploying to Cloudflare Pages via Wrangler CLI

Wrangler is Cloudflare's command-line tool. You can deploy your static files directly from the terminal.

### Deployment Steps:

1. **Authenticate Wrangler**:
   Log in to your Cloudflare account from the CLI:
   ```bash
   npx wrangler login
   ```

2. **Deploy to Pages**:
   Run the following deployment command from the root of the project:
   ```bash
   npx wrangler pages deploy . --project-name=offerflowai --branch=main
   ```
   *If the project `offerflowai` does not exist in your account yet, Wrangler will ask to create it for you. Select **Yes**.*

3. **Verify Deployment**:
   Wrangler will upload your assets and output your live production URL: **`https://offerflowai.pages.dev`**.

---

## ⚙️ How to Customize Future CTAs

The website currently uses a robust `mailto` action and a direct LinkedIn DM button in the final CTA section. When you are ready to transition to formal intakes (e.g. GoHighLevel, Tally, Google Forms, or Calendly):

1. **Embedded Form**: Open `index.html` and search for `<!-- CTA CUSTOMIZATION REFERENCE: -->`. Paste your embed code inside the `<div class="contact-ctas">` container, replacing the existing buttons.
2. **Scheduling Calendar**: Swap out the href of the "Get a Demo Pack" button to point directly to your Calendly or GHL booking page.
3. **Contact Details**: In `script.js`, edit the `CONTACT_CONFIG` block at the top of the file to globally change the target email address, subject line, or LinkedIn URL.
