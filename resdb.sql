-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: resdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_dish`
--

DROP TABLE IF EXISTS `category_dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `UKm5kn5wq0684oyevgmqt0yjou0` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_dish`
--

LOCK TABLES `category_dish` WRITE;
/*!40000 ALTER TABLE `category_dish` DISABLE KEYS */;
INSERT INTO `category_dish` VALUES (1,'Khai vị'),(2,'Món chính'),(3,'Thức uống'),(4,'Tráng miệng');
/*!40000 ALTER TABLE `category_dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `imgae` varchar(150) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `UKr7g2l08wdh3uv3gvurli4s1bx` (`name`),
  KEY `fk_category_dish_id_idx` (`category_id`),
  CONSTRAINT `fk_category_dish_id` FOREIGN KEY (`category_id`) REFERENCES `category_dish` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (3,'Tôm chiên xù',1,'https://naifood.com/wp-content/uploads/2022/03/tom-chien-xu.jpg',200),(4,'Chả giò hải sản',1,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',150),(5,'Bò kho bánh mì',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(6,'Gà bó xôi',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',300),(7,'Cơm chiên',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',200),(8,'Tôm hấp bia',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',250),(9,'Dê hấp sả',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(10,'Lẩu cá lăng',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(11,'Lẩu thái',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(12,'Lẩu rêu cua đồng',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(13,'Chè bưởi',3,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',100),(14,'Bánh tiramisu',3,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',120),(15,'Trái cây',3,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',80),(16,'Rau câu',3,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',80),(17,'Chè đậu xanh',3,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',100),(20,'Salad cá ngừ',1,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',200),(21,'Salad trái cây',1,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',150),(22,'Bò sốt vang',2,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',350),(23,'Bia',4,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',20),(24,'Nước ngọt',4,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',15),(25,'Nước suối',4,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',10),(50,'Gà tầm',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662270009/mlx6cl1vsbcucnbn20t0.jpg',200),(51,'Com',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662291343/ybj01ux0fgvgxeismtjr.jpg',2000),(53,'Khai vị bốn mùa',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309241/zcrabknuwe2nvmjcz10g.jpg',100),(55,'Khai vị',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',10000),(56,'Cơm gà',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',1000),(58,'Gà hầm thuốc bắc',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',2000),(59,'Chả ram tôm đất',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',20000),(60,'Bò xào lăn',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',2000),(61,'Khai vị 4 món ',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',6000),(62,'Cơm gà hải nam',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',2500),(63,'Súp nấm bào ngư',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',2600),(64,'Bào ngư vi cá ',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',3000),(65,'Cá kho tộ ',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',2500),(66,'Gà xào lăn',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',3000),(67,'Gà hầm thuốc bắc hạt sen',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',250),(68,'Heo nướng ',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',270),(69,'Heo sữa nướng ',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',300),(70,'Chân gà sốt tắc',1,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',160),(71,'Thịt dê xào sả ớt ',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',200),(72,'Dê xào lăn',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',300),(73,'Bò nướng mỹ',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',200),(78,'Thịt chó',1,'hhhhh',100),(79,'Thịt heo',1,'hhhhh',120),(80,'Thịt',1,'hhhhh',120),(81,'Basnh',1,'hhhhh',120),(82,'hello',2,'none',120),(85,'Jkasdjlkajdl',2,'none',120),(86,'Bò',2,'none',120),(87,'helasld',2,'hello',120),(88,'Hdlasdlasl',2,'https://res.cloudinary.com/giahuyoke/image/upload/v1665213648/tx6fysimojfqhr0rqagh.jpg',200),(89,'ádasđsa',2,'https://res.cloudinary.com/giahuyoke/image/upload/v1665222298/xdxqknwhzyx1lcyscyot.jpg',200),(90,'cáidbaksnads',2,'https://res.cloudinary.com/giahuyoke/image/upload/v1665223654/iqqyznxaelv0djxc67yj.jpg',200),(91,'helloooo',2,'https://res.cloudinary.com/giahuyoke/image/upload/v1665224627/jbecnc9ifc3nelw40igm.jpg',200),(92,'Khoa ăn cơm',2,'https://res.cloudinary.com/giahuyoke/image/upload/v1665297245/rmih7ifqw8pkdb3b0adr.jpg',200);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(250) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_idx` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (6,11,'hello','2022-09-03 22:23:44'),(7,11,'gà vcl','2022-09-03 22:47:15');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_service`
--

DROP TABLE IF EXISTS `list_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_service`
--

LOCK TABLES `list_service` WRITE;
/*!40000 ALTER TABLE `list_service` DISABLE KEYS */;
INSERT INTO `list_service` VALUES (1,100),(2,10500),(3,10500),(4,12500),(5,10500),(6,2000),(7,500),(8,10000),(9,10500),(10,500),(11,500),(12,10000),(13,10500),(14,10000),(15,10000),(16,10000),(17,10000),(18,10000),(19,1000),(20,1000),(21,500),(22,500),(23,500),(24,500),(25,500),(26,500),(27,1000),(28,1000),(29,10000),(30,10000),(31,10000),(32,10000),(33,10000),(34,500),(35,500),(36,500),(37,500),(38,500),(39,10000),(40,10000),(41,500),(42,500),(43,500),(44,500),(45,500),(46,500),(47,500),(48,500),(49,500),(50,10500),(51,10500),(52,10500),(53,10000),(54,10000),(55,10000),(56,10000),(57,10000),(58,10500),(59,10500),(60,500),(61,10000),(62,500),(63,500),(64,500),(65,10000),(66,10000),(67,10000),(68,500),(69,10500),(70,500),(71,10000),(72,10000),(73,500),(74,500),(75,500),(76,10500),(77,10500),(78,500),(79,10500),(80,10500),(81,500),(82,10500),(83,10500),(84,0),(85,10000),(86,10000),(87,10000);
/*!40000 ALTER TABLE `list_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_describe` varchar(45) DEFAULT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,NULL,200),(8,NULL,350),(9,NULL,350),(10,NULL,450),(11,NULL,350),(12,NULL,250),(13,NULL,250),(14,NULL,100),(15,NULL,150),(16,NULL,450),(17,NULL,150),(18,NULL,100),(19,NULL,250),(20,NULL,250),(21,NULL,350),(22,NULL,250),(23,NULL,250),(24,NULL,200),(25,NULL,200),(26,NULL,100),(27,NULL,100),(28,NULL,100),(29,NULL,100),(30,NULL,100),(31,NULL,100),(32,NULL,450),(33,NULL,450),(34,NULL,150),(35,NULL,150),(36,NULL,200),(37,NULL,200),(38,NULL,150),(39,NULL,150),(40,NULL,150),(41,NULL,250),(42,NULL,250),(43,NULL,250),(44,NULL,250),(45,NULL,250),(46,NULL,250),(47,NULL,250),(48,NULL,250),(49,NULL,250),(50,NULL,100),(51,NULL,100),(52,NULL,100),(53,NULL,100),(54,NULL,100),(55,NULL,250),(56,NULL,250),(57,NULL,250),(58,NULL,250),(59,NULL,250),(60,NULL,250),(61,NULL,250),(62,NULL,150),(63,NULL,150),(64,NULL,150),(65,NULL,250),(66,NULL,250),(67,NULL,350),(68,NULL,150),(69,NULL,100),(70,NULL,100),(71,NULL,100),(72,NULL,350),(73,NULL,350),(74,NULL,350),(75,NULL,250),(76,NULL,350),(77,NULL,350),(78,NULL,150),(79,NULL,350),(80,NULL,150),(81,NULL,150),(82,NULL,150),(83,NULL,500),(84,NULL,250),(85,NULL,350),(86,NULL,250),(87,NULL,250),(88,NULL,350),(118,NULL,2350),(119,NULL,2350),(120,NULL,1340),(121,NULL,1210),(122,NULL,1210),(123,NULL,1270);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_dish`
--

DROP TABLE IF EXISTS `menu_dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_id` int NOT NULL,
  `dish_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_menu_id_idx` (`menu_id`),
  KEY `fk_dish_id_idx` (`dish_id`),
  CONSTRAINT `fk_dish_id` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=313 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_dish`
--

LOCK TABLES `menu_dish` WRITE;
/*!40000 ALTER TABLE `menu_dish` DISABLE KEYS */;
INSERT INTO `menu_dish` VALUES (27,1,3),(28,8,3),(31,9,3),(34,10,3),(36,11,3),(45,16,3),(53,21,3),(58,24,20),(59,25,20),(68,32,3),(71,33,3),(74,36,20),(75,37,20),(124,67,3),(130,72,3),(132,73,3),(134,74,3),(138,76,3),(140,77,3),(143,79,3),(148,83,3),(149,83,4),(153,85,3),(159,88,3),(277,118,3),(278,118,51),(280,119,3),(281,119,51),(282,120,6),(283,120,5),(286,120,6),(287,120,14),(288,120,23),(291,121,6),(292,121,7),(293,121,8),(294,121,14),(295,121,15),(296,121,25),(299,122,6),(300,122,7),(301,122,8),(302,122,14),(303,122,15),(304,122,25),(307,123,7),(308,123,6),(309,123,5),(310,123,15),(311,123,16),(312,123,25);
/*!40000 ALTER TABLE `menu_dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_wedding_time`
--

DROP TABLE IF EXISTS `price_wedding_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_wedding_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `session` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_wedding_time`
--

LOCK TABLES `price_wedding_time` WRITE;
/*!40000 ALTER TABLE `price_wedding_time` DISABLE KEYS */;
INSERT INTO `price_wedding_time` VALUES (1,1,'morning'),(2,1.3,'affternoon'),(3,1.5,'night');
/*!40000 ALTER TABLE `price_wedding_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `service_describe` text,
  `name` varchar(45) NOT NULL,
  `image` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `UKadgojnrwwx9c3y3qa2q08uuqp` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,2000,'Người dẫn chương trình trong tiệc cưới','MC','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(2,500,NULL,'Bánh kem','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(3,10000,NULL,'Thuê trang phục cưới','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(4,2000,NULL,'Trang điểm','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(5,3000,NULL,'Quay phim ngày cưới','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(6,1000,NULL,'Trang trí tiệc cưới','https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg'),(10,2000,'Không có gì ','Âm thanh sống động','https://res.cloudinary.com/dzznkotwg/image/upload/v1662310374/ajudzxfjh2suu5w5s5qg.jpg');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_detail`
--

DROP TABLE IF EXISTS `services_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `list_service_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_id_idx` (`service_id`),
  KEY `fk_list_service_id_idx` (`list_service_id`),
  CONSTRAINT `fk_list_service_id` FOREIGN KEY (`list_service_id`) REFERENCES `list_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_service_id` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_detail`
--

LOCK TABLES `services_detail` WRITE;
/*!40000 ALTER TABLE `services_detail` DISABLE KEYS */;
INSERT INTO `services_detail` VALUES (1,2,1),(2,3,1),(3,3,2),(4,2,2),(5,3,3),(6,2,3),(7,3,4),(8,2,4),(9,1,4),(10,2,5),(11,3,5),(12,1,6),(13,2,7),(14,3,8),(15,2,9),(16,3,9),(17,2,10),(18,2,11),(19,3,12),(20,2,13),(21,3,13),(22,3,14),(23,3,15),(24,3,16),(25,3,17),(26,3,18),(27,6,19),(28,6,20),(29,2,21),(30,2,22),(31,2,23),(32,2,24),(33,2,25),(34,2,26),(35,6,27),(36,6,28),(37,3,29),(38,3,30),(39,3,31),(40,3,32),(41,3,33),(42,2,34),(43,2,35),(44,2,36),(45,2,37),(46,2,38),(47,3,39),(48,3,40),(49,2,41),(50,2,42),(51,2,43),(52,2,44),(53,2,45),(54,2,46),(55,2,47),(56,2,48),(57,2,49),(58,2,50),(59,3,50),(60,2,51),(61,3,51),(62,2,52),(63,3,52),(64,3,53),(65,3,54),(66,3,55),(67,3,56),(68,3,57),(69,2,58),(70,3,58),(71,2,59),(72,3,59),(73,2,60),(74,3,61),(75,2,62),(76,2,63),(77,2,64),(78,3,65),(79,3,66),(80,3,67),(81,2,68),(82,2,69),(83,3,69),(84,2,70),(85,3,71),(86,3,72),(87,2,73),(88,2,74),(89,2,75),(90,3,76),(91,2,76),(92,2,77),(93,3,77),(94,2,78),(95,2,80),(96,2,79),(97,3,79),(98,3,80),(99,2,81),(100,2,82),(101,3,82),(102,2,83),(103,3,83),(104,3,85),(105,3,86),(106,3,87);
/*!40000 ALTER TABLE `services_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_party`
--

DROP TABLE IF EXISTS `type_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_party` (
  `id` int NOT NULL,
  `name_party` varchar(45) NOT NULL,
  `image_type` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_party`
--

LOCK TABLES `type_party` WRITE;
/*!40000 ALTER TABLE `type_party` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  `birthday` date NOT NULL,
  `role` varchar(45) NOT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  `mobile` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKcnjwxx5favk5ycqajjt17fwy1` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,'dan12gkhoa123bn@gmail.com','$2a$10$exSrFxGh4KoMIkT5tNry8uGa5n117ybwmYExbV0jJDeJkCFH0R0Ay','Ho112','2002-12-19','ROLE_ADMIN','https://res.cloudinary.com/dzznkotwg/image/upload/v1662212938/cly4agr9gnnenmmmmcgh.jpg','0972257123'),(12,'dangkhoa123bn@gmail.com','$2a$10$JfAK.83LdMkDSPpAy2WEXeSbyzIsFaZ/zr/9wkNNQDbttFUnkSefG','Khoa12','2001-12-19','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662217054/q4mzax97snlrvdm04rr2.jpg','0972257687'),(13,'khoa@gmail.com','$2a$10$jYbbBLc/e4OLP8kkLYj0HOR7QPidGB1zxgT6tHtiwzD8FgqnlErw2','khoa','2001-12-19','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662226668/b6droti0livth1warkik.png','1111111111'),(14,'giahuyoke01@gmail.com','$2a$10$eSuTiTt88fof1JAK/ydfy..haRc0SOnVLRKWDo8gAoMH2aGSNR9Yq','Lưu Gia Huy','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662292224/xuugnanknlpz4hxzdyph.jpg','0947549001'),(15,'giahuyoke02@gmail.com','$2a$10$4y2lMG0PkdHtuddwhl19fe9nPpM75z3PSvAlGQD16ZHkhYgNEtCse','Huy','2001-12-10','ROLE_ADMIN','https://res.cloudinary.com/dzznkotwg/image/upload/v1662292224/xuugnanknlpz4hxzdyph.jpg','0947549002'),(16,'hello@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Huy','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','1234567890'),(17,'dangkhoa123bnn@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Khoa','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549003'),(18,'hello1@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Đạt','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549007'),(19,'hello2@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Hưng','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549012'),(20,'hello3@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Kiên','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549015'),(21,'hello4@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Lâm','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549020'),(22,'hello5@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Tâm','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549021'),(23,'hello6@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','My','2001-12-10','ROLE_USER','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549022'),(24,'hello7@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Hưng','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549023'),(25,'hello8@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Sơn','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549024'),(26,'hello9@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Thái','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549025'),(27,'hello10@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Khoa bé ba','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549026'),(28,'hello11@gmail.com','$2a$10$3vrh3BNHyROn1L.HMoyl/.2vt/pAkkzILq03x6G0FrHI6GNsm1B46','Thanh','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549027'),(29,'test','$2a$10$eSuTiTt88fof1JAK/ydfy..haRc0SOnVLRKWDo8gAoMH2aGSNR9Yq','test','2001-12-10','ROLE_STAFF','https://res.cloudinary.com/dzznkotwg/image/upload/v1662299546/pry8fso8br4nfi6ad8pq.jpg','0947549227');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_hall`
--

DROP TABLE IF EXISTS `wedding_hall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_hall` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `capacity` int NOT NULL,
  `describe_hall` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `price` int NOT NULL,
  `image` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_hall`
--

LOCK TABLES `wedding_hall` WRITE;
/*!40000 ALTER TABLE `wedding_hall` DISABLE KEYS */;
INSERT INTO `wedding_hall` VALUES (1,'Rose',30,NULL,NULL,3000,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(2,'SunFlower',30,NULL,'Hỏng',2800,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(3,'Camellia',30,NULL,NULL,2700,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(5,'Tulip',20,NULL,NULL,2800,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(6,'Lotus',20,NULL,NULL,2700,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(7,'Pense',10,NULL,NULL,1000,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(8,'Violet',10,NULL,NULL,1200,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(12,'đã đổi chưa nè',50,NULL,'',2000,'https://res.cloudinary.com/giahuyoke/image/upload/v1665395105/dtnbu8chxjarkd2zxj5u.jpg'),(13,'hello',50,NULL,'',2000,'https://res.cloudinary.com/giahuyoke/image/upload/v1665395144/hmueg6nrucrylha6qoes.jpg'),(14,'sảnh hoa hướng dương',50,NULL,'',2000,'https://res.cloudinary.com/giahuyoke/image/upload/v1665459920/xspfkbp72amyckaodxdi.jpg');
/*!40000 ALTER TABLE `wedding_hall` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_party_orders`
--

DROP TABLE IF EXISTS `wedding_party_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_party_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `wh_id` int DEFAULT NULL,
  `pwt_id` int DEFAULT NULL,
  `order_date` date NOT NULL,
  `menu_id` int NOT NULL,
  `amount` int NOT NULL,
  `payment_status` tinyint(1) NOT NULL,
  `type_pay` varchar(45) NOT NULL,
  `quantity_table` int NOT NULL,
  `note` varchar(45) DEFAULT NULL,
  `list_service_id` int NOT NULL,
  `type_party` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menu_id_UNIQUE` (`menu_id`),
  UNIQUE KEY `list_service_id_UNIQUE` (`list_service_id`),
  UNIQUE KEY `UKfnl9cifflr71xsqoltpg7la2y` (`list_service_id`),
  UNIQUE KEY `UKai1xsq9chvsbeyawlgg39qo82` (`menu_id`),
  UNIQUE KEY `UK_fnl9cifflr71xsqoltpg7la2y` (`list_service_id`),
  UNIQUE KEY `UK_ai1xsq9chvsbeyawlgg39qo82` (`menu_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_menu_id_idx` (`menu_id`),
  KEY `fk_pwt_id_idx` (`pwt_id`),
  KEY `fk_wh_id_idx` (`wh_id`),
  KEY `fk_list_service_idx` (`list_service_id`),
  KEY `fk_wh_tp_idx` (`type_party`),
  CONSTRAINT `fk_list_service` FOREIGN KEY (`list_service_id`) REFERENCES `list_service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pwt_id` FOREIGN KEY (`pwt_id`) REFERENCES `price_wedding_time` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_wh_id` FOREIGN KEY (`wh_id`) REFERENCES `wedding_hall` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_wh_tp` FOREIGN KEY (`type_party`) REFERENCES `type_party` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_party_orders`
--

LOCK TABLES `wedding_party_orders` WRITE;
/*!40000 ALTER TABLE `wedding_party_orders` DISABLE KEYS */;
INSERT INTO `wedding_party_orders` VALUES (104,11,1,2,'2022-09-21',82,7400,1,'momo',20,NULL,75,NULL),(105,11,1,1,'2022-12-12',83,23500,1,'momo-card',20,NULL,76,NULL),(106,11,1,3,'2022-09-16',84,20000,1,'momo',20,NULL,77,NULL),(107,11,1,3,'2022-09-07',85,12000,1,'momo-card',20,NULL,78,NULL),(108,13,1,1,'2022-09-21',86,33500,1,'momo',80,NULL,80,NULL),(109,13,1,1,'2022-09-21',87,33500,0,'momo',80,NULL,79,NULL),(110,13,1,1,'2022-09-21',88,10500,0,'momo',20,NULL,81,NULL),(111,15,3,3,'2022-09-06',118,61550,0,'momo',20,NULL,82,NULL),(112,15,3,3,'2022-09-06',119,61550,0,'momo',20,NULL,83,NULL),(113,16,8,2,'2022-09-08',120,28360,0,'momo',20,NULL,84,NULL),(114,16,5,1,'2022-09-07',121,37000,0,'momo',20,NULL,85,NULL),(115,16,5,1,'2022-09-07',122,37000,1,'momo',20,NULL,86,NULL),(116,16,7,2,'2022-09-06',123,36700,1,'momo',20,NULL,87,NULL);
/*!40000 ALTER TABLE `wedding_party_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-11 16:37:42
