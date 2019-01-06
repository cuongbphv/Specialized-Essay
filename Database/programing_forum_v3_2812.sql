-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 28, 2018 at 04:13 PM
-- Server version: 5.7.21-log
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `programing_forum_v3`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `view_count` int(11) DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `right_answer_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_approved` int(11) NOT NULL DEFAULT '0',
  `approved_by` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`article_id`),
  KEY `fk_article_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`article_id`, `title`, `content`, `view_count`, `create_date`, `type`, `right_answer_id`, `thumbnail`, `is_approved`, `approved_by`, `user_id`, `status`) VALUES
('3f9ba71d0ca44ba9ab21a18c1769fe1d', 'Chan the ban', '##can', 1, '2018-12-27 07:45:41', 2, NULL, NULL, 0, NULL, '903198816557203', 1),
('48a87cf17bde485c9af8e8179f11ed9f', '123123', '```javascript\r\nconsole.log(\"Loi doi\");\r\n```', 23, '2018-12-19 09:15:19', 1, NULL, NULL, 1, '0', '903198816557203', 1),
('56b360ffc4864b39870c678b4eb31460', 'Test', '# What is restful\n\n```javascript\nconsole.log(\"abc\");\n```\n\n- 123\n- 123123\n- \n\n[mysql](http://http://localhost/phpmyadmin/index.php?token=33799a8008f3db3504d938a25716b391)\n\n', 3, '2018-12-27 14:13:08', 1, NULL, NULL, 0, NULL, 'a5f0ed58e0d24ad2953e030cef9823a7', 1),
('5ecb7b7db0c3407bae0914069973c73d', 'This is a test post', '# This is a test\n\n```java\nString test = \"This is a test post\";\n```', 5, '2018-12-27 12:55:29', 1, NULL, NULL, 0, NULL, '903198816557203', 1),
('610af0ada9c6485aa166d580d2e0af4c', 'This is ', '## hello', 2, '2018-12-27 07:43:34', 1, NULL, NULL, 0, NULL, '903198816557203', 1),
('974fb60f40e94f57be89c7897e8439db', 'Post moi', '# Minh muon\n## Hoi vai dieu\n```java\nString s = \"code nay chay dc khong?\";\n```\n\n```sql\nSELECT * FROM AB WHERE A = B;\n```', 3, '2018-12-22 23:07:24', 2, NULL, NULL, 1, 'af625451c0384232a1fee1df34e5566b', 'af625451c0384232a1fee1df34e5566b', 1),
('9986aeffe0254d1fbc9dd28bacd39b54', 'Test 123', '## hihi', 9, '2018-12-27 10:01:40', 1, NULL, NULL, 0, NULL, '903198816557203', 1),
('ae9503868b0e48938432122c6840f4b8', 'Cau hoi', '# Head1\n## Head2\n1 + 1 = ?', 4, '2018-12-21 16:48:35', 2, NULL, NULL, 1, NULL, 'af625451c0384232a1fee1df34e5566b', 1),
('b9b18bfe0280429eb6f07c1f21b04043', 'test post', '## asd', 1, '2018-12-27 09:59:50', 1, NULL, NULL, 0, NULL, '903198816557203', 1),
('c7a604143a62441ba5e9b5a8917c32c2', 'Test', '# Ahihi, xin trao cac cau\n\n```java\nString a = \"I love You\";\n```\n\n## Trao cac cau lan 2\n\n# Lai trao cac cau\n\n### Sao the nhi', 10, '2018-12-19 09:11:58', 1, NULL, NULL, 2, '0', '903198816557203', 1);

-- --------------------------------------------------------

--
-- Table structure for table `article_interact`
--

DROP TABLE IF EXISTS `article_interact`;
CREATE TABLE IF NOT EXISTS `article_interact` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `bookmark` int(11) DEFAULT NULL,
  `share` int(11) DEFAULT NULL,
  `bookmark_date` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`,`user_id`),
  KEY `fk_article_has_user_user1_idx` (`user_id`),
  KEY `fk_article_has_user_article1_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `article_interact`
--

INSERT INTO `article_interact` (`article_id`, `user_id`, `rating`, `bookmark`, `share`, `bookmark_date`) VALUES
('48a87cf17bde485c9af8e8179f11ed9f', 'af625451c0384232a1fee1df34e5566b', 0, 1, 0, '2018-12-21 16:47:34'),
('974fb60f40e94f57be89c7897e8439db', '903198816557203', 0, 1, 0, '2018-12-25 18:00:30');

-- --------------------------------------------------------

--
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
CREATE TABLE IF NOT EXISTS `badge` (
  `badge_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `badge_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `parent_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_article_has_user_user3_idx` (`user_id`),
  KEY `fk_article_has_user_article3_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `article_id`, `user_id`, `content`, `parent_id`, `create_date`, `status`) VALUES
('0c04fa705e23474b94ee7e38572f4128', '9986aeffe0254d1fbc9dd28bacd39b54', '108311716305599257008', 'what', NULL, '2018-12-27 11:11:00', 1),
('10515db7258549839d9d0897d6f50ca9', '9986aeffe0254d1fbc9dd28bacd39b54', '108311716305599257008', 'Greate', NULL, '2018-12-27 11:01:58', 1),
('137a6407598643d58f51e8ee0f375d2a', '48a87cf17bde485c9af8e8179f11ed9f', '903198816557203', 'hu', '1e1384db9edb42c1a1838dfdb0de7ac3', '2018-12-21 16:42:54', 1),
('1bacc5cef1524f12b52a5f197d65736f', '56b360ffc4864b39870c678b4eb31460', '0dab99665b054e698e99bcc4c3e98637', 'abc z', NULL, '2018-12-27 14:14:36', 0),
('1e1384db9edb42c1a1838dfdb0de7ac3', '48a87cf17bde485c9af8e8179f11ed9f', '903198816557203', 'She ', NULL, '2018-12-19 09:15:37', 1),
('3b6c7359ad08437f94d6db75fb7be8fa', '9986aeffe0254d1fbc9dd28bacd39b54', '903198816557203', 'Thank you', NULL, '2018-12-27 11:02:34', 1),
('58c51c073045482ebf14a64715a5904a', '5ecb7b7db0c3407bae0914069973c73d', '903198816557203', 'This is a new comment', NULL, '2018-12-27 12:56:31', 1),
('59b937bbe0c6457e893ec210fa88bbbe', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Uh ne', 'aaec080080fe47fd8baa0396c0fd5f37', '2018-12-20 10:34:51', 1),
('6835060c83624ac694710486101440a9', '56b360ffc4864b39870c678b4eb31460', '0dab99665b054e698e99bcc4c3e98637', 'abc z', NULL, '2018-12-27 14:14:32', 1),
('87f44e846bc14b338dccc447b045f352', '9986aeffe0254d1fbc9dd28bacd39b54', '903198816557203', 'halu', NULL, '2018-12-27 11:10:22', 1),
('aaec080080fe47fd8baa0396c0fd5f37', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Comment Phat', NULL, '2018-12-19 09:12:35', 1),
('ab3fc87c1b154d528e0ede04aebe2855', '5ecb7b7db0c3407bae0914069973c73d', '903198816557203', 'Hello\n', '58c51c073045482ebf14a64715a5904a', '2018-12-27 12:56:43', 1),
('ab9a017a51b74ff49d06a8ee2b8bf1f3', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Comment Phat', NULL, '2018-12-19 09:12:35', 1),
('b03f506044424f109094ff534c232381', 'c7a604143a62441ba5e9b5a8917c32c2', 'c3e70521caf446d5b069d06b2874558f', 'To cung muon comment', 'aaec080080fe47fd8baa0396c0fd5f37', '2018-12-24 11:43:59', 1),
('b9437bd021954245a134a0b733ed2e21', '9986aeffe0254d1fbc9dd28bacd39b54', '903198816557203', 'Well done', NULL, '2018-12-27 11:10:08', 1),
('bd34d1c57b974f318a06bc5a86d6cab7', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Comment Phat', NULL, '2018-12-19 09:12:28', 1),
('c0012744e91f4dc2a509515fb1bb6e71', '9986aeffe0254d1fbc9dd28bacd39b54', '108311716305599257008', 'Are you interesting?', NULL, '2018-12-27 11:08:45', 1),
('cd203ad472704702bf61ed31963cfffe', '9986aeffe0254d1fbc9dd28bacd39b54', '108311716305599257008', 'what', NULL, '2018-12-27 11:11:18', 1),
('e193f925c1fb4bcc828224b96ce79cc0', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Comment Phat', NULL, '2018-12-19 09:12:34', 1),
('ed1870c38f8a4ff986602f0c65d99ac5', 'c7a604143a62441ba5e9b5a8917c32c2', '903198816557203', 'Comment Phat', NULL, '2018-12-19 09:12:35', 1),
('f70dd6ea1d084bb6bb65bfbe9c0dede2', '48a87cf17bde485c9af8e8179f11ed9f', 'af625451c0384232a1fee1df34e5566b', ':)) ', '1e1384db9edb42c1a1838dfdb0de7ac3', '2018-12-21 16:45:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comment_interact`
--

DROP TABLE IF EXISTS `comment_interact`;
CREATE TABLE IF NOT EXISTS `comment_interact` (
  `comment_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `fk_comment_has_user_user1_idx` (`user_id`),
  KEY `fk_comment_has_user_comment1_idx` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follow_tag`
--

DROP TABLE IF EXISTS `follow_tag`;
CREATE TABLE IF NOT EXISTS `follow_tag` (
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`tag_id`,`user_id`),
  KEY `fk_tag_has_user_user1_idx` (`user_id`),
  KEY `fk_tag_has_user_tag1_idx` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follow_user`
--

DROP TABLE IF EXISTS `follow_user`;
CREATE TABLE IF NOT EXISTS `follow_user` (
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `follow_user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`follow_user_id`),
  KEY `fk_user_has_user_user2_idx` (`follow_user_id`),
  KEY `fk_user_has_user_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `from_user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `to_user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) DEFAULT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `create_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  KEY `fk_user_has_user_user4_idx` (`to_user_id`),
  KEY `fk_user_has_user_user3_idx` (`from_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`from_user_id`, `to_user_id`, `type`, `data`, `create_date`, `status`) VALUES
('903198816557203', '108311716305599257008', 1, '9986aeffe0254d1fbc9dd28bacd39b54', '2018-12-27 11:10:23', 1),
('108311716305599257008', '903198816557203', 1, '9986aeffe0254d1fbc9dd28bacd39b54', '2018-12-27 11:11:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `report_article`
--

DROP TABLE IF EXISTS `report_article`;
CREATE TABLE IF NOT EXISTS `report_article` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `reason` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`,`user_id`),
  KEY `fk_article_has_user_user2_idx` (`user_id`),
  KEY `fk_article_has_user_article2_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

DROP TABLE IF EXISTS `reward`;
CREATE TABLE IF NOT EXISTS `reward` (
  `badge_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`badge_id`,`user_id`),
  KEY `fk_badge_has_user_user1_idx` (`user_id`),
  KEY `fk_badge_has_user_badge1_idx` (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `token_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `login_date` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `session_data` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `fk_session_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`token_id`, `expiration_date`, `login_date`, `session_data`, `user_id`) VALUES
('028ead5fa9cd47f48a8c1561358c3cb7', '2019-02-23 03:40:38', '2018-12-25 03:40:38.105', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('041f534aee20423fbd01dea384c49126', '2019-02-25 13:12:39', '2018-12-27 13:12:39.431', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('156355e67d64459dac62e9b68fd2dcc1', '2019-02-25 14:07:00', '2018-12-27 14:06:59.88', '{\"id\":\"0dab99665b054e698e99bcc4c3e98637\",\"username\":\"cuong1\",\"password\":\"3204cf62fee6d7af85fa19470c53f98f\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '0dab99665b054e698e99bcc4c3e98637'),
('1e3c730c7c604ceeb40e7bf833f6390d', '2019-02-25 14:04:39', '2018-12-27 14:04:38.574', '{\"id\":\"a5f0ed58e0d24ad2953e030cef9823a7\",\"username\":\"cuong\",\"password\":\"a45137f2a8a31679ebfe0c04dee0544c\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', 'a5f0ed58e0d24ad2953e030cef9823a7'),
('2b45ed7bc81e4df2bdc6c2839bc00b0b', '2019-02-23 03:38:51', '2018-12-25 03:38:50.818', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', '903198816557203'),
('3586f054c96e4f96be29b9492338598c', '2019-02-23 00:37:56', '2018-12-25 00:37:56.144', '{\"id\":\"108737035210497716682\",\"username\":\"studentpro\",\"password\":\"2476d48ebe08742fc27899c70e46ca01\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108737035210497716682'),
('797888087ca844c1ac5ed4e66b3c0b83', '2019-02-25 12:24:13', '2018-12-27 12:24:13.374', '{\"id\":\"108311716305599257008\",\"username\":\"thanhhiep\",\"password\":\"845d2cf5383087e662f821499f7aa2f8\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108311716305599257008'),
('802bf7ff3d9f49099c473b9d142012cd', '2019-02-25 14:10:50', '2018-12-27 14:10:50.018', '{\"id\":\"a5f0ed58e0d24ad2953e030cef9823a7\",\"username\":\"cuong\",\"password\":\"a45137f2a8a31679ebfe0c04dee0544c\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', 'a5f0ed58e0d24ad2953e030cef9823a7'),
('8162853260dd42ea8316a190c4bdc1b8', '2019-02-25 12:25:20', '2018-12-27 12:25:20.036', '{\"id\":\"108737035210497716682\",\"username\":\"studentpro\",\"password\":\"2476d48ebe08742fc27899c70e46ca01\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108737035210497716682'),
('88368bcfed1e489d9cdd52d6c788cf02', '2019-02-25 12:51:43', '2018-12-27 12:51:42.75', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('8bd16cd332234c89b9abe31dc43c69b2', '2019-02-25 11:01:23', '2018-12-27 11:01:23.47', '{\"id\":\"108311716305599257008\",\"username\":\"thanhhiep\",\"password\":\"845d2cf5383087e662f821499f7aa2f8\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108311716305599257008'),
('a9008e48b0a4415bbf12f8287fbb1584', '2019-02-25 12:26:17', '2018-12-27 12:26:17.438', '{\"id\":\"108343200151364598932\",\"username\":\"th123123\",\"password\":\"3df4ae0d75d326aaff7ca3035a860399\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108343200151364598932'),
('b952ff16ec4f41f1bc37c55394ebe56d', '2019-02-25 14:15:26', '2018-12-27 14:15:26.447', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('ebf9c9a26aa0417091df5c9f2e0dfa28', '2019-02-23 01:03:34', '2018-12-25 01:03:33.743', '{\"id\":\"6bdc919d3c4346019608cb3a02348d71\",\"username\":\"lalala\",\"password\":\"c4301770168095908b50cd95e9a848ba\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '6bdc919d3c4346019608cb3a02348d71'),
('fbf861c4c9614a1291c19425330d9463', '2019-02-25 12:23:59', '2018-12-27 12:23:59.097', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tag_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`tag_id`, `tag_name`, `description`, `create_date`) VALUES
('430e4ade431240a78b2ba1ab76323502', 'angular', 'Angular 6', '2018-12-19 09:15:18'),
('817f188db9c94b5ebbed9d2588a2cdea', 'js', '', '2018-12-27 14:13:07'),
('91219a7bc83b467ea5f422f5df367401', 'node', 'Node JS Des', '2018-12-27 12:55:29');

-- --------------------------------------------------------

--
-- Table structure for table `tag_article`
--

DROP TABLE IF EXISTS `tag_article`;
CREATE TABLE IF NOT EXISTS `tag_article` (
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`tag_id`,`article_id`),
  KEY `fk_tag_has_article_article1_idx` (`article_id`),
  KEY `fk_tag_has_article_tag1_idx` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tag_article`
--

INSERT INTO `tag_article` (`tag_id`, `article_id`) VALUES
('430e4ade431240a78b2ba1ab76323502', '48a87cf17bde485c9af8e8179f11ed9f'),
('817f188db9c94b5ebbed9d2588a2cdea', '56b360ffc4864b39870c678b4eb31460'),
('91219a7bc83b467ea5f422f5df367401', '56b360ffc4864b39870c678b4eb31460'),
('91219a7bc83b467ea5f422f5df367401', '5ecb7b7db0c3407bae0914069973c73d');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_hash` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lang` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_activity` datetime DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `setting` text COLLATE utf8_unicode_ci,
  `role` int(11) DEFAULT '3',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `password_hash`, `salt`, `email`, `phone`, `lang`, `create_date`, `last_activity`, `status`, `setting`, `role`) VALUES
('0dab99665b054e698e99bcc4c3e98637', 'cuong1', '3204cf62fee6d7af85fa19470c53f98f', 'lkG3wjvx', 'xyz@gmail.com', '01981261216', 'en', '2018-12-27 14:07:00', NULL, 1, NULL, 3),
('108311716305599257008', 'thanhhiep', '845d2cf5383087e662f821499f7aa2f8', 'IfMIH12E', 'thanhhiephui92@gmail.com', NULL, 'en', '2018-12-25 00:13:56', NULL, 1, NULL, 3),
('108343200151364598932', 'th123123', '3df4ae0d75d326aaff7ca3035a860399', 'KnvzEHrf', 'thanhhiephui@gmail.com', NULL, 'en', '2018-12-27 12:26:17', NULL, 1, NULL, 3),
('108737035210497716682', 'studentpro', '2476d48ebe08742fc27899c70e46ca01', '9MH8K0VD', '15110218@student.hcmute.edu.vn', NULL, 'en', '2018-12-25 00:37:56', NULL, 1, NULL, 3),
('2d50b8997a8443ea8bfcb689d26b53ad', 'jammaica', 'fe34f549557bda178370303315c81a0e', 'GHNSRwe+', 'deadknifeclone@gmail.com', NULL, 'en', '2018-12-18 14:04:52', NULL, 1, NULL, 3),
('6bdc919d3c4346019608cb3a02348d71', 'lalala', 'c4301770168095908b50cd95e9a848ba', 'GkzFJ6hI', 'lalalala@gmail.com', NULL, 'en', '2018-12-25 01:03:34', NULL, 0, NULL, 3),
('80dd2e9dbaf94c70bad16f4b6213a11b', 'jammaica222', 'e2572d6826beeaf5fa4c9a8d0854fa67', 'nL+Hg7WZ', 'deadknifeclone1@gmail.com', NULL, 'en', '2018-12-18 21:05:48', NULL, 1, NULL, 2),
('903198816557203', 'jammaica111', 'd7f95a32801460e1ae054cb1b67139e9', 'VzhrmrJG', 'deadknifepro@gmail.com', '0905650955', 'en', '2018-12-17 23:12:21', NULL, 1, NULL, 1),
('a5f0ed58e0d24ad2953e030cef9823a7', 'cuong', 'a45137f2a8a31679ebfe0c04dee0544c', 'gAcHoV70', 'abc@gmail.com', '098989898', 'en', '2018-12-27 14:04:38', NULL, 1, NULL, 3),
('af625451c0384232a1fee1df34e5566b', 'test', 'eab2203aba6823c2eb9d25ad54016b2b', 'JL+9ETkG', 'occho@gmail.com', NULL, 'en', '2018-12-21 16:45:30', NULL, 1, NULL, 1),
('c3e70521caf446d5b069d06b2874558f', 'ahuhu123', '3b7a3956af53359865503863a858ab33', '1FmPgQOE', 'hihihihi@gmail.com', NULL, 'en', '2018-12-23 17:15:09', NULL, 1, NULL, 3),
('e5c910b2e0784f0f84c5b2b51ff80564', 'username123', 'eb47f43b81b182ede7cb0b4e4d1198c2', 'U+THhdzm', 'deadknifeclone123@gmail.com', NULL, 'en', '2018-12-23 03:30:26', NULL, 1, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE IF NOT EXISTS `user_profile` (
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` text COLLATE utf8_unicode_ci,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `github_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `position` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_profile_id`),
  KEY `fk_user_profile_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`user_profile_id`, `first_name`, `last_name`, `avatar`, `description`, `website_link`, `github_link`, `position`, `company`, `user_id`) VALUES
('0475f07eedf849da8715251f0cfc8e0e', 'Quy', 'Pham', NULL, NULL, NULL, NULL, NULL, NULL, '6bdc919d3c4346019608cb3a02348d71'),
('0db700a10910463d805f84869e52aaa2', 'Hiệp', 'Phạm', 'http://localhost:8080/files/user_avatar_108343200151364598932.png', NULL, NULL, NULL, NULL, NULL, '108343200151364598932'),
('15f4486dda404f6c8432e5491d0c1bf3', 'Demo', 'Test', 'http://localhost:8080/files/user_avatar_0dab99665b054e698e99bcc4c3e98637.png', 'Mo ta', NULL, NULL, NULL, NULL, '0dab99665b054e698e99bcc4c3e98637'),
('1e380670c30a4ccba54cb579807b21c5', 'Huy', 'Halu Mother ', 'http://localhost:8080/files/user_avatar_903198816557203.png', 'des', 'web', 'git', 'Information Technology Ahihi', 'HCMC University of Technology and Education', '903198816557203'),
('457b981f4f394a5fa775981609355f5f', 'Pham', 'Hiepp', 'https://lh6.googleusercontent.com/-2HbFhD1UfZc/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZoQvS3SnQ1AB17i04jwOFDzY-TIA/s96-c/photo.jpg', NULL, NULL, NULL, NULL, NULL, '108311716305599257008'),
('48ee8119a2c1493da06571c46b0ecaf7', 'Phan', 'Quan ML', 'http://localhost:8080/files/usr_avt_c3e70521caf446d5b069d06b2874558f.jpg', 'pq \npro \nplayer 123', NULL, NULL, NULL, NULL, 'c3e70521caf446d5b069d06b2874558f'),
('aabacd0df5cf49e3af3b07908994d765', 'Huy', 'Hi', NULL, NULL, NULL, NULL, NULL, NULL, '80dd2e9dbaf94c70bad16f4b6213a11b'),
('c68d1a7dbb0041e6ab71a7035014f4ab', 'Pham Ngoc', 'Huyy', 'https://lh5.googleusercontent.com/-qyoHyjyGZC0/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZbzxWJVWqnilT4kQcSREK_89LVTA/s96-c/photo.jpg', NULL, NULL, NULL, NULL, NULL, '108737035210497716682'),
('d3ab61f8c28c4eecbec746b43c1d1b29', 'Bui', 'Cuong', 'http://localhost:8080/files/user_avatar_a5f0ed58e0d24ad2953e030cef9823a7.jpg', NULL, NULL, NULL, NULL, NULL, 'a5f0ed58e0d24ad2953e030cef9823a7'),
('e88c804dd90d4702bcf4c5cf28d088b4', 'Huy', 'Pro', NULL, '1233', NULL, NULL, NULL, NULL, 'af625451c0384232a1fee1df34e5566b'),
('ee67da7a51a4464a83309609d645e98a', 'Thanh', 'Le', 'E:\\TLCN\\Project3\\Specialized-Essay\\ProgramingForum\\uploadsusr_avt_e5c910b2e0784f0f84c5b2b51ff80564', '123123', NULL, NULL, NULL, NULL, 'e5c910b2e0784f0f84c5b2b51ff80564');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `fk_article_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `article_interact`
--
ALTER TABLE `article_interact`
  ADD CONSTRAINT `fk_article_has_user_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_article_has_user_article3` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_user_user3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `comment_interact`
--
ALTER TABLE `comment_interact`
  ADD CONSTRAINT `fk_comment_has_user_comment1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `follow_tag`
--
ALTER TABLE `follow_tag`
  ADD CONSTRAINT `fk_tag_has_user_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `follow_user`
--
ALTER TABLE `follow_user`
  ADD CONSTRAINT `fk_user_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_user_user2` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_user_has_user_user3` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_user_user4` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `report_article`
--
ALTER TABLE `report_article`
  ADD CONSTRAINT `fk_article_has_user_article2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_user_user2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reward`
--
ALTER TABLE `reward`
  ADD CONSTRAINT `fk_badge_has_user_badge1` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_badge_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tag_article`
--
ALTER TABLE `tag_article`
  ADD CONSTRAINT `fk_tag_has_article_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_has_article_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `fk_user_profile_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
