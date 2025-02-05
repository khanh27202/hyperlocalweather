#!/bin/sh
export FLASK_APP=./backend.py
pipenv run flask run --debug --port=5000
