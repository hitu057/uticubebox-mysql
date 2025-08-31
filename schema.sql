-- Comprehensive schema based on all service files

CREATE TABLE organisation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    image VARCHAR(255),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    firstname VARCHAR(32),
    middelname VARCHAR(32),
    lastname VARCHAR(32),
    email VARCHAR(64),
    password VARCHAR(64),
    mobile VARCHAR(16),
    address VARCHAR(255),
    gender VARCHAR(8),
    dob DATE,
    profile VARCHAR(255),
    otp VARCHAR(8),
    isOtpExpire TINYINT DEFAULT 0,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    departmentId INT,
    designationId INT,
    empId INT,
    qualificationId INT,
    additionalResId INT,
    roleId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    categoryId INT,
    fatherName VARCHAR(64),
    rollNumber VARCHAR(32),
    fatherMobile VARCHAR(16),
    motherName VARCHAR(64),
    motherMobile VARCHAR(16),
    parentEmail VARCHAR(64),
    hostel INT,
    guardianName VARCHAR(64),
    guardianMobile VARCHAR(16),
    roomNumber INT,
    checkIn DATE,
    checkOut DATE,
    meals TINYINT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE batch (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    batchId INT,
    classId INT,
    semesterId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    userId INT,
    classId INT,
    departmentId INT,
    semesterId INT,
    lectureDate DATE,
    startTime VARCHAR(8),
    endTime VARCHAR(8),
    password VARCHAR(32),
    isPresent TINYINT,
    remark VARCHAR(255),
    glat VARCHAR(16),
    glong VARCHAR(16),
    timeTableId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE attendanceTimeTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    userId INT,
    classId INT,
    departmentId INT,
    semesterId INT,
    batchId INT,
    lectureDate DATE,
    startTime VARCHAR(8),
    endTime VARCHAR(8),
    isStarted TINYINT DEFAULT 0,
    glat VARCHAR(16),
    glong VARCHAR(16),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    title VARCHAR(64),
    description VARCHAR(255),
    lab VARCHAR(32),
    classId INT,
    semesterId INT,
    departmentId INT,
    document VARCHAR(64),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    batchId INT,
    classId INT,
    semesterId INT,
    departmentId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE dropdown (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    name VARCHAR(64),
    groupId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE dropdownGroup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    name VARCHAR(64),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    title VARCHAR(128),
    description VARCHAR(255),
    startDate DATE,
    endDate DATE,
    showDashboard TINYINT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE exam (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    classId INT,
    semesterId INT,
    batchId INT,
    studentId INT,
    venue VARCHAR(64),
    timeTableId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE examTimeTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    userId INT,
    classId INT,
    departmentId INT,
    semesterId INT,
    batchId INT,
    examDate DATE,
    startTime VARCHAR(8),
    endTime VARCHAR(8),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE fee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    classId INT,
    semesterId INT,
    startDate DATE,
    endDate DATE,
    amount DECIMAL(10,2),
    title VARCHAR(64),
    description VARCHAR(255),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    feeId INT,
    amount DECIMAL(10,2),
    transactionId VARCHAR(64),
    paymentStatus TINYINT,
    document VARCHAR(255),
    type TINYINT,
    reason VARCHAR(255),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE holiday (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    title VARCHAR(64),
    description VARCHAR(255),
    holidayDate DATE,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE hostel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    name VARCHAR(64),
    warden VARCHAR(32),
    address VARCHAR(255),
    pincode VARCHAR(8),
    city VARCHAR(32),
    state VARCHAR(32),
    policy VARCHAR(255),
    emergency TINYINT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    hostel INT,
    sharing TINYINT,
    roomNumber INT,
    preference VARCHAR(32),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE logBook (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    classId INT,
    semesterId INT,
    studentId INT,
    batchId INT,
    departmentId INT,
    competency VARCHAR(64),
    activityName VARCHAR(64),
    logDate DATE,
    activityAttempt VARCHAR(32),
    rating VARCHAR(8),
    facultyDecision VARCHAR(64),
    facultyInitialDate VARCHAR(16),
    feedback VARCHAR(255),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE semester (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    name VARCHAR(32),
    classId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE studentResult (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    classId INT,
    semesterId INT,
    batchId INT,
    studentId INT,
    total INT,
    marksGot INT,
    passing INT,
    departmentId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE hallTicket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    batchId INT,
    userId INT,
    classId INT,
    semesterId INT,
    venue VARCHAR(64),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE examAttendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orgId INT,
    userId INT,
    isPresent TINYINT,
    timeTableId INT,
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE loginTransaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    deviceId VARCHAR(128),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

CREATE TABLE studentVerification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    otp VARCHAR(8),
    email VARCHAR(64),
    crdtBy INT,
    updtBy INT,
    crdtDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updtDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
);

INSERT INTO uticubebox.organisation (name,crdtBy)
	VALUES ('Uticubebox',1)