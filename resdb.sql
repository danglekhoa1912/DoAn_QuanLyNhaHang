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
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (3,'Tôm chiên xù',1,'https://naifood.com/wp-content/uploads/2022/03/tom-chien-xu.jpg',200),(4,'Chả giò hải sản',1,'https://naifood.com/wp-content/uploads/2022/02/cha-gio-re-dat-tiec-buffet9.jpg',150),(5,'Bò kho bánh mì',2,'https://lukitchen.com/wp-content/uploads/2020/07/banh-mi-bo-kho.jpg',350),(6,'Gà bó xôi',2,'https://songkhoe.medplus.vn/wp-content/uploads/2020/03/meo-lam-ga-bo-xoi-them-thom-ngon-gion-rum.png',300),(7,'Cơm chiên',2,'https://img-global.cpcdn.com/recipes/17a716b89c1a1d0b/680x482cq70/c%C6%A1m-chien-h%E1%BA%A3i-s%E1%BA%A3n-trai-th%C6%A1m-recipe-main-photo.jpg',200),(8,'Tôm Hùm hấp bia',2,'https://tomhumpl.com/wp-content/uploads/2020/12/Tom-hum-hap-bia.jpg',250),(9,'Dê hấp sả',2,'https://cdn.daotaobeptruong.vn/wp-content/uploads/2019/09/thit-de-hap.jpg',350),(10,'Lẩu cá lăng',2,'https://lahata.vn/thumb/585x470/files/product/2022/01/03/product-121254.jpg',350),(11,'Lẩu thái',2,'https://cdn.cet.edu.vn/wp-content/uploads/2018/03/hinh-anh-lau-thai-chua-cay.jpg',350),(12,'Lẩu riêu cua đồng',2,'https://bepmina.vn/wp-content/uploads/2021/12/lau-cua-dong-ngon.jpeg',350),(13,'Chè bưởi',3,'https://cdn.tgdd.vn/Files/2021/05/27/1355192/cach-nau-che-buoi-dau-xanh-thanh-mat-giai-nhiet-mua-he-202105271537398948.jpg',100),(14,'Bánh tiramisu',3,'https://cdn.tgdd.vn/Files/2017/03/21/963390/cach-lam-banh-tiramisu-bang-banh-quy-5_730x411.jpg',120),(15,'Trái cây mát lạnh',3,'https://vnn-imgs-f.vgcloud.vn/2018/07/11/16/do-an-tren-may-bay-ngay-xua-sang-chanh-nhu-nha-hang-5-sao-6.jpg',80),(16,'Thạch rau câu ',3,'https://img-global.cpcdn.com/recipes/dffe2eeb7970a47c/1200x630cq70/photo.jpg',80),(17,'Chè đậu xanh',3,'https://cdn.tgdd.vn/Files/2021/10/23/1392948/cach-nau-che-dau-xanh-bot-san-day-ngot-thom-giai-nhiet-ngay-nang-nong-202110231503105731.jpg',100),(20,'Salad cá ngừ',1,'https://gatrongcooking.com/media/2022/01/salad-ca-ngu/salad-ca-ngu-4x3.jpg',200),(21,'Salad trái cây',1,'https://cdn.tgdd.vn/2020/08/CookRecipe/Avatar/salad-trai-cay-khong-nuoc-sot-thumbnail-3.jpg',150),(22,'Bò sốt vang',2,'https://i-giadinh.vnecdn.net/2021/12/10/Thanh-pham-1-1434-1639110897.jpg',350),(23,'Bia Đức nhập khẩu',4,'https://douongcaocap.vn/wp-content/uploads/2018/06/Bia-Paderborner-5.png',20),(24,'Nước ngọt ',4,'https://sfcseafood.vn/wp-content/uploads/2019/04/Nuoc-Ngot-Cac-Loai.jpg',15),(25,'Nước suối',4,'https://lavie-water.com/wp-content/uploads/nuoc-lavie-va-aquafina.jpg',10),(50,'Gà tầm nhân sâm',2,'https://cdn.tgdd.vn/Files/2020/08/19/1281441/2-cach-nau-ga-ham-sam-han-quoc-vua-ngon-mieng-vua-bo-duong-ca-gia-dinh-thich-me-202008191402499671.jpg',200),(51,'Cơm lam thịt nướng',1,'https://images.foody.vn/res/g97/966902/prof/s576x330/foody-upload-api-foody-mobile-asasas-200109092636.jpg',2000),(53,'Khai vị bốn mùa',1,'https://menu24h.vn/image/5e77468c5fa026172044c670/original.jpg',100),(55,'Khai vị ngũ sắc',1,'https://haithuycatering.com/image/5c1724d951046d64cfd60580/original.jpg',10000),(56,'Vịt quay Bắc Kinh',2,'http://cdn.tgdd.vn/Files/2022/01/06/1409477/cach-lam-vit-quay-bac-kinh-thom-phuc-chuan-vi-nguoi-hoa-202201061633018730.jpg',1000),(59,'Chả ram tôm đất ',1,'https://thucphamgiaphuc.vn/files/assets/cha-ram-tom-dat-2.jpg',20000),(60,'Bò xào lăn',2,'https://yummyday.vn/uploads/images/thit-bo-xao-nam-3.jpg',2000),(61,'Súp cua trứng bách thảo',1,'https://yummyday.vn/uploads/images/sup-cua-trung-bac-thao-1.jpg',6000),(62,'Sườn nướng BBQ',2,'https://cdn.beptruong.edu.vn/wp-content/uploads/2013/01/suon-nuong-muoi-ot.jpg',2500),(63,'Súp nấm bào ngư',1,'https://cdn.tgdd.vn/2020/10/CookRecipe/Avatar/sup-bao-ngu-nam-dong-co-thumbnail.jpg',2600),(64,'Bào ngư vi cá ',2,'https://vnn-imgs-f.vgcloud.vn/2019/12/25/18/bao-ngu-vi-ca-1.jpg',3000),(65,'Cá chiêm hấp Hồng kông',2,'https://nhahang241.com/upload/product/ca-dieu-hong-hap-hong-kong-2918.png',2500),(66,'Gà đông tảo hấp bia',2,'https://img-global.cpcdn.com/recipes/5036165731ec4966/680x482cq70/ga-dong-t%E1%BA%A3o-h%E1%BA%A5p-recipe-main-photo.jpg',3000),(67,'gà nướng muối ớt',2,'https://thuvienamthuc.vn/upload/images/2020/06/30/91.jpg',250),(68,'Chân giò heo nướng chiên giòn',2,'https://banhtrangthitheophucuong.vn/wp-content/uploads/2021/08/Chan-gio-heo-muoi-chien-gion-1.jpg',270),(69,'Heo sữa nướng ',2,'https://heoquayvitquaytuanmap.com/data/news/default/dat-heo-quay-nguyen-con-tai-nha-hang-tuan-map-sai-gon.jpg',300),(70,'Bánh ngọt kiểu Pháp',3,'https://cdn.tgdd.vn/2020/10/CookProduct/17-1200x676-1.jpg',160),(71,'Thịt dê xào sả ớt ',2,'https://cdn.jamja.vn/blog/wp-content/uploads/2017/10/thit-de-xao-lan-1.jpg',200),(72,'Dê xào lăn',2,'https://res.cloudinary.com/dzznkotwg/image/upload/v1662309266/n7wiwn214dxyhsdz9bwg.jpg',300),(73,'Bò nướng mỹ',2,'https://image-us.eva.vn/upload/3-2020/images/2020-09-30/image10-1601458934-501-width600height450.jpg',200),(94,'Cua sốt ớt singapore',2,'https://afamilycdn.com/k:Article/2014/11/20/cua3/cua-sot-ot-de-nhat-mon-ngon-singapore.jpg',300),(95,'Rượu vang pháp',4,'https://www.topruouvang.com/wp-content/uploads/2017/08/Ruou-vang-phap-ngon-duoc-ua-chuong-nhat-5.jpg',500),(96,'Sữa chua trân châu',3,'http://cdn.tgdd.vn/Files/2021/09/07/1380823/cach-lam-sua-chua-tran-chau-duong-den-ngot-thom-hap-dan-tai-nha-202109071456488299.jpg',300),(97,'Heo rừng xào sả ớt',2,'https://www.food.com.vn/upload/thit-lon-xao-xa-ot-3.jpg',300),(98,'Khai vị uyên ương',1,'https://thechateau.com.vn/wp-content/uploads/2019/11/huong-pho1064-e1574927703762.jpg',200),(99,'Khai vị tam hợp ',1,'https://dashboard-api.flyfood.vn/system/assets/6089/file.jpg',300),(100,'Tôm tempurate',1,'https://sgeviet.vn/wp-content/uploads/2021/12/mon-khai-vi-Tom-chien-xu.jpg',500),(101,'Khai vị kiểu Mỹ',1,'http://product.hstatic.net/200000289525/product/khai-vi-2_9901d10f97cd4c12a823f9af942ebb4e_grande.png',800),(103,'Gà quay xá xíu',2,'http://s1.media.ngoisao.vn/resize_660/news/2022/02/08/com-ga-xa-xiu-ngosaovn-1-ngoisaovn-w1998-h2048.jpg',1000),(104,'Lẩu tôm sú',2,'https://cdn3.ivivu.com/2020/05/huong-dan-lam-mon-lau-tom-chua-cay-ivivu-4.jpg',1200),(105,'Lẩu cù lao đất lò',2,'https://baocantho.com.vn/image/fckeditor/upload/2021/20210909/images/T10-a2.gif',1000),(115,'Lẩu gà lá é',2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjb9uSMHtnpoWaUag2yh4yybsQKiYeV2Enw&usqp=CAU',2000),(116,'Lẩu mắm',2,'https://cdn.beptruong.edu.vn/wp-content/uploads/2020/04/lau-mam.jpg',3000),(117,'Heo quay ngũ vị',2,'https://songkhoe.medplus.vn/wp-content/uploads/2020/02/C%C3%A1ch-l%C3%A0m-heo-quay-gi%C3%B2n-da.png',1500),(118,'Khâu nhục đồ xôi',1,'https://vanhoahoc.vn/wp-content/uploads/cach-nau-khau-nhuc.jpg',1200),(119,'Trứng mimosa',1,'https://afamilycdn.com/Qalypm8xccccccccccccW2vZ1VroR/Image/2011/12/111229afamily-AN-trung-mimosa-8_704dc.JPG',2000),(120,'Khai vị 4 món',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_rJ0Z8T-KI8z_ZbT3aVm5dVzalaTfEnXUeQ&usqp=CAU',800),(121,'Chả cua cuộn rong biển',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_LohiaxcElf0inipDs095_5LKHTfM9qeoE6RmuM8r28X0P9vuCNmtHm0Ty8D79v5wAIk&usqp=CAU',2000),(122,'Xôi mực rim tứ hỏa',1,'https://haithuycatering.com/image/5ef45b91a0cb992416192acd/original.jpg',1500),(123,'Khai vị kiểu Tây Ban Nha',1,'https://i.vietgiaitri.com/2021/3/6/da-dang-mon-khai-vi-tay-ban-nha-406-5616672.jpg',2000),(124,'Tôm sốt chanh đường ',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2HGIg_8xB0f8-rfbp-UbNywEB1T5q7mopQ&usqp=CAU',1200),(125,'Padacosta',3,'https://media.vneconomy.vn/images/upload/2021/04/21/che-15598779021721450632046.jpg',1200),(126,'Bánh Flan trân châu ',3,'https://toplist.vn/images/800px/tau-hu-pudding-chan-trau-duong-den-691278.jpg',2000),(127,'Pudding cherry',3,'https://cdn.alongwalker.co/vn/wp-content/uploads/2022/03/04083901/image-top-8-mon-trang-mieng-doc-dao-nhat-the-gioi-164633274115805.jpg',1700),(128,'Tráng miệng kiểu Pháp',3,'https://www.sweets.vn/wp-content/uploads/2021/08/buffet-tray1.jpg',3000),(129,'Bánh cake dâu tây',3,'http://cdn.tgdd.vn/Files/2021/01/28/1323623/tong-hop-10-mon-trang-mieng-eat-clean-ban-gai-nao-cung-nen-thu-202101281550014322.jpg',2020),(130,'Maccha tan chảy',3,'https://media.cooky.vn/recipe/g2/13141/s/recipe13141-prepare-step4-636223500528206353.jpg',1800),(131,'Hoa quả địa trung hải',3,'https://nauco29.com/files/thumb/767/450//uploads/content/fruitplate7.jpg',2300),(132,'Chocolate dâu tây',3,'https://roots.vn/wp-content/uploads/2022/07/upload-93-1644285529297.jpeg',1100),(133,'Kem bạc hà',3,'https://media.suckhoecong.vn/thumb_x800x450/Images/Uploaded/Share/2016/04/29/3-mon-trang-mieng-ngon-lanh-tu-trai-bo11461917329.jpg',1500),(134,'Bánh cá phô mai',3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUNYPBt4RiVQO42GOfqErcQiL9bn70H0GDQ&usqp=CAU',1700),(135,'Sườn hầm ngũ quả',2,'https://dichvunautiec.com/uploads/images/ma2.jpg',2300),(136,'Nộm tai heo chua ngọt',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmHsFiNK2h__p29O1dat-15_tP1z9oZbhag&usqp=CAU',1250),(137,'Đùi gà chiên mắm chua ngọt',2,'https://i.imgur.com/9W3k2qz.png',2000),(138,'Tôm khò cháy cạnh',2,'https://c1.staticflickr.com/1/627/32915494170_ffa04630d7_k.jpg',2300),(151,'Tôm hùm sốt thái',2,'http://claris.vn/wp-content/uploads/2020/12/ca%CC%81c-tha%CC%80nh-pha%CC%82%CC%80n-cu%CC%89a-menu.jpg',2500),(152,'Bò nướng Wellington',2,'https://bloganchoi.com/wp-content/uploads/2020/07/beef-wellington-1.jpg',2800),(153,'Nộm tôm chả thịt',1,'https://cdn.tgdd.vn/2020/07/CookRecipe/Avatar/goi-cu-hu-dua-bao-tu-thumbnail.jpg',2100),(154,'Cá hồi chiên giòn sốt vang',2,'https://asiana-plaza.com/wp-content/uploads/2021/02/ca-qua-chien-xu-mon-cho-tiec-cuoi-mien-tay-.jpg',2300),(155,'Cá hồi sốt chanh dây',2,'https://ngonaz.com/wp-content/uploads/2021/08/ca-hoi-ap-chao-sot-chanh-day-1.jpg',3000),(156,'Cá hồi sốt kem chanh',2,'https://cdn.huongnghiepaau.com/wp-content/uploads/2016/10/ca-hoi-xot-kem-chanh.jpg',3200),(157,'Cua sốt hoàng kim',2,'https://i.ytimg.com/vi/vJhZsB1Vn2w/maxresdefault.jpg',3500),(158,'Mì tôm 2 trứng',2,'https://i.ytimg.com/vi/gFN_xUrg09Q/sddefault.jpg',800),(159,'String pha sữa',4,'https://cdn.tgdd.vn/Files/2022/05/31/1436120/cach-lam-sting-sua-thuc-uong-tuoi-tho-cua-nhieu-nguoi-202205311553565431.jpg',200),(160,'Rượu vang Ý',4,'https://ruougiatot.com/wp-content/uploads/2021/06/ruou-laphroaig-10-year.jpg',2000),(161,'Rượu Soju',4,'https://ruouhannk.com/image/cache/catalog/ruou%20soju%20chum%20churum-20100303362110-700x700.jpg',1800);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (8,31,'Dịch vụ chuyên nghiệp, món ăn ngon','2022-10-26 20:15:06'),(9,50,'Nhân viên tận tâm','2022-10-26 20:15:06'),(10,51,'Món ăn rất ngon','2022-10-26 20:15:06'),(11,52,'Trang trí rất đẹp','2022-10-26 20:15:06'),(12,41,'Chưa hài lòng về dịch vụ','2022-10-26 20:15:06'),(13,42,'Cần cảit hiện chất lượng món ăn','2022-10-26 20:15:06'),(14,43,'Quá tuyệt vời','2022-10-26 20:15:06'),(15,44,'Dịch vụ ổn','2022-10-26 20:15:06'),(16,45,'Giá cả phải chăng','2022-10-26 20:15:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_service`
--

LOCK TABLES `list_service` WRITE;
/*!40000 ALTER TABLE `list_service` DISABLE KEYS */;
INSERT INTO `list_service` VALUES (1,100),(2,10500),(3,10500),(4,12500),(5,10500),(6,2000),(7,500),(8,10000),(9,10500),(10,500),(11,500),(12,10000),(13,10500),(14,10000),(15,10000),(16,10000),(17,10000),(18,10000),(19,1000),(20,1000),(21,500),(22,500),(23,500),(24,500),(25,500),(26,500),(27,1000),(28,1000),(29,10000),(30,10000),(31,10000),(32,10000),(33,10000),(34,500),(35,500),(36,500),(37,500),(38,500),(39,10000),(40,10000),(41,500),(42,500),(43,500),(44,500),(45,500),(46,500),(47,500),(48,500),(49,500),(50,10500),(51,10500),(52,10500),(53,10000),(54,10000),(55,10000),(56,10000),(57,10000),(58,10500),(59,10500),(60,500),(61,10000),(62,500),(63,500),(64,500),(65,10000),(66,10000),(67,10000),(68,500),(69,10500),(70,500),(71,10000),(72,10000),(73,500),(74,500),(75,500),(76,10500),(77,10500),(78,500),(79,10500),(80,10500),(81,500),(82,10500),(83,10500),(84,0),(85,10000),(86,10000),(87,10000),(88,12500),(89,12500),(90,12500),(91,12500),(92,2500),(93,12500),(94,2500),(95,2500),(96,2500),(97,2500),(98,2500),(99,2500),(100,2500),(101,2500),(102,2500),(103,2000),(104,10000),(105,2000),(106,0),(107,0),(108,12000),(109,12000),(110,12000);
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
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,NULL,200),(8,NULL,350),(9,NULL,350),(10,NULL,450),(11,NULL,350),(12,NULL,250),(13,NULL,250),(14,NULL,100),(15,NULL,150),(16,NULL,450),(17,NULL,150),(18,NULL,100),(19,NULL,250),(20,NULL,250),(21,NULL,350),(22,NULL,250),(23,NULL,250),(24,NULL,200),(25,NULL,200),(26,NULL,100),(27,NULL,100),(28,NULL,100),(29,NULL,100),(30,NULL,100),(31,NULL,100),(32,NULL,450),(33,NULL,450),(34,NULL,150),(35,NULL,150),(36,NULL,200),(37,NULL,200),(38,NULL,150),(39,NULL,150),(40,NULL,150),(41,NULL,250),(42,NULL,250),(43,NULL,250),(44,NULL,250),(45,NULL,250),(46,NULL,250),(47,NULL,250),(48,NULL,250),(49,NULL,250),(50,NULL,100),(51,NULL,100),(52,NULL,100),(53,NULL,100),(54,NULL,100),(55,NULL,250),(56,NULL,250),(57,NULL,250),(58,NULL,250),(59,NULL,250),(60,NULL,250),(61,NULL,250),(62,NULL,150),(63,NULL,150),(64,NULL,150),(65,NULL,250),(66,NULL,250),(67,NULL,350),(68,NULL,150),(69,NULL,100),(70,NULL,100),(71,NULL,100),(72,NULL,350),(73,NULL,350),(74,NULL,350),(75,NULL,250),(76,NULL,350),(77,NULL,350),(78,NULL,150),(79,NULL,350),(80,NULL,150),(81,NULL,150),(82,NULL,150),(83,NULL,500),(84,NULL,250),(85,NULL,350),(86,NULL,250),(87,NULL,250),(88,NULL,350),(118,NULL,2350),(119,NULL,2350),(120,NULL,1340),(121,NULL,1210),(122,NULL,1210),(123,NULL,1270),(124,NULL,0),(125,NULL,0),(126,NULL,0),(127,NULL,0),(128,NULL,0),(129,NULL,0),(130,NULL,0),(131,NULL,0),(132,NULL,0),(133,NULL,0),(134,NULL,0),(135,NULL,0),(136,NULL,0),(137,NULL,0),(138,NULL,0),(139,NULL,0),(140,NULL,0),(141,NULL,0),(142,NULL,0),(143,NULL,0),(144,NULL,0),(145,NULL,0),(146,NULL,1000),(147,NULL,1000),(148,NULL,1000),(149,NULL,1000),(150,NULL,1000),(151,NULL,700),(152,NULL,1000),(153,NULL,700),(154,NULL,700),(155,NULL,700),(156,NULL,700),(157,NULL,700),(158,NULL,700),(159,NULL,700),(160,NULL,700),(161,NULL,700),(162,NULL,700),(163,NULL,700),(164,NULL,700),(165,NULL,700),(166,NULL,700),(167,NULL,700),(168,NULL,700),(169,NULL,700);
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
) ENGINE=InnoDB AUTO_INCREMENT=395 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_dish`
--

LOCK TABLES `menu_dish` WRITE;
/*!40000 ALTER TABLE `menu_dish` DISABLE KEYS */;
INSERT INTO `menu_dish` VALUES (27,1,3),(28,8,3),(31,9,3),(34,10,3),(36,11,3),(45,16,3),(53,21,3),(58,24,20),(59,25,20),(68,32,3),(71,33,3),(74,36,20),(75,37,20),(124,67,3),(130,72,3),(132,73,3),(134,74,3),(138,76,3),(140,77,3),(143,79,3),(148,83,3),(149,83,4),(153,85,3),(159,88,3),(277,118,3),(278,118,51),(280,119,3),(281,119,51),(282,120,6),(283,120,5),(286,120,6),(287,120,14),(288,120,23),(291,121,6),(292,121,7),(293,121,8),(294,121,14),(295,121,15),(296,121,25),(299,122,6),(300,122,7),(301,122,8),(302,122,14),(303,122,15),(304,122,25),(307,123,7),(308,123,6),(309,123,5),(310,123,15),(311,123,16),(312,123,25),(313,145,3),(314,145,4),(315,145,5),(316,145,6),(317,146,3),(318,146,4),(319,146,5),(320,146,6),(321,147,3),(322,147,4),(323,147,5),(324,147,6),(325,148,3),(326,148,4),(327,148,5),(328,148,6),(329,149,3),(330,149,4),(331,149,5),(332,149,6),(333,150,3),(334,150,4),(335,150,5),(336,150,6),(337,151,3),(338,151,4),(339,151,5),(340,152,3),(341,152,4),(342,152,5),(343,152,6),(344,153,3),(345,153,4),(346,153,5),(347,154,3),(348,154,4),(349,154,5),(350,155,3),(351,155,4),(352,155,5),(353,156,3),(354,156,4),(355,156,5),(356,157,3),(357,157,4),(358,157,5),(359,158,3),(360,158,4),(361,158,5),(362,159,3),(363,159,4),(364,159,5),(365,160,3),(366,160,4),(367,160,5),(368,161,3),(369,161,4),(370,161,5),(371,162,3),(372,162,4),(373,162,5),(374,163,3),(375,163,4),(376,163,5),(377,164,3),(378,164,4),(379,164,5),(380,165,3),(381,165,4),(382,165,5),(383,166,3),(384,166,4),(385,166,5),(386,167,3),(387,167,4),(388,167,5),(389,168,3),(390,168,4),(391,168,5),(392,169,3),(393,169,4),(394,169,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,2000,'Người dẫn chương trình trong tiệc cưới','MC','https://danaskills.edu.vn/upload/nhung-ky-nang-can-co-mc-tiec-cuoi-chuyen-nghiep.jpg'),(3,10000,'Đa dạng sự lựa chọn với hơn 100 bộ váy cưới từ các nước Châu Âu, đa dạng mẫu mã và kiểu dáng','Thuê trang phục cưới','https://toplist.vn/images/800px/trang-phuc-cuoi-cua-viet-nam-637439.jpg'),(4,2000,'Đội ngũ trang điểm chuyên nghiệp và lịch thiệp sẽ giúp bạn lung linh trong ngày trọng đại','Trang điểm','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9GI_0FJzwckINDIcjhFfE9Lhe5BI0PCnO6A&usqp=CAU'),(6,1000,'Team tổ chức sự kiện sẽ làm cho ngày trọng đại của bạn lung linh hơn bao giờ hết!','Trang trí tiệc cưới','https://www.metropole.com.vn/uploads/news/9f811ee2a74242-1.jpg'),(17,3000,'Xe Mui trần sang trọng với chi phí phải chăng','Thuê xe đón dâu','http://webdamcuoi.com/wp-content/uploads/2021/02/xe-ruoc-dau.jpg'),(18,3500,'Chúng tôi có một đội ngũ chụp ảnh cưới chuyên nghiệp với đa dạng sự lựa chọn với các mức giá khác nhau đảm bảo cho bạn có một album để đời !','Chụp ảnh cưới','https://tuarts.net/wp-content/uploads/2015/12/117937145_4255715104503639_2707126124250519806_o.jpg'),(19,4000,'Với nhiều ca sĩ nổi tiếng hợp tác. Hứa hẹn khuấy động ngày vui của bạn','Ca sĩ Sơn Tùng MTP','https://sieusao.vn/wp-content/uploads/2019/08/son-tung-mtp-1.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_detail`
--

