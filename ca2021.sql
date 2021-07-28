-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: ca2021
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `City`
--

DROP TABLE IF EXISTS `City`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `City` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_countryId` (`countryId`),
  CONSTRAINT `fk_countryId` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `City`
--

LOCK TABLES `City` WRITE;
/*!40000 ALTER TABLE `City` DISABLE KEYS */;
INSERT INTO `City` VALUES (1,'Barcelona',1),(2,'Brasilia',3),(3,'Río de Janeiro',3),(4,'Cuiabá',3),(5,'Goiânia',3);
/*!40000 ALTER TABLE `City` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Club`
--

DROP TABLE IF EXISTS `Club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Club` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `nickname` varchar(512) DEFAULT NULL,
  `stadiumId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_c_stadiumId` (`stadiumId`),
  CONSTRAINT `fk_c_stadiumId` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Club`
--

LOCK TABLES `Club` WRITE;
/*!40000 ALTER TABLE `Club` DISABLE KEYS */;
INSERT INTO `Club` VALUES (1,'Barcelona','Barcelona',1);
/*!40000 ALTER TABLE `Club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Venezuela'),(2,'Colombia'),(3,'Brasil'),(4,'Chile'),(5,'Ecuador'),(6,'Paraguay'),(7,'Perú'),(8,'Uruguay'),(9,'Argentina'),(10,'Bolivia');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GlobalCupInfo`
--

DROP TABLE IF EXISTS `GlobalCupInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GlobalCupInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `edition` int NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `organizerName` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GlobalCupInfo`
--

