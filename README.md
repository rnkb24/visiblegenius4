# VisibleGenius Deployment Manual

This guide outlines the steps to push the **VisibleGenius** engine to GitHub and publish it to Google Cloud.

## 1. Push to GitHub

1. **Initialize Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VisibleGenius v0.6"
   ```

2. **Connect to GitHub**:
   *Create a new repository on GitHub (github.com/new)*
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/visible-genius.git
   git branch -M main
   git push -u origin main
   ```

---

## 2. Publish to Google Cloud (App Engine)

This project is pre-configured with `app.yaml` for simple static hosting on Google App Engine.

1. **Install Google Cloud SDK**:
   Ensure you have the [gcloud CLI](https://cloud.google.com/sdk/docs/install) installed and initialized.

2. **Login and Project Selection**:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Deploy**:
   ```bash
   gcloud app deploy
   ```
   *The command will provide a URL (e.g., `https://your-project-id.uc.r.appspot.com`) where the app is live.*

---

## 3. Environment Variables (Critical)

VisibleGenius requires an API Key for the Gemini 3 Pro engine.

- **Development**: Ensure `process.env.API_KEY` is available in your local shell.
- **Production**: Since this is a client-side app using ES Modules, the `process.env.API_KEY` must be handled by your hosting provider or injected during the build. 
- **AI Studio Integration**: The app is built to automatically use `window.aistudio` if available, making it seamless for internal tools.

---

**VisibleGenius v0.6**
*Engineering: Ron Radom*
