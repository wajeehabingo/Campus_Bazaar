IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'CampusBazaarDb')
BEGIN
    CREATE DATABASE [CampusBazaarDb];
END
GO

USE [CampusBazaarDb];
GO