LOCK TABLES `services_detail` WRITE;
/*!40000 ALTER TABLE `services_detail` DISABLE KEYS */;
INSERT INTO `services_detail` VALUES (1,NULL,1),(2,3,1),(3,3,2),(4,NULL,2),(5,3,3),(6,NULL,3),(7,3,4),(8,NULL,4),(9,1,4),(10,NULL,5),(11,3,5),(12,1,6),(13,NULL,7),(14,3,8),(15,NULL,9),(16,3,9),(17,NULL,10),(18,NULL,11),(19,3,12),(20,NULL,13),(21,3,13),(22,3,14),(23,3,15),(24,3,16),(25,3,17),(26,3,18),(27,6,19),(28,6,20),(29,NULL,21),(30,NULL,22),(31,NULL,23),(32,NULL,24),(33,NULL,25),(34,NULL,26),(35,6,27),(36,6,28),(37,3,29),(38,3,30),(39,3,31),(40,3,32),(41,3,33),(42,NULL,34),(43,NULL,35),(44,NULL,36),(45,NULL,37),(46,NULL,38),(47,3,39),(48,3,40),(49,NULL,41),(50,NULL,42),(51,NULL,43),(52,NULL,44),(53,NULL,45),(54,NULL,46),(55,NULL,47),(56,NULL,48),(57,NULL,49),(58,NULL,50),(59,3,50),(60,NULL,51),(61,3,51),(62,NULL,52),(63,3,52),(64,3,53),(65,3,54),(66,3,55),(67,3,56),(68,3,57),(69,NULL,58),(70,3,58),(71,NULL,59),(72,3,59),(73,NULL,60),(74,3,61),(75,NULL,62),(76,NULL,63),(77,NULL,64),(78,3,65),(79,3,66),(80,3,67),(81,NULL,68),(82,NULL,69),(83,3,69),(84,NULL,70),(85,3,71),(86,3,72),(87,NULL,73),(88,NULL,74),(89,NULL,75),(90,3,76),(91,NULL,76),(92,NULL,77),(93,3,77),(94,NULL,78),(95,NULL,80),(96,NULL,79),(97,3,79),(98,3,80),(99,NULL,81),(100,NULL,82),(101,3,82),(102,NULL,83),(103,3,83),(104,3,85),(105,3,86),(106,3,87),(107,1,88),(108,NULL,88),(109,3,88),(110,1,89),(111,NULL,89),(112,3,89),(113,1,90),(114,NULL,90),(115,3,90),(116,1,91),(117,NULL,91),(118,3,91),(119,1,92),(120,NULL,92),(121,1,93),(122,NULL,93),(123,3,93),(124,1,94),(125,NULL,94),(126,1,95),(127,NULL,95),(128,1,96),(129,NULL,96),(130,1,97),(131,NULL,97),(132,1,98),(133,NULL,98),(134,1,99),(135,NULL,99),(136,1,100),(137,NULL,100),(138,1,101),(139,NULL,101),(140,1,102),(141,NULL,102),(142,1,103),(143,3,104),(144,1,105),(145,1,108),(146,3,108),(147,1,109),(148,3,109),(149,1,110),(150,3,110);
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
INSERT INTO `type_party` VALUES (1,'Tiệc cưới','https://bizweb.dktcdn.net/100/382/778/files/546.jpg?v=1608371333138'),(2,'Hội nghị','https://cybershow.vn/wp-content/uploads/2018/08/to-chuc-h_635671955945979828-1-960x540.jpg'),(3,'Sinh nhật','https://vietpho.com.vn/public/uploads/files/tiec-sinh-nhat-can-co-nhung-gi-1.jpg'),(4,'Lễ tốt nghiệp','https://vt.edu.vn/wp-content/uploads/2020/11/Le-tot-nghiep-2020_00-scaled.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (29,'admin','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','ADMIN','2001-10-10','ROLE_ADMIN','https://image.shutterstock.com/image-vector/three-persons-admin-icon-outline-600w-1730974165.jpg','0123456789'),(30,'giahuyoke01@gmail.com','$2a$10$P1bttd9qXC671pHPwDlSs.Du6wSEThvyCSacjzY1qg/.vztpexv82','Thanh','2001-08-08','ROLE_STAFF','https://res.cloudinary.com/giahuyoke/image/upload/v1665695938/mmr5ngkvhrrfkccta6cs.jpg','098888888'),(31,'dangkhoa123bn@gmail.com','$2a$10$umE6b0z6H0gRmRPPbCLbN./VuudRhyBitiWBNGPPhEJa2hk8zF4Nm','Hưng','2001-10-10','ROLE_USER','https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg','0929392939'),(32,'huygiaoke01','$2a$10$0/2jNvfkIV90mbt6T0cFqOASNNy9lyWkv6UNhK/UAbCgfRNhlY8l2','Khoa','2001-10-10','ROLE_USER','https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg','0929392931'),(33,'huygiaoke02','$2a$10$liDZf9l3j2fmpX4MHUat4OrjQZ9qvWvzYtm0Efm0nH05.Jcqm9WeC','Đạt','2001-10-10','ROLE_USER','https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg','0929392930'),(34,'giahuyoke2001','$2a$10$jPVDrBh/5rrJ6abUPnRSVumpsB.Ks5Vxm./aU.M1LPu75StiLyX3q','Lâm','2001-10-10','ROLE_USER','https://vaithuhayho.com/wp-content/uploads/2022/07/anh-avatar-cute-de-thuong-5.jpg','0947549002'),(35,'giahuyoke2002','$2a$10$fYr1krbHRUJVt7PhSfBT5Og.h1FlR37DH5sWRFu6pCe.WEdGfR1eu','Vy','2001-10-10','ROLE_STAFF','https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-35.jpg','0947549003'),(38,'nhanvien1@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Linh','2001-10-15','ROLE_STAFF','https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg','0938383847'),(39,'nhanvien2@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Khoa bé ba','2001-10-15','ROLE_USER','https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-avatar-cute.jpg','0934848484'),(40,'nguoidung1@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Mạnh','2001-10-15','ROLE_USER','https://www.studytienganh.vn/upload/2022/05/112275.jpg','2383838383'),(41,'nguoidung2@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Thắng','2001-10-15','ROLE_USER','https://scr.vn/wp-content/uploads/2020/07/T%E1%BA%A3i-h%C3%ACnh-n%E1%BB%81n-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-1.jpg','9193983833'),(42,'nguoidung3@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Đăng Khoa','2001-10-15','ROLE_USER','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTTHl49KjkuYhMImb5ZhwYqdmsY8u2IBKnw&usqp=CAU','9298381823'),(43,'nguoidung4@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Minh','2001-10-15','ROLE_USER','https://i.pinimg.com/236x/5c/07/46/5c07469eb781912dbcef9487f4432a2f.jpg','9239239399'),(44,'nguoidung5@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Vi','2001-10-15','ROLE_USER','https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-hai-nhat-qua-dat.jpg','0293837273'),(45,'nguoidung6@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Phương','2001-10-15','ROLE_USER','https://tbkc.edu.vn/wp-content/uploads/2022/02/avatar-tiktok3.jpg','0342332112'),(46,'nhanvien3@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Bảo','2001-10-15','ROLE_STAFF','https://9mobi.vn/cf/images/2015/04/nkk/hinh-avatar-dep-1.jpg','9292999399'),(47,'nhanvien4@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Hương','2001-10-15','ROLE_STAFF','https://i.pinimg.com/474x/e6/c2/54/e6c25467e1c4c51d9ffd8a0a7e06316b.jpg','9393939399'),(48,'nhanvien5@gmal.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Anh Minh','2001-10-15','ROLE_STAFF','https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-10.jpg','2323232323'),(49,'nhanvien6@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Hồng Đào','2001-10-15','ROLE_STAFF','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScLAHiLO29GqpMtk1T3eFqHpK9qH7xx7te8g&usqp=CAU','0978232399'),(50,'nguoidung7@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Thành Nam','2001-10-15','ROLE_USER','https://tophcm.vn/wp-content/uploads/2021/10/hinh-anh-dai-dien-avatar-ca-tinh-1.png','0393483234'),(51,'nguoidung8@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Uyên','2001-10-15','ROLE_USER','https://hanoi1000.vn/wp-content/uploads/2022/04/AVT-Chibi-3.jpg','0979294545'),(52,'nguoidung9@gmail.com','$2a$10$w2BYAHFRy9kp52HXLM/FWeGaP4gZkw.JZ7RYcoHNEc53ntQy39Lie','Vân','2001-10-15','ROLE_USER','https://img.lovepik.com/free-png/20211208/lovepik-cute-pig-avatar-png-image_401416944_wh1200.png','0923332123');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_hall`
--

LOCK TABLES `wedding_hall` WRITE;
/*!40000 ALTER TABLE `wedding_hall` DISABLE KEYS */;
INSERT INTO `wedding_hall` VALUES (1,'Rose',30,NULL,NULL,3000,'https://res.cloudinary.com/giahuyoke/image/upload/v1665224627/jbecnc9ifc3nelw40igm.jpg'),(2,'SunFlower',30,NULL,'Hỏng',2800,'https://melisacenter.vn/uploads/CN5A8538.jpg'),(3,'Camellia',30,NULL,NULL,2700,'https://res.cloudinary.com/giahuyoke/image/upload/v1665297128/ugsj0o01c6jfw3ty8the.jpg'),(5,'Tulip',20,NULL,NULL,2800,'https://res.cloudinary.com/giahuyoke/image/upload/v1665693664/rawtl7zgpynhjdwoid1c.jpg'),(6,'Lotus',20,NULL,NULL,2700,'https://res.cloudinary.com/giahuyoke/image/upload/v1666859685/l0uwlaaafwooseony2aa.jpg'),(7,'Pense',10,NULL,NULL,1000,'https://www.blissvn.com/Data/Sites/1/News/622/trang-tri-sanh-cuoi.png'),(8,'Violet',10,NULL,NULL,1200,'https://kientrucroman.com.vn/wp-content/uploads/Cac-mau-sanh-tiec-trung-tam-tiec-cuoi-dep-li-tuong-cho-moi-cap-doi-1.jpg'),(14,'Rainbown',50,NULL,'',2000,'https://themirahotel.com.vn/wp-content/uploads/2019/09/Phongcachcuoi1-653x526.jpg'),(15,'Sunshine',30,NULL,NULL,3000,'http://venusdecor.vn/wp-content/uploads/2019/01/trang-tri-khach-san-cuoi-venus-4.jpg'),(16,'Happy',20,NULL,NULL,3000,'https://voan.vn/wp-content/uploads/2019/04/trang-tri-sanh-tiec-cuoi-voi-hoa.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_party_orders`
--

LOCK TABLES `wedding_party_orders` WRITE;
/*!40000 ALTER TABLE `wedding_party_orders` DISABLE KEYS */;
INSERT INTO `wedding_party_orders` VALUES (104,29,1,2,'2022-09-21',82,7400,1,'momo',20,NULL,75,1),(105,29,1,1,'2022-12-12',83,23500,1,'momo-card',20,NULL,78,2),(106,29,1,3,'2022-10-16',84,20000,1,'momo',20,'null',80,3),(107,29,1,2,'2022-10-15',85,20000,1,'momo',20,'null',82,3),(117,31,2,1,'2022-09-21',150,16300,1,'momo',30,'nothing',91,1),(118,31,3,1,'2022-09-21',123,16300,1,'money',20,'nothing',61,1),(119,30,2,2,'2022-07-01',151,6840,0,'cash',20,NULL,92,1),(120,31,2,1,'2022-11-21',152,15300,1,'momo',0,'null',93,1),(121,31,2,2,'2022-07-01',153,20140,0,'momo',20,NULL,94,1),(122,31,2,2,'2022-08-01',154,20140,0,'momo',20,NULL,95,1),(123,31,2,2,'2022-08-08',155,20140,0,'momo',20,NULL,96,1),(124,31,2,2,'2022-10-06',156,20140,0,'momo',20,NULL,97,1),(125,31,2,2,'2022-10-07',157,89300,1,'momo',20,NULL,98,1),(129,31,NULL,2,'2022-10-08',161,89300,1,'Tiền mặt',20,NULL,102,1),(130,30,3,1,'2022-10-10',166,102000,0,'momo',30,NULL,107,1),(131,30,3,1,'2022-10-10',167,114000,0,'momo',30,NULL,108,1),(132,30,3,1,'2022-11-10',168,114000,0,'momo',30,NULL,109,1),(133,30,3,1,'2022-11-12',169,114000,0,'momo',30,NULL,110,1);
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

-- Dump completed on 2022-10-30 11:03:04
