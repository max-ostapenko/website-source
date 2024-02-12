# Define variables
VENV_NAME := .venv
PYTHON := python3
PIP := $(VENV_NAME)/bin/pip
REQUIREMENTS := requirements.txt

quarto:
	brew install quarto

# Create virtual environment and install dependencies
env:
	$(PYTHON) -m venv $(VENV_NAME)
	source $(VENV_NAME)/bin/activate && \
	$(PIP) install -r $(REQUIREMENTS)

render:
	make clean
	make quarto
	make env
	quarto render

publish:
	make clean
	quarto publish

clean:
	rm -rf _site/
	rm -rf _freeze/
	rm -rf public/
