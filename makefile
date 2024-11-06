# Define variables
VENV_NAME := .venv
PYTHON := python3

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r requirements.txt
	if [ "$(shell uname)" == "Darwin" ]; then brew install quarto; fi
	curl -sL https://firebase.tools | upgrade=true bash

render:
	make clean
	quarto render src/
	. $(VENV_NAME)/bin/activate && python3 scripts/clean_sitemap.py

preview:
	make render
	quarto preview src/

emulate:
	make render
	firebase emulators:start

clean:
	rm -rf _site/
