-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 05, 2019 at 04:38 PM
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
('3f9ba71d0ca44ba9ab21a18c1769fe1d', 'Chan the ban', '##can', 1, '2018-12-27 07:45:41', 2, NULL, NULL, 2, '903198816557203', '903198816557203', 0),
('48a87cf17bde485c9af8e8179f11ed9f', '123123', '```javascript\r\nconsole.log(\"Loi doi\");\r\n```', 23, '2018-12-19 09:15:19', 1, NULL, NULL, 1, '0', '903198816557203', 0),
('4cf30e1a368d4a9290c2bbac56b9d29a', 'Sự khác nhau giữa display: inline, block và inline-block', 'Ở bài viết này mình sẽ phân biệt ba kiểu hiển thị:\n\n- display: inline\n- display: block\n- display: inline-block\n\n### display: inline\n\nVới kiểu này thì các item sẽ nằm trên cùng một dòng, ví dụ như <span> . Nếu các items vượt quá độ dài của dòng thì item sẽ xuống dòng mới\n\nCác item có kiểu display này không thể set width và height.\n\nCác inline item sẽ chỉ có thể điều chỉnh margin và padding left and right (top và bottom thì không thể). \n\n![display-inline](https://images.viblo.asia/0ccb7868-0ce4-4958-9d43-5107606958e0.PNG)\n\n### display: block\n\nKhác với kiểu **display: inline** thì các item có kiểu **display: block** luôn được xuống dòng và chiếm toàn bộ width nếu width không được set. Ví dụ sẽ là **div**\n\n![display-block](https://images.viblo.asia/63bfa5de-e8ab-4b1f-aa69-dd87cf2981c3.PNG)\n\nCác item có kiểu **display: block** sẽ set được width, height, margin, padding đầy đủ 4 hướng (top, bottom, right, left).\n\n### display: inline-block\n\nKiểu **display: inline-block** sẽ được sắp xếp giống với kiểu **display: inline**, nghĩa là các items sẽ được xếp cùng nhau trên một dòng . Tuy nhiên các items sẽ có thuộc tính của **display: block** như là có set width, height, margin, padding đủ 4 hướng.\n', 1, '2019-01-04 04:09:27', 1, NULL, NULL, 0, NULL, '108311716305599257008', 1),
('56b360ffc4864b39870c678b4eb31460', 'Test', '# What is restful\n\n```javascript\nconsole.log(\"abc\");\n```\n\n- 123\n- 123123\n- \n\n[mysql](http://http://localhost/phpmyadmin/index.php?token=33799a8008f3db3504d938a25716b391)\n\n', 62, '2018-12-27 14:13:08', 1, NULL, NULL, 2, '903198816557203', 'a5f0ed58e0d24ad2953e030cef9823a7', 0),
('5ecb7b7db0c3407bae0914069973c73d', 'This is a test post', '# This is a test\n\n```java\nString test = \"This is a test post\";\n```', 6, '2018-12-27 12:55:29', 1, NULL, NULL, 3, NULL, '903198816557203', 0),
('610af0ada9c6485aa166d580d2e0af4c', 'This is ', '## hello', 2, '2018-12-27 07:43:34', 1, NULL, NULL, 1, '903198816557203', '903198816557203', 0),
('69dafd7d92bc4f369c622bb38d5eb2a5', 'Demo Post', '# H1\r\n## H2\r\n### H3\r\n#### H4\r\n##### H5\r\n###### H6\r\n\r\nEmphasis, aka italics, with *asterisks* or _underscores_.\r\n\r\nStrong emphasis, aka bold, with **asterisks** or __underscores__.\r\n\r\nCombined emphasis with **asterisks and _underscores_**.\r\n\r\nStrikethrough uses two tildes. ~~Scratch this.~~\r\n\r\n1. First ordered list item\r\n2. Another item\r\n⋅⋅* Unordered sub-list. \r\n1. Actual numbers don\'t matter, just that it\'s a number\r\n⋅⋅1. Ordered sub-list\r\n4. And another item.        \r\n\r\nHere\'s our logo (hover to see the title text):\r\n\r\nInline-style: \r\n![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"Logo Title Text 1\")\r\n\r\n\r\n```javascript\r\nvar s = \"JavaScript syntax highlighting\";\r\nalert(s);\r\n```\r\n \r\n```python\r\ns = \"Python syntax highlighting\"\r\nprint s\r\n```\r\n \r\n```\r\nNo language indicated, so no syntax highlighting. \r\nBut let\'s throw in a <b>tag</b>.\r\n```\r\n\r\n\r\n1 | 2 | 3', 106, '2019-01-03 08:35:28', 1, NULL, NULL, 1, '903198816557203', '903198816557203', 0),
('6c0dfc5bd3d240768cace1133cb4a046', 'Demo Bai viet', '### Heading\n```javascript\nconsole.log(\"123\");\n```\n\n', 2, '2019-01-04 09:29:38', 1, NULL, NULL, 1, '903198816557203', 'a2337a4b1a9a41d78099a4cd25ae1611', 1),
('6e4998575f064067ae1aad92c413d2e8', 'Demo Post 2', 'An h1 header\r\n============\r\n\r\nParagraphs are separated by a blank line.\r\n\r\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\r\nlook like:\r\n\r\n  * this one\r\n  * that one\r\n  * the other one\r\n\r\nNote that --- not considering the asterisk --- the actual text\r\ncontent starts at 4-columns in.\r\n\r\n> Block quotes are\r\n> written like so.\r\n>\r\n> They can span multiple paragraphs,\r\n> if you like.\r\n\r\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it\'s all\r\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\r\nUnicode is supported. ☺\r\n\r\n\r\n\r\nAn h2 header\r\n------------\r\n\r\nHere\'s a numbered list:\r\n\r\n 1. first item\r\n 2. second item\r\n 3. third item\r\n\r\nNote again how the actual text starts at 4 columns in (4 characters\r\nfrom the left side). Here\'s a code sample:\r\n\r\n    # Let me re-iterate ...\r\n    for i in 1 .. 10 { do-something(i) }\r\n\r\nAs you probably guessed, indented 4 spaces. By the way, instead of\r\nindenting the block, you can use delimited blocks, if you like:\r\n\r\n~~~\r\ndefine foobar() {\r\n    print \"Welcome to flavor country!\";\r\n}\r\n~~~\r\n\r\n(which makes copying & pasting easier). You can optionally mark the\r\ndelimited block for Pandoc to syntax highlight it:\r\n\r\n~~~python\r\nimport time\r\n# Quick, count to ten!\r\nfor i in range(10):\r\n    # (but not *too* quick)\r\n    time.sleep(0.5)\r\n    print(i)\r\n~~~\r\n\r\n\r\n\r\n### An h3 header ###\r\n\r\nNow a nested list:\r\n\r\n 1. First, get these ingredients:\r\n\r\n      * carrots\r\n      * celery\r\n      * lentils\r\n\r\n 2. Boil some water.\r\n\r\n 3. Dump everything in the pot and follow\r\n    this algorithm:\r\n\r\n        find wooden spoon\r\n        uncover pot\r\n        stir\r\n        cover pot\r\n        balance wooden spoon precariously on pot handle\r\n        wait 10 minutes\r\n        goto first step (or shut off burner when done)\r\n\r\n    Do not bump wooden spoon or it will fall.\r\n\r\nNotice again how text always lines up on 4-space indents (including\r\nthat last line which continues item 3 above).\r\n\r\nHere\'s a link to [a website](http://foo.bar), to a [local\r\ndoc](local-doc.html), and to a [section heading in the current\r\ndoc](#an-h2-header). Here\'s a footnote [^1].\r\n\r\n[^1]: Some footnote text.\r\n\r\nTables can look like this:\r\n\r\nName           Size  Material      Color\r\n------------- -----  ------------  ------------\r\nAll Business      9  leather       brown\r\nRoundabout       10  hemp canvas   natural\r\nCinderella       11  glass         transparent\r\n\r\nTable: Shoes sizes, materials, and colors.\r\n\r\n(The above is the caption for the table.) Pandoc also supports\r\nmulti-line tables:\r\n\r\n--------  -----------------------\r\nKeyword   Text\r\n--------  -----------------------\r\nred       Sunsets, apples, and\r\n          other red or reddish\r\n          things.\r\n\r\ngreen     Leaves, grass, frogs\r\n          and other things it\'s\r\n          not easy being.\r\n--------  -----------------------\r\n\r\nA horizontal rule follows.\r\n\r\n***\r\n\r\nHere\'s a definition list:\r\n\r\napples\r\n  : Good for making applesauce.\r\n\r\noranges\r\n  : Citrus!\r\n\r\ntomatoes\r\n  : There\'s no \"e\" in tomatoe.\r\n\r\nAgain, text is indented 4 spaces. (Put a blank line between each\r\nterm and  its definition to spread things out more.)\r\n\r\nHere\'s a \"line block\" (note how whitespace is honored):\r\n\r\n| Line one\r\n|   Line too\r\n| Line tree\r\n\r\n\r\nAnd note that you can backslash-escape any punctuation characters\r\nwhich you wish to be displayed literally, ex.: \\`foo\\`, \\*bar\\*, etc.', 3, '2019-01-03 08:39:10', 2, NULL, NULL, 1, '903198816557203', '0dab99665b054e698e99bcc4c3e98637', 0),
('7c223b7b18064ef2beca9b5f6827eeb6', 'Vuejs: vấn đề bất đồng bộ', 'Chào mọi người, em đang làm về vuejs, em có hàm:\n\n```javascript\ndata() {\n    return {\n        subjects: []\n    }\n}\n```\n\n```javascript\nasync getReports() {\n    const subjects = await axios(\'/reports\');\n    this.subjects = subjects.data;\n    this.loading = false;\n    console.log(this.subjects)\n},\n```\n\nở hàm created, em có:\n\n```javascript\ncreated() {\n    this.getReports();\n    console.log(this.subjects)\n},\n```\n\nở trong hàm **getReports()** thì nó lấy được đúng kết quả, còn ở trong hàm **created()** thì nó lại trả về rỗng. vậy cho em hỏi là tại sao ạ. và cách khắc phục là như thế nào ạ? em cám ơn!!!', 206, '2019-01-04 03:53:38', 2, 'ca41bcde2ea7448480373babc0f54fbb', NULL, 1, '903198816557203', '0dab99665b054e698e99bcc4c3e98637', 1),
('974fb60f40e94f57be89c7897e8439db', 'Post moi', '# Minh muon\n## Hoi vai dieu\n```java\nString s = \"code nay chay dc khong?\";\n```\n\n```sql\nSELECT * FROM AB WHERE A = B;\n```', 3, '2018-12-22 23:07:24', 2, NULL, NULL, 1, 'af625451c0384232a1fee1df34e5566b', 'af625451c0384232a1fee1df34e5566b', 0),
('9986aeffe0254d1fbc9dd28bacd39b54', 'Test 123', '## hihi', 9, '2018-12-27 10:01:40', 1, NULL, NULL, 2, '903198816557203', '903198816557203', 0),
('a4ad6977642049f69ed846ea52ec230b', 'Chuẩn hóa CSDL quan hệ', '### Mở đầu\nHầu hết các ứng dụng web đều cần phải có cơ sở dữ liệu để lưu trữ dữ liệu, xử lý thông tin, kết xuất đưa ra báo cáo thống kê, hỗ trợ tìm kiếm ... Khi mà dữ liệu trở thành linh hồn của ứng dụng web thì việc ứng dụng web hoạt động tốt trước hết là phải có một cơ sở dữ liệu lưu trữ hiệu quả. Mình đã từng làm những bài tập lớn mà chỉ cần thấy đề bài thôi là đã hăm hở lao vào code, và sau đó chỉ cần 1 chút thay đổi nhỏ cũng phải đập DB đi xây lại từ đầu. Từ đó mình rút ra 1 điều là, thiết kế cơ sở dữ liệu là 1 phần cực kì quan trọng, nếu thiết kế cẩn thận thì sau này bạn sẽ tiết kiệm được rất nhiều thời gian trong quá trình phát triển. Và để tối ưu cơ sở dữ liệu thì bạn nên tuân theo các chuẩn thiết kế mà mình nêu dưới đây nhé.\n\n### Mục đích của chuẩn hóa cơ sở dữ liệu\n\nNhư mình đã nói ở phần mở đầu, chuẩn hóa cơ sở dữ liệu nhằm 2 mục đích:\n1. Giảm thiểu dư thừa dữ liệu\n2. Loại bỏ các bất thường khi cập nhật cơ sở dữ liệu\n\n### Dạng chuẩn 1NF\n\nVí dụ 1 bảng chưa chuẩn hóa: \n\n![](https://viblo.asia/uploads/db98ce98-08e2-4d39-bb29-59bab55acb77.png)\n\nBảng có 3 khóa chính là customer_id, order_id và product_id.\n\nBảng dữ liệu này vi phạm cả điều kiện của chuẩn 1NF vì: address chứa các giá trị trùng lặp, hơn thế nữa, giá trị address trong từng hàng không phải là đơn trị (chỉ có 1 giá trị), thêm vào đó, thuộc tính total_amount hoàn toàn có thể tính toán được bằng cách quantity * unit_price, không nhất thiết phải đưa vào bảng, gây ra dư thừa dữ liệu. Qua nhận xét trên, ta có thể hình dung ra 3 điều kiện cần phải tuân theo đó là:\n- Các thuộc tính của bảng phải là nguyên tố\n- Giá trị của các thuộc tính trên các hàng phải là đơn trị, không chứa nhóm lặp\n- Không có một thuộc tính nào có giá trị có thể tính toán được từ một thuộc tính khác\n\n### Dạng chuẩn 2NF\n\nQuy tắc chuẩn hóa từ chuẩn 1NF thành 2NF:\n\n- Bước 1: Loại bỏ các thuộc tính không khóa phụ thuộc vào một bộ phận khóa chính và tách ra thành một bảng riêng, khóa chính của bảng là bộ phận của khóa mà chúng phụ thuộc vào.\n\n- Bước 2: Các thuộc tính còn lại lập thành một quan hệ, khóa chính của nó là khóa chính ban đầu.\n\nBảng dữ liệu mới mà ta thiết kế vẫn chưa đạt chuẩn 2NF là vì: một số thuộc tính như description , unit_price phụ thuộc vào 1 phần của khóa là product_id chứ không cần phụ thuộc cả vào tập khóa (customer_id, order_id, product_id), hay thuộc tính customer_name và phone cũng chỉ phụ thuộc vào customer_id, thuộc tính order_date phụ thuộc vào customer_id và order_id, thuộc tính quantity phụ thuộc vào order_id và product_id.\n\nVậy nên để đạt chuẩn 2NF thì ta sẽ thiết kế tiếp bảng dữ liệu chuẩn 1NF như sau:\n\n- Tách các thuộc tính (product_id, description, unit_price) thành một bảng riêng là products.\n- Các thuộc tính (customer_id, order_id, order_date) làm thành một bảng, mình đặt tên là orders.\n- Còn lại các thuộc tính (order_id, product_id, quantity) làm thành một bảng trung gian giữa products và orders, mình đặt là order_products.\n\n### Dạng chuẩn 3NF\n**Điều kiện:**\n\n- Phải đạt chuẩn 2NF\n- Mọi thuộc tính không khóa phụ thuộc bắc cầu vào thuộc tính khóa (nghĩa là tất cả các thuộc tính không khóa phải được suy ra trực tiếp từ thuộc tính khóa)\n\n**Quy tắc chuẩn hóa từ 2NF thành 3NF:**\n\n- Bước 1: Loại bỏ các thuộc tính phụ thuộc bắc cầu ra khỏi quan hệ và tách chúng thành quan hệ riêng có khóa chính là thuộc tính bắc cầu.\n\n- Bước 2: Các thuộc tính còn lại lập thành một quan hệ có khóa chính là khóa ban đầu.\n\n### Dạng chuẩn Boyce-Codd\n\n**Điều kiện:**\n- Phải đạt chuẩn 3NF\n- Không có thuộc tính khóa nào phụ thuộc vào thuộc tính không khóa\n\n**Quy tắc chuẩn hóa 3NF thành Boyce-Codd:**\n\n- Bước 1: Loại bỏ các thuộc tính khóa phụ thuộc hàm vào thuộc tính không khóa ra khỏi quan hệ\n- Bước 2: Tách thuộc tính vừa loại bỏ thành một quan hệ riêng có khoá chính là thuộc tính không khóa gây ra phụ thuộc.\n\n### Kết luận\n\nBài viết của mình đến đây là kết thúc, mặc dù còn nhiều thiếu sót nhưng hi vọng sẽ đem đến 1 ít kiến thức cho các bạn mới bắt tay vào code như mình. Thank you !', 7, '2019-01-04 04:54:10', 1, NULL, NULL, 1, '903198816557203', 'af625451c0384232a1fee1df34e5566b', 1),
('ae9503868b0e48938432122c6840f4b8', 'Cau hoi', '# Head1\n## Head2\n1 + 1 = ?', 4, '2018-12-21 16:48:35', 2, NULL, NULL, 1, NULL, 'af625451c0384232a1fee1df34e5566b', 0),
('b0d668e1ce9f493f84e0014d652ef0fe', '$modal.modal is not a function', 'Em đang upload images với thư viện bootstrap-fileinput. Đến phần zoom ảnh thì ko thể zoom được và lỗi $modal.modal is not a function Đã vài lần phải bỏ luôn cái thư viện vì lỗi này, ai có cao kiến chỉ em với ạ. \n\nĐoạn **$modal.modal(\'show\');** trong file fileinput.js báo lỗi **$modal.modal is not a function**:\n\n```php\n_zoomPreview: function ($btn) {\n   var self = this, $frame, $modal = self.$modal;\n   if (!$btn.length) {\n       throw \'Cannot zoom to detailed preview!\';\n   }\n   $h.initModal($modal);\n   $modal.html(self._getModalContent());\n   $frame = $btn.closest($h.FRAMES);\n   self._setZoomContent($frame);\n   $modal.modal(\'show\');\n   self._initZoomButtons();\n},\n```\n\n', 10, '2019-01-04 04:42:32', 2, NULL, NULL, 1, '903198816557203', '81deb61f06404ec1a63fb2cdaffbaadc', 1),
('b9b18bfe0280429eb6f07c1f21b04043', 'test post', '## asd', 1, '2018-12-27 09:59:50', 1, NULL, NULL, 2, '903198816557203', '903198816557203', 0),
('c1cc6eb64117481fa3a56c8554430539', 'Test123123', '# Bede cm\n\n```java\nString java = \"java\";\n```', 39, '2019-01-02 02:14:24', 1, NULL, NULL, 2, '903198816557203', '903198816557203', 0),
('c7a604143a62441ba5e9b5a8917c32c2', 'Test', '# Ahihi, xin trao cac cau\n\n```java\nString a = \"I love You\";\n```\n\n## Trao cac cau lan 2\n\n# Lai trao cac cau\n\n### Sao the nhi', 11, '2018-12-19 09:11:58', 1, NULL, NULL, 2, '0', '903198816557203', 0),
('d680c4f8283747c3b3a39e231a13d4f9', 'Markdown Article', '\r\n\r\n## Typographic replacements\r\n\r\nEnable typographer option to see result.\r\n\r\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\r\n\r\ntest.. test... test..... test?..... test!....\r\n\r\n!!!!!! ???? ,,  -- ---\r\n\r\n\"Smartypants, double quotes\" and \'single quotes\'\r\n\r\n\r\n## Emphasis\r\n\r\n**This is bold text**\r\n\r\n__This is bold text__\r\n\r\n*This is italic text*\r\n\r\n_This is italic text_\r\n\r\n~~Strikethrough~~\r\n\r\n\r\n## Blockquotes\r\n\r\n\r\n> Blockquotes can also be nested...\r\n>> ...by using additional greater-than signs right next to each other...\r\n> > > ...or with spaces between arrows.\r\n\r\n\r\n## Lists\r\n\r\nUnordered\r\n\r\n+ Create a list by starting a line with `+`, `-`, or `*`\r\n+ Sub-lists are made by indenting 2 spaces:\r\n  - Marker character change forces new list start:\r\n    * Ac tristique libero volutpat at\r\n    + Facilisis in pretium nisl aliquet\r\n    - Nulla volutpat aliquam velit\r\n+ Very easy!\r\n\r\nOrdered\r\n\r\n1. Lorem ipsum dolor sit amet\r\n2. Consectetur adipiscing elit\r\n3. Integer molestie lorem at massa\r\n\r\n\r\n1. You can use sequential numbers...\r\n1. ...or keep all the numbers as `1.`\r\n\r\nStart numbering with offset:\r\n\r\n57. foo\r\n1. bar\r\n\r\n\r\n## Code\r\n\r\nInline `code`\r\n\r\nIndented code\r\n\r\n    // Some comments\r\n    line 1 of code\r\n    line 2 of code\r\n    line 3 of code\r\n\r\n\r\nBlock code \"fences\"\r\n\r\n```\r\nSample text here...\r\n```\r\n\r\nSyntax highlighting\r\n\r\n``` js\r\nvar foo = function (bar) {\r\n  return bar++;\r\n};\r\n\r\nconsole.log(foo(5));\r\n```\r\n\r\n\r\n## Links\r\n\r\n[link text](http://dev.nodeca.com)\r\n\r\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\r\n\r\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\r\n\r\n\r\n## Images\r\n\r\n![Minion](https://octodex.github.com/images/minion.png)\r\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\r\n\r\nLike links, Images also have a footnote style syntax\r\n\r\n![Alt text][id]\r\n\r\nWith a reference later in the document defining the URL location:\r\n\r\n[id]: https://octodex.github.com/images/dojocat.jpg  \"The Dojocat\"\r\n\r\n\r\n## Plugins\r\n\r\nThe killer feature of `markdown-it` is very effective support of\r\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\r\n\r\n\r\n', 9, '2019-01-03 09:07:29', 1, NULL, NULL, 2, 'a2337a4b1a9a41d78099a4cd25ae1611', 'af625451c0384232a1fee1df34e5566b', 1),
('f1939a2003b04c67b7aacbd1b822db15', 'Làm sao để convert String sang Number trong JavaScript?', 'JavaScript cung cấp nhiều cách khác nhau để convert String sang Number. Và trong bài viết này, mình sẽ tổng hợp lại một số cách mà mình đã biết.\n\n### Sử dụng Number() function\nĐúng vậy, đó là Number() function chứ không phải Number() constructor.\n\nVì Number() constructor (là khi bạn sử dụng với từ khoá new) sẽ tạo mới một Number Object với rất nhiều thứ kèm theo. Còn Number() function sẽ tạo ra một số thông thường (primitive).\n\n```javascript\nconst x = new Number(\"6666\");\nconsole.log(x); // => Number {6666}\n\nconst y = Number(\"6666\");\nconsole.log(y); // => 6666\n```\n\nMột số ví dụ khác:\n\n```javascript\nconst x = Number(\'66,66\');\nconsole.log(x); // => NaN\n\nconst y = Number(\'66.66\');\nconsole.log(y); // => 66.66\n\nconst z = Number(\'66666\');\nconsole.log(z); // => 66666\n```\n\nQua ví dụ trên, bạn thấy rằng: nếu String truyền vào không phải Number thì kết quả thu được là NaN; nếu tham số truyền vào không phải số nguyên thì kết quả không bị làm tròn.\n\n### Sử dụng toán tử +\n\nVí dụ:\n\n```javascript\nconst x = +\'1000,12\';\nconsole.log(x); // => NaN\n\nconst y = +\'1000.12\';\nconsole.log(y); // => 1000.12\n\nconst z = +\'1000.120\';\nconsole.log(z); // => 1000.12\n\nconst t = +\'1000\';\nconsole.log(t); // => 1000\n```\n\n### Sử dụng Math.floor()\n\nPhương thức Math.floor() khá giống với phương thức parseInt() phía trên.\n\nVí dụ:\n\n```javascript\nconst x = Math.floor(\'1000.12\');\nconsole.log(x); // => 1000\n\nconst y = Math.floor(\'0x1000\');\nconsole.log(y); // => 4096\n\nconst z = Math.floor(\'01000\');\nconsole.log(z); // => 1000\n\nconst t = Math.floor(\'b1000\');\nconsole.log(t); // => NaN\n```\n\n### Sử dụng toán tử *\n\nVí dụ:\n\n```javascript\nconst x = \'1000,12\' * 1;\nconsole.log(x); // => NaN\n\nconst y = \'1000.12\' * 1;\nconsole.log(y); // => 1000.12\n\nconst z = \'1000.120\' * 1;\nconsole.log(z); // => 1000.12\n\nconst t = \'1000\' * 1;\nconsole.log(t); // => 1000\n```\n\n### Sử dụng toán tử /\n\nVí dụ:\n\n```javascript\nconst x = \'1000,12\' / 1;\nconsole.log(x); // => NaN\n\nconst y = \'1000.12\' / 1;\nconsole.log(y); // => 1000.12\n\nconst z = \'1000.120\' / 1;\nconsole.log(z); // => 1000.12\n\nconst t = \'1000\' / 1;\nconsole.log(t); // => 1000\n```\n\n### Lời kết\n\nTrên đây là một số cách để convert String sang Number trong JavaScript. Để so sánh tốc độ giữa các cách này, bạn có thể tham khảo và viết thêm testcase để so sánh tại Convert a string to a number using JavaScript.\n\nNgoài ra, bạn thường hay sử dụng cách nào để convert String sang Number trong JavaScript? Mình hy vọng được biết thêm nhiều cách khác nữa của bạn trong phần bình luận phía dưới!\n\nXin chào và hẹn gặp lại, thân ái!', 156, '2019-01-04 03:38:52', 1, NULL, NULL, 1, '903198816557203', '903198816557203', 1);

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
('7c223b7b18064ef2beca9b5f6827eeb6', '108311716305599257008', 1, 0, 0, NULL),
('7c223b7b18064ef2beca9b5f6827eeb6', '903198816557203', 0, 1, 0, '2019-01-04 05:00:06'),
('7c223b7b18064ef2beca9b5f6827eeb6', 'af625451c0384232a1fee1df34e5566b', 1, 1, 0, '2019-01-04 04:59:55'),
('f1939a2003b04c67b7aacbd1b822db15', '0dab99665b054e698e99bcc4c3e98637', 1, 1, 0, '2019-01-04 03:48:44'),
('f1939a2003b04c67b7aacbd1b822db15', 'af625451c0384232a1fee1df34e5566b', 1, 1, 0, '2019-01-04 04:59:38');

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
('1c6ac9da6f0c4f4fb1aebe4ae1ebe891', '7c223b7b18064ef2beca9b5f6827eeb6', '0dab99665b054e698e99bcc4c3e98637', 'mình đã thử rồi nhưng ở template bên trên, nó lại vẫn không nhận biết subjects đó. nó vẫn rỗng., không thể dùng được ở template bên trên. không biết tại sao', '24d9584b57e249f38b44afddaf59d8a0', '2019-01-04 03:57:30', 1),
('24d9584b57e249f38b44afddaf59d8a0', '7c223b7b18064ef2beca9b5f6827eeb6', '903198816557203', 'bạn thử đặt trong mounted() xem sao.', NULL, '2019-01-04 03:56:34', 1),
('3b6c7359ad08437f94d6db75fb7be8fa', '9986aeffe0254d1fbc9dd28bacd39b54', '903198816557203', 'Thank you', NULL, '2018-12-27 11:02:34', 1),
('3de85138e1304ddb882ebf92f7213d61', 'c1cc6eb64117481fa3a56c8554430539', '903198816557203', 'gi m', 'b379a07365ab438dabadc600e6e07c1b', '2019-01-02 06:29:42', 1),
('45fded13b9844d888a095c0b2cb81b25', 'c1cc6eb64117481fa3a56c8554430539', '903198816557203', 'tran', 'ff03fe94fcee45e499a560c9d5919783', '2019-01-02 06:55:29', 1),
('4e14d3bee84d456cac35856ac333c1be', 'b0d668e1ce9f493f84e0014d652ef0fe', '81deb61f06404ec1a63fb2cdaffbaadc', 'Có rồi bạn', 'ad6b57b7d0114982be73c0cdecf7a8eb', '2019-01-04 04:45:15', 1),
('4f8ba3f223c74c59ad54b5476ea08aec', '56b360ffc4864b39870c678b4eb31460', '903198816557203', '123123', NULL, '2019-01-01 15:23:31', 1),
('4ff804eb76514adeacd0cc01d9457bf2', 'c1cc6eb64117481fa3a56c8554430539', '0dab99665b054e698e99bcc4c3e98637', '123123123123 21312 312 3', NULL, '2019-01-02 06:52:23', 1),
('58c51c073045482ebf14a64715a5904a', '5ecb7b7db0c3407bae0914069973c73d', '903198816557203', 'This is a new comment', NULL, '2018-12-27 12:56:31', 1),
('8eca215deb314b018d7e956cc56caf06', 'a4ad6977642049f69ed846ea52ec230b', '903198816557203', 'Bài viết rất hay <3 ', NULL, '2019-01-04 04:55:41', 1),
('ad6b57b7d0114982be73c0cdecf7a8eb', 'b0d668e1ce9f493f84e0014d652ef0fe', '903198816557203', 'Bạn kiểm tra xem trong code đã có script của Jquery chưa?', NULL, '2019-01-04 04:44:44', 1),
('b1d6515d554d49a5a682e6e1a91c04cb', 'a4ad6977642049f69ed846ea52ec230b', 'af625451c0384232a1fee1df34e5566b', 'Thanks :D ', '8eca215deb314b018d7e956cc56caf06', '2019-01-04 04:56:16', 1),
('ca41bcde2ea7448480373babc0f54fbb', '7c223b7b18064ef2beca9b5f6827eeb6', '108311716305599257008', 'khi e khai báo async getReports() thì kết quả trả về là một promise, nên khi e gọi this.getReports(); trong created thì nó vẫn chỉ là một promise thôi chứ chưa trả về kết quả.', NULL, '2019-01-04 03:59:31', 1);

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

