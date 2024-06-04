# personal website

## Development

Website built using [Quarto publishing system](https://quarto.org/).

1. Install Quarto CLI

    ```sh
    brew install quarto
    python3 -m pip install nbformat, PyYAML
    ```

2. Navigate to the repository and restore development environment

    ```sh
    python3 -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    ```

3. Edit the content in the `src` folder and see the changes live in the browser
4. To start a local Quarto server:

    ```sh
    cd src && quarto preview
    ```

## Hosting options

### Firebase

[Firbase Hosting console](https://console.firebase.google.com/u/0/project/max-ostapenko/hosting/sites)

1. Install the Firebase CLI and login

    ```sh
    curl -sL https://firebase.tools | bash
    firebase login
    firebase use --add max-ostapenko
    ```

2. Emulate locally

    ```sh
    firebase emulators:start
    ```

3. Deploy to the staging channel (used on PR checks)

    ```sh
    firebase hosting:channel:deploy staging
    ```

4. Release from the staging channel

    ```sh
    firebase hosting:clone max-ostapenko:staging max-ostapenko:live
    ```

5. Or release directly (used on PR merge)

    ```sh
    firebase deploy --only hosting
    ```

### Alternative hostings

- [Netlify](https://app.netlify.com/sites/max-ostapenko/)
- [Vercel](https://vercel.com/max-ostapenko/website-source/)
- [GitHub Pages](https://github.com/max-ostapenko/website-source/settings/pages)
