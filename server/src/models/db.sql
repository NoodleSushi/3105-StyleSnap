CREATE TABLE `User` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `Wardrobe` (
  `wardrobe_id` INT PRIMARY KEY AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  CONSTRAINT `fk_Wardrobe_User`
    FOREIGN KEY (`owner`)
    REFERENCES `User` (`user_id`)
);
