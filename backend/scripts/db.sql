CREATE TABLE `users` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`username` VARCHAR NOT NULL UNIQUE,
	`firstname` VARCHAR,
	`lastname` VARCHAR,
	`digest_password` VARCHAR NOT NULL,
	`level` INT NOT NULL,
    `active` INT NOT NULL,
    `deleted` INT NOT NULL
);

CREATE TABLE `messages` (
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`from` INTEGER NOT NULL,
	`to` INTEGER NOT NULL,
	`timestamp` INTEGER NOT NULL,
	`subject` VARCHAR NOT NULL,
	`message` VARCHAR NOT NULL,
	`read` INTEGER NOT NULL,
  	FOREIGN KEY(`from`) REFERENCES users(id),
	FOREIGN KEY(`to`) REFERENCES users(id)
);
