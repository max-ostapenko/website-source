# personal website

## Development

Website built using [Quarto publishing system](https://quarto.org/).

1. Install Quarto CLI, Firebase CLI and install dependecies

    ```sh
    make env
    ```

2. Edit the content in the `src` folder and see the changes live in the browser
3. To start a local Quarto server:

    ```sh
    make preview
    ```

4. Emulate Firebase locally

    ```sh
    make emulate
    ```

## Hosting options

### Firebase

[Firbase Hosting console](https://console.firebase.google.com/u/0/project/max-ostapenko/hosting/sites)

1. Login with the Firebase CLI

    ```sh
    firebase login
    firebase use --add max-ostapenko
    ```

2. Deploy to the staging channel (used on PR checks)

    ```sh
    firebase hosting:channel:deploy staging
    ```

3. Release from the staging channel

    ```sh
    firebase hosting:clone max-ostapenko:staging max-ostapenko:live
    ```

4. Or release directly (used on PR merge)

    ```sh
    firebase deploy --only hosting
    ```
