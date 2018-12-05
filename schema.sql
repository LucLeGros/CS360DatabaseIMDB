-- Schema for base tables used in CS360 Ass2 Group Project
---------------------------------------------------------------
-- Media Entity in ER Diagram
-- Data from title.basics.tsv.gz
-- Ratings included from title.ratings.tsv.gz
drop table if exists media;
create table media (
   'tconst' text primary key not null,
   'title_type' text,
   'primary_title' text,
   'original_title' text,
   'is_adult_rated' boolean,
   'start_year' smallint,
   'end_year' smallint,
   'runtime' smallint,
   'average_rating' float,
   'number_of_votes' int
);

-- Genre composite attribute
-- Data from title.basics.tsv.gz
drop table if exists genres;
create table genres (
   'tconst' text not null,
   'genre' text not null,
   primary key (tconst, genre),
   foreign key (tconst) references media(tconst)
);

-- Episode entity in ER Diagram
-- Data from titles.episode.tsv.gz
drop table if exists episodes;
create table episodes (
   'tconst' text primary key not null,
   'parent' text not null,
   'season_number' tinyint,
   'episode_number'smallint,
   foreign key (tconst) references media(tconst),
   foreign key (parent) references media(tconst)
);

-- Akas entity in ER diagram
-- Data from title.akas.tsv.gz
drop table if exists alternate_titles;
create table alternate_titles (
   'tconst' text not null,
   'ordering' tinyint not null,
   'title' text not null,
   'region' text,
   'language' text,
   'types' text,
   'attributes' text,
   'is_original' boolean,
   foreign key (tconst) references media(tconst)
);

-- Crew entity in ER Diagram
-- Data from title.principals.tsv.gz
-- Includes information if this actor is known for this role
-- Boolean data from name.tsv.gz
drop table if exists crew;
create table crew (
   'tconst' text not null,
   'ordering' tinyint not null,
   'nconst' text not null,
   'category' text,
   'job' text,
   'known_for' boolean,
   foreign key (tconst) references media(tconst),
   foreign key (nconst) references person(nconst)
);

-- Characters composite attribute
-- Uses data from title.principals.tsv.gz
drop table if exists characters;
create table characters (
   'tconst' text not null,
   'nconst' text not null,
   'character' text not null,
   foreign key (tconst, nconst) references crew(tconst, nconst)
);

-- Person entity in ER diagram
-- Data from name.tsv.gz
drop table if exists person;
create table person (
   'nconst' primary key not null,
   'primary_name' text not null,
   'birth_year' smallint,
   'death_year' smallint
);

-- Profession composite attribute
-- Data from name.tsv.gz
drop table if exists professions;
create table professions (
   'nconst' not null,
   'profession' text not null,
   foreign key (nconst) references person(nconst)
);
