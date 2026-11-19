-- =========================================================================
-- 04_CreateIndexes.sql
-- Optimizes query performance for foreign keys and high-frequency searches
-- =========================================================================

USE CampusBazaarDb;
GO

-- Index foreign keys for faster joins
CREATE NONCLUSTERED INDEX IX_Resources_CourseId ON Resources(CourseId);
CREATE NONCLUSTERED INDEX IX_Resources_UploadedByUserId ON Resources(UploadedByUserId);
CREATE NONCLUSTERED INDEX IX_Courses_DepartmentId ON Courses(DepartmentId);
CREATE NONCLUSTERED INDEX IX_Messages_SenderId ON Messages(SenderId);
CREATE NONCLUSTERED INDEX IX_Messages_ReceiverId ON Messages(ReceiverId);
CREATE NONCLUSTERED INDEX IX_ActivityLogs_UserId ON ActivityLogs(UserId);

-- Index frequently searched fields
CREATE NONCLUSTERED INDEX IX_Users_RegistrationNumber ON Users(RegistrationNumber);
CREATE NONCLUSTERED INDEX IX_Resources_Title ON Resources(Title);
CREATE NONCLUSTERED INDEX IX_Resources_FileHash ON Resources(FileHash);
GO