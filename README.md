# personal website

## Development

Website built using [Quarto publishing system](https://quarto.org/).

1. Install Quarto CLI, Node.js and dependencies:

    ```sh
    make env
    ```

2. Edit the content in the `src` folder and see the changes live in the browser.
3. To start a local Quarto server:

    ```sh
    npm run preview
    ```

4. Emulate Firebase locally:

    ```sh
    npm run emulate
    ```

## Hosting options

### Firebase

[Firebase Hosting console](https://console.firebase.google.com/u/0/project/max-ostapenko/hosting/sites)

1. Login with the Firebase CLI (managed via npm):

    ```sh
    npx firebase login
    ```

2. Deploy to a preview channel (expires in 2 days):

    ```sh
    npm run deploy-preview -- my-feature-branch
    ```

3. Deploy to the live channel:

    ```sh
    npm run deploy
    ```
