#!/usr/bin/python3
#Init file for CS360 Ass2
import sqlite3
from min_sql import init_db, populate_db
#Initialise and populate database
init_db()
populate_db()
print("database populated")