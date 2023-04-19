CREATE TABLE `e_com`.`user_login_info` (
  `user_login_info_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL,
  `firstname` VARCHAR(255) NULL,
  `lastname` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `refresh_token` VARCHAR(255) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`user_login_info_id`));

ALTER TABLE `dev_social_media`.`user_login_info` 
ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE;


CREATE TABLE `dev_social_media`.`user_friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source_id` INT NOT NULL,
  `target_id` INT NOT NULL,
  `status` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `dev_social_media`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `parent_id` INT NULL,
  `title` VARCHAR(75) NULL,
  `meta_title` VARCHAR(100) NULL,
  `slug` VARCHAR(100) NULL,
  `summary` TINYTEXT NULL,
  `published` TINYINT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  `published_at` DATETIME NULL,
  `content` TEXT NULL,
  PRIMARY KEY (`id`));
