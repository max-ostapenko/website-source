# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements.txt
QUARTO_VERSION := 1.4.549

quarto:
	if [ "$(shell uname)" == "Darwin" ]; then brew install quarto; fi

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -q -r $(REQUIREMENTS)

render:
	make clean
	. $(VENV_NAME)/bin/activate && quarto render src/

publish:
	make clean
	. $(VENV_NAME)/bin/activate && quarto publish

clean:
	rm -rf _site/
