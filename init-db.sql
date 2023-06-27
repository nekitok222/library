-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.authors_id_seq;

CREATE SEQUENCE public.authors_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.books_id_seq;

CREATE SEQUENCE public.books_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.authors definition

-- Drop table

-- DROP TABLE public.authors;

CREATE TABLE public.authors (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	rating numeric NOT NULL DEFAULT 0,
	birthday date NOT NULL,
	CONSTRAINT authors_name_key UNIQUE (name),
	CONSTRAINT authors_pkey PRIMARY KEY (id)
);


-- public.books definition

-- Drop table

-- DROP TABLE public.books;

CREATE TABLE public.books (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	price int4 NOT NULL,
	rating numeric NULL DEFAULT '0'::double precision,
	date_writing date NOT NULL,
	"authorId" int4 NOT NULL,
	CONSTRAINT books_name_key UNIQUE (name),
	CONSTRAINT books_pkey PRIMARY KEY (id),
	CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.authors(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO public.authors ("name",rating,birthday) VALUES
	 ('Александр Сергеевич Пушкин',5.0,'1799-06-06');

INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест51',200,4.89,'1820-01-01',5),
	 ('тест52',200,4.89,'1820-01-01',5),
	 ('тест53',200,4.89,'1820-01-01',5),
	 ('тест54',200,4.89,'1820-01-01',5),
	 ('Руслан и людмила',200,5,'1800-01-01',5),
	 ('Кавказский пленник',200,4.1,'1821-01-01',5),
	 ('Братья разбойники',300,5,'1821-01-01',5),
	 ('Цыганы',600,4.4,'1824-01-01',5),
	 ('Борис Годунов',500,5,'1824-06-01',5),
	 ('Пиковая дама',666,3,'1834-12-02',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('Жених',100,2,'1825-03-01',5),
	 ('Сказка о царе Салтане, о сыне его славном и могучем богатыре князе Гвидоне Салтановиче и о прекрасной царевне лебеди',500,4.7,'1834-01-01',5),
	 ('Роман в письмах',777,3,'1829-05-01',5),
	 ('Сказка о попе и о работнике его Балде',500,5,'1830-01-01',5),
	 ('Сказка о чем-то',99999,5,'2000-05-01',5),
	 ('сказ',30,0,'1888-12-03',5),
	 ('что-то',666,4,'2000-01-01',5),
	 ('оригинальное название',999,3,'1000-05-07',5),
	 ('пваапвы',324,3,'1111-01-01',5),
	 ('иав',356,4,'1000-05-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('gfe',900,0,'2022-12-01',5),
	 ('kirdik',9,0,'2022-02-24',5),
	 ('Русланп и Людмилаимавм',200,4.89,'1820-01-01',5),
	 ('Русланп и Людмилаимавмf',200,4.89,'1820-01-01',5),
	 ('Русланп и Людмилаимавмff',200,4.89,'1820-01-01',5),
	 ('Русланп и Людмилаимавмffs',200,4.89,'1820-01-01',5),
	 ('g',200,4.89,'1820-01-01',5),
	 ('фф',200,4.89,'1820-01-01',5),
	 ('уекуцй',200,4.89,'1820-01-01',5),
	 ('тест',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест1',200,4.89,'1820-01-01',5),
	 ('тест2',200,4.89,'1820-01-01',5),
	 ('тест3',200,4.89,'1820-01-01',5),
	 ('тест4',200,4.89,'1820-01-01',5),
	 ('тест5',200,4.89,'1820-01-01',5),
	 ('тест6',200,4.89,'1820-01-01',5),
	 ('тест7',200,4.89,'1820-01-01',5),
	 ('тест8',200,4.89,'1820-01-01',5),
	 ('тест9',200,4.89,'1820-01-01',5),
	 ('тест10',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест11',200,4.89,'1820-01-01',5),
	 ('тест12',200,4.89,'1820-01-01',5),
	 ('тест13',200,4.89,'1820-01-01',5),
	 ('тест14',200,4.89,'1820-01-01',5),
	 ('тест15',200,4.89,'1820-01-01',5),
	 ('тест16',200,4.89,'1820-01-01',5),
	 ('тест17',200,4.89,'1820-01-01',5),
	 ('тест18',200,4.89,'1820-01-01',5),
	 ('тест19',200,4.89,'1820-01-01',5),
	 ('тест20',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест21',200,4.89,'1820-01-01',5),
	 ('тест22',200,4.89,'1820-01-01',5),
	 ('тест23',200,4.89,'1820-01-01',5),
	 ('тест24',200,4.89,'1820-01-01',5),
	 ('тест25',200,4.89,'1820-01-01',5),
	 ('тест26',200,4.89,'1820-01-01',5),
	 ('тест27',200,4.89,'1820-01-01',5),
	 ('тест28',200,4.89,'1820-01-01',5),
	 ('тест29',200,4.89,'1820-01-01',5),
	 ('тест30',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест31',200,4.89,'1820-01-01',5),
	 ('тест32',200,4.89,'1820-01-01',5),
	 ('тест33',200,4.89,'1820-01-01',5),
	 ('тест34',200,4.89,'1820-01-01',5),
	 ('тест35',200,4.89,'1820-01-01',5),
	 ('тест36',200,4.89,'1820-01-01',5),
	 ('тест37',200,4.89,'1820-01-01',5),
	 ('тест38',200,4.89,'1820-01-01',5),
	 ('тест39',200,4.89,'1820-01-01',5),
	 ('тест40',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест41',200,4.89,'1820-01-01',5),
	 ('тест42',200,4.89,'1820-01-01',5),
	 ('тест43',200,4.89,'1820-01-01',5),
	 ('тест44',200,4.89,'1820-01-01',5),
	 ('тест45',200,4.89,'1820-01-01',5),
	 ('тест46',200,4.89,'1820-01-01',5),
	 ('тест47',200,4.89,'1820-01-01',5),
	 ('тест48',200,4.89,'1820-01-01',5),
	 ('тест49',200,4.89,'1820-01-01',5),
	 ('тест50',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест55',200,4.89,'1820-01-01',5),
	 ('тест56',200,4.89,'1820-01-01',5),
	 ('тест57',200,4.89,'1820-01-01',5),
	 ('тест58',200,4.89,'1820-01-01',5),
	 ('тест59',200,4.89,'1820-01-01',5),
	 ('тест60',200,4.89,'1820-01-01',5),
	 ('тест61',200,4.89,'1820-01-01',5),
	 ('тест62',200,4.89,'1820-01-01',5),
	 ('тест63',200,4.89,'1820-01-01',5),
	 ('тест64',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест65',200,4.89,'1820-01-01',5),
	 ('тест66',200,4.89,'1820-01-01',5),
	 ('тест67',200,4.89,'1820-01-01',5),
	 ('тест68',200,4.89,'1820-01-01',5),
	 ('тест69',200,4.89,'1820-01-01',5),
	 ('тест70',200,4.89,'1820-01-01',5),
	 ('тест78',200,4.89,'1820-01-01',5),
	 ('тест72',200,4.89,'1820-01-01',5),
	 ('тест74',200,4.89,'1820-01-01',5),
	 ('тест73',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест75',200,4.89,'1820-01-01',5),
	 ('тест76',200,4.89,'1820-01-01',5),
	 ('тест77',200,4.89,'1820-01-01',5),
	 ('тест79',200,4.89,'1820-01-01',5),
	 ('тест80',200,4.89,'1820-01-01',5),
	 ('тест81',200,4.89,'1820-01-01',5),
	 ('тест82',200,4.89,'1820-01-01',5),
	 ('тест83',200,4.89,'1820-01-01',5),
	 ('тест85',200,4.89,'1820-01-01',5),
	 ('тест84',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест86',200,4.89,'1820-01-01',5),
	 ('тест87',200,4.89,'1820-01-01',5),
	 ('тест88',200,4.89,'1820-01-01',5),
	 ('тест89',200,4.89,'1820-01-01',5),
	 ('тест90',200,4.89,'1820-01-01',5),
	 ('тест91',200,4.89,'1820-01-01',5),
	 ('тест92',200,4.89,'1820-01-01',5),
	 ('тест93',200,4.89,'1820-01-01',5),
	 ('тест94',200,4.89,'1820-01-01',5),
	 ('тест95',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест96',200,4.89,'1820-01-01',5),
	 ('тест97',200,4.89,'1820-01-01',5),
	 ('тест98',200,4.89,'1820-01-01',5),
	 ('тест99',200,4.89,'1820-01-01',5),
	 ('тест100',200,4.89,'1820-01-01',5),
	 ('тест101',200,4.89,'1820-01-01',5),
	 ('тест102',200,4.89,'1820-01-01',5),
	 ('тест103',200,4.89,'1820-01-01',5),
	 ('тест104',200,4.89,'1820-01-01',5),
	 ('тест105',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест106',200,4.89,'1820-01-01',5),
	 ('тест107',200,4.89,'1820-01-01',5),
	 ('тест108',200,4.89,'1820-01-01',5),
	 ('тест109',200,4.89,'1820-01-01',5),
	 ('тест110',200,4.89,'1820-01-01',5),
	 ('тест111',200,4.89,'1820-01-01',5),
	 ('тест112',200,4.89,'1820-01-01',5),
	 ('тест113',200,4.89,'1820-01-01',5),
	 ('тест114',200,4.89,'1820-01-01',5),
	 ('тест115',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест116',200,4.89,'1820-01-01',5),
	 ('тест117',200,4.89,'1820-01-01',5),
	 ('тест118',200,4.89,'1820-01-01',5),
	 ('тест119',200,4.89,'1820-01-01',5),
	 ('тест120',200,4.89,'1820-01-01',5),
	 ('тест121',200,4.89,'1820-01-01',5),
	 ('тест122',200,4.89,'1820-01-01',5),
	 ('тест123',200,4.89,'1820-01-01',5),
	 ('тест124',200,4.89,'1820-01-01',5),
	 ('тест125',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест126',200,4.89,'1820-01-01',5),
	 ('тест127',200,4.89,'1820-01-01',5),
	 ('тест128',200,4.89,'1820-01-01',5),
	 ('тест129',200,4.89,'1820-01-01',5),
	 ('тест130',200,4.89,'1820-01-01',5),
	 ('тест131',200,4.89,'1820-01-01',5),
	 ('тест132',200,4.89,'1820-01-01',5),
	 ('тест133',200,4.89,'1820-01-01',5),
	 ('тест134',200,4.89,'1820-01-01',5),
	 ('тест135',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест136',200,4.89,'1820-01-01',5),
	 ('тест137',200,4.89,'1820-01-01',5),
	 ('тест138',200,4.89,'1820-01-01',5),
	 ('тест139',200,4.89,'1820-01-01',5),
	 ('тест140',200,4.89,'1820-01-01',5),
	 ('тест141',200,4.89,'1820-01-01',5),
	 ('тест142',200,4.89,'1820-01-01',5),
	 ('тест143',200,4.89,'1820-01-01',5),
	 ('тест144',200,4.89,'1820-01-01',5),
	 ('тест145',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест146',200,4.89,'1820-01-01',5),
	 ('тест147',200,4.89,'1820-01-01',5),
	 ('тест148',200,4.89,'1820-01-01',5),
	 ('тест149',200,4.89,'1820-01-01',5),
	 ('тест1150',200,4.89,'1820-01-01',5),
	 ('тест150',200,4.89,'1820-01-01',5),
	 ('тест151',200,4.89,'1820-01-01',5),
	 ('тест152',200,4.89,'1820-01-01',5),
	 ('тест153',200,4.89,'1820-01-01',5),
	 ('тест154',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест155',200,4.89,'1820-01-01',5),
	 ('тест156',200,4.89,'1820-01-01',5),
	 ('тест157',200,4.89,'1820-01-01',5),
	 ('тест158',200,4.89,'1820-01-01',5),
	 ('тест159',200,4.89,'1820-01-01',5),
	 ('тест160',200,4.89,'1820-01-01',5),
	 ('тест161',200,4.89,'1820-01-01',5),
	 ('тест162',200,4.89,'1820-01-01',5),
	 ('тест163',200,4.89,'1820-01-01',5),
	 ('тест164',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест165',200,4.89,'1820-01-01',5),
	 ('тест166',200,4.89,'1820-01-01',5),
	 ('тест167',200,4.89,'1820-01-01',5),
	 ('тест168',200,4.89,'1820-01-01',5),
	 ('тест169',200,4.89,'1820-01-01',5),
	 ('тест170',200,4.89,'1820-01-01',5),
	 ('тест171',200,4.89,'1820-01-01',5),
	 ('тест172',200,4.89,'1820-01-01',5),
	 ('тест173',200,4.89,'1820-01-01',5),
	 ('тест174',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест175',200,4.89,'1820-01-01',5),
	 ('тест176',200,4.89,'1820-01-01',5),
	 ('тест177',200,4.89,'1820-01-01',5),
	 ('тест178',200,4.89,'1820-01-01',5),
	 ('тест179',200,4.89,'1820-01-01',5),
	 ('тест180',200,4.89,'1820-01-01',5),
	 ('тест181',200,4.89,'1820-01-01',5),
	 ('тест182',200,4.89,'1820-01-01',5),
	 ('тест183',200,4.89,'1820-01-01',5),
	 ('тест184',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест185',200,4.89,'1820-01-01',5),
	 ('тест186',200,4.89,'1820-01-01',5),
	 ('тест187',200,4.89,'1820-01-01',5),
	 ('тест188',200,4.89,'1820-01-01',5),
	 ('тест189',200,4.89,'1820-01-01',5),
	 ('тест190',200,4.89,'1820-01-01',5),
	 ('тест191',200,4.89,'1820-01-01',5),
	 ('тест192',200,4.89,'1820-01-01',5),
	 ('тест193',200,4.89,'1820-01-01',5),
	 ('тест194',200,4.89,'1820-01-01',5);
INSERT INTO public.books ("name",price,rating,date_writing,"authorId") VALUES
	 ('тест195',200,4.89,'1820-01-01',5),
	 ('тест196',200,4.89,'1820-01-01',5),
	 ('тест197',200,4.89,'1820-01-01',5),
	 ('тест198',200,4.89,'1820-01-01',5),
	 ('тест199',200,4.89,'1820-01-01',5),
	 ('тест200',200,4.89,'1820-01-01',5);


