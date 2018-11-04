-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 18, 2018 lúc 06:51 PM
-- Phiên bản máy phục vụ: 5.7.21-log
-- Phiên bản PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `programing_forum`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `view_count` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `right_answer_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`article_id`,`user_profile_id`),
  KEY `fk_article_user_profile1_idx` (`user_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_tag`
--

DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE IF NOT EXISTS `article_tag` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`article_id`,`tag_id`),
  KEY `fk_article_has_tag_tag1_idx` (`tag_id`),
  KEY `fk_article_has_tag_article1_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_user_profile`
--

DROP TABLE IF EXISTS `article_user_profile`;
CREATE TABLE IF NOT EXISTS `article_user_profile` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT NULL,
  `bookmark` int(11) DEFAULT NULL,
  PRIMARY KEY (`article_id`,`user_profile_id`),
  KEY `fk_article_has_user_profile_user_profile1_idx` (`user_profile_id`),
  KEY `fk_article_has_user_profile_article1_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `badge`
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
-- Cấu trúc bảng cho bảng `badge_user_profile`
--

DROP TABLE IF EXISTS `badge_user_profile`;
CREATE TABLE IF NOT EXISTS `badge_user_profile` (
  `badge_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`badge_id`,`user_profile_id`),
  KEY `fk_badge_has_user_profile_user_profile1_idx` (`user_profile_id`),
  KEY `fk_badge_has_user_profile_badge1_idx` (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `article_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `comment_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `parent` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'root',
  PRIMARY KEY (`article_id`,`user_profile_id`,`comment_id`),
  KEY `fk_article_has_user_profile_user_profile2_idx` (`user_profile_id`),
  KEY `fk_article_has_user_profile_article2_idx` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `follow_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `followcol` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_profile_id`,`follow_profile_id`),
  KEY `fk_user_profile_has_user_profile_user_profile2_idx` (`follow_profile_id`),
  KEY `fk_user_profile_has_user_profile_user_profile1_idx` (`user_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `token_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `login_date` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `session_data` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `fk_session_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `session`
--

INSERT INTO `session` (`token_id`, `expiration_date`, `login_date`, `session_data`, `user_id`, `userid`) VALUES
('db332ae6ec0c4c1eb88dadc6879612ed', '2018-10-12 01:43:05', '2018-10-12 01:13:04.971', '{\"id\":\"ebdb126b7af84aac86c90ebd7d260e3f\",\"username\":\"admin\",\"password\":\"935cbd2e84a4cfb13a0e14e3c1ba8b1f\",\"enabled\":true,\"role\":\"ADMIN\",\"lang\":\"en\"}', NULL, 'ebdb126b7af84aac86c90ebd7d260e3f');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tag_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag_user_profile`
--

DROP TABLE IF EXISTS `tag_user_profile`;
CREATE TABLE IF NOT EXISTS `tag_user_profile` (
  `tag_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`tag_id`,`user_profile_id`),
  KEY `fk_tag_has_user_profile_user_profile1_idx` (`user_profile_id`),
  KEY `fk_tag_has_user_profile_tag1_idx` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_hash` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lang` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_activity` datetime DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `setting` text COLLATE utf8_unicode_ci,
  `role` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `password_hash`, `salt`, `email`, `lang`, `create_date`, `last_activity`, `status`, `setting`, `role`) VALUES
('2f4e83fc07f74260b356fb466378d599', 'jammaica111', '7d7cc3afe198b180c037eca29569c903', 'jxDBsSxn', 'deadknifeclone@gmail.com', 'en', NULL, NULL, 1, '', 'USER'),
('924515f563c149ccb110e3b3c24e7401', 'jammaica113', 'd81d910ae049d68e9f5b9c5f2a4ab6b5', 'WsRpn0Z1', 'deadknifeclone2@gmail.com', 'en', NULL, NULL, 1, '', 'USER'),
('ca30a4498620432bb09d2233ef1fa471', 'jammaica112', '549773466e921368f16ca8c465d19607', '3PTykenC', 'deadknifeclone1@gmail.com', 'en', NULL, NULL, 1, '', 'USER'),
('ebdb126b7af84aac86c90ebd7d260e3f', 'admin', '935cbd2e84a4cfb13a0e14e3c1ba8b1f', 'nwPX4OrT1n', 'adminforum@gmail.com', 'en', '2018-10-12 00:00:00', '2018-10-12 00:00:00', 1, NULL, 'ADMIN');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE IF NOT EXISTS `user_profile` (
  `user_profile_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `github_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `degree` varchar(3000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` text COLLATE utf8_unicode_ci,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_profile_id`,`user_id`),
  KEY `fk_user_profile_user_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `fk_article_user_profile1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `article_tag`
--
ALTER TABLE `article_tag`
  ADD CONSTRAINT `fk_article_has_tag_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `article_user_profile`
--
ALTER TABLE `article_user_profile`
  ADD CONSTRAINT `fk_article_has_user_profile_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_user_profile_user_profile1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `badge_user_profile`
--
ALTER TABLE `badge_user_profile`
  ADD CONSTRAINT `fk_badge_has_user_profile_badge1` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_badge_has_user_profile_user_profile1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_article_has_user_profile_article2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_article_has_user_profile_user_profile2` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `fk_user_profile_has_user_profile_user_profile1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_profile_has_user_profile_user_profile2` FOREIGN KEY (`follow_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `tag_user_profile`
--
ALTER TABLE `tag_user_profile`
  ADD CONSTRAINT `fk_tag_has_user_profile_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tag_has_user_profile_user_profile1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`user_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `fk_user_profile_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
