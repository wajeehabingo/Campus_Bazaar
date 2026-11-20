USE [CampusBazaarDb];
GO

DROP INDEX IF EXISTS [IX_Users_DepartmentId] ON [dbo].[Users];
CREATE NONCLUSTERED INDEX [IX_Users_DepartmentId] ON [dbo].[Users] ([DepartmentId]);

DROP INDEX IF EXISTS [IX_Users_RegistrationNumber] ON [dbo].[Users];
CREATE NONCLUSTERED INDEX [IX_Users_RegistrationNumber] ON [dbo].[Users] ([RegistrationNumber]);

DROP INDEX IF EXISTS [IX_Courses_DepartmentId] ON [dbo].[Courses];
CREATE NONCLUSTERED INDEX [IX_Courses_DepartmentId] ON [dbo].[Courses] ([DepartmentId]);

DROP INDEX IF EXISTS [IX_Resources_CourseId] ON [dbo].[Resources];
CREATE NONCLUSTERED INDEX [IX_Resources_CourseId] ON [dbo].[Resources] ([CourseId]);

DROP INDEX IF EXISTS [IX_Resources_UploadedByUserId] ON [dbo].[Resources];
CREATE NONCLUSTERED INDEX [IX_Resources_UploadedByUserId] ON [dbo].[Resources] ([UploadedByUserId]);

DROP INDEX IF EXISTS [IX_Resources_FileHash] ON [dbo].[Resources];
CREATE NONCLUSTERED INDEX [IX_Resources_FileHash] ON [dbo].[Resources] ([FileHash]);

DROP INDEX IF EXISTS [IX_Resources_Title] ON [dbo].[Resources];
CREATE NONCLUSTERED INDEX [IX_Resources_Title] ON [dbo].[Resources] ([Title]);
GO