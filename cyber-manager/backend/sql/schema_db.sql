-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cybermanager
-- ------------------------------------------------------
-- Server version	8.0.16
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET
  NAMES utf8;
  /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
  /*!40103 SET TIME_ZONE='+00:00' */;
  /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
  /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
  /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
  /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
  -- Table structure for table `enterprise`
  --
  -- DEPRECATED DATABASE SCHEMA -
  -- WE NEED UPDATE THIS SCHEMA WITH THE ORIGINAL
  DROP TABLE IF EXISTS `enterprise`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `enterprise` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(50) DEFAULT NULL,
    `enterpriseName` varchar(125) NOT NULL,
    `phone` varchar(25) DEFAULT NULL,
    `cellphone` varchar(30) DEFAULT NULL,
    `fax` varchar(50) DEFAULT NULL,
    `location` varchar(400) DEFAULT NULL,
    `enterpriseRules` text,
    `firstMessage` text,
    `secondMessage` text,
    `urlLogo` text,
    `createdDate` date NOT NULL,
    `lastUpdate` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idEnterprise` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `enterprise`
  --
  LOCK TABLES `enterprise` WRITE;
  /*!40000 ALTER TABLE `enterprise` DISABLE KEYS */;
INSERT INTO `enterprise`
VALUES
  (
    1,
    'n',
    'EmpresaX',
    '2222200033',
    '0999999',
    '1111',
    'Direccion 2222 Esquina x',
    'Los productos no se pueden devolver pasando el mes de entrega',
    'Anotacion de pie de reporte de entrada',
    'Anotacion de pie de reporte de salida',
    '',
    '2020-11-01',
    '2020-01-16 03:00:00'
  );
  /*!40000 ALTER TABLE `enterprise` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `order`
  --
  DROP TABLE IF EXISTS `order`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `order` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `clientName` varchar(75) NOT NULL,
    `clientPhone` varchar(25) DEFAULT NULL,
    `article` varchar(250) DEFAULT NULL,
    `model` varchar(100) DEFAULT NULL,
    `brand` varchar(100) DEFAULT NULL,
    `admissionDate` datetime NOT NULL,
    `repairDate` datetime DEFAULT NULL,
    `deliveryDate` datetime DEFAULT NULL,
    `reportedFailure` varchar(500) DEFAULT NULL,
    `observations` varchar(500) DEFAULT NULL,
    `reparation` varchar(750) DEFAULT NULL,
    `warranty` varchar(750) DEFAULT NULL,
    `price` double DEFAULT NULL,
    `isCanceled` tinyint(1) DEFAULT '0',
    `status` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idOrder` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `order`
  --
  LOCK TABLES `order` WRITE;
  /*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order`
VALUES
  (
    2,
    'sdf',
    '33',
    'sd',
    'sd',
    'sd',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    'sd',
    'sd',
    '',
    'WARRANTY XD',
    0,
    0,
    'Recibido'
  ),(
    3,
    's',
    '2',
    'd',
    'd',
    'd',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    'd',
    'd',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    4,
    '2',
    '2',
    '2',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    5,
    '2',
    '2',
    '2',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    6,
    '2',
    '2',
    '26-12',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    7,
    '2',
    '2',
    '22',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    8,
    '2',
    '2',
    '22',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    9,
    '2',
    '2',
    '26-11-2019 03:00:002',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    10,
    '2',
    '2',
    '26-11-2019 03:00:00',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    11,
    '2',
    '2',
    '2',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  ),(
    12,
    '2',
    '2',
    '2',
    '2',
    '2',
    '2020-01-15 00:00:00',
    NULL,
    NULL,
    '2',
    '2',
    NULL,
    NULL,
    NULL,
    0,
    'Recibido'
  );
  /*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `user`
  --
  DROP TABLE IF EXISTS `user`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `user` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `passwd` varchar(25) NOT NULL,
    `charge` varchar(75) DEFAULT NULL,
    `isAdmin` tinyint(1) DEFAULT NULL,
    `createOn` timestamp NULL DEFAULT NULL,
    `updateOn` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idUser` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `user`
  --
  LOCK TABLES `user` WRITE;
  /*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`
VALUES
  (
    1,
    'n',
    'n',
    'Supervisor',
    0,
    '2020-10-01 09:23:51',
    NULL
  ),(
    2,
    'maxi',
    'n',
    'Supervisor',
    0,
    '2020-11-01 04:08:02',
    NULL
  );
  /*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2020-01-17 19:29:52