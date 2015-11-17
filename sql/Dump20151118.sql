CREATE DATABASE  IF NOT EXISTS `remitr` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `remitr`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: remitr
-- ------------------------------------------------------
-- Server version	5.6.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userProperties`
--

DROP TABLE IF EXISTS `userProperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userProperties` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `value` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `userId` int(10) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `userproperties_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userProperties`
--

LOCK TABLES `userProperties` WRITE;
/*!40000 ALTER TABLE `userProperties` DISABLE KEYS */;
INSERT INTO `userProperties` VALUES (1,'address1','Near tilak nagar','submitted',2,'text'),(2,'address2','Nau parar','draft',2,'text'),(7,'new','property','draft',2,'text'),(9,'secon','pro','draft',2,'text'),(10,'hello','worl','draft',2,'text'),(11,'facebook','http://www.facebook.com','draft',10,'url'),(12,'hello','world','draft',10,'text'),(13,'hello','world','draft',10,'text');
/*!40000 ALTER TABLE `userProperties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userPropertyAudits`
--

DROP TABLE IF EXISTS `userPropertyAudits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userPropertyAudits` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `userPropertyId` int(20) NOT NULL,
  `currentStatus` varchar(20) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userPropertyId` (`userPropertyId`),
  CONSTRAINT `userpropertyaudits_ibfk_1` FOREIGN KEY (`userPropertyId`) REFERENCES `userProperties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userPropertyAudits`
--

LOCK TABLES `userPropertyAudits` WRITE;
/*!40000 ALTER TABLE `userPropertyAudits` DISABLE KEYS */;
INSERT INTO `userPropertyAudits` VALUES (1,10,'draft','2015-11-18 00:44:59');
/*!40000 ALTER TABLE `userPropertyAudits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(10) DEFAULT NULL,
  `lastName` varchar(20) NOT NULL,
  `dateOfBirth` varchar(50) DEFAULT NULL,
  `accountNo` int(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `roleId` int(10) NOT NULL,
  `guid` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid` (`guid`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'parag','kumar','radke',NULL,124353453,'parag@email.com',2,'e2bf0055-3561-4a5d-9678-e3d653161457'),(4,'pranay','kumar','radke','2015-12-30T18:30:00.000Z',989898989,'pranay@email.com',1,'6d81bd2f-471f-425c-96b6-b804e8e587a9'),(5,'Sachine','Kumar','tendulkar','2015-12-30T18:30:00.000Z',989797979,'sachine@email.com',2,'6e843dc0-b481-4527-9708-d6cb4cff0365'),(6,'joo','jooo','jojo','2015-12-30T18:30:00.000Z',908080808,'oj@email.com',1,'b9b2a7f9-3d7a-4ed9-a9a8-048af7869475'),(7,'too','hoo','ho','2015-12-30T18:30:00.000Z',989998,'ho@ho.com',1,'bfb6c883-896e-47cc-9618-6a3da7673a92'),(8,'too','hoo','ho','2015-12-30T18:30:00.000Z',989998,'ho@ho.com',1,'a24a5da7-52be-4bd3-9bc4-8d0f931e5856'),(9,'too','hoo','ho','2015-12-30T18:30:00.000Z',989998,'ho@ho.com',1,'5c8dcbc4-6639-425a-b558-ec19dffc19a2'),(10,'hoo','ho','hkj','2015-12-30T18:30:00.000Z',989898,'op@g.com',1,'f214da0b-0931-4247-a9fb-ed557e9e1b5d');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-18  0:52:26
