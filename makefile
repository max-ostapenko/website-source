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
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -r $(REQUIREMENTS)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install --upgrade pip

render:
	make clean
	source $(VENV_NAME)/bin/activate && quarto render

publish:
	make clean
	source $(VENV_NAME)/bin/activate && quarto publish

clean:
	rm -rf _site/
	rm -rf _freeze/
	rm -rf public/
