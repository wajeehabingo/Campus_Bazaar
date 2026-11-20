USE [CampusBazaarDb];
GO

IF OBJECT_ID(N'dbo.Resources', N'U') IS NOT NULL DROP TABLE dbo.Resources;
IF OBJECT_ID(N'dbo.Courses', N'U') IS NOT NULL DROP TABLE dbo.Courses;
IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL DROP TABLE dbo.Users;
IF OBJECT_ID(N'dbo.Departments', N'U') IS NOT NULL DROP TABLE dbo.Departments;
GO

CREATE TABLE dbo.Departments (
    DepartmentId INT IDENTITY(1,1) NOT NULL,
    DepartmentCode NVARCHAR(10) NOT NULL,
    DepartmentName NVARCHAR(100) NOT NULL
);

CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1,1) NOT NULL,
    FullName NVARCHAR(150) NOT NULL,
    RegistrationNumber NVARCHAR(50) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(30) NOT NULL,
    DepartmentId INT NOT NULL,
    AccountStatus NVARCHAR(30) NOT NULL,
    CreatedAt DATETIME2 NOT NULL
);

CREATE TABLE dbo.Courses (
    CourseId INT IDENTITY(1,1) NOT NULL,
    CourseName NVARCHAR(150) NOT NULL,
    CourseCode NVARCHAR(20) NOT NULL,
    DepartmentId INT NOT NULL
);

CREATE TABLE dbo.Resources (
    ResourceId INT IDENTITY(1,1) NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    StorageKey NVARCHAR(500) NOT NULL,
    FileType NVARCHAR(20) NOT NULL,
    FileSize BIGINT NOT NULL,
    FileHash NVARCHAR(64) NULL,
    CourseId INT NOT NULL,
    UploadedByUserId INT NOT NULL,
    Status NVARCHAR(30) NOT NULL,
    CreatedAt DATETIME2 NOT NULL
);
GO