--
-- Dumping data for table `comment_interact`
--

INSERT INTO `comment_interact` (`comment_id`, `user_id`, `rating`, `create_date`) VALUES
('3de85138e1304ddb882ebf92f7213d61', '0dab99665b054e698e99bcc4c3e98637', 1, '2019-01-02 06:29:56'),
('8eca215deb314b018d7e956cc56caf06', '903198816557203', 1, '2019-01-04 04:55:49'),
('8eca215deb314b018d7e956cc56caf06', 'af625451c0384232a1fee1df34e5566b', 1, '2019-01-04 04:56:07'),
('ad6b57b7d0114982be73c0cdecf7a8eb', '81deb61f06404ec1a63fb2cdaffbaadc', 1, '2019-01-04 04:45:07'),
('ca41bcde2ea7448480373babc0f54fbb', '0dab99665b054e698e99bcc4c3e98637', 1, '2019-01-04 04:00:48');

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

--
-- Dumping data for table `follow_tag`
--

INSERT INTO `follow_tag` (`tag_id`, `user_id`, `create_date`) VALUES
('3865356a8cfa4b0d850be5448aaec72f', '903198816557203', '2019-01-04 03:38:52'),
('3b89c2dd4347495082bbd4bc98c3b1f7', '81deb61f06404ec1a63fb2cdaffbaadc', '2019-01-04 04:42:32'),
('7cd291912c184dd8b99aee86eb087363', '0dab99665b054e698e99bcc4c3e98637', '2019-01-04 03:53:38'),
('82ce0b2059d94143910490a2f35bf0c2', '903198816557203', '2019-01-04 03:38:52'),
('869e9ed80fc041e88b65a64bc574e386', '108311716305599257008', '2019-01-04 04:09:27'),
('95d5f1ad1df34de58fafe2332c4ed826', '81deb61f06404ec1a63fb2cdaffbaadc', '2019-01-04 04:42:32'),
('a8c4b2332b144307a5231db8540a6dcb', 'a2337a4b1a9a41d78099a4cd25ae1611', '2019-01-04 09:29:38'),
('b911fba535864334a6e63cfb5dfa60c1', 'af625451c0384232a1fee1df34e5566b', '2019-01-04 04:54:09'),
('d1584ac706e141ca8a434b152dd8d026', '81deb61f06404ec1a63fb2cdaffbaadc', '2019-01-04 05:25:13'),
('d1584ac706e141ca8a434b152dd8d026', '903198816557203', '2019-01-04 03:38:52'),
('f25a7a7acdfa40888e58030091be4f98', '0dab99665b054e698e99bcc4c3e98637', '2019-01-04 03:53:38'),
('f5aa37fb00df4ba09a8df787b2fb6e3e', 'af625451c0384232a1fee1df34e5566b', '2019-01-03 09:07:29');

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

