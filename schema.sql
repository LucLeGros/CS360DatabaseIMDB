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
drop table if exists genre;
create table genre (
   'tconst' text not null,
   'genre' text not null,
   primary key (tconst, genre),
   foreign key (tconst) references media(tconst)
);

-- Episode entity in ER Diagram
-- Data from titles.episode.tsv.gz
drop table if exists episode;
create table episode (
   'tconst' text primary key not null,
   'parent' text not null,
   'season_number' tinyint,
   'episode_number'smallint,
   --Below feels like bad design feel free to fix - Nick
   -- media includes both tconst for episodes and whole series
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
