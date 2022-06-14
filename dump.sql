/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Abono
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Abono` (
  `idAbono` int(11) NOT NULL AUTO_INCREMENT,
  `monto` float DEFAULT NULL,
  `idApartado` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`idAbono`),
  KEY `idApartado_idx` (`idApartado`),
  CONSTRAINT `Abono_ibfk_1` FOREIGN KEY (`idApartado`) REFERENCES `Apartado` (`idApartado`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Apartado
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Apartado` (
  `idApartado` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(30) DEFAULT NULL,
  `fecha_apartado` date DEFAULT NULL,
  `idUsuarios` int(11) NOT NULL,
  `fecha_limite` date DEFAULT NULL,
  `direccion_cliente` varchar(30) DEFAULT NULL,
  `tel_cliente` varchar(15) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `faltante` float DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `descuento` float NOT NULL,
  PRIMARY KEY (`idApartado`),
  KEY `idUsuario_idx` (`idUsuarios`),
  KEY `idLugar` (`idLugar`),
  CONSTRAINT `Apartado_ibfk_1` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `Usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: CierreInventario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `CierreInventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: DetalleApartado
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `DetalleApartado` (
  `idDetalleApartado` int(11) NOT NULL AUTO_INCREMENT,
  `precio_prod` float DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `idApartado` int(11) NOT NULL,
  `talla` varchar(20) NOT NULL,
  `idSalida` int(11) NOT NULL,
  `descuento` float NOT NULL,
  PRIMARY KEY (`idDetalleApartado`),
  KEY `idApartado_idx` (`idApartado`),
  KEY `codigo_barras` (`codigo_barras`),
  CONSTRAINT `DetalleApartado_ibfk_1` FOREIGN KEY (`codigo_barras`) REFERENCES `Productos` (`codigo_barras`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idApartado_pro` FOREIGN KEY (`idApartado`) REFERENCES `Apartado` (`idApartado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: DetalleVentas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `DetalleVentas` (
  `idDetalleVentas` int(11) NOT NULL AUTO_INCREMENT,
  `idVentas` int(11) NOT NULL,
  `precio_prod` float DEFAULT NULL,
  `precio_prod_compra` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `talla` varchar(20) NOT NULL,
  `idSalida` int(11) NOT NULL,
  `descuento` float NOT NULL,
  PRIMARY KEY (`idDetalleVentas`),
  KEY `idVentas_idx` (`idVentas`),
  KEY `codigo_barras` (`codigo_barras`),
  CONSTRAINT `DetalleVentas_ibfk_1` FOREIGN KEY (`codigo_barras`) REFERENCES `Productos` (`codigo_barras`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idVentas` FOREIGN KEY (`idVentas`) REFERENCES `Ventas` (`idVentas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Entrada
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Entrada` (
  `idEntrada` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` date DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `tipo` varchar(23) DEFAULT NULL,
  `talla` varchar(4) NOT NULL,
  PRIMARY KEY (`idEntrada`),
  KEY `idLugar_idx` (`idLugar`),
  KEY `codigo_barras` (`codigo_barras`),
  CONSTRAINT `Entrada_ibfk_1` FOREIGN KEY (`codigo_barras`) REFERENCES `Productos` (`codigo_barras`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idLugar_tnd` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: InventarioGeneral
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `InventarioGeneral` (
  `idInventarioGeneral` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `talla` varchar(4) DEFAULT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idInventarioGeneral`),
  KEY `idLugar_idx` (`idLugar`),
  KEY `codigo_barras` (`codigo_barras`),
  CONSTRAINT `InventarioGeneral_ibfk_1` FOREIGN KEY (`codigo_barras`) REFERENCES `Productos` (`codigo_barras`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idLugar_tn` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Lugar
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Lugar` (
  `idLugar` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `domicilio` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `ciudad` varchar(20) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`idLugar`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Mensajes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Mensajes` (
  `idMensajes` int(11) NOT NULL AUTO_INCREMENT,
  `destinatario` int(11) NOT NULL,
  `remitente` int(11) NOT NULL,
  `contenido` text NOT NULL,
  PRIMARY KEY (`idMensajes`),
  KEY `remitente` (`remitente`),
  KEY `destinatario` (`destinatario`),
  CONSTRAINT `Mensajes_ibfk_1` FOREIGN KEY (`remitente`) REFERENCES `Usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Mensajes_ibfk_2` FOREIGN KEY (`destinatario`) REFERENCES `Usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Productos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Productos` (
  `modelo` varchar(20) DEFAULT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `color` varchar(20) NOT NULL,
  `codigo_barras` varchar(20) NOT NULL DEFAULT '',
  `status` varchar(10) NOT NULL,
  `precio_compra` float NOT NULL,
  `precio_venta` float NOT NULL,
  PRIMARY KEY (`codigo_barras`),
  KEY `codigo_barras` (`codigo_barras`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Salidas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Salidas` (
  `idSalida` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_salida` date DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `tipo` varchar(25) DEFAULT NULL,
  `talla` varchar(4) NOT NULL,
  PRIMARY KEY (`idSalida`),
  KEY `idLugar_idx` (`idLugar`),
  KEY `codigo_barras` (`codigo_barras`),
  CONSTRAINT `Salidas_ibfk_1` FOREIGN KEY (`codigo_barras`) REFERENCES `Productos` (`codigo_barras`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idLugar_tiend` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: SnapshotInvBack
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `SnapshotInvBack` (`id` int(11) NOT NULL) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: SnapshotInventario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `SnapshotInventario` (
  `idInventarioGeneral` int(11) NOT NULL DEFAULT '0',
  `cantidad` int(11) NOT NULL,
  `talla` varchar(4) DEFAULT NULL,
  `codigo_barras` varchar(20) DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE = MyISAM DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `idUsuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_u` varchar(30) DEFAULT NULL,
  `direccion_u` varchar(20) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo_el` varchar(20) DEFAULT NULL,
  `usuario` varchar(34) DEFAULT NULL,
  `contrasenia` varchar(32) DEFAULT NULL,
  `permisos` varchar(74) DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  KEY `idLugar_idx` (`idLugar`),
  CONSTRAINT `idLugar` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Ventas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Ventas` (
  `idVentas` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_salida` date DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `cliente` varchar(30) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `idLugar` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `descuento` float NOT NULL,
  PRIMARY KEY (`idVentas`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idLugar` (`idLugar`),
  KEY `idLugar_2` (`idLugar`),
  CONSTRAINT `Ventas_ibfk_1` FOREIGN KEY (`idLugar`) REFERENCES `Lugar` (`idLugar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Abono
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Apartado
# ------------------------------------------------------------

INSERT INTO
  `Apartado` (
    `idApartado`,
    `cliente`,
    `fecha_apartado`,
    `idUsuarios`,
    `fecha_limite`,
    `direccion_cliente`,
    `tel_cliente`,
    `total`,
    `faltante`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (
    1,
    '',
    '2017-11-24',
    1,
    '2017-12-09',
    '',
    '',
    2250,
    2250,
    1,
    'activo',
    0
  );
INSERT INTO
  `Apartado` (
    `idApartado`,
    `cliente`,
    `fecha_apartado`,
    `idUsuarios`,
    `fecha_limite`,
    `direccion_cliente`,
    `tel_cliente`,
    `total`,
    `faltante`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (
    2,
    '',
    '2017-11-24',
    1,
    '2017-12-09',
    '',
    '',
    2250,
    2250,
    1,
    'activo',
    0
  );
INSERT INTO
  `Apartado` (
    `idApartado`,
    `cliente`,
    `fecha_apartado`,
    `idUsuarios`,
    `fecha_limite`,
    `direccion_cliente`,
    `tel_cliente`,
    `total`,
    `faltante`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (
    3,
    '',
    '2017-11-24',
    1,
    '2017-12-09',
    '',
    '',
    2250,
    2250,
    1,
    'activo',
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: CierreInventario
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: DetalleApartado
# ------------------------------------------------------------

INSERT INTO
  `DetalleApartado` (
    `idDetalleApartado`,
    `precio_prod`,
    `cantidad`,
    `codigo_barras`,
    `total`,
    `idApartado`,
    `talla`,
    `idSalida`,
    `descuento`
  )
VALUES
  (1, 2500, 1, 'LNB001', 2250, 2, '1', 12, 10);
INSERT INTO
  `DetalleApartado` (
    `idDetalleApartado`,
    `precio_prod`,
    `cantidad`,
    `codigo_barras`,
    `total`,
    `idApartado`,
    `talla`,
    `idSalida`,
    `descuento`
  )
VALUES
  (2, 2500, 1, 'LNB001', 2250, 3, '1', 13, 10);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: DetalleVentas
# ------------------------------------------------------------

INSERT INTO
  `DetalleVentas` (
    `idDetalleVentas`,
    `idVentas`,
    `precio_prod`,
    `precio_prod_compra`,
    `cantidad`,
    `codigo_barras`,
    `total`,
    `talla`,
    `idSalida`,
    `descuento`
  )
VALUES
  (1, 9, 2500, 2000, 1, 'LNB001', 2250, '1', 10, 10);
INSERT INTO
  `DetalleVentas` (
    `idDetalleVentas`,
    `idVentas`,
    `precio_prod`,
    `precio_prod_compra`,
    `cantidad`,
    `codigo_barras`,
    `total`,
    `talla`,
    `idSalida`,
    `descuento`
  )
VALUES
  (2, 11, 2500, 2000, 1, 'LNB001', 2000, '1', 16, 20);
INSERT INTO
  `DetalleVentas` (
    `idDetalleVentas`,
    `idVentas`,
    `precio_prod`,
    `precio_prod_compra`,
    `cantidad`,
    `codigo_barras`,
    `total`,
    `talla`,
    `idSalida`,
    `descuento`
  )
VALUES
  (3, 12, 50, 8, 5, 'SMG530', 250, '1', 17, 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Entrada
# ------------------------------------------------------------

INSERT INTO
  `Entrada` (
    `idEntrada`,
    `fecha_entrada`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (1, '2016-03-01', 1, 'SAR001', 1000, 'cancelada', '1');
INSERT INTO
  `Entrada` (
    `idEntrada`,
    `fecha_entrada`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (
    2,
    '2017-11-24',
    1,
    'LNB001',
    10,
    'registro normal',
    '1'
  );
INSERT INTO
  `Entrada` (
    `idEntrada`,
    `fecha_entrada`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (
    3,
    '2017-11-24',
    1,
    'SMG530',
    30,
    'registro normal',
    '1'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: InventarioGeneral
# ------------------------------------------------------------

INSERT INTO
  `InventarioGeneral` (
    `idInventarioGeneral`,
    `cantidad`,
    `talla`,
    `codigo_barras`,
    `idLugar`,
    `estado`
  )
VALUES
  (2, 6, '1', 'LNB001', 1, 'existencia');
INSERT INTO
  `InventarioGeneral` (
    `idInventarioGeneral`,
    `cantidad`,
    `talla`,
    `codigo_barras`,
    `idLugar`,
    `estado`
  )
VALUES
  (3, 25, '1', 'SMG530', 1, 'existencia');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Lugar
# ------------------------------------------------------------

INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    1,
    'Sistema',
    'localhost',
    '1111111111',
    'Arandas',
    'activo'
  );
INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    2,
    'Lugar 1',
    'Calle sin nombre',
    'N/A',
    'Arandas Jalisco',
    'inactivo'
  );
INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    3,
    'Automovil repartidor',
    'transito vehicular',
    'N/A',
    'Arandas Jalisco',
    'inactivo'
  );
INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    4,
    'Bodega 1',
    'Hidalgo #256',
    'N/A',
    'Arandas Jalisco ',
    'activo'
  );
INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    5,
    'Sucursal mayor',
    'General Arteaga #295 local 5',
    'N/A',
    'Arandas Jalisco ',
    'activo'
  );
INSERT INTO
  `Lugar` (
    `idLugar`,
    `nombre`,
    `domicilio`,
    `telefono`,
    `ciudad`,
    `status`
  )
VALUES
  (
    6,
    'Bodega Arandas',
    'Fco. I. Madero #283',
    'N/A',
    'Arandas Jalisco',
    'inactivo'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Mensajes
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Productos
# ------------------------------------------------------------

INSERT INTO
  `Productos` (
    `modelo`,
    `marca`,
    `color`,
    `codigo_barras`,
    `status`,
    `precio_compra`,
    `precio_venta`
  )
VALUES
  (
    'nexus 5',
    'lg',
    'blanco',
    'LNB001',
    'inactivo',
    2000,
    2500
  );
INSERT INTO
  `Productos` (
    `modelo`,
    `marca`,
    `color`,
    `codigo_barras`,
    `status`,
    `precio_compra`,
    `precio_venta`
  )
VALUES
  (
    'MICA IPHONE 6',
    'IPHONE',
    'N/A',
    'MI6',
    'inactivo',
    8,
    50
  );
INSERT INTO
  `Productos` (
    `modelo`,
    `marca`,
    `color`,
    `codigo_barras`,
    `status`,
    `precio_compra`,
    `precio_venta`
  )
VALUES
  (
    'modelo1',
    'Sin marca',
    'rojo',
    'SAR001',
    'inactivo',
    100,
    110
  );
INSERT INTO
  `Productos` (
    `modelo`,
    `marca`,
    `color`,
    `codigo_barras`,
    `status`,
    `precio_compra`,
    `precio_venta`
  )
VALUES
  (
    'G530/31/32',
    'samsung',
    'N/A',
    'SMG530',
    'activo',
    8,
    50
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Salidas
# ------------------------------------------------------------

INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (
    1,
    '2017-11-24',
    1,
    'SAR001',
    0,
    'cancelacion de inventario',
    '1'
  );
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (2, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (3, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (4, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (5, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (6, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (7, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (8, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (9, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (10, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (11, '2017-11-24', 1, 'LNB001', 1, 'apartado', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (12, '2017-11-24', 1, 'LNB001', 1, 'apartado', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (13, '2017-11-24', 1, 'LNB001', 1, 'apartado', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (14, '2017-11-24', 1, 'SMG530', 4, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (15, '2017-11-24', 1, 'SMG530', 4, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (16, '2017-11-24', 1, 'LNB001', 1, 'venta', '1');
INSERT INTO
  `Salidas` (
    `idSalida`,
    `fecha_salida`,
    `idLugar`,
    `codigo_barras`,
    `cantidad`,
    `tipo`,
    `talla`
  )
VALUES
  (17, '2017-11-24', 1, 'SMG530', 5, 'venta', '1');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: SnapshotInvBack
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: SnapshotInventario
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Usuarios
# ------------------------------------------------------------

INSERT INTO
  `Usuarios` (
    `idUsuarios`,
    `nombre_u`,
    `direccion_u`,
    `telefono`,
    `correo_el`,
    `usuario`,
    `contrasenia`,
    `permisos`,
    `idLugar`,
    `status`
  )
VALUES
  (
    1,
    'Root',
    '--',
    '348-78-3-2',
    'root@localhost',
    'b9be11166d72e9e3ae7fd407165e4bd2',
    'b9be11166d72e9e3ae7fd407165e4bd2',
    '111,111,111,111,111,111,111,111,111,11111110',
    1,
    'activo'
  );
INSERT INTO
  `Usuarios` (
    `idUsuarios`,
    `nombre_u`,
    `direccion_u`,
    `telefono`,
    `correo_el`,
    `usuario`,
    `contrasenia`,
    `permisos`,
    `idLugar`,
    `status`
  )
VALUES
  (
    2,
    'Alberto LÃ³pez MacÃ­as ',
    'Privada los pinos #1',
    '3481029746',
    'alberto_lopezm@hotma',
    '30b08ca79e34fc605ec1f623932efc3c',
    '30b08ca79e34fc605ec1f623932efc3c',
    '111,111,111,111,111,111,111,111,111,1111111',
    1,
    'inactivo'
  );
INSERT INTO
  `Usuarios` (
    `idUsuarios`,
    `nombre_u`,
    `direccion_u`,
    `telefono`,
    `correo_el`,
    `usuario`,
    `contrasenia`,
    `permisos`,
    `idLugar`,
    `status`
  )
VALUES
  (
    3,
    'IvÃ¡n LÃ³pez LÃ³pez',
    'Privada los pinos #2',
    '3481053585',
    'ivanlopez_c@hotmail.',
    'e176882943849981a7ffb23d7ee8f625',
    '706721ec8e40570da25eebfb69b3f05c',
    '111,111,111,111,111,111,111,111,111,1111111',
    1,
    'inactivo'
  );
INSERT INTO
  `Usuarios` (
    `idUsuarios`,
    `nombre_u`,
    `direccion_u`,
    `telefono`,
    `correo_el`,
    `usuario`,
    `contrasenia`,
    `permisos`,
    `idLugar`,
    `status`
  )
VALUES
  (
    4,
    'Amairani Arredondo GarcÃ­a',
    'N/A',
    'N/A',
    'N/A',
    'ddb1c3dcd93a0a9bbb5fb0a37ede2042',
    'ddb1c3dcd93a0a9bbb5fb0a37ede2042',
    '000,000,110,111,000,000,000,000,000,0011001',
    5,
    'activo'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Ventas
# ------------------------------------------------------------

INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (1, '2017-11-24', 1, '', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (2, '2017-11-24', 1, '1', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (3, '2017-11-24', 1, '1', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (4, '2017-11-24', 1, '', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (5, '2017-11-24', 1, '', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (6, '2017-11-24', 1, '', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (7, '2017-11-24', 1, '', 2500, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (8, '2017-11-24', 1, '', 2250, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (9, '2017-11-24', 1, '', 2250, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (10, '2017-11-24', 1, '', 200, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (11, '2017-11-24', 1, '', 2200, 1, 'activa', 0);
INSERT INTO
  `Ventas` (
    `idVentas`,
    `fecha_salida`,
    `idUsuario`,
    `cliente`,
    `total`,
    `idLugar`,
    `estado`,
    `descuento`
  )
VALUES
  (
    12,
    '2017-11-24',
    1,
    'jose hernandez',
    250,
    1,
    'activa',
    0
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
