# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements.txt

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
	. $(VENV_NAME)/bin/activate && cd src/ && quarto preview

emulate:
	make render
	firebase emulators:start

clean:
	rm -rf _site/