LOCK TABLES `GlobalCupInfo` WRITE;
/*!40000 ALTER TABLE `GlobalCupInfo` DISABLE KEYS */;
INSERT INTO `GlobalCupInfo` VALUES (1,'Copa America 2021',47,'2021-06-13 17:00:00','2021-07-10 17:00:00','CONMEBOL');
/*!40000 ALTER TABLE `GlobalCupInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Group`
--

DROP TABLE IF EXISTS `Group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `globalCupInfoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_g_globalCupInfoId` (`globalCupInfoId`),
  CONSTRAINT `fk_g_globalCupInfoId` FOREIGN KEY (`globalCupInfoId`) REFERENCES `GlobalCupInfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Group`
--

LOCK TABLES `Group` WRITE;
/*!40000 ALTER TABLE `Group` DISABLE KEYS */;
INSERT INTO `Group` VALUES (1,'Grupo A',1),(2,'Grupo B',1);
/*!40000 ALTER TABLE `Group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HostCountry`
--

DROP TABLE IF EXISTS `HostCountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HostCountry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryId` int DEFAULT NULL,
  `globalCupInfoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hc_countryId` (`countryId`),
  KEY `fk_hc_globalCupInfoId` (`globalCupInfoId`),
  CONSTRAINT `fk_hc_countryId` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`),
  CONSTRAINT `fk_hc_globalCupInfoId` FOREIGN KEY (`globalCupInfoId`) REFERENCES `GlobalCupInfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HostCountry`
--

LOCK TABLES `HostCountry` WRITE;
/*!40000 ALTER TABLE `HostCountry` DISABLE KEYS */;
INSERT INTO `HostCountry` VALUES (1,2,1),(2,9,1);
/*!40000 ALTER TABLE `HostCountry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LineUp`
--

DROP TABLE IF EXISTS `LineUp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LineUp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `coachSignature` varchar(512) NOT NULL,
  `capSignature` varchar(512) NOT NULL,
  `matchId` int DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lu_matchId` (`matchId`),
  KEY `fk_lu_teamId` (`teamId`),
  CONSTRAINT `fk_lu_matchId` FOREIGN KEY (`matchId`) REFERENCES `Match` (`id`),
  CONSTRAINT `fk_lu_teamId` FOREIGN KEY (`teamId`) REFERENCES `Team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LineUp`
--

LOCK TABLES `LineUp` WRITE;
/*!40000 ALTER TABLE `LineUp` DISABLE KEYS */;
/*!40000 ALTER TABLE `LineUp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LineUpPlayer`
--

DROP TABLE IF EXISTS `LineUpPlayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LineUpPlayer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isStarter` tinyint(1) NOT NULL,
  `lineupNumber` int NOT NULL,
  `lineUpId` int DEFAULT NULL,
  `playerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lup_playerId` (`playerId`),
  KEY `fk_lup_lineUpId` (`lineUpId`),
  CONSTRAINT `fk_lup_lineUpId` FOREIGN KEY (`lineUpId`) REFERENCES `LineUp` (`id`),
  CONSTRAINT `fk_lup_playerId` FOREIGN KEY (`playerId`) REFERENCES `Player` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LineUpPlayer`
--

LOCK TABLES `LineUpPlayer` WRITE;
/*!40000 ALTER TABLE `LineUpPlayer` DISABLE KEYS */;
/*!40000 ALTER TABLE `LineUpPlayer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Match`
--

DROP TABLE IF EXISTS `Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `matchNumber` int NOT NULL,
  `stageId` int DEFAULT NULL,
  `refereeId` int DEFAULT NULL,
  `homeTeamId` int DEFAULT NULL,
  `awayTeamId` int DEFAULT NULL,
  `stadiumId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_m_stageId` (`stageId`),
  KEY `fk_m_refereeId` (`refereeId`),
  KEY `fk_m_homeTeamId` (`homeTeamId`),
  KEY `fk_m_stadiumId` (`stadiumId`),
  CONSTRAINT `fk_m_homeTeamId` FOREIGN KEY (`homeTeamId`) REFERENCES `Team` (`id`),
  CONSTRAINT `fk_m_refereeId` FOREIGN KEY (`refereeId`) REFERENCES `Referee` (`id`),
  CONSTRAINT `fk_m_stadiumId` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium` (`id`),
  CONSTRAINT `fk_m_stageId` FOREIGN KEY (`stageId`) REFERENCES `Stage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Match`
--

LOCK TABLES `Match` WRITE;
/*!40000 ALTER TABLE `Match` DISABLE KEYS */;
INSERT INTO `Match` VALUES (1,'2021-06-13 17:00:00',1,1,1,2,5,1),(2,'2021-06-14 17:00:00',2,1,2,11,6,2),(3,'2021-06-15 17:00:00',3,1,3,5,6,3),(4,'2021-06-16 17:00:00',4,1,4,2,3,1),(5,'2021-06-17 17:00:00',5,1,5,3,5,2),(6,'2021-06-18 17:00:00',6,1,2,2,11,3),(7,'2021-06-19 17:00:00',7,1,1,6,3,4),(8,'2021-06-20 17:00:00',8,1,2,5,11,1),(9,'2021-06-21 17:00:00',9,1,3,2,3,2),(10,'2021-06-22 17:00:00',10,1,5,6,3,3),(11,'2021-06-23 17:00:00',11,1,8,3,11,4),(12,'2021-06-24 17:00:00',12,1,4,7,1,2),(13,'2021-06-25 17:00:00',13,1,10,9,10,1),(14,'2021-06-26 17:00:00',14,1,11,9,1,1),(15,'2021-06-27 17:00:00',15,1,17,7,8,2),(16,'2021-06-28 17:00:00',16,1,18,1,10,2),(17,'2021-06-29 17:00:00',17,1,15,9,8,2),(18,'2021-06-30 17:00:00',18,1,14,10,8,2),(19,'2021-07-01 17:00:00',19,1,13,7,9,3),(20,'2021-07-02 17:00:00',20,1,12,1,8,2),(21,'2021-07-03 17:00:00',21,2,11,11,8,2),(22,'2021-07-04 17:00:00',22,2,10,7,5,2),(23,'2021-07-05 17:00:00',23,2,9,3,9,1),(24,'2021-07-06 17:00:00',24,2,8,2,10,2),(25,'2021-07-07 17:00:00',25,3,7,7,8,2),(26,'2021-07-08 17:00:00',26,3,6,2,9,1),(27,'2021-07-09 17:00:00',27,4,5,9,8,5),(28,'2021-07-10 17:00:00',28,5,1,2,7,1);
/*!40000 ALTER TABLE `Match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MatchResults`
--

DROP TABLE IF EXISTS `MatchResults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MatchResults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `homeTeamGoals` int NOT NULL,
  `awayTeamGoals` int NOT NULL,
  `matchId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matchId` (`matchId`),
  CONSTRAINT `fk_mr_matchId` FOREIGN KEY (`matchId`) REFERENCES `Match` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MatchResults`
--

LOCK TABLES `MatchResults` WRITE;
/*!40000 ALTER TABLE `MatchResults` DISABLE KEYS */;
/*!40000 ALTER TABLE `MatchResults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Player`
--

DROP TABLE IF EXISTS `Player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shirtNumber` int NOT NULL,
  `firstName` varchar(512) NOT NULL,
  `lastName` varchar(512) NOT NULL,
  `nickName` varchar(512) NOT NULL,
  `nameOnShirt` varchar(512) NOT NULL,
  `birthDate` datetime NOT NULL,
  `passportNumber` int NOT NULL,
  `passportExpirationDate` datetime NOT NULL,
  `weight` int NOT NULL,
  `height` int NOT NULL,
  `isCoach` tinyint(1) NOT NULL,
  `nationalityId` int DEFAULT NULL,
  `playerPositionId` int DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  `clubId` int DEFAULT NULL,
  `isOnFinalList` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_p_nationalityId` (`nationalityId`),
  KEY `fk_p_playerPositionId` (`playerPositionId`),
  KEY `fk_p_teamId` (`teamId`),
  KEY `fk_p_clubId` (`clubId`),
  CONSTRAINT `fk_p_clubId` FOREIGN KEY (`clubId`) REFERENCES `Club` (`id`),
  CONSTRAINT `fk_p_nationalityId` FOREIGN KEY (`nationalityId`) REFERENCES `Country` (`id`),
  CONSTRAINT `fk_p_playerPositionId` FOREIGN KEY (`playerPositionId`) REFERENCES `PlayerPosition` (`id`),
  CONSTRAINT `fk_p_teamId` FOREIGN KEY (`teamId`) REFERENCES `Team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Player`
--

LOCK TABLES `Player` WRITE;
/*!40000 ALTER TABLE `Player` DISABLE KEYS */;
INSERT INTO `Player` VALUES (1,5,'Juan','Ramos','Pastor','Pastor','1993-02-15 01:22:11',4894344,'2021-07-28 01:22:11',70,165,0,1,4,1,1,1),(2,2,'Some','Perez','Perez','Perez','1990-07-28 01:22:11',4894856,'2021-07-28 01:22:11',23,165,1,1,1,1,1,1),(3,10,'Lionel','Messi','La Pulga','Messi','1980-07-28 01:22:11',1115548,'2021-07-28 01:22:11',80,100,0,9,4,2,1,1),(4,3,'Armando','Esteban','Esteban','Esteban','1992-07-20 01:22:11',2344324,'2021-07-25 01:22:11',50,120,0,2,2,3,1,1);
/*!40000 ALTER TABLE `Player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlayerPosition`
--

DROP TABLE IF EXISTS `PlayerPosition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlayerPosition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlayerPosition`
--

LOCK TABLES `PlayerPosition` WRITE;
/*!40000 ALTER TABLE `PlayerPosition` DISABLE KEYS */;
INSERT INTO `PlayerPosition` VALUES (1,'Portero'),(2,'Defensa'),(3,'Mediocampista'),(4,'Delantero');
/*!40000 ALTER TABLE `PlayerPosition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Referee`
--

DROP TABLE IF EXISTS `Referee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Referee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rf_countryId` (`countryId`),
  CONSTRAINT `fk_rf_countryId` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Referee`
--

LOCK TABLES `Referee` WRITE;
/*!40000 ALTER TABLE `Referee` DISABLE KEYS */;
INSERT INTO `Referee` VALUES (1,' Néstor Pitana',9),(2,' Patricio Loustau',3),(3,' Gery Vargas',3),(4,' Wilton Sampaio',4),(5,' Raphael Claus',5),(6,' Roberto Tobar',5),(7,' Ángelo Hermosilla',5),(8,' Wilmar Roldán',7),(9,' Andrés Rojas',2),(10,' Guillermo Guerrero',6),(11,' Augusto Aragón',6),(12,' Eber Aquino',6),(13,' Kevin Ortega',6),(14,' Víctor Hugo Carrillo',6),(15,' Esteban Ostojich',6),(16,' Andrés Matonte',6),(17,' Alexis Herrera',1),(18,' Jesús Gil Manzano',3);
/*!40000 ALTER TABLE `Referee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stadium`
--

DROP TABLE IF EXISTS `Stadium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stadium` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `cityId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_s_cityId` (`cityId`),
  CONSTRAINT `fk_s_cityId` FOREIGN KEY (`cityId`) REFERENCES `City` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stadium`
--

LOCK TABLES `Stadium` WRITE;
/*!40000 ALTER TABLE `Stadium` DISABLE KEYS */;
INSERT INTO `Stadium` VALUES (1,'Maracaná',3),(2,'Nilton Santos',3),(3,'Mané Garrincha',2),(4,'Arena Pantanal',4),(5,'Olímpico',5);
/*!40000 ALTER TABLE `Stadium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stage`
--

DROP TABLE IF EXISTS `Stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stage`
--

LOCK TABLES `Stage` WRITE;
/*!40000 ALTER TABLE `Stage` DISABLE KEYS */;
INSERT INTO `Stage` VALUES (1,'Fase de Grupos'),(2,'Cuartos de Final'),(3,'Semifinal'),(4,'Tercer puesto'),(5,'Final');
/*!40000 ALTER TABLE `Stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(512) DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `groupId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countryId` (`countryId`),
  KEY `fk_t_groupId` (`groupId`),
  CONSTRAINT `fk_t_countryId` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`),
  CONSTRAINT `fk_t_groupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
INSERT INTO `Team` VALUES (1,'La Vinotinto',1,2),(2,'La Albiceleste',9,1),(3,'Los Charrúas',8,1),(5,'La Roja',4,1),(6,'La Verde',10,1),(7,'La Canarinha',3,2),(8,'Los Incas',7,2),(9,'La Tricolor C',2,2),(10,'La Tricolor',5,2),(11,'Los Guaraníes',6,1);
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-28 10:40:58
