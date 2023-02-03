/*
SQLyog Ultimate v12.14 (64 bit)
MySQL - 5.7.37-log : Database - mydb1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mydb1` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mydb1`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `rootname` varchar(200) NOT NULL COMMENT '管理员账户名',
  `rootpassword` varchar(200) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`admin_id`,`rootname`,`rootpassword`) values 
(1,'root','123456');

/*Table structure for table `dishes` */

DROP TABLE IF EXISTS `dishes`;

CREATE TABLE `dishes` (
  `dishes_id` int(11) NOT NULL AUTO_INCREMENT,
  `dishes_title` varchar(200) NOT NULL COMMENT '菜品标题',
  `dishes_type` varchar(200) NOT NULL COMMENT '菜品类型',
  `dishes_img1` varchar(200) DEFAULT NULL COMMENT '菜品图1',
  `dishes_img2` varchar(200) DEFAULT NULL COMMENT '菜品图2',
  `dishes_img3` varchar(200) DEFAULT NULL COMMENT '菜品图3',
  `dishes_img4` varchar(200) DEFAULT NULL COMMENT '菜品图4',
  `dishes_img5` varchar(200) DEFAULT NULL COMMENT '菜品图5',
  `dishes_price` int(11) NOT NULL COMMENT '菜品单价',
  `dishes_description` varchar(200) DEFAULT NULL COMMENT '菜品描述',
  `shop_id` int(20) NOT NULL COMMENT '店铺ID',
  PRIMARY KEY (`dishes_id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

/*Data for the table `dishes` */

insert  into `dishes`(`dishes_id`,`dishes_title`,`dishes_type`,`dishes_img1`,`dishes_img2`,`dishes_img3`,`dishes_img4`,`dishes_img5`,`dishes_price`,`dishes_description`,`shop_id`) values 
(47,'红烧肉','中餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\1f146a575-85e1-4946-a575-5eceadd96c23.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\238ebbc07-4271-4bd6-b03d-4139e3f84a71.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\3daf61a1b-25e7-4c6c-9cd2-f243a999faf0.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\49204f624-e27d-4d05-ae51-4aafae878f94.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\5e3036b41-0be7-400c-841d-386f10dcd5c9.jpg',100,' 主料：五花猪肉（什么是五花猪肉？就是那种一层肥的一层瘦的肉，层数越多越好。俗话说要吃肉肥中瘦嘛！）2斤（不要太少否则做不出好吃的红烧肉！），  调料：盐，糖（最好是冰糖末），葱段，姜片，料酒（至于用量除了糖要3大匙外其他主要看个人口味）',33),
(48,'大盘鸡','中餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)6ad8d1d7-fd9b-4263-ba3b-116d41b4b484.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)d678f8dd-5d08-4891-9001-6371f1722203.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)4a0c14a3-ea55-47b1-8851-556f945c6cf3.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)bea4b88d-05ab-49ef-8a7c-42b140daeb2f.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\10e0b7667-ad6f-4d18-aa2b-f92bee5e7617.jpg',199,' 鲜鸡一只，土豆四个，皮带面，青红辣椒各一个，葱姜蒜若干，花椒一把，八角，香叶，桂皮适量，朝天椒一把，生抽酱油，砂糖，盐',33),
(49,'梅菜扣肉','中餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)d9feb338-8855-4a4e-b85f-c23745613b45.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)a8e0bd25-233f-47e3-96d0-adfde878bd8f.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)095f4796-f794-40f0-a621-caaab8e813c0.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1ab48a9c4-5b9c-4456-9025-c5cc19f80d0f.jpg',70,'五花肉:养血 姜:降逆止呕、化痰止咳、散寒解表 料酒:活血化瘀',33),
(50,'豪大大香酥炸鸡排','西餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)4beebf38-8549-4ab9-9370-77860a422382.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)2bc39d13-f37e-4972-a1f5-72206bc0b304.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)90bcf187-ef4d-45ab-b1ae-1f87d782b415.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)77ab3a93-d23f-40b1-898a-3956493d24eb.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1a2765c64-3969-4c2d-b738-2a9e792cfc8f.jpg',66,'姜:降逆止呕、化痰止咳、散寒解表 料酒:活血化瘀',43),
(51,'豪大大特制黑椒猪排堡','西餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\18f84688f-7072-4d68-9e64-48779a466a1b.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)07becbb5-3385-452e-9029-34c50d0e1df7.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)6ad1301f-c62d-4977-a19a-391a6ed82d68.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)19efdbe8-5e64-4c15-9e2c-a2048d13f2a5.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)f985a35a-8afa-4b76-8fa7-be014c594409.jpg',55,'健康功效 黄油:活血化瘀 鸡蛋:养血 生菜:养胃',43),
(52,'豪大大蜜汁香炸鸡腿','西餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)c771ebb7-d018-4a69-a49f-8d11e0336518.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)0286f824-1ee9-457e-a5c0-27b3756478e8.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)0d07ed1b-fed9-414e-b2e2-78befc9855f6.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)740e91b1-4275-43dd-9adc-2baad6ebb5a6.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1342983fa-8547-49a7-b030-88b3803506a4.jpg',9,'鸡蛋:养血 燕麦片:增强免疫力 胡椒粉:补血、护齿、保护骨骼',43),
(53,'豪大大特制炸薯条','西餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\12dc40b70-e438-408e-b645-8e19c63cff69.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)db900211-163f-455d-ac20-3b693a441f53.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)88f0fe2c-05cc-4957-a270-f9c0caf499da.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)7a0fbb6c-0b26-4316-b957-e8e3f7d9b8fc.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)cace94d8-a1c3-45d0-b4b8-dcc614538071.jpg',10,'食材用料 土豆 二个相克食物 盐 一小勺 油 500克 番茄酱 适量相克食物 椒盐粉 适量 孜然粉 适量',43),
(54,'吃多多特辣火锅','火锅','D:\\study\\myproject\\project1\\src\\assets\\upload\\16e7cdca2-4f28-46e4-b53d-574b363f27bb.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)c2e26634-af9b-4d59-a9fa-7db4c849b749.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (3)5b61a50e-f9db-4d10-9809-4222e51853eb.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (4)4b587045-bc79-4dff-857a-ad6fa7b3d4e4.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (5)1f11a4b8-da6d-4c8a-82d9-b04ecaa0231f.jpg',49,'不辣不要钱，欢迎前来挑战',44),
(55,'美味大香蕉','水果','D:\\study\\myproject\\project1\\src\\assets\\upload\\1fb3dc275-1f58-4aa6-b8e2-0362b417af4b.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\2537fed43-b6f8-4cf3-ace3-d3e54b9e10b7.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\32e418bd4-607d-4a12-80b3-d82c5fe88bf0.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\40e9a6828-e7fb-463f-bd3d-d4de36d120f1.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\57b4a3b5c-8051-4b1b-bfc0-e5c7c44bb0d6.jpg',9,'超级美味的大香蕉，营养好滋味',49),
(61,'黄焖湘源','自助餐','D:\\study\\myproject\\project1\\src\\assets\\upload\\41b0747fc-d6a2-46a6-839c-a5f1c69e5ed5.jpg','D:\\study\\myproject\\project1\\src\\assets\\upload\\14fa8e33f-b92a-4a22-bb16-fb8d41fc4862.jpg','','','',4,'不好吃',52);

/*Table structure for table `dishes_collection` */

DROP TABLE IF EXISTS `dishes_collection`;

CREATE TABLE `dishes_collection` (
  `dc_id` int(11) NOT NULL AUTO_INCREMENT,
  `dishes_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `dishes_title` char(100) DEFAULT NULL,
  `dishes_img1` char(200) DEFAULT NULL,
  PRIMARY KEY (`dc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `dishes_collection` */

insert  into `dishes_collection`(`dc_id`,`dishes_id`,`user_id`,`dishes_title`,`dishes_img1`) values 
(19,55,1,'美味大香蕉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1fb3dc275-1f58-4aa6-b8e2-0362b417af4b.jpg'),
(20,51,1,'豪大大特制黑椒猪排堡','D:\\study\\myproject\\project1\\src\\assets\\upload\\18f84688f-7072-4d68-9e64-48779a466a1b.jpg'),
(21,61,1,'黄焖湘源','D:\\study\\myproject\\project1\\src\\assets\\upload\\41b0747fc-d6a2-46a6-839c-a5f1c69e5ed5.jpg'),
(22,47,1,'红烧肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1f146a575-85e1-4946-a575-5eceadd96c23.jpg'),
(23,49,16,'梅菜扣肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg');

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_title` varchar(200) NOT NULL COMMENT '菜品标题',
  `order_img1` varchar(200) DEFAULT NULL COMMENT '菜品图1',
  `order_price` int(11) NOT NULL COMMENT '菜品单价',
  `order_num` int(11) DEFAULT NULL COMMENT '菜品数量',
  `order_state` varchar(200) DEFAULT NULL COMMENT '订单状态',
  `user_id` int(20) NOT NULL COMMENT '用户ID',
  `dishes_id` int(10) DEFAULT NULL,
  `shop_id` int(10) DEFAULT NULL,
  `time` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8;

/*Data for the table `order` */

insert  into `order`(`order_id`,`order_title`,`order_img1`,`order_price`,`order_num`,`order_state`,`user_id`,`dishes_id`,`shop_id`,`time`) values 
(363,'梅菜扣肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg',70,1,'4',16,49,33,'2023/1/20 13:35:38'),
(364,'豪大大香酥炸鸡排','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)4beebf38-8549-4ab9-9370-77860a422382.jpg',66,1,'4',16,50,33,'2023/2/2 13:01:11'),
(373,'梅菜扣肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg',70,1,'1',20,49,43,'2023/1/23 14:28:27'),
(374,'梅菜扣肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg',70,1,'1',20,49,33,'2023/1/23 14:28:27'),
(375,'豪大大香酥炸鸡排','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)4beebf38-8549-4ab9-9370-77860a422382.jpg',66,1,'2',20,50,43,'2023/1/23 14:28:27'),
(384,'豪大大香酥炸鸡排','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)4beebf38-8549-4ab9-9370-77860a422382.jpg',66,1,'4',1,50,43,'2023/2/2 13:01:11'),
(385,'梅菜扣肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg',70,1,'4',1,49,43,'2023/2/2 13:55:53'),
(391,'美味大香蕉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1fb3dc275-1f58-4aa6-b8e2-0362b417af4b.jpg',9,1,'3',1,55,49,'2023/2/2 17:04:41'),
(392,'红烧肉','D:\\study\\myproject\\project1\\src\\assets\\upload\\1f146a575-85e1-4946-a575-5eceadd96c23.jpg',100,1,'3',1,47,33,'2023/2/2 17:04:41'),
(393,'大盘鸡','D:\\study\\myproject\\project1\\src\\assets\\upload\\1 (2)6ad8d1d7-fd9b-4263-ba3b-116d41b4b484.jpg',199,1,'1',1,48,33,'2023/2/2 17:04:41');

/*Table structure for table `shop` */

DROP TABLE IF EXISTS `shop`;

CREATE TABLE `shop` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `shopname` varchar(200) NOT NULL COMMENT '店铺名称',
  `area` varchar(200) NOT NULL COMMENT '所在地区',
  `address` varchar(200) DEFAULT NULL COMMENT '详细地址',
  `shoptype` varchar(200) NOT NULL COMMENT '店铺类型',
  `state` varchar(200) NOT NULL COMMENT '营业状态',
  `shopphone` varchar(200) NOT NULL COMMENT '店铺手机',
  `worktime` varchar(200) NOT NULL COMMENT '营业时间',
  `imgurl` varchar(200) DEFAULT NULL COMMENT '上传图片',
  `description` varchar(200) DEFAULT NULL COMMENT '店铺描述',
  `sellerphone` varchar(200) NOT NULL COMMENT '店主手机',
  `ispass` varchar(20) NOT NULL COMMENT '是否通过审核',
  `shopstate` varchar(20) DEFAULT NULL COMMENT '店铺状态',
  `user_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;

/*Data for the table `shop` */

insert  into `shop`(`shop_id`,`shopname`,`area`,`address`,`shoptype`,`state`,`shopphone`,`worktime`,`imgurl`,`description`,`sellerphone`,`ispass`,`shopstate`,`user_id`) values 
(33,'超星中餐连锁店','北京','朝阳区','中餐','true','182313133','8：00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\879e1e81d-8ee4-45fd-b5cd-42a986668185.jpg','非常好的店','18379774726','1','1',1),
(43,'豪大大集团','北京市北京市','朝阳区','西餐','true','1837283233','18:00','10792500b-dcb9-40a4-8dde-c07eca6896ab.jpg','我们是一家良心公司','18379774725','1','1',7),
(44,'吃多多火锅','上海市上海市','上海滩','火锅','true','183378723232','10:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\23bca890b-23bd-4b12-abc0-599a6a6672c6.jpg','上海第一火锅店，就是在下','18379774724','1','1',8),
(45,'余杭杰良心自助餐','浙江省杭州市','杭杰良心自助餐','自助餐','true','183232312321','00:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\305f781ba-eb99-4e1d-9541-56a239e2d0a9.jpg','1998年起老品牌，值得信任','18379774723','1','1',9),
(46,'阿柴小炒店','江西省赣州市','阿柴小炒店','中餐','true','1221321321321','08:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\477d51b93-2525-41c0-81e8-7518b8e2bec7.jpg','全村的希望','18379774722','1','1',10),
(47,'阿香米线','台湾省台南市','阿香米线','中餐','true','13243424432','08:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\5463a190f-ccc5-4fa6-b458-57a7c69af449.jpg','阿香米线品质值得信赖','18379774721','1','1',14),
(48,'食家庄','重庆市重庆市','食家庄','中餐','true','112312321313','12:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\61a1c6754-f563-4800-a915-477adba269e6.jpg','好吃，就是我食家庄','18379774720','1','1',15),
(49,'亿果联','北京市北京市','亿果联线下门店','水果','true','1424213212','10:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\7d781723f-ac03-45dd-911b-ea716d80f1a8.jpg','找好果子就来亿果联','18379774727','1','1',16),
(50,'三年五班甜品店','天津市天津市','三年五班甜品店','甜品','true','1435345435345','09:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\805b3347e-97b1-47ab-b22f-5b6be647acde.jpg','三年五班甜品质量保证','18379774728','1','1',18),
(51,'舌尖派对-四川小吃店','四川省成都市','舌尖派对-四川小吃店','小吃','true','17232321313','09:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\9b14dfc11-49a5-47d5-933f-01bc0bc9b7a0.jpg','舌尖派对让你感觉到舌尖上的畅爽体验','18379774729','1','1',19),
(52,'黄焖湘源','北京市北京市','','中餐','true','177823942394','04:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\21fb24ef4-7f2d-4af1-85c8-41b7d7c4b53c.jpg','是结合现金补偿','17779086478','1','1',20),
(56,'星洒水1111','北京','朝阳区','西餐','true','182313133','8：00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\21fb24ef4-7f2d-4af1-85c8-41b7d7c4b53c.jpg','非常好的店','18379722222','0','2',21),
(57,'星阿萨122','北京','朝阳区','西餐','true','182313133','8：00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\21fb24ef4-7f2d-4af1-85c8-41b7d7c4b53c.jpg','非常好的店','18379771111','1','1',22),
(62,'121212','河北省石家庄市','1212121','西餐','true','121212121','02:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\b4babb6752addbf284b731577e0cffdb.jpg','2112121','18379774720','0','0',24),
(76,'科技撒','河北省保定市','121221','火锅','true','121321313','03:00','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\1c3e5e52666669e1d92fff2c26c7221c.jpg','121王企鹅群翁群翁','15993837321','1','0',25),
(77,'测试1','12121','12122','1212','true','1212121','21121','2b935392d-4e94-42d7-8a4b-c38ae28f58f8.jpg','211212','1212121','1','3',999),
(78,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(89,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',1999),
(90,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(91,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',9999),
(92,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(93,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(94,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(95,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(96,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',1999),
(99,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(100,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(101,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','3',999),
(103,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','2',999),
(104,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(105,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(106,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(107,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(108,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(109,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(110,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(111,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(112,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(113,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(114,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(115,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(116,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(117,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(118,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(119,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(120,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(121,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(122,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(123,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(124,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(125,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','0','0',99999),
(126,'测试2','12121','12122','1212','true','1212121','21121','1c3e5e52666669e1d92fff2c26c7221c.jpg','211212','1212121','1','4',99999);

/*Table structure for table `shop_collection` */

DROP TABLE IF EXISTS `shop_collection`;

CREATE TABLE `shop_collection` (
  `dc_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `shopname` char(100) DEFAULT NULL,
  `imgurl` char(100) DEFAULT NULL,
  PRIMARY KEY (`dc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `shop_collection` */

insert  into `shop_collection`(`dc_id`,`shop_id`,`user_id`,`shopname`,`imgurl`) values 
(13,45,1,'余杭杰良心自助餐','D:\\study\\myproject\\project1\\src\\assets\\shopImg\\305f781ba-eb99-4e1d-9541-56a239e2d0a9.jpg');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `imgurl` char(100) DEFAULT NULL,
  `type` int(10) DEFAULT NULL,
  `shop_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`phone`,`imgurl`,`type`,`shop_id`) values 
(1,'qw123','123456','18379131312','a6baf223-35de-4dd4-b17f-f93111933d7f.jpg',1,33),
(7,'qq1755523218','1234567','18379774726',NULL,1,43),
(8,'星甸2247','182313133','18379774744',NULL,1,44),
(9,'星甸1','182313133','18379774755',NULL,1,45),
(10,'星甸qw二1','182313133','18379774769',NULL,1,46),
(14,'qq123456','123444','18379774726',NULL,1,47),
(15,'qq123451221','qq123456','18379774726',NULL,1,48),
(16,'qw123456','qw123456','18379774710',NULL,1,49),
(18,'qwe1234','qwe1234','18379772121',NULL,1,50),
(19,'qq12345','qq12345','18379774709',NULL,1,51),
(20,'xyxy123','xyxy123','18379773721',NULL,2,52),
(21,'xyxy001','xyxy001','15970132501',NULL,1,56),
(22,'xyxy002','xyxy002','15970132502',NULL,1,57),
(23,'xyxy003','xyxy003','15970132503',NULL,1,60),
(24,'xyxy004','xyxy004','15970132504',NULL,2,62),
(25,'xyxy005','xyxy005','15970132505',NULL,1,76),
(26,'xyxy006','xyxy006','15970132506',NULL,2,NULL),
(27,'admin','123456','12321414415','pande.jpg',0,NULL),
(46,'qq1234444','1212','1212',NULL,2,NULL),
(47,'root','123456','123456','008e0f73-efaa-4f4e-85c6-1d2365a8ec05.jpg',0,NULL);

/*Table structure for table `user_comments` */

DROP TABLE IF EXISTS `user_comments`;

CREATE TABLE `user_comments` (
  `uc_id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(10) DEFAULT NULL,
  `comment` char(100) DEFAULT NULL,
  `dishes_id` int(10) DEFAULT NULL,
  `shop_id` int(100) DEFAULT NULL,
  `order_id` int(100) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `time` char(100) DEFAULT NULL,
  `username` char(100) DEFAULT NULL,
  `imgurl` char(100) DEFAULT NULL,
  PRIMARY KEY (`uc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `user_comments` */

insert  into `user_comments`(`uc_id`,`score`,`comment`,`dishes_id`,`shop_id`,`order_id`,`user_id`,`time`,`username`,`imgurl`) values 
(6,4,'你觉得好吃吗？',49,33,363,16,'2023/1/20 13:35:38','qw123456',NULL),
(9,4,'看起来还不错哦',50,43,364,16,'2023/2/2 13:01:11','qw123456',NULL),
(10,5,'阿达大大的请求无级景区及前景偶尔我就切奇偶巧儿姐为奇偶及其饿哦奇偶奇偶积极金额解决奇偶奇偶焦恩俊偶就诶我记得奇偶暗示将地哦啊接搜到敬爱的奇偶暗示基调是大家使劲地撒娇的撒娇大街上大家都时间啊岛街道三等奖',50,43,384,1,'2023/2/2 13:01:11','qw123',NULL),
(11,5,'100分',49,33,385,1,'2023/2/2 13:55:53','qw123',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
