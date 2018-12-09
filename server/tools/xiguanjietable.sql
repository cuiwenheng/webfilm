/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 22/10/2018 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `xiguanjiemember` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='膝关节用户基本信息';

CREATE TABLE `xiguanjiequestion` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thedate` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option1` int(1) COLLATE utf8mb4_unicode_ci,
  `option2` int(1) COLLATE utf8mb4_unicode_ci,
  `option3` int(1) COLLATE utf8mb4_unicode_ci,
  `option4` int(1) COLLATE utf8mb4_unicode_ci,
  `option5` int(1) COLLATE utf8mb4_unicode_ci,
  `option6` int(1) COLLATE utf8mb4_unicode_ci,
  `option7` int(1) COLLATE utf8mb4_unicode_ci,
  `option8` int(1) COLLATE utf8mb4_unicode_ci,
  `option9` int(1) COLLATE utf8mb4_unicode_ci,
  `option10` int(1) COLLATE utf8mb4_unicode_ci,
  `option11` int(1) COLLATE utf8mb4_unicode_ci,
  `option12` int(1) COLLATE utf8mb4_unicode_ci,
  `option13` int(1) COLLATE utf8mb4_unicode_ci,
  `option14` int(1) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`open_id`,`thedate`),
  KEY `openid` (`open_id`,`thedate`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='膝关节问题';