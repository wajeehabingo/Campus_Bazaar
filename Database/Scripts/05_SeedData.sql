-- =========================================================================
-- 05_SeedData.sql
-- Development test data for backend endpoint verification
-- =========================================================================

USE CampusBazaarDb;
GO

-- 1. Seed Departments
INSERT INTO Departments (DepartmentCode, DepartmentName) VALUES 
('DS', 'Data Science'),
('SE', 'Software Engineering'),
('BDA', 'Business Data Analytics');

-- 2. Seed Users (Includes an Admin user sharing the same Users table via Role)[cite: 1]
INSERT INTO Users (RegistrationNumber, FullName, Email, PasswordHash, DepartmentId, Role) VALUES 
('ADMIN-01', 'System Administrator', 'admin@uet.edu.pk', 'HASHED_ADMIN_PASS', 1, 'Admin'),
('2025-DS-04', 'Wajeeha Fatima', 'wajeeha@uet.edu.pk', 'HASHED_PASS_1', 1, 'Student'),
('2025-DS-14', 'Momina Ashraf', 'momina@uet.edu.pk', 'HASHED_PASS_2', 1, 'Student');

-- 3. Seed Sample Courses
INSERT INTO Courses (CourseCode, CourseName, DepartmentId) VALUES 
('CSC-200', 'Data Structures and Algorithms', 1),
('SE-301', 'Software Engineering Principles', 2),
('BDA-101', 'Intro to Business Data Analytics', 3);

-- 4. Seed Sample Resources
INSERT INTO Resources (Title, Description, CourseId, UploadedByUserId, FileHash, StorageKey, FileType, FileSize, Status) VALUES 
('Introduction to Database Systems', 'Lecture slides covering relational algebra and SQL basics.', 1, 2, 'HASH1234567890ABCDEF', '/uploads/db_intro.pdf', 'PDF', 1048576, 'Published'),
('Advanced Sorting Algorithms', 'Notes on quicksort, mergesort, and asymptotic complexity.', 1, 3, 'HASH0987654321FEDCBA', '/uploads/dsa_sorting.pdf', 'PDF', 2097152, 'Published');

-- 5. Seed Sample Messages (Peer Communication)[cite: 3, 6]
INSERT INTO Messages (SenderId, ReceiverId, Content, IsRead) VALUES 
(2, 3, 'Hey Momina, did you check the DB lecture slides uploaded for CSC-200?', 1),
(3, 2, 'Yes Wajeeha! They are super helpful.', 0);

-- 6. Seed Sample Activity Logs (Audit Trail)[cite: 3, 6]
INSERT INTO ActivityLogs (UserId, Action, Details, IpAddress) VALUES 
(1, 'ADMIN_LOGIN', 'Administrator logged into the management dashboard.', '127.0.0.1'),
(2, 'USER_LOGIN', 'Student Wajeeha logged into the platform.', '127.0.0.1');
GO