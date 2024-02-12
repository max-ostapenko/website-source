# Define variables
VENV_NAME := .venv
PYTHON := python3
REQUIREMENTS := requirements.txt

quarto:
	if [ "$(uname)" == "Darwin" ]; then brew install quarto; fi
	$(PYTHON) -m pip install nbformat nbclient

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
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
