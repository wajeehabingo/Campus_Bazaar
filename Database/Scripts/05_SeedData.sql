USE [CampusBazaarDb];
GO

-- 1. Departments (DS, SE, AC, BDA)
IF NOT EXISTS (SELECT 1 FROM dbo.Departments WHERE DepartmentCode = N'DS')
    INSERT INTO dbo.Departments (DepartmentCode, DepartmentName) VALUES (N'DS', N'Data Science');
IF NOT EXISTS (SELECT 1 FROM dbo.Departments WHERE DepartmentCode = N'SE')
    INSERT INTO dbo.Departments (DepartmentCode, DepartmentName) VALUES (N'SE', N'Software Engineering');
IF NOT EXISTS (SELECT 1 FROM dbo.Departments WHERE DepartmentCode = N'AC')
    INSERT INTO dbo.Departments (DepartmentCode, DepartmentName) VALUES (N'AC', N'Accounting & Finance');
IF NOT EXISTS (SELECT 1 FROM dbo.Departments WHERE DepartmentCode = N'BDA')
    INSERT INTO dbo.Departments (DepartmentCode, DepartmentName) VALUES (N'BDA', N'Business Data Analytics');
GO

-- 2. Users
DECLARE @DsDeptId INT = (SELECT DepartmentId FROM dbo.Departments WHERE DepartmentCode = N'DS');
DECLARE @SeDeptId INT = (SELECT DepartmentId FROM dbo.Departments WHERE DepartmentCode = N'SE');

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE RegistrationNumber = N'ADMIN-01')
    INSERT INTO dbo.Users (FullName, RegistrationNumber, Email, PasswordHash, [Role], DepartmentId, AccountStatus)
    VALUES (N'System Administrator', N'ADMIN-01', N'admin@uet.edu.pk', N'SEED_HASH_ADMIN', N'Admin', @DsDeptId, N'Active');
IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE RegistrationNumber = N'2025-DS-04')
    INSERT INTO dbo.Users (FullName, RegistrationNumber, Email, PasswordHash, [Role], DepartmentId, AccountStatus)
    VALUES (N'Wajeeha Fatima', N'2025-DS-04', N'wajeeha@uet.edu.pk', N'SEED_HASH_USER_1', N'Student', @DsDeptId, N'Active');
IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE RegistrationNumber = N'2025-DS-14')
    INSERT INTO dbo.Users (FullName, RegistrationNumber, Email, PasswordHash, [Role], DepartmentId, AccountStatus)
    VALUES (N'Momina Ashraf', N'2025-DS-14', N'momina@uet.edu.pk', N'SEED_HASH_USER_2', N'Student', @DsDeptId, N'Active');
GO

-- 3. Courses
DECLARE @DsId INT = (SELECT DepartmentId FROM dbo.Departments WHERE DepartmentCode = N'DS');
DECLARE @SeId INT = (SELECT DepartmentId FROM dbo.Departments WHERE DepartmentCode = N'SE');

IF NOT EXISTS (SELECT 1 FROM dbo.Courses WHERE CourseCode = N'DS-301')
    INSERT INTO dbo.Courses (CourseCode, CourseName, DepartmentId) VALUES (N'DS-301', N'Database Systems', @DsId);
IF NOT EXISTS (SELECT 1 FROM dbo.Courses WHERE CourseCode = N'CSC-200')
    INSERT INTO dbo.Courses (CourseCode, CourseName, DepartmentId) VALUES (N'CSC-200', N'Data Structures and Algorithms', @DsId);
IF NOT EXISTS (SELECT 1 FROM dbo.Courses WHERE CourseCode = N'SE-301')
    INSERT INTO dbo.Courses (CourseCode, CourseName, DepartmentId) VALUES (N'SE-301', N'Software Engineering Principles', @SeId);
GO

-- 4. Published Resources (Valid CourseId & UploadedByUserId FKs, Status = 'Published')
DECLARE @User1Id INT = (SELECT UserId FROM dbo.Users WHERE RegistrationNumber = N'2025-DS-04');
DECLARE @User2Id INT = (SELECT UserId FROM dbo.Users WHERE RegistrationNumber = N'2025-DS-14');
DECLARE @Ds301Id INT = (SELECT CourseId FROM dbo.Courses WHERE CourseCode = N'DS-301');
DECLARE @Csc200Id INT = (SELECT CourseId FROM dbo.Courses WHERE CourseCode = N'CSC-200');

IF NOT EXISTS (SELECT 1 FROM dbo.Resources WHERE Title = N'Introduction to Database Systems')
    INSERT INTO dbo.Resources (Title, Description, StorageKey, FileType, FileSize, FileHash, CourseId, UploadedByUserId, [Status])
    VALUES (
        N'Introduction to Database Systems',
        N'Lecture notes on relational schema design and SQL queries.',
        N'/uploads/db_intro.pdf',
        N'PDF',
        1048576,
        N'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
        @Ds301Id,
        @User1Id,
        N'Published'
    );

IF NOT EXISTS (SELECT 1 FROM dbo.Resources WHERE Title = N'Data Structures & Algorithms Notes')
    INSERT INTO dbo.Resources (Title, Description, StorageKey, FileType, FileSize, FileHash, CourseId, UploadedByUserId, [Status])
    VALUES (
        N'Data Structures & Algorithms Notes',
        N'Study guide covering trees, graphs, hashing, and complexity.',
        N'/uploads/dsa_notes.pdf',
        N'PDF',
        524288,
        N'8F434346648F6B96DF89DDA901C5176B10A6D83961DD3C1AC88B59B2DC327AA4',
        @Csc200Id,
        @User2Id,
        N'Published'
    );
GO