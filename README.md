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

1. Install the Firebase CLI

    ```sh
    curl -sL https://firebase.tools | bash
    ```

2. Login to Firebase

    ```sh
    firebase login
    firebase init hosting
    ```

3. Emulate locally

    ```sh
    firebase emulators:start
    ```

4. Deploy the staging site and open the console

    ```sh
    firebase hosting:channel:deploy staging
    firebase open hosting
    ```

5. Deploy the production site and open it

    ```sh
    firebase deploy --only hosting
    firebase open hosting:site
    ```

6. Clone from a preview channel

    ```sh
    SITE_ID=max-ostapenko
    firebase hosting:clone $SITE_ID:staging $SITE_ID:live
    ```

### Netlify (todo)

1. [Project settings](https://app.netlify.com/sites/max-ostapenko/)

### Vercel (todo)

1. [Project settings](https://vercel.com/max-ostapenko/website-source/)

### GitHub Pages (todo)

1. [Project settings](https://github.com/max-ostapenko/website-source/settings/pages)
