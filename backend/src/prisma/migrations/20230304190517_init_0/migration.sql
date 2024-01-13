-- CreateTable
CREATE TABLE `Filtre` (
    `sessionId` VARCHAR(200) NOT NULL DEFAULT '',
    `price_min` INTEGER NULL DEFAULT 0,
    `price_max` INTEGER NULL DEFAULT 100000,
    `seats_2` BOOLEAN NULL DEFAULT false,
    `seats_4` BOOLEAN NULL DEFAULT false,
    `seats_5` BOOLEAN NULL DEFAULT false,
    `seats_7` BOOLEAN NULL DEFAULT false,
    `seats_n` BOOLEAN NULL DEFAULT false,
    `suv` BOOLEAN NULL DEFAULT false,
    `compact` BOOLEAN NULL DEFAULT false,
    `sport` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Itinerary` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `day` ENUM('M', 'Tu', 'W', 'Th', 'F', 'S', 'Su', 'NA') NULL DEFAULT 'NA',
    `period` ENUM('Daily', 'Monthly', 'Yearly', 'Weekly', 'NA') NULL DEFAULT 'NA',
    `frequency` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Route` (
    `departureLat` FLOAT NOT NULL,
    `departureLong` FLOAT NOT NULL,
    `arrivalLong` FLOAT NOT NULL,
    `arrivalLat` FLOAT NOT NULL,
    `etaDeparture` TIME(0) NULL,
    `etaArrival` TIME(0) NULL,
    `length` INTEGER NULL,
    `cost` INTEGER NULL,
    `chargingTime` INTEGER NULL,
    `dwellingTime` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`departureLat`, `departureLong`, `arrivalLong`, `arrivalLat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `sessionId` VARCHAR(200) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `TTL` INTEGER NOT NULL DEFAULT 1209600,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `vehicleId` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL DEFAULT 'NA',
    `year` YEAR NOT NULL,
    `model` VARCHAR(191) NOT NULL DEFAULT 'NA',
    `category` ENUM('SUV', 'Compact', 'Sport', 'NA') NOT NULL DEFAULT 'NA',
    `type` ENUM('Hybrid', 'Electric', 'Gas', 'NA') NOT NULL DEFAULT 'NA',
    `autonomy` INTEGER NOT NULL DEFAULT 0,
    `chargingTime` INTEGER NULL DEFAULT 0,
    `seatsCount` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `imageUrl` VARCHAR(200) NOT NULL DEFAULT '',
    `batteryCapacity` INTEGER NOT NULL,
    `maxChargingPower` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`vehicleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleCandidates` (
    `vehicleId` INTEGER NOT NULL,
    `sessionId` VARCHAR(200) NOT NULL DEFAULT '',
    `autonomyRank` INTEGER NOT NULL,
    `priceRank` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `sessionId`(`sessionId`),
    PRIMARY KEY (`vehicleId`, `sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Waypoint` (
    `long` FLOAT NOT NULL,
    `lat` FLOAT NOT NULL,
    `adress` VARCHAR(191) NOT NULL DEFAULT '',
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`long`, `lat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navigation` (
    `ItineraryId` INTEGER UNSIGNED NOT NULL,
    `sessionId` VARCHAR(200) NOT NULL DEFAULT '',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ItineraryId`, `sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
