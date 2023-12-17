-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stylesnap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `Wardrobe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Wardrobe` (
  `wardrobe_id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`wardrobe_id`),
  CONSTRAINT `fk_Wardrobe_User`
    FOREIGN KEY (`owner`)
    REFERENCES `User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClothingCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClothingCategory` (
  `clothing_cat_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`clothing_cat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClothingType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClothingType` (
  `clothing_type_id` INT NOT NULL AUTO_INCREMENT,
  `clothing_cat_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`clothing_type_id`),
  CONSTRAINT `fk_ClothingType_ClothingCategory1`
    FOREIGN KEY (`clothing_cat_id`)
    REFERENCES `ClothingCategory` (`clothing_cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Clothing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Clothing` (
  `clothing_id` INT NOT NULL AUTO_INCREMENT,
  `wardrobe_id` INT NOT NULL,
  `clothing_type_id` INT NOT NULL,
  `color_H` INT NOT NULL,
  `color_S` INT NOT NULL,
  `color_V` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`clothing_id`),
  CONSTRAINT `fk_Clothing_Wardrobe1`
    FOREIGN KEY (`wardrobe_id`)
    REFERENCES `Wardrobe` (`wardrobe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Clothing_ClothingType1`
    FOREIGN KEY (`clothing_type_id`)
    REFERENCES `ClothingType` (`clothing_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Outfit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Outfit` (
  `outfit_id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`outfit_id`),
  CONSTRAINT `fk_Outfit_User1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OutfitClothing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OutfitClothing` (
  `outfit_clothing_id` INT NOT NULL AUTO_INCREMENT,
  `outfit_id` INT NOT NULL,
  `clothing_id` INT NOT NULL,
  PRIMARY KEY (`outfit_clothing_id`),
  CONSTRAINT `fk_OutfitClothing_Outfit1`
    FOREIGN KEY (`outfit_id`)
    REFERENCES `Outfit` (`outfit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OutfitClothing_Clothing1`
    FOREIGN KEY (`clothing_id`)
    REFERENCES `Clothing` (`clothing_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ClothingGallery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ClothingGallery` (
  `clothing_gallery_id` INT NOT NULL AUTO_INCREMENT,
  `clothing_id` INT NOT NULL,
  `order` INT NOT NULL,
  `image_url` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`clothing_gallery_id`),
  CONSTRAINT `fk_ClothingGallery_Clothing1`
    FOREIGN KEY (`clothing_id`)
    REFERENCES `Clothing` (`clothing_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
