-- Ensure database exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CampusBazaarDb')
BEGIN
    CREATE DATABASE CampusBazaarDb;
END
GO

USE CampusBazaarDb;
GO

-- Safely drop all existing tables in correct reverse-dependency order
IF OBJECT_ID('ActivityLogs', 'U') IS NOT NULL DROP TABLE ActivityLogs;
IF OBJECT_ID('Messages', 'U') IS NOT NULL DROP TABLE Messages;
IF OBJECT_ID('Resources', 'U') IS NOT NULL DROP TABLE Resources;
IF OBJECT_ID('Courses', 'U') IS NOT NULL DROP TABLE Courses;
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;
IF OBJECT_ID('Departments', 'U') IS NOT NULL DROP TABLE Departments;
GO

-- 1. Departments Table
CREATE TABLE Departments (
    DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
    DepartmentCode NVARCHAR(10) NOT NULL UNIQUE,
    DepartmentName NVARCHAR(100) NOT NULL
);

-- 2. Users Table (Shared by Students, Mentors, and Admins via Role)[cite: 1, 3]
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    RegistrationNumber NVARCHAR(50) NOT NULL UNIQUE,
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    DepartmentId INT NOT NULL,
    Role NVARCHAR(30) NOT NULL DEFAULT 'Student',     -- 'Student', 'Mentor', 'Admin'[cite: 1, 3]
    AccountStatus NVARCHAR(30) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Users_Departments FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);

-- 3. Courses Table
CREATE TABLE Courses (
    CourseId INT IDENTITY(1,1) PRIMARY KEY,
    CourseCode NVARCHAR(20) NOT NULL UNIQUE,
    CourseName NVARCHAR(100) NOT NULL,
    DepartmentId INT NOT NULL,
    CONSTRAINT FK_Courses_Departments FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);

-- 4. Resources Table (Includes file metadata & SHA-256 duplicate detection)
CREATE TABLE Resources (
    ResourceId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    CourseId INT NOT NULL,
    UploadedByUserId INT NOT NULL,
    FileHash NVARCHAR(64) NULL,               -- SHA-256 for duplicate check[cite: 3]
    StorageKey NVARCHAR(500) NOT NULL,         -- Storage path/key[cite: 3]
    FileType NVARCHAR(10) NOT NULL,            -- e.g., 'PDF', 'DOCX'[cite: 3]
    FileSize BIGINT NOT NULL,                  -- File size in bytes[cite: 3]
    Status NVARCHAR(20) NOT NULL DEFAULT 'Published',
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Resources_Courses FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    CONSTRAINT FK_Resources_Users FOREIGN KEY (UploadedByUserId) REFERENCES Users(UserId)
);

-- 5. Messages Table (Peer Communication - FR-34)
CREATE TABLE Messages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    SenderId INT NOT NULL,
    ReceiverId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    SentAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Messages_Sender FOREIGN KEY (SenderId) REFERENCES Users(UserId),
    CONSTRAINT FK_Messages_Receiver FOREIGN KEY (ReceiverId) REFERENCES Users(UserId)
);

-- 6. ActivityLogs Table (System Traceability & Admin Audit - FR-49)
CREATE TABLE ActivityLogs (
    LogId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL,
    Action NVARCHAR(100) NOT NULL,              -- e.g., 'LOGIN', 'UPLOAD_RESOURCE', 'ADMIN_ACTION'
    Details NVARCHAR(MAX) NULL,
    IpAddress NVARCHAR(50) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_ActivityLogs_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO