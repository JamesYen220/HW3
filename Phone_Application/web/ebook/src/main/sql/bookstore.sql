DROP SCHEMA IF EXISTS bookstore;
CREATE SCHEMA bookstore;
use bookstore;
SET foreign_key_checks = 0;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- image type longtext able to remote image http and base64     `
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`
(
    `book_id`     int NOT NULL AUTO_INCREMENT,
    `ISBN`        varchar(255)   DEFAULT NULL,
    `title`       varchar(255)   DEFAULT NULL,
    `type`        varchar(255)   DEFAULT NULL,
    `author`      varchar(255)   DEFAULT NULL,
    `price`       decimal(10, 2) DEFAULT NULL,
    `description` varchar(2000)  DEFAULT NULL,
    `stock`       int(11)        DEFAULT NULL,
    `image`       longtext,
    PRIMARY KEY (`book_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book`
VALUES ('1', '1', 'Java核心技术卷II', '编程', '凯S.霍斯特曼', '95.20',
        '本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新，同时修正了第9版中的不足，系统全面讲解了Java语言的核心概念、语法、重要特性和开发方法，包含大量案例，实践性强。',
        '1000', 'data:image/jpeg;base64,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');
INSERT INTO `book`
VALUES ('2', '2', '深入理解计算机系统', '编程', '兰德尔·E·布莱恩特', '136.90', '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！',
        '1200', 'http://img3m7.ddimg.cn/48/0/24106647-1_w_6.jpg');
INSERT INTO `book`
VALUES ('3', '3', 'Effective C++', '编程', '梅耶', '51.30', '大师名著纵横二十载，稳居任一荐书单三甲；称职程序员傍身绝学，通向C++精微奥妙之门。', '1000',
        'http://img3m6.ddimg.cn/96/25/21000966-1_u_12.jpg');
INSERT INTO `book`
VALUES ('4', '4', '小王子', '儿童文学', '圣-埃克苏佩里', '8.89',
        '豆瓣9.7高分推荐！旅法翻译家梅子涵之女梅思繁法文直译，舒朗大开本，央美教授高精度还原原作插画。首次收录全球舞台剧、音乐会、电影、动画片等对《小王子》的精彩诠释，通晓名作的前世今生。', '1000',
        'http://img3m9.ddimg.cn/75/6/25067469-1_u_2.jpg');
INSERT INTO `book`
VALUES ('5', '5', 'Java编程思想', '编程', 'Bruce Eckel', '91.20', 'Java学习必读经典,殿堂级著作！赢得了全球程序员的广泛赞誉。', '9096',
        'http://img3m0.ddimg.cn/4/24/9317290-1_w_5.jpg');
INSERT INTO `book`
VALUES ('6', '6', '魔兽世界编年史套装(全三卷)', '魔幻小说', '克里斯˙梅森', '449.20',
        '暴雪官方历时二十年编纂而成的史料！三卷《魔兽世界编年史》将呈现大量从未公布的精美原画和插图，读者在阅读故事之余，更能享受一次视觉上的饕餮盛宴，是魔兽粉丝收藏的优选。', '123',
        'http://img3m7.ddimg.cn/43/9/25352557-1_w_3.jpg');
INSERT INTO `book`
VALUES ('7', '7', '三体：全三册', '科幻小说', '刘慈欣', '50.20', '刘慈欣代表作，亚洲首部“雨果奖”获奖作品！', '14414',
        'http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg');
INSERT INTO `book`
VALUES ('8', '8', '悲惨世界（上中下）（精装版）', '世界名著', '雨果', '104.00',
        '《悲惨世界》是雨果在流亡期间写的长篇小说，是他的代表作，也是世界文学宝库的珍品之一。\r\n    《悲惨世界》通过冉阿让等人的悲惨遭遇以及冉阿让被卞福汝主教感化后一系列令人感动的事迹，深刻揭露和批判了19世纪法国封建专制社会的腐朽本质及其罪恶现象，对穷苦人民在封建重压下所遭受的剥削欺诈和残酷迫害表示了悲悯和同情。',
        '388', 'http://img3m7.ddimg.cn/13/15/27912667-1_u_1.jpg');
INSERT INTO `book`
VALUES ('9', '9', '动物农场', '社会小说', '乔治·奥威尔', '20.40',
        '也译“动物庄园”，是“一代人的冷峻良知”乔治·奥威尔经典的讽喻之作。虽然这一场荒诞的动物革命走向歧途，但正是因为这样我们才了解“把权力关进制度的笼子”的重要性。', '123',
        'http://img3m1.ddimg.cn/82/3/25229341-1_w_2.jpg');
INSERT INTO `book`
VALUES ('10', '10', '机器学习', '编程', '周志华', '61.60', '击败AlphaGo的武林秘籍，赢得人机大战的必由之路：人工智能大牛周志华教授巨著，全面揭开机器学习的奥秘。', '2525',
        'http://img3m0.ddimg.cn/20/24/23898620-1_w_3.jpg');
INSERT INTO `book`
VALUES ('11', '11', '纳尼亚传奇', '魔幻小说', '刘易斯', '86.20', '刘易斯基金会独家授权插图！翻译家吴岩，陈良廷，刘文澜经典译本！', '123',
        'http://img3m7.ddimg.cn/1/32/22474387-1_u_2.jpg');
INSERT INTO `book`
VALUES ('12', '12', '老人与海', '世界名著', '海明威', '27.80', '收录诺贝尔文学奖获奖作品《老人与海》《乞力马扎罗的雪》，深深影响了马尔克斯、塞林格等文学家的创作理念。', '2414',
        'http://img3m6.ddimg.cn/94/11/27891166-1_u_2.jpg');
INSERT INTO `book`
VALUES ('13', '13', '魔力的胎动', '悬疑/推理小说', '东野圭吾', '35.90',
        '喜欢《解忧杂货店》，就一定要读这本书。珍藏印签。有了想要守护的东西，生命就会变得有力量。悲凉的人生、千疮百孔的命运、一桩桩悲剧的发生与救赎，读来令人喟叹不已。', '1232',
        'http://img3m4.ddimg.cn/68/35/28484744-2_u_6.jpg');
INSERT INTO `book`
VALUES ('14', '14', '我不怕这漫长黑夜', '青春文学', '苑子豪', '37.50',
        '七篇寻光故事，七种奇遇人生，送给成长路上孤独前行的你，每个人的生活都有被困在井里一样的绝望时刻，而这本书就想做点亮黑夜的那束光芒。耐心一些，保持相信，我们终会穿越漫长黑夜，抵达属于自己的黎明。', '1142',
        'http://img3m0.ddimg.cn/9/18/28486170-1_u_8.jpg');
INSERT INTO `book`
VALUES ('15', '15', '永久记录', '传记文学', '爱德华·斯诺登', '56.70',
        '美国政府不想让全世界读到这本书，欧美上市当日作者便被美国司法部起诉！“棱镜门”主角爱德华·斯诺登首次亲自披露美国政府滥用NSA系统监控世界的真相，袒露从“爱国者”到“叛国者”的心路历程。', '124',
        'http://img3m5.ddimg.cn/86/22/28475555-2_u_9.jpg');
INSERT INTO `book`
VALUES ('16', '16', '探索月球', '儿童文学', '安妮·詹克利奥维奇', '133.20',
        '嫦娥五号探测器系统副总设计师彭兢诚意推荐！纪念人类登月50周年，五大精妙立体机关直观呈现月球的运行轨迹，全方位揭秘人类探月登月的过程，普及基本的航天知识，与孩子一起解读月球的奥秘，种下探索宇宙的种子。', '1516',
        'http://img3m4.ddimg.cn/13/30/28481224-1_w_3.jpg');
INSERT INTO `book`
VALUES ('17', '17', '高考英语 五年高考三年模拟', '中小学教辅', '曲一线', '70.80', '五年高考三年模拟，英语五三高考练习册，五三高中同步53全练全解，你值得拥有！', '12332',
        'http://img3m4.ddimg.cn/62/14/27883214-1_w_2.jpg');
INSERT INTO `book`
VALUES ('18', '18', '红楼梦', '世界名著', '曹雪芹', '18.80', '中国古典小说佳作，影响整个华人世界的经典！轻松易学、国家教育部推荐读物！', '2441',
        'http://img3m6.ddimg.cn/31/22/23828836-1_w_8.jpg');
INSERT INTO `book`
VALUES ('19', '19', '草房子', '儿童文学', '曹文轩', '22.50', '人民文学出版社天天出版社出品，经典作品，教师推荐，已有超过150000读者给予好评！', '1235',
        'http://img3m2.ddimg.cn/32/4/23662022-1_w_9.jpg');
INSERT INTO `book`
VALUES ('20', '20', '追风筝的人', '世界名著', '卡勒德·胡赛尼', '35.30',
        '“许多年过去了，人们说陈年旧事可以被埋葬，然而我终于明白这是错的，因为往事会自行爬上来。回首前尘，我意识到在过去二十六年里，自己始终在窥视着那荒芜的小径。”', '14141',
        'http://img3m5.ddimg.cn/26/14/25238195-1_w_3.jpg');
INSERT INTO `book`
VALUES ('21', '21', '软件工程原理', '编程', '沈备军、陈昊鹏、陈雨亭', '35.90',
        '从软件工程的本质出发、结合实际案例，系统全面地介绍软件过程、软件建模技术与方法及软件工程管理同时介绍一些热点新技术和新方法。', '1024',
        'http://img3m6.ddimg.cn/32/30/1204489076-1_w_1.jpg');
INSERT INTO `book`
VALUES ('22', '22', '数据库系统概念', '编程', '西尔伯沙茨', '74.20',
        '本书内容丰富，不仅讨论了关系数据模型和关系语言、数据库设计过程、关系数据库理论、数据库应用设计和开发、数据存储结构、数据存取技术、查询优化方法、事务处理系统和并发控制、故障恢复技术、数据仓库和数据挖掘，而且对性能调整、性能评测标准、数据库应用测试和标准化等高级应用主题进行了广泛讨论。',
        '244', 'http://img3m2.ddimg.cn/83/5/22632572-1_w_1.jpg');
INSERT INTO `book`
VALUES ('23', '23', '算法导论', '编程', '科尔曼', '77.63',
        '全书选材经典、内容丰富、结构合理、逻辑清晰，对本科生的数据结构课程和研究生的算法课程都是非常实用的教材，在IT专业人员的职业生涯中，本书也是一本案头必备的参考书或工程实践手册。', '144',
        'http://img3m8.ddimg.cn/89/15/1517005898-1_w_1.jpg');
INSERT INTO `book`
VALUES ('24', '24', '史记（文白对照本）', '古籍', '司马迁', '237.10',
        '荣获商务印书馆2019人文社科十大好书，张大可先生《史记》研究的集成之作，精细考证，廓清原书真伪；题解语译，展现著者史观，是一部人人都能读懂、人人都会爱读的文白对照本《史记》。', '4141',
        'http://img3m7.ddimg.cn/14/14/27915737-1_w_3.jpg');
INSERT INTO `book`
VALUES ('25', '25', '天龙八部(全五册)', '武侠小说', '金庸', '102.30',
        '《天龙八部》一书以北宋、辽、西夏、大理并立的历史为宏大背景，将儒释道、琴棋书画等中国传统文化融会贯通其中，书中人物繁多，个性鲜明，情节离奇，尽显芸芸众生百态。', '74747',
        'http://img3m2.ddimg.cn/84/17/23273202-1_w_1.jpg');
INSERT INTO `book`
VALUES ('26', '26', '笑傲江湖(全四册)', '武侠小说', '金庸', '80.10',
        '一部《辟邪剑谱》引发灭门血案，阴险狡诈，机关算尽，只为争霸武林，真相往往出人意表。酒后高歌磨剑，梦中快意恩仇，一曲《笑傲江湖》，传一段天荒地老。 ', '2522',
        'http://img3m0.ddimg.cn/82/15/23273200-1_w_1.jpg');
INSERT INTO `book`
VALUES ('27', '27', '楚留香传奇(全三册)', '武侠小说', '古龙', '224.50',
        '《楚留香传奇》无疑乃古龙诸作中*为烩炙人口之作，此作固成就古龙之盛名，更成为武侠文学之重要里程碑。楚留香有西方007罗杰摩尔之冷静、优雅、明快及幽默，更因他没有复仇及情爱之纠葛（例如他从来不杀人）而超越007，颇有“本来无一物，何处惹尘埃”的意境。',
        '551', 'http://img3m4.ddimg.cn/4/22/1592963464-1_w_1.jpg');
INSERT INTO `book`
VALUES ('28', '28', '哈利波特与魔法石', '魔幻小说', 'J·K·罗琳', '30.20',
        '“沉湎于虚幻的梦想，而忘记现实的生活，这是毫无益处的，千万记住。”                                ——阿不思·邓布利多', '1000',
        'http://img3m1.ddimg.cn/88/0/25479421-1_w_1.jpg');
INSERT INTO `book`
VALUES ('29', '29', '哈利·波特与死亡圣器', '魔幻小说', 'J·K·罗琳', '56.20', '两个人不能都活着，只有一个生存下来，我们中的一个将要永远离开……', '1551',
        'http://img3m4.ddimg.cn/71/20/25479404-1_w_1.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    `user_id`   int          NOT NULL AUTO_INCREMENT,
    `username`  varchar(255) DEFAULT NULL,
    `password`  varchar(255) NOT NULL,
    `user_type` int(11)      NOT NULL,
    `email`     varchar(255) DEFAULT NULL,
    `address`   varchar(255) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user`(username, password, user_type, email, address)
VALUES ('root', 'root', '0', 'root@sjtu.edu.cn', 'SJTU');
INSERT INTO `user`(username, password, user_type, email, address)
VALUES ('user', 'user', '1', 'user1@sjtu.edu.cn', 'SJTU');
INSERT INTO `user`(username, password, user_type, email, address)
VALUES ('ban', 'ban', '-1', 'user2@sjtu.edu.cn', 'FD');
INSERT INTO `user`(username, password, user_type, email, address)
VALUES ('james', 'james', '1', 'james@sjtu.edu.cn', 'SJTU');

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list`
(
    `list_id` int      NOT NULL AUTO_INCREMENT,
    `user_id` int      NOT NULL,
    `time`    datetime NOT NULL,
    PRIMARY KEY (`list_id`),
    CONSTRAINT `user_id1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of order_list
-- ----------------------------
INSERT INTO `order_list`(user_id, time)
VALUES ('1', '2000-1-1');
INSERT INTO `order_list`(user_id, time)
VALUES ('1', '2000-1-1');
INSERT INTO `order_list`(user_id, time)
VALUES ('2', '2000-1-1');
-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`
(
    `item_id`     int NOT NULL AUTO_INCREMENT,
    `list_id`     int NOT NULL,
    `book_id`     int NOT NULL,
    `book_number` int NOT NULL,
    `book_price`  decimal(10, 2) NOT NULL,
    PRIMARY KEY (`item_id`),
    CONSTRAINT `book_id1` FOREIGN KEY (`book_id`) REFERENCES `book` (book_id),
    CONSTRAINT `list_id` FOREIGN KEY (`list_id`) REFERENCES `order_list` (list_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `order_item`(list_id, book_id, book_number, book_price)
VALUES ('1', '1', '1', '95.2');
INSERT INTO `order_item`(list_id, book_id, book_number, book_price)
VALUES ('1', '2', '1', '13.9');
INSERT INTO `order_item`(list_id, book_id, book_number, book_price)
VALUES ('2', '3', '1', '51.3');
INSERT INTO `order_item`(list_id, book_id, book_number, book_price)
VALUES ('3', '3', '1', '51.3');

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE `cart_item`
(
    `item_id`     int NOT NULL AUTO_INCREMENT,
    `user_id`     int NOT NULL,
    `book_id`     int NOT NULL,
    `book_number` int NOT NULL,
    `book_price`  decimal(10, 2) NOT NULL,
    PRIMARY KEY (`item_id`),
    CONSTRAINT `book_id2` FOREIGN KEY (`book_id`) REFERENCES `book` (book_id),
    CONSTRAINT `user_id2` FOREIGN KEY (`user_id`) REFERENCES `user` (user_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `cart_item`(user_id, book_id, book_number, book_price)
VALUES ('1', '1', '1', '95.2');
INSERT INTO `cart_item`(user_id, book_id, book_number, book_price)
VALUES ('2', '3', '1', '51.3');
INSERT INTO `cart_item`(user_id, book_id, book_number, book_price)
VALUES ('3', '3', '1', '51.3');
