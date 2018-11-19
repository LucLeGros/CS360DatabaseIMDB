#!/usr/bin/python3
#Code for creating and populating sql database
import sqlite3, csv, os, re

#Connect to database
def get_db():
    db = sqlite3.connect('cs360_ass2.db')
    db.row_factory = sqlite3.Row
    return db

#Initialise database using schema
def init_db():
    db = get_db()
    with open ('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

def insert_into_db (file, data):
    db = get_db()
    if file == "basics.tsv":
        # Insert into media table
        db.cursor().execute('INSERT INTO media VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)',\
        (data.get("tconst"), data.get("titleType"), data.get("primaryTitle"),\
         data.get("originalTitle"), data.get("isAdult"), data.get("startYear"),\
         data.get("endYear"), data.get("runtimeMinutes"), None, None))
        db.commit()
        # Insert into genre table
        if data.get("genres") is not None:
            genre_list = data.get("genres").split(",")
            for genre in genre_list:
                db.cursor().execute ("INSERT INTO genre VALUES (?, ?)", \
                (data.get("tconst"), genre))
                db.commit()
    elif file == "ratings.tsv":
        #Insert into media table
        db.cursor().execute('UPDATE media SET "average_rating" = ?, "number_of_votes" = ? WHERE "tconst" = ?',\
        (data.get("averageRating"), data.get("numVotes"), data.get("tconst")))
        db.commit()
    elif file == "akas.tsv":
        #Insert into alternate_titles table
        db.cursor().execute('INSERT INTO alternate_titles VALUES (?, ?, ?, ?, ?, ?, ?, ?)',\
        (data.get("titleId"), data.get("ordering"), data.get("title"), data.get("region"),\
         data.get("languages"), data.get("types"), data.get("attributes"), \
         data.get("isOriginalTitle")))
        db.commit()
    elif file == "episode.tsv":
        #insert into episode table
        db.cursor().execute('INSERT INTO episode VALUES (?, ?, ?, ?)',\
        (data.get("tconst"), data.get("parentTconst"), data.get("seasonNumber"),\
         data.get("episodeNumber")))
        db.commit()

def populate_db():
    list_of_tables = [name for name in os.listdir('data') if re.search('\.tsv$', name)]
    entities = input("Number of entities to load in database: ")
    for table_file in list_of_tables:
        with open (os.path.join('data', table_file)) as tsvfile:
            reader = csv.DictReader(tsvfile, dialect='excel-tab')
            for row in reader:
                if entites == 0: break
                for key in row:
                    if row[key] == "\\N":
                        row[key] = None
                insert_into_db (table_file, row)
                entities -= 1
