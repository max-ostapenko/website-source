# Define variables
VENV_NAME := .venv
PYTHON := python3

env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r requirements.txt
	if [ "$(shell uname)" = "Darwin" ]; then brew install quarto; fi
	npm install
