# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements-dev.txt

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r $(REQUIREMENTS)
	if [ "$(shell uname)" == "Darwin" ]; then brew install quarto; fi

render:
	make clean
	. $(VENV_NAME)/bin/activate && quarto render src/
	. $(VENV_NAME)/bin/activate && python3 scripts/postprocess.py

preview:
	make render
	quarto preview src/

emulate:
	make render
	firebase emulators:start

clean:
	rm -rf _site/
