-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 03, 2020 at 05:25 PM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `file_upload`
--

-- --------------------------------------------------------

--
-- Table structure for table `fileinfos`
--

CREATE TABLE IF NOT EXISTS `fileinfos` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `fileName` varchar(150) NOT NULL COMMENT 'name of the file uploaded ; Unique',
  `extensionType` varchar(20) NOT NULL COMMENT 'extension of the file uploaded',
  `address` varchar(100) NOT NULL COMMENT 'address of the file uploaded',
  `fileSize` varchar(25) NOT NULL COMMENT 'size of the file uploaded',
  `uploadDate` date NOT NULL COMMENT 'Date in which the file is uploaded in database',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- 
--

 