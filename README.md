# personal website

## Development

Website built using [Quarto publishing system](https://quarto.org/).

1. Install Quarto CLI

    ```sh
    brew install quarto
    python3 -m pip install nbformat, PyYAML
    ```

2. Clone this repository
3. Navigate to the repository and restore development environment

    ```python
    python3 -m venv .env
    source .venv/bin/activate
    python3 -m pip install -r requirements.txt
    ```

4. Run `quarto preview` to start a local server
5. Edit the content in the `src` folder and see the changes live in the browser

## Hosting options

### Firebase

[Firbase Hosting console](https://console.firebase.google.com/u/0/project/max-ostapenko/hosting/sites)

1. Install the Firebase CLI and login

    ```sh
    curl -sL https://firebase.tools | bash
    firebase login
    ```

2. Emulate locally

    ```sh
    firebase emulators:start
    ```

3. Deploy the staging site

    ```sh
    firebase hosting:channel:deploy staging
    ```

    on PR [.github/workflows/firebase-hosting-pr-preview.yml](.github/workflows/firebase-hosting-pr-preview.yml)

4. Deploy the production site

    ```sh
    firebase deploy --only hosting
    ```

    on merge [.github/workflows/firebase-hosting-merge-live.yml](.github/workflows/firebase-hosting-merge-live.yml)

5. Clone from the staging channel

    ```sh
    firebase hosting:clone max-ostapenko:staging max-ostapenko:live
    ```

### Netlify (todo)

1. [Project settings](https://app.netlify.com/sites/max-ostapenko/)

### Vercel (todo)

1. [Project settings](https://vercel.com/max-ostapenko/website-source/)

### GitHub Pages (todo)

1. [Project settings](https://github.com/max-ostapenko/website-source/settings/pages)
