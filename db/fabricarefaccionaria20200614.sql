-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: fabricarefaccionaria
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `clientefabrica`
--

DROP TABLE IF EXISTS `clientefabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientefabrica` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `cp` int NOT NULL,
  `numero_local` int NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `telefono` bigint NOT NULL,
  `valido` int NOT NULL COMMENT 'Este atributo es para saber si es valida la tupla, esto es debido a que el sistema solo manejara bajas lógicas.',
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientefabrica`
--

LOCK TABLES `clientefabrica` WRITE;
/*!40000 ALTER TABLE `clientefabrica` DISABLE KEYS */;
INSERT INTO `clientefabrica` VALUES (1,'Refaccionaria feliz','Refaccionaria@gmail.com','san cayetano 114',20020,4,'aguascalientes','aguascalientes',4491502820,0),(3,'Refaccionaria','Refaccionaria@gmail.com','san cayetano 114',20010,4,'aguascalientes','aguascalientes',4491502820,1),(7,'Refaccionaria3','Refaccionaria@gmail.com','san cayetano 114',20010,4,'aguascalientes','aguascalientes',4491502820,1),(11,'Refaccionaria4','Refaccionaria@gmail.com','san cayetano 114',20010,4,'aguascalientes','aguascalientes',4491502820,1);
/*!40000 ALTER TABLE `clientefabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `clientesvalidos`
--

