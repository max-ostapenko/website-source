# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements.txt

quarto:
	brew install quarto

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	$(PYTHON) -m pip install nbformat
	$(VENV_NAME)/bin/$(PYTHON) -m pip install -r $(REQUIREMENTS)
	$(VENV_NAME)/bin/$(PYTHON) -m pip install --upgrade pip

render:
	make clean
	quarto render

publish:
	make clean
	quarto publish

clean:
	rm -rf _site/
	rm -rf _freeze/
	rm -rf public/
