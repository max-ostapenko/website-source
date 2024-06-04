# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements-dev.txt

quarto:
	if [ "$(shell uname)" == "Darwin" ]; then brew install quarto; fi

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r $(REQUIREMENTS)

render:
	make clean
	. $(VENV_NAME)/bin/activate && quarto render src/
	. $(VENV_NAME)/bin/activate && python3 scripts/postprocess.py

publish:
	make clean
	. $(VENV_NAME)/bin/activate && quarto publish

emulate:
	make render
	firebase emulators:start

clean:
	rm -rf _site/
