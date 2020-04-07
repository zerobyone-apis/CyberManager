-- DATABASE QUERYS, SE DEJA EN CASO DE QUERER HACER UN BACKUP --
-- No esta conectada a ningun componente de la aplicacion solo es por informacion --
drop table usuario;
create table users(
  idUser SERIAL primary key,
  username varchar(50) not null,
  passwd varchar(25) not null,
  charge varchar(75),
  isAdmin BOOLEAN,
  createOn TimeStamp,
  updateOn TimeStamp,
  enterprise int
);
create table orders(
  id SERIAL primary key,
  clientName varchar(75) not null,
  clientPhone varchar(25) not null,
  article varchar(250),
  model varchar(100),
  brand varchar(100),
  admissionDate TimeStamp,
  repairDate TimeStamp,
  deliveryDate TimeStamp,
  reportedFailure varchar(500),
  observations varchar(500),
  reparation varchar (750),
  warranty varchar (750),
  price real,
  isCanceled boolean,
  status varchar(45),
  replacementPrice bigint
);
drop table enterprise;
create table enterprise(
  id SERIAL primary key,
  username varchar(50) not null,
  enterpriseName varchar(125) not null,
  phone varchar(25),
  cellphone varchar(30),
  fax varchar(50),
  location varchar(400),
  enterpriseRules TEXT,
  firstMessage TEXT,
  secondMessage TEXT,
  urlLogo TEXT,
  createdDate TimesTamp,
  lastUpdate TimesTamp,
  email varchar (250)
);
-- Queries de Busquedas, Inserciones --
select
  *
from users;
select
  *
from orders;
select
  *
from enterprise;
-- Queries de Busquedas, Inserciones --
select
  UNIX_TIMESTAMP() * 1000
INSERT INTO users (
    username,
    passwd,
    charge,
    isAdmin,
    createOn,
    updateOn,
    enterprise
  )
VALUES(
    'ZERO',
    'admin',
    'Supervisor',
    true,
    '2019-10-20 00:00:01',
    '2019-10-20 00:00:01',
    1
  );
INSERT INTO public.enterprise(
    username,
    enterprisename,
    phone,
    cellphone,
    fax,
    "location",
    enterpriserules,
    firstmessage,
    secondmessage,
    urllogo,
    createddate,
    lastupdate,
    email
  )
VALUES(
    'zero',
    'CyberManager',
    '2211334455',
    '0912222222',
    '11111111111',
    '8 de Oct. Veracierto',
    'Garantia de los servicios prestados es de 6 meses',
    'Gracias por utilizar nuestros servicios.',
    'Lo esperamos pronto.',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F3193474%2Fscreenshots%2F6090991%2Fcyber_ninjas.jpg&f=1&nofb=1',
    '2019-10-20 00:00:01',
    '2019-10-20 00:00:01',
    'CyberManager@test.com'
  );
INSERT INTO public.orders(
    clientname,
    clientphone,
    article,
    model,
    brand,
    admissiondate,
    repairdate,
    deliverydate,
    reportedfailure,
    observations,
    reparation,
    warranty,
    price,
    iscanceled,
    status,
    replacementprice
  )
VALUES(
    'Postgres-Test',
    '22334455',
    'TEST-Article',
    'TEST-Model',
    'TEST-brand',
    '2020-03-07 00:00:01',
    '2020-03-07 10:00:01',
    '2020-03-15 10:00:01',
    'TEST- Report Fail',
    'TEST- Observation',
    'TEST- Reparation',
    'Garantia es de 6 meses',
    1500,
    false,
    'Recibido',
    1000
  );
select
  e.*
from users u
inner join enterprise e on (u.username = e.username)
where
  u.idUser = :id
  and u.charge LIKE '%supervisor%'
select
  *
from enterprise;
select
  *
from users;
select
  *
from users u
inner join enterprise e on (u.iduser = e.id)
SELECT
  e.*,
  u.charge
from users u
inner join enterprise e on (e.id = u.enterprise)
where
  and u.charge LIKE '%Supervisor%'
  OR u.charge LIKE '%Empleado%'
limit
  1