--
-- Dumping data for table `follow_user`
--

INSERT INTO `follow_user` (`user_id`, `follow_user_id`, `create_date`) VALUES
('0dab99665b054e698e99bcc4c3e98637', '903198816557203', '2019-01-02 18:04:46'),
('0dab99665b054e698e99bcc4c3e98637', 'a5f0ed58e0d24ad2953e030cef9823a7', '2019-01-02 20:45:25'),
('108311716305599257008', '903198816557203', '2019-01-02 21:16:04'),
('108311716305599257008', 'a5f0ed58e0d24ad2953e030cef9823a7', '2019-01-02 21:15:39'),
('81deb61f06404ec1a63fb2cdaffbaadc', '903198816557203', '2019-01-03 00:10:13'),
('81deb61f06404ec1a63fb2cdaffbaadc', 'a5f0ed58e0d24ad2953e030cef9823a7', '2019-01-03 00:10:13'),
('903198816557203', '0dab99665b054e698e99bcc4c3e98637', '2019-01-02 20:19:39'),
('903198816557203', 'a5f0ed58e0d24ad2953e030cef9823a7', '2019-01-02 17:55:20'),
('a2337a4b1a9a41d78099a4cd25ae1611', '903198816557203', '2019-01-03 00:08:18');

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
('108311716305599257008', '903198816557203', 1, '{\"articleId\":\"7c223b7b18064ef2beca9b5f6827eeb6\",\"articleTitle\":\"Vuejs: vấn đề bất đồng bộ\",\"firstName\":\"Pham\",\"lastName\":\"Hiepp\"}', '2019-01-04 03:59:32', 1),
('903198816557203', '0dab99665b054e698e99bcc4c3e98637', 1, '{\"articleId\":\"7c223b7b18064ef2beca9b5f6827eeb6\",\"articleTitle\":\"Vuejs: vấn đề bất đồng bộ\",\"firstName\":\"Huy\",\"lastName\":\"Pham\"}', '2019-01-04 03:56:35', 1),
('0dab99665b054e698e99bcc4c3e98637', '903198816557203', 1, '{\"articleId\":\"7c223b7b18064ef2beca9b5f6827eeb6\",\"articleTitle\":\"Vuejs: vấn đề bất đồng bộ\",\"firstName\":\"Demo\",\"lastName\":\"Test\"}', '2019-01-04 03:57:30', 1),
('108311716305599257008', '0dab99665b054e698e99bcc4c3e98637', 1, '{\"articleId\":\"7c223b7b18064ef2beca9b5f6827eeb6\",\"articleTitle\":\"Vuejs: vấn đề bất đồng bộ\",\"firstName\":\"Pham\",\"lastName\":\"Hiepp\"}', '2019-01-04 03:59:31', 1),
('903198816557203', '81deb61f06404ec1a63fb2cdaffbaadc', 1, '{\"articleId\":\"b0d668e1ce9f493f84e0014d652ef0fe\",\"articleTitle\":\"$modal.modal is not a function\",\"firstName\":\"Huy\",\"lastName\":\"Pham\"}', '2019-01-04 04:44:44', 1),
('81deb61f06404ec1a63fb2cdaffbaadc', '903198816557203', 1, '{\"articleId\":\"b0d668e1ce9f493f84e0014d652ef0fe\",\"articleTitle\":\"$modal.modal is not a function\",\"firstName\":\"User\",\"lastName\":\"Demo 2\"}', '2019-01-04 04:45:15', 1),
('903198816557203', 'af625451c0384232a1fee1df34e5566b', 1, '{\"articleId\":\"a4ad6977642049f69ed846ea52ec230b\",\"articleTitle\":\"Chuẩn hóa CSDL quan hệ\",\"firstName\":\"Huy\",\"lastName\":\"Pham\"}', '2019-01-04 04:55:42', 1),
('af625451c0384232a1fee1df34e5566b', '903198816557203', 1, '{\"articleId\":\"a4ad6977642049f69ed846ea52ec230b\",\"articleTitle\":\"Chuẩn hóa CSDL quan hệ\",\"firstName\":\"Huy\",\"lastName\":\"Pro\"}', '2019-01-04 04:56:16', 1);

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
('0158a27b2bf64ce78e220b0a7105dc6f', '2019-03-05 03:42:00', '2019-01-04 03:42:00.37', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('0b0de3f7f52c4f85bac9881e30355fdb', '2019-03-04 08:36:49', '2019-01-03 08:36:49.412', '{\"id\":\"0dab99665b054e698e99bcc4c3e98637\",\"username\":\"cuong1\",\"password\":\"3204cf62fee6d7af85fa19470c53f98f\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '0dab99665b054e698e99bcc4c3e98637'),
('16cc288082d1481e9f59cd6fb3dafc1c', '2019-03-05 04:42:55', '2019-01-04 04:42:55.479', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('1e9358837cbf4216867c1be2297d9d5f', '2019-03-04 08:47:57', '2019-01-03 08:47:57.169', '{\"id\":\"108311716305599257008\",\"username\":\"thanhhiep\",\"password\":\"845d2cf5383087e662f821499f7aa2f8\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108311716305599257008'),
('210eb65c3fe240df9859b0a3000e4f10', '2019-03-04 08:26:19', '2019-01-03 08:26:18.711', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('26575787d3c349d283bbd341e049b63c', '2019-03-05 04:11:41', '2019-01-04 04:11:40.899', '{\"id\":\"81deb61f06404ec1a63fb2cdaffbaadc\",\"username\":\"user222\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', '81deb61f06404ec1a63fb2cdaffbaadc'),
('3426437511d1464886f6a08ae086ae81', '2019-03-04 08:29:32', '2019-01-03 08:29:31.554', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('3befb4c7f90e4b2796f03354b39d38fa', '2019-03-05 03:40:15', '2019-01-04 03:40:15.331', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('50acc9fe99844d56889c3a8b12b07a7f', '2019-03-04 09:23:49', '2019-01-03 09:23:49.372', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('5ff1bb41952448c6a33463831149249d', '2019-03-05 03:48:39', '2019-01-04 03:48:38.721', '{\"id\":\"0dab99665b054e698e99bcc4c3e98637\",\"username\":\"cuong1\",\"password\":\"3204cf62fee6d7af85fa19470c53f98f\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '0dab99665b054e698e99bcc4c3e98637'),
('64e0e38103a145d88564618f65708a89', '2019-03-04 09:46:17', '2019-01-03 09:46:17.396', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('68e8c875b2044ac5a877789c023ad9ff', '2019-03-05 03:55:21', '2019-01-04 03:55:21.259', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('6a7b8751a4f94e0ba5f223f6d95bce21', '2019-03-05 04:43:15', '2019-01-04 04:43:14.538', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('7ef24b0d7df64d859613d01cc5b5959f', '2019-03-05 03:58:18', '2019-01-04 03:58:17.564', '{\"id\":\"108311716305599257008\",\"username\":\"thanhhiep\",\"password\":\"845d2cf5383087e662f821499f7aa2f8\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108311716305599257008'),
('9ee9741d93a54fd79a1225a665959f2f', '2019-03-05 05:24:44', '2019-01-04 05:24:43.794', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('a780384449104fd4b72c0afc2826abb4', '2019-03-05 08:55:35', '2019-01-04 08:55:35.468', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('a9ee4c08d4054808859797947a5259b4', '2019-03-05 09:30:15', '2019-01-04 09:30:14.526', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('aaaad1ba5c9e4bd7ab6249d398d4d7ea', '2019-03-05 07:01:48', '2019-01-04 07:01:47.602', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('acfac1a5014b4b228aa3c24f2e1d7cca', '2019-03-04 08:51:54', '2019-01-03 08:51:54.322', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('c07c02d0985b4c909caa2b0fdf652831', '2019-03-05 05:25:00', '2019-01-04 05:24:59.883', '{\"id\":\"81deb61f06404ec1a63fb2cdaffbaadc\",\"username\":\"user222\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', '81deb61f06404ec1a63fb2cdaffbaadc'),
('c34a66b83b3547998ca73f9a747318f5', '2019-03-05 07:13:31', '2019-01-04 07:13:31.407', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('c7f7a720c749477d89161c2aeb915927', '2019-03-05 09:26:54', '2019-01-04 09:26:54.435', '{\"id\":\"a2337a4b1a9a41d78099a4cd25ae1611\",\"username\":\"user111\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', 'a2337a4b1a9a41d78099a4cd25ae1611'),
('df5a7c61cd25406e8a29fe0c3f8d59a0', '2019-03-04 08:31:44', '2019-01-03 08:31:43.874', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('e0cff07ae38c43bdb8d3b98ef3751d06', '2019-03-04 08:31:25', '2019-01-03 08:31:25.192', '{\"id\":\"81deb61f06404ec1a63fb2cdaffbaadc\",\"username\":\"user222\",\"password\":\"9181c1052b1b01953e935b36e425a5c2\",\"enabled\":true,\"role\":2,\"lang\":\"en\"}', '81deb61f06404ec1a63fb2cdaffbaadc'),
('edd5de5a4d8947218a49b849bbb32ec8', '2019-03-05 04:00:20', '2019-01-04 04:00:19.786', '{\"id\":\"0dab99665b054e698e99bcc4c3e98637\",\"username\":\"cuong1\",\"password\":\"3204cf62fee6d7af85fa19470c53f98f\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '0dab99665b054e698e99bcc4c3e98637'),
('eeee41d54cd94552b13afc6c607793ae', '2019-03-05 04:46:31', '2019-01-04 04:46:30.789', '{\"id\":\"af625451c0384232a1fee1df34e5566b\",\"username\":\"test\",\"password\":\"eab2203aba6823c2eb9d25ad54016b2b\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', 'af625451c0384232a1fee1df34e5566b'),
('f2f4a478f9a840cb8e65c9fed155bec0', '2019-03-04 09:44:28', '2019-01-03 09:44:28.17', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('f430216adedc4d62ab99129f23a06838', '2019-03-05 09:30:42', '2019-01-04 09:30:41.846', '{\"id\":\"903198816557203\",\"username\":\"jammaica111\",\"password\":\"d7f95a32801460e1ae054cb1b67139e9\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', '903198816557203'),
('f6cb6e605b904f33ae70483f3be692f3', '2019-03-05 04:46:18', '2019-01-04 04:46:17.687', '{\"id\":\"108311716305599257008\",\"username\":\"thanhhiep\",\"password\":\"845d2cf5383087e662f821499f7aa2f8\",\"enabled\":true,\"role\":3,\"lang\":\"en\"}', '108311716305599257008'),
('fccd81c992ab42db8fea26f9f27a7e11', '2019-03-04 08:59:36', '2019-01-03 08:59:36.096', '{\"id\":\"af625451c0384232a1fee1df34e5566b\",\"username\":\"test\",\"password\":\"eab2203aba6823c2eb9d25ad54016b2b\",\"enabled\":true,\"role\":1,\"lang\":\"en\"}', 'af625451c0384232a1fee1df34e5566b');

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
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`tag_id`, `tag_name`, `description`, `create_date`, `status`) VALUES
('3865356a8cfa4b0d850be5448aaec72f', 'String', '', '2019-01-04 03:38:52', 1),
('3b89c2dd4347495082bbd4bc98c3b1f7', 'PHP', '', '2019-01-04 04:42:32', 1),
('7cd291912c184dd8b99aee86eb087363', 'Axios', '', '2019-01-04 03:53:38', 1),
('82ce0b2059d94143910490a2f35bf0c2', 'Number', '', '2019-01-04 03:38:52', 1),
('869e9ed80fc041e88b65a64bc574e386', 'CSS', '', '2019-01-04 04:09:27', 1),
('95d5f1ad1df34de58fafe2332c4ed826', 'Laravel', '', '2019-01-04 04:42:32', 1),
('a8c4b2332b144307a5231db8540a6dcb', 'NewTag', '', '2019-01-04 09:29:38', 1),
('b911fba535864334a6e63cfb5dfa60c1', 'MySQL', '', '2019-01-04 04:54:08', 1),
('d1584ac706e141ca8a434b152dd8d026', 'Javascript', '', '2019-01-04 03:38:52', 1),
('f25a7a7acdfa40888e58030091be4f98', 'VueJS', '', '2019-01-04 03:53:37', 1),
('f5aa37fb00df4ba09a8df787b2fb6e3e', 'Markdown', '', '2019-01-03 09:07:29', 1);

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
('869e9ed80fc041e88b65a64bc574e386', '4cf30e1a368d4a9290c2bbac56b9d29a'),
('a8c4b2332b144307a5231db8540a6dcb', '6c0dfc5bd3d240768cace1133cb4a046'),
('7cd291912c184dd8b99aee86eb087363', '7c223b7b18064ef2beca9b5f6827eeb6'),
('f25a7a7acdfa40888e58030091be4f98', '7c223b7b18064ef2beca9b5f6827eeb6'),
('b911fba535864334a6e63cfb5dfa60c1', 'a4ad6977642049f69ed846ea52ec230b'),
('3b89c2dd4347495082bbd4bc98c3b1f7', 'b0d668e1ce9f493f84e0014d652ef0fe'),
('95d5f1ad1df34de58fafe2332c4ed826', 'b0d668e1ce9f493f84e0014d652ef0fe'),
('d1584ac706e141ca8a434b152dd8d026', 'b0d668e1ce9f493f84e0014d652ef0fe'),
('f5aa37fb00df4ba09a8df787b2fb6e3e', 'd680c4f8283747c3b3a39e231a13d4f9'),
('3865356a8cfa4b0d850be5448aaec72f', 'f1939a2003b04c67b7aacbd1b822db15'),
('82ce0b2059d94143910490a2f35bf0c2', 'f1939a2003b04c67b7aacbd1b822db15'),
('d1584ac706e141ca8a434b152dd8d026', 'f1939a2003b04c67b7aacbd1b822db15');

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
('80dd2e9dbaf94c70bad16f4b6213a11b', 'jammaica222', 'e2572d6826beeaf5fa4c9a8d0854fa67', 'nL+Hg7WZ', 'deadknifeclone1@gmail.com', NULL, 'en', '2018-12-18 21:05:48', NULL, 0, NULL, 2),
('81deb61f06404ec1a63fb2cdaffbaadc', 'user222', '9181c1052b1b01953e935b36e425a5c2', 'jvTCxfPa', 'user222@gmail.com', NULL, 'en', '2019-01-03 00:10:13', NULL, 1, NULL, 2),
('903198816557203', 'jammaica111', 'd7f95a32801460e1ae054cb1b67139e9', 'VzhrmrJG', 'deadknifepro@gmail.com', '0905650955', 'en', '2018-12-17 23:12:21', NULL, 1, NULL, 1),
('a2337a4b1a9a41d78099a4cd25ae1611', 'user111', '9181c1052b1b01953e935b36e425a5c2', 'jvTCxfPa', '123321@gmail.com', NULL, 'en', '2019-01-03 00:08:17', NULL, 1, NULL, 2),
('a5f0ed58e0d24ad2953e030cef9823a7', 'cuong', 'a45137f2a8a31679ebfe0c04dee0544c', 'gAcHoV70', 'abc@gmail.com', '098989898', 'en', '2018-12-27 14:04:38', NULL, 0, NULL, 3),
('af625451c0384232a1fee1df34e5566b', 'test', 'eab2203aba6823c2eb9d25ad54016b2b', 'JL+9ETkG', 'occho@gmail.com', NULL, 'en', '2018-12-21 16:45:30', NULL, 1, NULL, 1),
('c3e70521caf446d5b069d06b2874558f', 'ahuhu123', '3b7a3956af53359865503863a858ab33', '1FmPgQOE', 'hihihihi@gmail.com', NULL, 'en', '2018-12-23 17:15:09', NULL, 1, NULL, 3),
('e5c910b2e0784f0f84c5b2b51ff80564', 'username123', 'eb47f43b81b182ede7cb0b4e4d1198c2', 'U+THhdzm', 'deadknifeclone123@gmail.com', NULL, 'en', '2018-12-23 03:30:26', NULL, 0, NULL, 3);

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
('1e380670c30a4ccba54cb579807b21c5', 'Huy', 'Pham', 'http://localhost:8080/files/user_avatar_903198816557203.png', 'des', 'web', 'git', 'Information Technology Ahihi', 'HCMC University of Technology and Education', '903198816557203'),
('3e83a5f069004ca28ae0fe2d42141f8f', 'User', 'Demo 2', 'http://localhost:8080/files/user_avatar_81deb61f06404ec1a63fb2cdaffbaadc.jpg', NULL, NULL, NULL, NULL, NULL, '81deb61f06404ec1a63fb2cdaffbaadc'),
('457b981f4f394a5fa775981609355f5f', 'Pham', 'Hiepp', 'https://lh6.googleusercontent.com/-2HbFhD1UfZc/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZoQvS3SnQ1AB17i04jwOFDzY-TIA/s96-c/photo.jpg', NULL, NULL, NULL, NULL, NULL, '108311716305599257008'),
('48ee8119a2c1493da06571c46b0ecaf7', 'Phan', 'Quan ML', 'http://localhost:8080/files/usr_avt_c3e70521caf446d5b069d06b2874558f.jpg', 'pq \npro \nplayer 123', NULL, NULL, NULL, NULL, 'c3e70521caf446d5b069d06b2874558f'),
('aabacd0df5cf49e3af3b07908994d765', 'Huy', 'Hi', NULL, NULL, NULL, NULL, NULL, NULL, '80dd2e9dbaf94c70bad16f4b6213a11b'),
('c68d1a7dbb0041e6ab71a7035014f4ab', 'Pham Ngoc', 'Huyy', 'https://lh5.googleusercontent.com/-qyoHyjyGZC0/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZbzxWJVWqnilT4kQcSREK_89LVTA/s96-c/photo.jpg', NULL, NULL, NULL, NULL, NULL, '108737035210497716682'),
('d3ab61f8c28c4eecbec746b43c1d1b29', 'Bui', 'Cuong', 'http://localhost:8080/files/user_avatar_a5f0ed58e0d24ad2953e030cef9823a7.jpg', NULL, NULL, NULL, NULL, NULL, 'a5f0ed58e0d24ad2953e030cef9823a7'),
('e88c804dd90d4702bcf4c5cf28d088b4', 'Huy', 'Thanh', 'http://localhost:8080/files/user_avatar_af625451c0384232a1fee1df34e5566b.jpg', '1233', NULL, NULL, NULL, NULL, 'af625451c0384232a1fee1df34e5566b'),
('ee67da7a51a4464a83309609d645e98a', 'Thanh', 'Le', 'E:\\TLCN\\Project3\\Specialized-Essay\\ProgramingForum\\uploadsusr_avt_e5c910b2e0784f0f84c5b2b51ff80564', '123123', NULL, NULL, NULL, NULL, 'e5c910b2e0784f0f84c5b2b51ff80564'),
('fb292ccfec6e43f78430f2029a90f91a', 'User', 'Demo 1', 'http://localhost:8080/files/user_avatar_a2337a4b1a9a41d78099a4cd25ae1611.jpg', NULL, NULL, NULL, NULL, NULL, 'a2337a4b1a9a41d78099a4cd25ae1611');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article` ADD FULLTEXT KEY `title` (`title`);
ALTER TABLE `article` ADD FULLTEXT KEY `content` (`content`);
ALTER TABLE `article` ADD FULLTEXT KEY `title_2` (`title`,`content`);

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
