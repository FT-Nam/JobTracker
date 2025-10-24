# 🔌 JobTracker API Documentation

## 📋 Tổng quan API

JobTracker cung cấp RESTful API với thiết kế REST chuẩn, sử dụng JSON cho data exchange và JWT cho authentication.

### 🎯 API Design Principles
- **RESTful**: Tuân thủ REST conventions
- **Stateless**: JWT-based authentication
- **Versioned**: API versioning với `/api/v1`
- **Consistent**: Uniform response format
- **Secure**: HTTPS, JWT, input validation
- **Documented**: OpenAPI 3.0 specification

### 🔧 Base Configuration
```
Base URL: https://api.jobtracker.com/api/v1
Content-Type: application/json
Authorization: Bearer <oauth2_access_token>
```

## 🔐 Authentication APIs

### 1. User Registration
**POST** `/auth/register`

Đăng ký tài khoản người dùng mới.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "role": {
      "id": 1,
      "name": "USER",
      "displayName": "User",
      "description": "Regular user with basic permissions"
    },
    "isActive": true,
    "emailVerified": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. User Login
**POST** `/auth/login`

Đăng nhập với email và password.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": {
        "id": 1,
        "name": "USER",
        "displayName": "User"
      },
      "avatarUrl": null
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Google OAuth Login
**POST** `/auth/google`

Đăng nhập với Google OAuth2.