DROP TABLE IF EXISTS `clientesvalidos`;
/*!50001 DROP VIEW IF EXISTS `clientesvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `clientesvalidos` AS SELECT 
 1 AS `idCliente`,
 1 AS `razon`,
 1 AS `correo`,
 1 AS `calle`,
 1 AS `cp`,
 1 AS `numero_local`,
 1 AS `ciudad`,
 1 AS `estado`,
 1 AS `telefono`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `detallepedidopieza`
--

DROP TABLE IF EXISTS `detallepedidopieza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedidopieza` (
  `idPedido` int NOT NULL,
  `idPieza` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idPedido`,`idPieza`),
  KEY `fk_Pedido_has_Pieza_Pieza1_idx` (`idPieza`),
  KEY `fk_Pedido_has_Pieza_Pedido_idx` (`idPedido`),
  CONSTRAINT `fk_Pedido_has_Pieza_Pedido` FOREIGN KEY (`idPedido`) REFERENCES `pedidofabrica` (`idPedido`),
  CONSTRAINT `fk_Pedido_has_Pieza_Pieza1` FOREIGN KEY (`idPieza`) REFERENCES `pieza` (`idPieza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedidopieza`
--

LOCK TABLES `detallepedidopieza` WRITE;
/*!40000 ALTER TABLE `detallepedidopieza` DISABLE KEYS */;
INSERT INTO `detallepedidopieza` VALUES (1,1,1),(1,2,3);
/*!40000 ALTER TABLE `detallepedidopieza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleadofabrica`
--

DROP TABLE IF EXISTS `empleadofabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleadofabrica` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `direccion` varchar(50) NOT NULL COMMENT 'San cayetano 114',
  `cp` int NOT NULL,
  `telefono` bigint NOT NULL,
  `cargo` varchar(1) NOT NULL COMMENT 'n-normal, r-repartidor, e-encargado',
  `correo` varchar(80) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `valido` int NOT NULL COMMENT 'Este atributo es para saber si es valida la tupla, esto es debido a que el sistema solo manejara bajas lógicas.',
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleadofabrica`
--

LOCK TABLES `empleadofabrica` WRITE;
/*!40000 ALTER TABLE `empleadofabrica` DISABLE KEYS */;
INSERT INTO `empleadofabrica` VALUES (1,'Ricardo Enrique','Solis','Herrera','1996-06-03 00:00:00','San Cayetano 114',20010,4491502820,'e','rick@gmail.com','12345r',1),(3,'Enrique','Rodriguez','Montes','1996-03-03 00:00:00','Eucalipto 527',20010,4491502820,'n','enrique@gmail.com','54321e',1),(4,'Abel','Rodriguez','Montes','1996-03-03 00:00:00','Eucalipto 527',20010,4491502820,'r','abel@gmail.com','12345r',1);
/*!40000 ALTER TABLE `empleadofabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `empleadosvalidos`
--

DROP TABLE IF EXISTS `empleadosvalidos`;
/*!50001 DROP VIEW IF EXISTS `empleadosvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `empleadosvalidos` AS SELECT 
 1 AS `idEmpleado`,
 1 AS `nombre`,
 1 AS `edad`,
 1 AS `direccion`,
 1 AS `cp`,
 1 AS `telefono`,
 1 AS `cargo`,
 1 AS `correo`,
 1 AS `contra`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `idEnvio` int NOT NULL AUTO_INCREMENT,
  `nombre_receptor` varchar(60) NOT NULL,
  `monto_envio` decimal(6,2) NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL COMMENT 'Si la fecha esta en null quiere decir que aun no ha sido entregado y estará en E (en proceso), de lo contrario si tiene una fecha su estatus estará en T(terminado)',
  `estatus` varchar(1) NOT NULL COMMENT 'E - en proceso , T - terminado',
  `idPedido` int NOT NULL,
  `valido` int NOT NULL COMMENT 'Este atributo es para saber si es valida la tupla, esto es debido a que el sistema solo manejara bajas lógicas.',
  PRIMARY KEY (`idEnvio`),
  KEY `fk_Envio_PedidoFabrica1_idx` (`idPedido`),
  CONSTRAINT `fk_Envio_PedidoFabrica1` FOREIGN KEY (`idPedido`) REFERENCES `pedidofabrica` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
INSERT INTO `envio` VALUES (3,'Ramiro Rodriguez',90.00,NULL,'E',1,1);
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `enviosvalidos`
--

DROP TABLE IF EXISTS `enviosvalidos`;
/*!50001 DROP VIEW IF EXISTS `enviosvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `enviosvalidos` AS SELECT 
 1 AS `idEnvio`,
 1 AS `fecha`,
 1 AS `estatus`,
 1 AS `idPedido`,
 1 AS `recibido_por`,
 1 AS `monto_envio`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `facturafabrica`
--

DROP TABLE IF EXISTS `facturafabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturafabrica` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  `idPedido` int NOT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `fk_FacturaFabrica_PedidoFabrica1_idx` (`idPedido`),
  CONSTRAINT `fk_FacturaFabrica_PedidoFabrica1` FOREIGN KEY (`idPedido`) REFERENCES `pedidofabrica` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturafabrica`
--

LOCK TABLES `facturafabrica` WRITE;
/*!40000 ALTER TABLE `facturafabrica` DISABLE KEYS */;
INSERT INTO `facturafabrica` VALUES (3,'2020-06-10 21:24:57',655.50,1);
/*!40000 ALTER TABLE `facturafabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `facturasrealizadas`
--

DROP TABLE IF EXISTS `facturasrealizadas`;
/*!50001 DROP VIEW IF EXISTS `facturasrealizadas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `facturasrealizadas` AS SELECT 
 1 AS `idFactura`,
 1 AS `fecha`,
 1 AS `idPedido`,
 1 AS `total`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `facturasvalidas`
--

DROP TABLE IF EXISTS `facturasvalidas`;
/*!50001 DROP VIEW IF EXISTS `facturasvalidas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `facturasvalidas` AS SELECT 
 1 AS `idFactura`,
 1 AS `fecha`,
 1 AS `total`,
 1 AS `idPedido`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(2) NOT NULL COMMENT 'co - contado, cr - credito',
  `fecha_pago` datetime DEFAULT NULL COMMENT 'Este atributo especifica si ya fue pagado o no. Si este vacío quiere decir que aun no ha sido pagado y se tomará como cuenta por cobrar.\n',
  `monto` decimal(8,2) NOT NULL,
  `idPedido` int NOT NULL,
  PRIMARY KEY (`idPago`),
  KEY `fk_Pago_PedidoFactura1_idx` (`idPedido`),
  CONSTRAINT `fk_Pago_PedidoFactura1` FOREIGN KEY (`idPedido`) REFERENCES `pedidofabrica` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,'co','2020-06-10 19:12:17',715.00,1);
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pagosvalidos`
--

DROP TABLE IF EXISTS `pagosvalidos`;
/*!50001 DROP VIEW IF EXISTS `pagosvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pagosvalidos` AS SELECT 
 1 AS `idPago`,
 1 AS `tipo`,
 1 AS `fecha`,
 1 AS `monto`,
 1 AS `num_pedido`,
 1 AS `pagado_por`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pedidofabrica`
--

DROP TABLE IF EXISTS `pedidofabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidofabrica` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `idCliente` int NOT NULL,
  `idEmpleado` int NOT NULL,
  `valido` int NOT NULL COMMENT 'Este atributo es para saber si es valida la tupla, esto es debido a que el sistema solo manejara bajas lógicas.',
  PRIMARY KEY (`idPedido`),
  KEY `fk_Pedido_Cliente1_idx` (`idCliente`),
  KEY `fk_Pedido_Empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_Pedido_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `clientefabrica` (`idCliente`),
  CONSTRAINT `fk_Pedido_Empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleadofabrica` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidofabrica`
--

LOCK TABLES `pedidofabrica` WRITE;
/*!40000 ALTER TABLE `pedidofabrica` DISABLE KEYS */;
INSERT INTO `pedidofabrica` VALUES (1,'2020-06-09 00:00:00',3,3,1),(2,'2020-06-09 00:00:00',3,1,1);
/*!40000 ALTER TABLE `pedidofabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pedidosrealizadosvalidos`
--

DROP TABLE IF EXISTS `pedidosrealizadosvalidos`;
/*!50001 DROP VIEW IF EXISTS `pedidosrealizadosvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pedidosrealizadosvalidos` AS SELECT 
 1 AS `idPedido`,
 1 AS `fecha_realizado`,
 1 AS `idPieza`,
 1 AS `pieza`,
 1 AS `precio`,
 1 AS `cantidad`,
 1 AS `subtotal`,
 1 AS `enviar_a`,
 1 AS `hecho_por`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `pedidosvalidos`
--

DROP TABLE IF EXISTS `pedidosvalidos`;
/*!50001 DROP VIEW IF EXISTS `pedidosvalidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pedidosvalidos` AS SELECT 
 1 AS `idPedido`,
 1 AS `fecha`,
 1 AS `idCliente`,
 1 AS `idEmpleado`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pieza`
--

DROP TABLE IF EXISTS `pieza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pieza` (
  `idPieza` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `descripcion` longtext NOT NULL,
  `precio_fabricacion` decimal(6,2) NOT NULL,
  `precio_venta` decimal(8,2) NOT NULL,
  `existencia` int NOT NULL,
  `categoria` varchar(2) NOT NULL COMMENT 'AI - Accesorios Internos\\nAE- Accesorios Externos\\nHE - Herramientas y equipos\\nLQ - Liquidos y Químicos\\n',
  `valido` int NOT NULL COMMENT 'Este atributo es para saber si es valida la tupla, esto es debido a que el sistema solo manejara bajas lógicas.',
  PRIMARY KEY (`idPieza`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pieza`
--

LOCK TABLES `pieza` WRITE;
/*!40000 ALTER TABLE `pieza` DISABLE KEYS */;
INSERT INTO `pieza` VALUES (1,'Llanta v2','Una llanta para carro y camioneta',400.00,500.00,2,'ae',1),(2,'Limpia parabrisas','Un Limpia parabrisas de alta calidad con mango reforzado',60.50,65.50,10,'lq',1),(3,'Liquido de puerta','Un liquido de alta calidad',29.99,40.00,10,'lq',1);
/*!40000 ALTER TABLE `pieza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `piezasvalidas`
--

DROP TABLE IF EXISTS `piezasvalidas`;
/*!50001 DROP VIEW IF EXISTS `piezasvalidas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `piezasvalidas` AS SELECT 
 1 AS `idPieza`,
 1 AS `nombre`,
 1 AS `descripcion`,
 1 AS `precio_f`,
 1 AS `precio_v`,
 1 AS `existencia`,
 1 AS `categoria`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'fabricarefaccionaria'
--

--
-- Dumping routines for database 'fabricarefaccionaria'
--
/*!50003 DROP PROCEDURE IF EXISTS `empleadoLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `empleadoLogin`(varcorreo  VARCHAR(80), varcontrasena VARCHAR(20))
    READS SQL DATA
    DETERMINISTIC
begin

select emp.idEmpleado as idEmpleado, CONCAT(emp.apellido_paterno,' ', emp.apellido_materno,' ',emp.nombre) as nombre,
TIMESTAMPDIFF(YEAR, emp.fecha_nacimiento, CURDATE()) as edad,
emp.direccion as direccion,  emp.cp as cp,  emp.telefono as telefono, emp.cargo as cargo
from empleadofabrica emp
where emp.valido !=0 and emp.correo = varcorreo and emp.contrasena = varcontrasena;
     
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `clientesvalidos`
--

/*!50001 DROP VIEW IF EXISTS `clientesvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `clientesvalidos` AS select `cli`.`idCliente` AS `idCliente`,`cli`.`razon_social` AS `razon`,`cli`.`correo` AS `correo`,`cli`.`calle` AS `calle`,`cli`.`cp` AS `cp`,`cli`.`numero_local` AS `numero_local`,`cli`.`ciudad` AS `ciudad`,`cli`.`estado` AS `estado`,`cli`.`telefono` AS `telefono` from `clientefabrica` `cli` where (`cli`.`valido` <> 0) order by `cli`.`cp` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `empleadosvalidos`
--

/*!50001 DROP VIEW IF EXISTS `empleadosvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `empleadosvalidos` AS select `emp`.`idEmpleado` AS `idEmpleado`,concat(`emp`.`apellido_paterno`,' ',`emp`.`apellido_materno`,' ',`emp`.`nombre`) AS `nombre`,timestampdiff(YEAR,`emp`.`fecha_nacimiento`,curdate()) AS `edad`,`emp`.`direccion` AS `direccion`,`emp`.`cp` AS `cp`,`emp`.`telefono` AS `telefono`,`emp`.`cargo` AS `cargo`,`emp`.`correo` AS `correo`,`emp`.`contrasena` AS `contra` from `empleadofabrica` `emp` where (`emp`.`valido` <> 0) order by `emp`.`cargo`,`emp`.`apellido_paterno`,`emp`.`nombre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `enviosvalidos`
--

/*!50001 DROP VIEW IF EXISTS `enviosvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `enviosvalidos` AS select `en`.`idEnvio` AS `idEnvio`,`en`.`fecha_entrega` AS `fecha`,`en`.`estatus` AS `estatus`,`en`.`idPedido` AS `idPedido`,`en`.`nombre_receptor` AS `recibido_por`,`en`.`monto_envio` AS `monto_envio` from `envio` `en` where (`en`.`valido` <> 0) order by `en`.`fecha_entrega` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `facturasrealizadas`
--

/*!50001 DROP VIEW IF EXISTS `facturasrealizadas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `facturasrealizadas` AS select `fa`.`idFactura` AS `idFactura`,`fa`.`fecha` AS `fecha`,`fa`.`idPedido` AS `idPedido`,(sum(`p`.`precio_venta`) + `en`.`monto_envio`) AS `total` from ((((`facturafabrica` `fa` join `pedidofabrica` `ped` on((`ped`.`idPedido` = `fa`.`idPedido`))) join `detallepedidopieza` `d` on((`d`.`idPedido` = `ped`.`idPedido`))) join `envio` `en` on((`en`.`idPedido` = `ped`.`idPedido`))) join `pieza` `p` on((`d`.`idPieza` = `p`.`idPieza`))) where (`ped`.`idPedido` = `d`.`idPedido`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `facturasvalidas`
--

/*!50001 DROP VIEW IF EXISTS `facturasvalidas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `facturasvalidas` AS select `fa`.`idFactura` AS `idFactura`,`fa`.`fecha` AS `fecha`,`fa`.`total` AS `total`,`fa`.`idPedido` AS `idPedido` from `facturafabrica` `fa` order by `fa`.`fecha` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pagosvalidos`
--

/*!50001 DROP VIEW IF EXISTS `pagosvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pagosvalidos` AS select `pa`.`idPago` AS `idPago`,`pa`.`tipo` AS `tipo`,`pa`.`fecha_pago` AS `fecha`,`pa`.`monto` AS `monto`,`pe`.`idPedido` AS `num_pedido`,`cli`.`razon_social` AS `pagado_por` from ((`pago` `pa` join `pedidofabrica` `pe` on((`pe`.`idPedido` = `pa`.`idPedido`))) join `clientefabrica` `cli` on((`cli`.`idCliente` = `pe`.`idCliente`))) order by `pa`.`fecha_pago`,`cli`.`razon_social` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pedidosrealizadosvalidos`
--

/*!50001 DROP VIEW IF EXISTS `pedidosrealizadosvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pedidosrealizadosvalidos` AS select `ped`.`idPedido` AS `idPedido`,`ped`.`fecha` AS `fecha_realizado`,`d`.`idPieza` AS `idPieza`,`p`.`nombre` AS `pieza`,`p`.`precio_venta` AS `precio`,`d`.`cantidad` AS `cantidad`,(`d`.`cantidad` * `p`.`precio_venta`) AS `subtotal`,`cli`.`razon_social` AS `enviar_a`,concat(`emp`.`apellido_paterno`,' ',`emp`.`apellido_materno`,' ',`emp`.`nombre`) AS `hecho_por` from ((((`pedidofabrica` `ped` join `empleadofabrica` `emp` on((`emp`.`idEmpleado` = `ped`.`idEmpleado`))) join `clientefabrica` `cli` on((`cli`.`idCliente` = `ped`.`idCliente`))) join `detallepedidopieza` `d` on((`d`.`idPedido` = `ped`.`idPedido`))) join `pieza` `p` on((`p`.`idPieza` = `d`.`idPieza`))) where (`ped`.`valido` <> 0) order by `ped`.`fecha`,`emp`.`apellido_materno` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pedidosvalidos`
--

/*!50001 DROP VIEW IF EXISTS `pedidosvalidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pedidosvalidos` AS select `ped`.`idPedido` AS `idPedido`,`ped`.`fecha` AS `fecha`,`ped`.`idCliente` AS `idCliente`,`ped`.`idEmpleado` AS `idEmpleado` from `pedidofabrica` `ped` where (`ped`.`valido` <> 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `piezasvalidas`
--

/*!50001 DROP VIEW IF EXISTS `piezasvalidas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `piezasvalidas` AS select `pie`.`idPieza` AS `idPieza`,`pie`.`nombre` AS `nombre`,`pie`.`descripcion` AS `descripcion`,`pie`.`precio_fabricacion` AS `precio_f`,`pie`.`precio_venta` AS `precio_v`,`pie`.`existencia` AS `existencia`,`pie`.`categoria` AS `categoria` from `pieza` `pie` where (`pie`.`valido` <> 0) order by `pie`.`categoria`,`pie`.`nombre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-14 20:41:42
