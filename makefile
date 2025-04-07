# Define variables
VENV_NAME := .venv
PYTHON := python3

env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r requirements.txt
	if [ "$(shell uname)" = "Darwin" ]; then brew install quarto; fi
	curl -sL https://firebase.tools | upgrade=true bash

render:
	make clean
	quarto render src/

preview:
	quarto preview src/

emulate:
	firebase emulators:start

clean:
	rm -rf _site/