#### Request Body
```json
{
  "idToken": "google_id_token_here"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@gmail.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "avatarUrl": "https://lh3.googleusercontent.com/...",
      "googleId": "123456789"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Refresh Token
**POST** `/auth/refresh`

Làm mới access token bằng refresh token.

#### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5. Logout
**POST** `/auth/logout`

Đăng xuất và vô hiệu hóa token.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 6. Forgot Password
**POST** `/auth/forgot-password`

Gửi email reset password.

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Password reset email sent",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 7. Reset Password
**POST** `/auth/reset-password`

Reset password với token từ email.

#### Request Body
```json
{
  "token": "reset_token_here",
  "newPassword": "NewSecurePassword123!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 👤 User Management APIs

### 1. Get Current User Profile
**GET** `/users/profile`

Lấy thông tin profile của user hiện tại.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatarUrl": "https://dropbox.com/avatar.jpg",
    "role": "USER",
    "isActive": true,
    "emailVerified": true,
    "googleId": null,
    "lastLoginAt": "2024-01-15T09:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Update User Profile
**PUT** `/users/profile`

Cập nhật thông tin profile.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatarUrl": "https://dropbox.com/avatar.jpg",
    "role": "USER",
    "isActive": true,
    "emailVerified": true,
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Upload Avatar
**POST** `/users/avatar`

Upload ảnh đại diện.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

#### Request Body (Form Data)
```
file: <image_file>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatarUrl": "https://dropbox.com/avatars/user_1_avatar.jpg"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Change Password
**PUT** `/users/change-password`

Thay đổi mật khẩu.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "currentPassword": "CurrentPassword123!",
  "newPassword": "NewPassword123!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 💼 Job Management APIs

### 1. Get All Jobs
**GET** `/jobs`

Lấy danh sách tất cả jobs của user với pagination và filtering.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page=0&size=20&sort=createdAt,desc&status=APPLIED&company=Google&search=developer
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Senior Java Developer",
        "position": "Backend Developer",
        "company": {
          "id": 1,
          "name": "Google",
          "website": "https://google.com",
          "industry": "Technology",
          "size": "LARGE",
          "location": "Mountain View, CA",
          "logoUrl": "https://google.com/logo.png"
        },
        "jobType": {
          "id": 1,
          "name": "FULL_TIME",
          "displayName": "Full Time",
          "description": "Full-time employment"
        },
        "location": "Mountain View, CA",
        "salaryMin": 120000,
        "salaryMax": 180000,
        "currency": "USD",
        "status": {
          "id": 2,
          "name": "APPLIED",
          "displayName": "Applied",
          "description": "Application submitted",
          "color": "#3B82F6"
        },
        "applicationDate": "2024-01-10",
        "deadlineDate": "2024-01-25",
        "interviewDate": null,
        "offerDate": null,
        "jobDescription": "We are looking for a senior Java developer...",
        "requirements": "5+ years of Java experience...",
        "benefits": "Health insurance, 401k, stock options...",
        "jobUrl": "https://careers.google.com/jobs/123",
        "notes": "Applied through referral",
        "priority": {
          "id": 3,
          "name": "HIGH",
          "displayName": "High",
          "level": 3,
          "color": "#F59E0B"
        },
        "isRemote": false,
        "experienceLevel": {
          "id": 4,
          "name": "SENIOR",
          "displayName": "Senior",
          "minYears": 5,
          "maxYears": 8
        },
        "skills": [
          {
            "id": 1,
            "name": "Java",
            "category": "PROGRAMMING",
            "isRequired": true,
            "proficiencyLevel": "ADVANCED"
          },
          {
            "id": 2,
            "name": "Spring Boot",
            "category": "FRAMEWORK",
            "isRequired": true,
            "proficiencyLevel": "ADVANCED"
          }
        ],
        "resumes": [
          {
            "id": 1,
            "name": "John_Doe_Resume_2024.pdf",
            "isPrimary": true
          }
        ],
        "createdAt": "2024-01-10T09:00:00Z",
        "updatedAt": "2024-01-10T09:00:00Z"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true,
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "empty": false
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Get Job by ID
**GET** `/jobs/{id}`

Lấy thông tin chi tiết một job.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "id": 1,
    "title": "Senior Java Developer",
    "position": "Backend Developer",
    "company": {
      "id": 1,
      "name": "Google",
      "website": "https://google.com",
      "industry": "Technology",
      "size": "LARGE",
      "location": "Mountain View, CA",
      "logoUrl": "https://google.com/logo.png"
    },
    "jobType": "FULL_TIME",
    "location": "Mountain View, CA",
    "salaryMin": 120000,
    "salaryMax": 180000,
    "currency": "USD",
    "status": "APPLIED",
    "applicationDate": "2024-01-10",
    "deadlineDate": "2024-01-25",
    "interviewDate": null,
    "offerDate": null,
    "jobDescription": "We are looking for a senior Java developer...",
    "requirements": "5+ years of Java experience...",
    "benefits": "Health insurance, 401k, stock options...",
    "jobUrl": "https://careers.google.com/jobs/123",
    "notes": "Applied through referral",
    "priority": "HIGH",
    "isRemote": false,
    "experienceLevel": "SENIOR",
    "skills": [
      {
        "id": 1,
        "name": "Java",
        "category": "PROGRAMMING",
        "isRequired": true,
        "proficiencyLevel": "ADVANCED"
      }
    ],
    "resumes": [
      {
        "id": 1,
        "name": "John_Doe_Resume_2024.pdf",
        "isPrimary": true
      }
    ],
    "interviews": [
      {
        "id": 1,
        "roundNumber": 1,
        "interviewType": "PHONE",
        "scheduledDate": "2024-01-20T14:00:00Z",
        "actualDate": null,
        "durationMinutes": 60,
        "interviewerName": "Jane Smith",
        "interviewerEmail": "jane.smith@google.com",
        "interviewerPosition": "Senior Engineer",
        "status": "SCHEDULED",
        "result": null,
        "feedback": null,
        "notes": "Technical interview",
        "questionsAsked": null,
        "answersGiven": null,
        "rating": null
      }
    ],
    "attachments": [
      {
        "id": 1,
        "filename": "job_description.pdf",
        "originalFilename": "Google_Job_Description.pdf",
        "fileType": "application/pdf",
        "attachmentType": "JOB_DESCRIPTION",
        "description": "Official job description from Google",
        "uploadedAt": "2024-01-10T09:00:00Z"
      }
    ],
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Create New Job
**POST** `/jobs`

Tạo job mới.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "companyId": 1,
  "title": "Senior Java Developer",
  "position": "Backend Developer",
  "jobTypeId": 1,
  "location": "Mountain View, CA",
  "salaryMin": 120000,
  "salaryMax": 180000,
  "currency": "USD",
  "applicationDate": "2024-01-10",
  "deadlineDate": "2024-01-25",
  "jobDescription": "We are looking for a senior Java developer...",
  "requirements": "5+ years of Java experience...",
  "benefits": "Health insurance, 401k, stock options...",
  "jobUrl": "https://careers.google.com/jobs/123",
  "notes": "Applied through referral",
  "priorityId": 3,
  "isRemote": false,
  "experienceLevelId": 4,
  "skillIds": [1, 2, 3],
  "resumeIds": [1]
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "id": 1,
    "title": "Senior Java Developer",
    "position": "Backend Developer",
    "company": {
      "id": 1,
      "name": "Google",
      "website": "https://google.com"
    },
    "jobType": "FULL_TIME",
    "location": "Mountain View, CA",
    "salaryMin": 120000,
    "salaryMax": 180000,
    "currency": "USD",
    "status": "SAVED",
    "applicationDate": "2024-01-10",
    "deadlineDate": "2024-01-25",
    "priority": "HIGH",
    "isRemote": false,
    "experienceLevel": "SENIOR",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Update Job
**PUT** `/jobs/{id}`

Cập nhật thông tin job.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "title": "Senior Java Developer - Updated",
  "position": "Backend Developer",
  "status": "INTERVIEW",
  "interviewDate": "2024-01-20",
  "notes": "Updated notes after phone screening"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "id": 1,
    "title": "Senior Java Developer - Updated",
    "position": "Backend Developer",
    "status": "INTERVIEW",
    "interviewDate": "2024-01-20",
    "notes": "Updated notes after phone screening",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5. Delete Job
**DELETE** `/jobs/{id}`

Xóa job (soft delete).

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job deleted successfully",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 6. Update Job Status
**PATCH** `/jobs/{id}/status`

Cập nhật trạng thái job.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "status": "OFFER",
  "offerDate": "2024-01-25",
  "notes": "Received offer with $150k base salary"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job status updated successfully",
  "data": {
    "id": 1,
    "status": "OFFER",
    "offerDate": "2024-01-25",
    "notes": "Received offer with $150k base salary",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🏢 Company Management APIs

### 1. Get All Companies
**GET** `/companies`

Lấy danh sách tất cả companies.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page=0&size=20&sort=name,asc&industry=Technology&search=Google
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Companies retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Google",
        "website": "https://google.com",
        "industry": "Technology",
        "size": "LARGE",
        "location": "Mountain View, CA",
        "description": "Google is a multinational technology company...",
        "logoUrl": "https://google.com/logo.png",
        "isVerified": true,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true,
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "empty": false
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Create Company
**POST** `/companies`

Tạo company mới.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "name": "New Tech Company",
  "website": "https://newtech.com",
  "industry": "Technology",
  "size": "MEDIUM",
  "location": "San Francisco, CA",
  "description": "A innovative technology company..."
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Company created successfully",
  "data": {
    "id": 2,
    "name": "New Tech Company",
    "website": "https://newtech.com",
    "industry": "Technology",
    "size": "MEDIUM",
    "location": "San Francisco, CA",
    "description": "A innovative technology company...",
    "logoUrl": null,
    "isVerified": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📋 Lookup Tables APIs

### 1. Get Job Statuses
**GET** `/lookup/job-statuses`

Lấy danh sách tất cả job statuses.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job statuses retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "SAVED",
      "displayName": "Saved",
      "description": "Job saved but not yet applied",
      "color": "#6B7280",
      "sortOrder": 1,
      "isActive": true
    },
    {
      "id": 2,
      "name": "APPLIED",
      "displayName": "Applied",
      "description": "Application submitted",
      "color": "#3B82F6",
      "sortOrder": 2,
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Get Job Types
**GET** `/lookup/job-types`

Lấy danh sách tất cả job types.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job types retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "FULL_TIME",
      "displayName": "Full Time",
      "description": "Full-time employment",
      "isActive": true
    },
    {
      "id": 2,
      "name": "PART_TIME",
      "displayName": "Part Time",
      "description": "Part-time employment",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Get Priorities
**GET** `/lookup/priorities`

Lấy danh sách tất cả priorities.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Priorities retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "LOW",
      "displayName": "Low",
      "level": 1,
      "color": "#6B7280",
      "description": "Low priority",
      "isActive": true
    },
    {
      "id": 2,
      "name": "MEDIUM",
      "displayName": "Medium",
      "level": 2,
      "color": "#3B82F6",
      "description": "Medium priority",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Get Experience Levels
**GET** `/lookup/experience-levels`

Lấy danh sách tất cả experience levels.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Experience levels retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "ENTRY",
      "displayName": "Entry Level",
      "minYears": 0,
      "maxYears": 1,
      "description": "Entry level position",
      "isActive": true
    },
    {
      "id": 2,
      "name": "JUNIOR",
      "displayName": "Junior",
      "minYears": 1,
      "maxYears": 3,
      "description": "Junior level position",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5. Get Interview Types
**GET** `/lookup/interview-types`

Lấy danh sách tất cả interview types.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Interview types retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "PHONE",
      "displayName": "Phone Interview",
      "description": "Phone-based interview",
      "isActive": true
    },
    {
      "id": 2,
      "name": "VIDEO",
      "displayName": "Video Interview",
      "description": "Video call interview",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 6. Get Interview Statuses
**GET** `/lookup/interview-statuses`

Lấy danh sách tất cả interview statuses.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Interview statuses retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "SCHEDULED",
      "displayName": "Scheduled",
      "description": "Interview scheduled",
      "color": "#3B82F6",
      "isActive": true
    },
    {
      "id": 2,
      "name": "COMPLETED",
      "displayName": "Completed",
      "description": "Interview completed",
      "color": "#10B981",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 7. Get Interview Results
**GET** `/lookup/interview-results`

Lấy danh sách tất cả interview results.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Interview results retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "PASSED",
      "displayName": "Passed",
      "description": "Interview passed",
      "color": "#10B981",
      "isActive": true
    },
    {
      "id": 2,
      "name": "FAILED",
      "displayName": "Failed",
      "description": "Interview failed",
      "color": "#EF4444",
      "isActive": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🎯 Skills Management APIs

### 1. Get All Skills
**GET** `/skills`

Lấy danh sách tất cả skills.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page=0&size=50&sort=name,asc&category=PROGRAMMING&search=Java
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Skills retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Java",
        "category": "PROGRAMMING",
        "description": "Object-oriented programming language",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "id": 2,
        "name": "Spring Boot",
        "category": "FRAMEWORK",
        "description": "Java framework for building web applications",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 50,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "first": true,
    "numberOfElements": 2,
    "size": 50,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "empty": false
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Get User Skills
**GET** `/users/skills`

Lấy skills của user hiện tại.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "User skills retrieved successfully",
  "data": [
    {
      "id": 1,
      "skill": {
        "id": 1,
        "name": "Java",
        "category": "PROGRAMMING",
        "description": "Object-oriented programming language"
      },
      "proficiencyLevel": "ADVANCED",
      "yearsOfExperience": 5.0,
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Add User Skill
**POST** `/users/skills`

Thêm skill cho user.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "skillId": 1,
  "proficiencyLevel": "ADVANCED",
  "yearsOfExperience": 5.0
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "User skill added successfully",
  "data": {
    "id": 1,
    "skill": {
      "id": 1,
      "name": "Java",
      "category": "PROGRAMMING"
    },
    "proficiencyLevel": "ADVANCED",
    "yearsOfExperience": 5.0,
    "isVerified": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📄 Resume Management APIs

### 1. Get User Resumes
**GET** `/resumes`

Lấy danh sách resumes của user.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Resumes retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John_Doe_Resume_2024.pdf",
      "originalFilename": "John_Doe_Resume_2024.pdf",
      "fileSize": 1024000,
      "fileType": "application/pdf",
      "version": "1.0",
      "isDefault": true,
      "description": "Updated resume for 2024",
      "tags": ["senior", "java", "backend"],
      "isActive": true,
      "uploadedAt": "2024-01-10T09:00:00Z",
      "createdAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-10T09:00:00Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Upload Resume
**POST** `/resumes/upload`

Upload resume mới.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

#### Request Body (Form Data)
```
file: <pdf_file>
description: "Updated resume for 2024"
tags: ["senior", "java", "backend"]
isDefault: true
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "id": 1,
    "name": "John_Doe_Resume_2024.pdf",
    "originalFilename": "John_Doe_Resume_2024.pdf",
    "fileSize": 1024000,
    "fileType": "application/pdf",
    "version": "1.0",
    "isDefault": true,
    "description": "Updated resume for 2024",
    "tags": ["senior", "java", "backend"],
    "isActive": true,
    "uploadedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Download Resume
**GET** `/resumes/{id}/download`

Download resume file.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="John_Doe_Resume_2024.pdf"
Content-Length: 1024000

<binary_file_content>
```

## 🎤 Interview Management APIs

### 1. Get Job Interviews
**GET** `/jobs/{jobId}/interviews`

Lấy danh sách interviews của một job.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Interviews retrieved successfully",
  "data": [
    {
      "id": 1,
      "roundNumber": 1,
      "interviewType": "PHONE",
      "scheduledDate": "2024-01-20T14:00:00Z",
      "actualDate": null,
      "durationMinutes": 60,
      "interviewerName": "Jane Smith",
      "interviewerEmail": "jane.smith@google.com",
      "interviewerPosition": "Senior Engineer",
      "status": "SCHEDULED",
      "result": null,
      "feedback": null,
      "notes": "Technical interview",
      "questionsAsked": null,
      "answersGiven": null,
      "rating": null,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Create Interview
**POST** `/jobs/{jobId}/interviews`

Tạo interview mới cho job.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "roundNumber": 1,
  "interviewType": "PHONE",
  "scheduledDate": "2024-01-20T14:00:00Z",
  "durationMinutes": 60,
  "interviewerName": "Jane Smith",
  "interviewerEmail": "jane.smith@google.com",
  "interviewerPosition": "Senior Engineer",
  "notes": "Technical interview"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Interview created successfully",
  "data": {
    "id": 1,
    "roundNumber": 1,
    "interviewType": "PHONE",
    "scheduledDate": "2024-01-20T14:00:00Z",
    "actualDate": null,
    "durationMinutes": 60,
    "interviewerName": "Jane Smith",
    "interviewerEmail": "jane.smith@google.com",
    "interviewerPosition": "Senior Engineer",
    "status": "SCHEDULED",
    "result": null,
    "feedback": null,
    "notes": "Technical interview",
    "questionsAsked": null,
    "answersGiven": null,
    "rating": null,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Update Interview
**PUT** `/interviews/{id}`

Cập nhật thông tin interview.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Request Body
```json
{
  "actualDate": "2024-01-20T14:30:00Z",
  "status": "COMPLETED",
  "result": "PASSED",
  "feedback": "Great technical skills, good communication",
  "notes": "Interview went well, waiting for next round",
  "questionsAsked": "What is your experience with Spring Boot?",
  "answersGiven": "I have 3 years of experience with Spring Boot...",
  "rating": 4
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Interview updated successfully",
  "data": {
    "id": 1,
    "actualDate": "2024-01-20T14:30:00Z",
    "status": "COMPLETED",
    "result": "PASSED",
    "feedback": "Great technical skills, good communication",
    "notes": "Interview went well, waiting for next round",
    "questionsAsked": "What is your experience with Spring Boot?",
    "answersGiven": "I have 3 years of experience with Spring Boot...",
    "rating": 4,
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📊 Dashboard & Analytics APIs

### 1. Get Dashboard Statistics
**GET** `/dashboard/statistics`

Lấy thống kê tổng quan cho dashboard.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalJobs": 25,
    "jobsByStatus": {
      "SAVED": 5,
      "APPLIED": 15,
      "INTERVIEW": 3,
      "OFFER": 2,
      "REJECTED": 8,
      "WITHDRAWN": 1,
      "ACCEPTED": 1
    },
    "successRate": {
      "applicationToInterview": 20.0,
      "interviewToOffer": 66.7,
      "applicationToOffer": 13.3
    },
    "recentActivity": [
      {
        "id": 1,
        "type": "JOB_CREATED",
        "message": "Created new job application for Google",
        "createdAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": 2,
        "type": "INTERVIEW_SCHEDULED",
        "message": "Interview scheduled for Microsoft",
        "createdAt": "2024-01-15T09:00:00Z"
      }
    ],
    "upcomingDeadlines": [
      {
        "id": 1,
        "title": "Senior Java Developer",
        "company": "Google",
        "deadlineDate": "2024-01-25",
        "daysRemaining": 10
      }
    ],
    "topSkills": [
      {
        "skill": "Java",
        "count": 15,
        "percentage": 60.0
      },
      {
        "skill": "Spring Boot",
        "count": 12,
        "percentage": 48.0
      }
    ],
    "monthlyApplications": [
      {
        "month": "2024-01",
        "count": 8
      },
      {
        "month": "2024-02",
        "count": 12
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Get Job Analytics
**GET** `/analytics/jobs`

Lấy phân tích chi tiết về jobs.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
startDate=2024-01-01&endDate=2024-12-31&groupBy=month
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Job analytics retrieved successfully",
  "data": {
    "timeline": [
      {
        "date": "2024-01",
        "applied": 8,
        "interview": 2,
        "offer": 1,
        "rejected": 3
      },
      {
        "date": "2024-02",
        "applied": 12,
        "interview": 4,
        "offer": 2,
        "rejected": 5
      }
    ],
    "companyStats": [
      {
        "company": "Google",
        "totalApplications": 5,
        "interviews": 2,
        "offers": 1,
        "successRate": 20.0
      },
      {
        "company": "Microsoft",
        "totalApplications": 3,
        "interviews": 1,
        "offers": 0,
        "successRate": 0.0
      }
    ],
    "skillStats": [
      {
        "skill": "Java",
        "totalJobs": 15,
        "successRate": 26.7
      },
      {
        "skill": "React",
        "totalJobs": 8,
        "successRate": 37.5
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔔 Notification APIs

### 1. Get User Notifications
**GET** `/notifications`

Lấy danh sách notifications của user.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page=0&size=20&isRead=false&type=DEADLINE_REMINDER
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Notifications retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "jobId": 1,
        "type": "DEADLINE_REMINDER",
        "title": "Deadline Reminder",
        "message": "Google application deadline is in 3 days",
        "isRead": false,
        "isSent": true,
        "sentAt": "2024-01-15T10:00:00Z",
        "priority": "HIGH",
        "metadata": {
          "deadlineDate": "2024-01-18",
          "companyName": "Google"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20,
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true,
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "empty": false
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Mark Notification as Read
**PATCH** `/notifications/{id}/read`

Đánh dấu notification đã đọc.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Notification marked as read",
  "data": {
    "id": 1,
    "isRead": true,
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Mark All Notifications as Read
**PATCH** `/notifications/read-all`

Đánh dấu tất cả notifications đã đọc.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "data": {
    "updatedCount": 5
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📁 File Management APIs

### 1. Upload Job Attachment
**POST** `/jobs/{jobId}/attachments`

Upload file đính kèm cho job.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

#### Request Body (Form Data)
```
file: <file>
attachmentType: JOB_DESCRIPTION
description: "Official job description"
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Attachment uploaded successfully",
  "data": {
    "id": 1,
    "filename": "job_description.pdf",
    "originalFilename": "Google_Job_Description.pdf",
    "fileSize": 512000,
    "fileType": "application/pdf",
    "attachmentType": "JOB_DESCRIPTION",
    "description": "Official job description",
    "isPublic": false,
    "uploadedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Download Attachment
**GET** `/attachments/{id}/download`

Download file đính kèm.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response (200 OK)
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Google_Job_Description.pdf"
Content-Length: 512000

<binary_file_content>
```

## 🚨 Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common HTTP Status Codes
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict
- **422 Unprocessable Entity**: Validation failed
- **500 Internal Server Error**: Server error

### Error Examples

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required",
  "errors": [
    {
      "field": "authorization",
      "message": "JWT token is missing or invalid"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "errors": [
    {
      "field": "id",
      "message": "Job with ID 999 not found"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 422 Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email format is invalid"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔧 API Configuration

### Rate Limiting
```
Rate Limit: 1000 requests per hour per user
Burst Limit: 100 requests per minute
```

### Request Size Limits
```
Max Request Size: 10MB
Max File Upload: 50MB
Max Array Size: 1000 items
```

### CORS Configuration
```
Allowed Origins: https://jobtracker.com, https://app.jobtracker.com
Allowed Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Allowed Headers: Authorization, Content-Type, X-Requested-With
Max Age: 3600 seconds
```

## 📚 OpenAPI Documentation

API documentation được tự động generate bằng SpringDoc OpenAPI 3 và có thể truy cập tại:

- **Swagger UI**: `https://api.jobtracker.com/swagger-ui.html`
- **OpenAPI JSON**: `https://api.jobtracker.com/v3/api-docs`
- **OpenAPI YAML**: `https://api.jobtracker.com/v3/api-docs.yaml`

### API Versioning
```
Current Version: v1
Version Header: X-API-Version
Deprecation Policy: 6 months notice
```

## 🔐 Security Headers

### Required Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-Requested-With: XMLHttpRequest
```

### Security Headers (Server Response)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```
