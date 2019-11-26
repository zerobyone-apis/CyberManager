-- DATABASE QUERYS, SE DEJA EN CASO DE QUERER HACER UN BACKUP --
-- No esta conectada a ningun componente de la aplicacion solo es por informacion --
create table usuario(
  idUser SERIAL primary key,
  username varchar(50) not null,
  passwd varchar(25) not null,
  cargo varchar(75),
  isAdmin BOOLEAN,
  createOn TimeStamp,
  updateOn TimeStamp
);
create table pedido(
  #iNICIALIZACION DE LA ORDEN
  idOrden SERIAL primary key,
  fechaIngreso DATE not null,
  nombreCliente varchar(75) not null,
  telCliente varchar(25),
  articulo varchar(250),
  modelo varchar(100),
  marca varchar(100),
  fallReportada varchar(500),
  observaciones varchar(500),
  #Este Flag es por si el pedido se cancela,
  #cambia de estado @param = true/false
  isCanceled boolean default false,
  #FINALIZACION DE LA ORDEN
  fechaReparacion DATE not null,
  fechaEntrega DATE not null,
  reparacion varchar(750),
  precio real
);
create table empresa(
  #iNICIALIZACION DE LA EMPRESA
  idEmpresa SERIAL primary key,
  fechaCreacion DATE not null,
  nombre varchar(125) not null,
  telefono varchar(25),
  celular varchar(30),
  fax varchar(50),
  direccion varchar(400),
  garantia TEXT,
  primerMsjRecibo TEXT,
  segundoMsjRecibo TEXT,
  urlLogo TEXT,
  #ACTUALIZACION DE LA EMPRESA
  ultimaActualizacion TimesTamp,
  username varchar(50)
);
-- Queries de Busquedas, Inserciones --
select
  *
from usuario;
select
  *
from pedido;
select
  *
from empresa;
select
  UNIX_TIMESTAMP() * 1000
INSERT INTO `62RzbVtwzT`.usuario (
    username,
    passwd,
    cargo,
    isAdmin,
    createOn,
    updateOn
  )
VALUES(
    'ZERO',
    'admin',
    'encargado',
    1,
    '2019-10-20 00:00:01',
    '2019-10-20 00:00:01'
  );
select
  *
from empresa;
select
  e.*
from usuario u
inner join empresa e on (u.username = e.username)
where
  u.idUser = :id
  and u.cargo LIKE '%supervisor%'