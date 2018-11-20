#!/usr/bin/python3
#Code for creating and populating sql database
import sqlite3, csv, os, re

#Input sanitisation function
def get_entities ():
    value = input("Number of entities to load in database: ")
    if not value.isdigit():
        print("Input incorrect --- Usage: <integer>")
        return get_entities()
    return int(value)

#Function to get data from directory
#------------------ CHANGE IF DATA RETRIEVAL CHANGES ----------
def get_data ():
    #Retrieve list of data files
    tables = [name for name in os.listdir('data') if re.search('\.tsv$', name)]
    #Reorder to reflect functional dependency of input transactions:
    #Ratings can only occur after basic
    tables = sorted(tables)
    #Name can only occur after principals
    tables[tables.index("principals.tsv")], tables[tables.index("name.tsv")] \
    = tables[tables.index("name.tsv")], tables[tables.index("principals.tsv")]
    return tables

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
        #Insert into media table
        db.cursor().execute('INSERT INTO media VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)',\
        (data.get("tconst"), data.get("titleType"), data.get("primaryTitle"),\
         data.get("originalTitle"), data.get("isAdult"), data.get("startYear"),\
         data.get("endYear"), data.get("runtimeMinutes"), None, None))
        db.commit()
        #Insert into genres table
        if data.get("genres") is not None:
            for genre in data.get("genres").split(","):
                db.cursor().execute ("INSERT INTO genres VALUES (?, ?)", \
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
        #Insert into episodes table
        db.cursor().execute('INSERT INTO episodes VALUES (?, ?, ?, ?)',\
        (data.get("tconst"), data.get("parentTconst"), data.get("seasonNumber"),\
         data.get("episodeNumber")))
        db.commit()
    elif file == "principals.tsv":
        #Insert into crew, characters tables
        #Insert into crew
        db.cursor().execute('INSERT INTO crew VALUES (?, ?, ?, ?, ?, ?)', \
        (data.get("tconst"), data.get("ordering"), data.get("nconst"),\
        data.get("category"), data.get("job"), False))
        db.commit()
        #Insert into characters
        if data.get("characters") is not None:
            for role in eval(data.get("characters")):
                db.cursor().execute('INSERT INTO characters VALUES (?, ?, ?)',\
                (data.get("tconst"), data.get("nconst"), role))
                db.commit()
    elif file == "name.tsv":
        #Insert into person, crew, professions tables
        #Insert into person
        db.cursor().execute('INSERT INTO person VALUES (?, ?, ?, ?)',\
        (data.get("nconst"), data.get("primaryName"), data.get("birthYear"),\
        data.get("deathYear")))
        db.commit()
        #Insert into professions table (for professions composite attribute)
        for job in data.get("primaryProfession").split(","):
            db.cursor().execute('INSERT INTO professions VALUES (?, ?)',\
            (data.get("nconst"), job))
            db.commit()
        #Update crew table to reflect roles person is known for
        for title in data.get("knownForTitles").split(","):
            db.cursor().execute('UPDATE crew SET known_for = ? WHERE tconst = ?', (True, title))
            db.commit()

def populate_db():
    load_limit = get_entities()
    for table in get_data():
        entities = load_limit
        with open (os.path.join('data', table)) as tsvfile:
            for row in csv.DictReader(tsvfile, dialect='excel-tab'):
                if entities == 0: break
                for key in row:
                    if row[key] == "\\N":
                        row[key] = None
                insert_into_db (table, row)
                entities -= 1
