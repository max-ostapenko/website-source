# personal website

## Development

1. [Download Quarto CLI](https://quarto.org/docs/get-started/)

2. Clone this repository
3. Open a terminal and navigate to the repository
4. Restore development environment

    ```python
    python3 -m venv .env
    source .venv/bin/activate
    python3 -m pip install -r requirements.txt
    ```

5. Run `quarto serve` to start a local server

6. Open a web browser and navigate to `http://localhost:4000` to see the website

7. Edit the content in the `content` folder and see the changes live in the browser

8. When you are ready to publish, run `quarto render` to render the site to the `site` folder

9. Commit and push the changes to the repository to publish the site

10. Publish the `site` folder to the Firebase Hosting
