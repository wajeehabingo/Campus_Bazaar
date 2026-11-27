USE [CampusBazaarDb];
GO

-- Primary Keys
ALTER TABLE dbo.Departments ADD CONSTRAINT PK_Departments PRIMARY KEY CLUSTERED (DepartmentId);
ALTER TABLE dbo.Users ADD CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (UserId);
ALTER TABLE dbo.Courses ADD CONSTRAINT PK_Courses PRIMARY KEY CLUSTERED (CourseId);
ALTER TABLE dbo.Resources ADD CONSTRAINT PK_Resources PRIMARY KEY CLUSTERED (ResourceId);
GO

-- Unique Constraints
ALTER TABLE dbo.Departments ADD CONSTRAINT UQ_Departments_DepartmentCode UNIQUE (DepartmentCode);
ALTER TABLE dbo.Users ADD CONSTRAINT UQ_Users_RegistrationNumber UNIQUE (RegistrationNumber);
ALTER TABLE dbo.Users ADD CONSTRAINT UQ_Users_Email UNIQUE (Email);
ALTER TABLE dbo.Courses ADD CONSTRAINT UQ_Courses_CourseCode UNIQUE (CourseCode);
GO

-- Default Constraints
ALTER TABLE dbo.Users ADD CONSTRAINT DF_Users_Role DEFAULT (N'Student') FOR [Role];
ALTER TABLE dbo.Users ADD CONSTRAINT DF_Users_AccountStatus DEFAULT (N'Active') FOR AccountStatus;
ALTER TABLE dbo.Users ADD CONSTRAINT DF_Users_CreatedAt DEFAULT (SYSUTCDATETIME()) FOR CreatedAt;
ALTER TABLE dbo.Resources ADD CONSTRAINT DF_Resources_Status DEFAULT (N'Published') FOR [Status];
ALTER TABLE dbo.Resources ADD CONSTRAINT DF_Resources_CreatedAt DEFAULT (SYSUTCDATETIME()) FOR CreatedAt;
GO

-- Check Constraints
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_Role CHECK ([Role] IN (N'Student', N'Mentor', N'Admin'));
ALTER TABLE dbo.Users ADD CONSTRAINT CK_Users_AccountStatus CHECK (AccountStatus IN (N'Active', N'Suspended'));
ALTER TABLE dbo.Resources ADD CONSTRAINT CK_Resources_Status CHECK ([Status] IN (N'Published', N'Flagged', N'Draft'));
ALTER TABLE dbo.Resources ADD CONSTRAINT CK_Resources_FileSize CHECK (FileSize > 0);
GO

-- Foreign Keys
ALTER TABLE dbo.Users ADD CONSTRAINT FK_Users_Departments
    FOREIGN KEY (DepartmentId) REFERENCES dbo.Departments (DepartmentId);

ALTER TABLE dbo.Courses ADD CONSTRAINT FK_Courses_Departments
    FOREIGN KEY (DepartmentId) REFERENCES dbo.Departments (DepartmentId);

ALTER TABLE dbo.Resources ADD CONSTRAINT FK_Resources_Courses
    FOREIGN KEY (CourseId) REFERENCES dbo.Courses (CourseId);

ALTER TABLE dbo.Resources ADD CONSTRAINT FK_Resources_Users
    FOREIGN KEY (UploadedByUserId) REFERENCES dbo.Users (UserId);
GO