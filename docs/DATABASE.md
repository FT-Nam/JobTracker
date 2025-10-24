# 🗄️ JobTracker Database Schema

## 📋 Tổng quan Database

JobTracker sử dụng **MySQL 8.0** làm database chính với thiết kế normalized để đảm bảo tính toàn vẹn dữ liệu và hiệu suất truy vấn.

### 🎯 Thiết kế nguyên tắc
- **Normalization**: 3NF để tránh redundancy
- **Indexing**: Tối ưu cho các truy vấn thường xuyên
- **Foreign Keys**: Đảm bảo referential integrity
- **Audit Fields**: Tracking tất cả thay đổi
- **Soft Delete**: Không xóa dữ liệu thực tế

## 🏗️ Database Schema

### 1. Lookup Tables (Bảng tra cứu)

#### 1.1. Roles Table (Bảng vai trò)
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên vai trò',
    description VARCHAR(255) COMMENT 'Mô tả vai trò',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Vai trò đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.2. Permissions Table (Bảng quyền)
```sql
CREATE TABLE permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Tên quyền',
    resource VARCHAR(100) NOT NULL COMMENT 'Tài nguyên',
    action VARCHAR(50) NOT NULL COMMENT 'Hành động (CREATE, READ, UPDATE, DELETE)',
    description VARCHAR(255) COMMENT 'Mô tả quyền',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Quyền đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_resource_action (resource, action),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.3. Job Statuses Table (Bảng trạng thái công việc)
```sql
CREATE TABLE job_statuses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên trạng thái',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả trạng thái',
    color VARCHAR(7) DEFAULT '#6B7280' COMMENT 'Màu hiển thị (hex)',
    sort_order INT DEFAULT 0 COMMENT 'Thứ tự sắp xếp',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Trạng thái đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_sort_order (sort_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.4. Job Types Table (Bảng loại công việc)
```sql
CREATE TABLE job_types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên loại công việc',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả loại công việc',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Loại đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.5. Priorities Table (Bảng độ ưu tiên)
```sql
CREATE TABLE priorities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên độ ưu tiên',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    level INT NOT NULL COMMENT 'Mức độ ưu tiên (1-4)',
    color VARCHAR(7) DEFAULT '#6B7280' COMMENT 'Màu hiển thị (hex)',
    description VARCHAR(255) COMMENT 'Mô tả độ ưu tiên',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Độ ưu tiên đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_level (level),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.6. Experience Levels Table (Bảng cấp độ kinh nghiệm)
```sql
CREATE TABLE experience_levels (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên cấp độ',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    min_years INT DEFAULT 0 COMMENT 'Số năm kinh nghiệm tối thiểu',
    max_years INT COMMENT 'Số năm kinh nghiệm tối đa',
    description VARCHAR(255) COMMENT 'Mô tả cấp độ',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Cấp độ đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_min_years (min_years),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.7. Interview Types Table (Bảng loại phỏng vấn)
```sql
CREATE TABLE interview_types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên loại phỏng vấn',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả loại phỏng vấn',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Loại đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.8. Interview Statuses Table (Bảng trạng thái phỏng vấn)
```sql
CREATE TABLE interview_statuses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên trạng thái',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả trạng thái',
    color VARCHAR(7) DEFAULT '#6B7280' COMMENT 'Màu hiển thị (hex)',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Trạng thái đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.9. Interview Results Table (Bảng kết quả phỏng vấn)
```sql
CREATE TABLE interview_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên kết quả',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả kết quả',
    color VARCHAR(7) DEFAULT '#6B7280' COMMENT 'Màu hiển thị (hex)',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Kết quả đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.10. Notification Types Table (Bảng loại thông báo)
```sql
CREATE TABLE notification_types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên loại thông báo',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    description VARCHAR(255) COMMENT 'Mô tả loại thông báo',
    template VARCHAR(500) COMMENT 'Template thông báo',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Loại đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 1.11. Notification Priorities Table (Bảng độ ưu tiên thông báo)
```sql
CREATE TABLE notification_priorities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên độ ưu tiên',
    display_name VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị',
    level INT NOT NULL COMMENT 'Mức độ ưu tiên (1-4)',
    color VARCHAR(7) DEFAULT '#6B7280' COMMENT 'Màu hiển thị (hex)',
    description VARCHAR(255) COMMENT 'Mô tả độ ưu tiên',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Độ ưu tiên đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    INDEX idx_name (name),
    INDEX idx_level (level),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Users Table (Bảng người dùng)

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email đăng nhập',
    password VARCHAR(255) COMMENT 'Mật khẩu đã hash (null nếu dùng OAuth)',
    first_name VARCHAR(100) NOT NULL COMMENT 'Tên',
    last_name VARCHAR(100) NOT NULL COMMENT 'Họ',
    phone VARCHAR(20) COMMENT 'Số điện thoại',
    avatar_url VARCHAR(500) COMMENT 'URL ảnh đại diện',
    role_id BIGINT NOT NULL COMMENT 'ID vai trò người dùng',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Trạng thái hoạt động',
    email_verified BOOLEAN DEFAULT FALSE COMMENT 'Email đã xác thực',
    google_id VARCHAR(100) UNIQUE COMMENT 'Google OAuth ID',
    last_login_at TIMESTAMP NULL COMMENT 'Lần đăng nhập cuối',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    deleted_at TIMESTAMP NULL COMMENT 'Thời gian xóa (soft delete)',
    
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_email (email),
    INDEX idx_google_id (google_id),
    INDEX idx_role_id (role_id),
    INDEX idx_created_at (created_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    INDEX idx_deleted_at (deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3. Companies Table (Bảng công ty)

```sql
CREATE TABLE companies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Tên công ty',
    website VARCHAR(500) COMMENT 'Website công ty',
    industry VARCHAR(100) COMMENT 'Lĩnh vực hoạt động',
    size VARCHAR(50) COMMENT 'Quy mô công ty (STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE)',
    location VARCHAR(255) COMMENT 'Địa chỉ công ty',
    description TEXT COMMENT 'Mô tả công ty',
    logo_url VARCHAR(500) COMMENT 'URL logo công ty',
    is_verified BOOLEAN DEFAULT FALSE COMMENT 'Công ty đã xác thực',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    deleted_at TIMESTAMP NULL COMMENT 'Thời gian xóa (soft delete)',
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_name (name),
    INDEX idx_industry (industry),
    INDEX idx_size (size),
    INDEX idx_created_at (created_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    INDEX idx_deleted_at (deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 4. Jobs Table (Bảng công việc)

```sql
CREATE TABLE jobs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT 'ID người dùng sở hữu',
    company_id BIGINT NOT NULL COMMENT 'ID công ty',
    title VARCHAR(255) NOT NULL COMMENT 'Tiêu đề công việc',
    position VARCHAR(255) NOT NULL COMMENT 'Vị trí ứng tuyển',
    job_type_id BIGINT NOT NULL COMMENT 'ID loại công việc',
    location VARCHAR(255) COMMENT 'Địa điểm làm việc',
    salary_min DECIMAL(12,2) COMMENT 'Mức lương tối thiểu',
    salary_max DECIMAL(12,2) COMMENT 'Mức lương tối đa',
    currency VARCHAR(3) DEFAULT 'USD' COMMENT 'Đơn vị tiền tệ',
    status_id BIGINT NOT NULL COMMENT 'ID trạng thái ứng tuyển',
    application_date DATE COMMENT 'Ngày nộp đơn',
    deadline_date DATE COMMENT 'Hạn nộp đơn',
    interview_date DATE COMMENT 'Ngày phỏng vấn',
    offer_date DATE COMMENT 'Ngày nhận offer',
    job_description TEXT COMMENT 'Mô tả công việc',
    requirements TEXT COMMENT 'Yêu cầu công việc',
    benefits TEXT COMMENT 'Quyền lợi',
    job_url VARCHAR(500) COMMENT 'URL tin tuyển dụng',
    notes TEXT COMMENT 'Ghi chú cá nhân',
    priority_id BIGINT NOT NULL COMMENT 'ID độ ưu tiên',
    is_remote BOOLEAN DEFAULT FALSE COMMENT 'Làm việc từ xa',
    experience_level_id BIGINT COMMENT 'ID cấp độ kinh nghiệm',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    deleted_at TIMESTAMP NULL COMMENT 'Thời gian xóa (soft delete)',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE RESTRICT,
    FOREIGN KEY (job_type_id) REFERENCES job_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (status_id) REFERENCES job_statuses(id) ON DELETE RESTRICT,
    FOREIGN KEY (priority_id) REFERENCES priorities(id) ON DELETE RESTRICT,
    FOREIGN KEY (experience_level_id) REFERENCES experience_levels(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_company_id (company_id),
    INDEX idx_job_type_id (job_type_id),
    INDEX idx_status_id (status_id),
    INDEX idx_priority_id (priority_id),
    INDEX idx_experience_level_id (experience_level_id),
    INDEX idx_application_date (application_date),
    INDEX idx_deadline_date (deadline_date),
    INDEX idx_created_at (created_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    INDEX idx_deleted_at (deleted_at),
    
    INDEX idx_user_status (user_id, status_id),
    INDEX idx_user_created (user_id, created_at),
    INDEX idx_deadline_status (deadline_date, status_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 5. Skills Table (Bảng kỹ năng)

```sql
CREATE TABLE skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Tên kỹ năng',
    category VARCHAR(50) NOT NULL COMMENT 'Danh mục kỹ năng (PROGRAMMING, FRAMEWORK, DATABASE, TOOL, LANGUAGE, SOFT_SKILL, OTHER)',
    description TEXT COMMENT 'Mô tả kỹ năng',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Kỹ năng đang hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_is_active (is_active),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 6. Job Skills Table (Bảng kỹ năng công việc - Many-to-Many)

```sql
CREATE TABLE job_skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL COMMENT 'ID công việc',
    skill_id BIGINT NOT NULL COMMENT 'ID kỹ năng',
    is_required BOOLEAN DEFAULT TRUE COMMENT 'Kỹ năng bắt buộc',
    proficiency_level VARCHAR(50) COMMENT 'Mức độ thành thạo yêu cầu (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT 'Đã xóa (soft delete)',
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY uk_job_skill (job_id, skill_id),
    INDEX idx_job_id (job_id),
    INDEX idx_skill_id (skill_id),
    INDEX idx_created_by (created_by),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 7. User Skills Table (Bảng kỹ năng người dùng)

```sql
CREATE TABLE user_skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT 'ID người dùng',
    skill_id BIGINT NOT NULL COMMENT 'ID kỹ năng',
    proficiency_level VARCHAR(50) NOT NULL COMMENT 'Mức độ thành thạo (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)',
    years_of_experience DECIMAL(3,1) COMMENT 'Số năm kinh nghiệm',
    is_verified BOOLEAN DEFAULT FALSE COMMENT 'Kỹ năng đã xác thực',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT 'Đã xóa (soft delete)',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY uk_user_skill (user_id, skill_id),
    INDEX idx_user_id (user_id),
    INDEX idx_skill_id (skill_id),
    INDEX idx_proficiency (proficiency_level),
    INDEX idx_created_by (created_by),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 8. Interviews Table (Bảng phỏng vấn)

```sql
CREATE TABLE interviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL COMMENT 'ID công việc',
    round_number INT NOT NULL COMMENT 'Số vòng phỏng vấn',
    interview_type_id BIGINT NOT NULL COMMENT 'ID loại phỏng vấn',
    scheduled_date TIMESTAMP NOT NULL COMMENT 'Thời gian phỏng vấn dự kiến',
    actual_date TIMESTAMP NULL COMMENT 'Thời gian phỏng vấn thực tế',
    duration_minutes INT COMMENT 'Thời lượng phỏng vấn (phút)',
    interviewer_name VARCHAR(255) COMMENT 'Tên người phỏng vấn',
    interviewer_email VARCHAR(255) COMMENT 'Email người phỏng vấn',
    interviewer_position VARCHAR(255) COMMENT 'Vị trí người phỏng vấn',
    status_id BIGINT NOT NULL COMMENT 'ID trạng thái phỏng vấn',
    result_id BIGINT COMMENT 'ID kết quả phỏng vấn',
    feedback TEXT COMMENT 'Phản hồi từ nhà tuyển dụng',
    notes TEXT COMMENT 'Ghi chú cá nhân',
    questions_asked TEXT COMMENT 'Câu hỏi được hỏi',
    answers_given TEXT COMMENT 'Câu trả lời đã đưa ra',
    rating INT CHECK (rating >= 1 AND rating <= 5) COMMENT 'Đánh giá chất lượng phỏng vấn (1-5)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (interview_type_id) REFERENCES interview_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (status_id) REFERENCES interview_statuses(id) ON DELETE RESTRICT,
    FOREIGN KEY (result_id) REFERENCES interview_results(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_job_id (job_id),
    INDEX idx_interview_type_id (interview_type_id),
    INDEX idx_status_id (status_id),
    INDEX idx_result_id (result_id),
    INDEX idx_scheduled_date (scheduled_date),
    INDEX idx_created_at (created_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    
    INDEX idx_job_round (job_id, round_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 9. Job Resumes Table (Bảng liên kết CV với công việc)

```sql
CREATE TABLE job_resumes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL COMMENT 'ID công việc',
    resume_id BIGINT NOT NULL COMMENT 'ID CV',
    is_primary BOOLEAN DEFAULT TRUE COMMENT 'CV chính được sử dụng',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT 'Đã xóa (soft delete)',
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY uk_job_resume (job_id, resume_id),
    INDEX idx_job_id (job_id),
    INDEX idx_resume_id (resume_id),
    INDEX idx_created_by (created_by),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 10. Resumes Table (Bảng CV)

```sql
CREATE TABLE resumes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT 'ID người dùng sở hữu',
    name VARCHAR(255) NOT NULL COMMENT 'Tên file CV',
    original_filename VARCHAR(255) NOT NULL COMMENT 'Tên file gốc',
    file_path VARCHAR(500) NOT NULL COMMENT 'Đường dẫn file trên Dropbox',
    file_size BIGINT NOT NULL COMMENT 'Kích thước file (bytes)',
    file_type VARCHAR(100) NOT NULL COMMENT 'Loại file (pdf, doc, docx)',
    version VARCHAR(50) DEFAULT '1.0' COMMENT 'Phiên bản CV',
    is_default BOOLEAN DEFAULT FALSE COMMENT 'CV mặc định',
    description TEXT COMMENT 'Mô tả CV',
    tags JSON COMMENT 'Tags phân loại CV (JSON array)',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'CV đang hoạt động',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian upload',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    created_by BIGINT COMMENT 'Người tạo',
    updated_by BIGINT COMMENT 'Người cập nhật cuối',
    deleted_at TIMESTAMP NULL COMMENT 'Thời gian xóa (soft delete)',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_is_default (is_default),
    INDEX idx_is_active (is_active),
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    INDEX idx_deleted_at (deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 9. Job Resumes Table (Bảng liên kết CV với công việc)

```sql
CREATE TABLE job_resumes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL COMMENT 'ID công việc',
    resume_id BIGINT NOT NULL COMMENT 'ID CV',
    is_primary BOOLEAN DEFAULT TRUE COMMENT 'CV chính được sử dụng',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    
    UNIQUE KEY uk_job_resume (job_id, resume_id),
    INDEX idx_job_id (job_id),
    INDEX idx_resume_id (resume_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 10. Attachments Table (Bảng file đính kèm)

```sql
CREATE TABLE attachments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL COMMENT 'ID công việc',
    user_id BIGINT NOT NULL COMMENT 'ID người dùng upload',
    filename VARCHAR(255) NOT NULL COMMENT 'Tên file',
    original_filename VARCHAR(255) NOT NULL COMMENT 'Tên file gốc',
    file_path VARCHAR(500) NOT NULL COMMENT 'Đường dẫn file trên Dropbox',
    file_size BIGINT NOT NULL COMMENT 'Kích thước file (bytes)',
    file_type VARCHAR(100) NOT NULL COMMENT 'Loại file',
    attachment_type ENUM('JOB_DESCRIPTION', 'COVER_LETTER', 'CERTIFICATE', 'PORTFOLIO', 'OTHER') NOT NULL COMMENT 'Loại file đính kèm',
    description TEXT COMMENT 'Mô tả file',
    is_public BOOLEAN DEFAULT FALSE COMMENT 'File công khai',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian upload',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    deleted_at TIMESTAMP NULL COMMENT 'Thời gian xóa (soft delete)',
    
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_job_id (job_id),
    INDEX idx_user_id (user_id),
    INDEX idx_attachment_type (attachment_type),
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_deleted_at (deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 11. Notifications Table (Bảng thông báo)

```sql
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT 'ID người dùng nhận thông báo',
    job_id BIGINT NULL COMMENT 'ID công việc liên quan (nullable)',
    type_id BIGINT NOT NULL COMMENT 'ID loại thông báo',
    title VARCHAR(255) NOT NULL COMMENT 'Tiêu đề thông báo',
    message TEXT NOT NULL COMMENT 'Nội dung thông báo',
    is_read BOOLEAN DEFAULT FALSE COMMENT 'Đã đọc chưa',
    is_sent BOOLEAN DEFAULT FALSE COMMENT 'Đã gửi chưa',
    sent_at TIMESTAMP NULL COMMENT 'Thời gian gửi',
    scheduled_at TIMESTAMP NULL COMMENT 'Thời gian lên lịch gửi',
    priority_id BIGINT NOT NULL COMMENT 'ID độ ưu tiên',
    metadata JSON COMMENT 'Dữ liệu bổ sung (JSON)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL,
    FOREIGN KEY (type_id) REFERENCES notification_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (priority_id) REFERENCES notification_priorities(id) ON DELETE RESTRICT,
    
    INDEX idx_user_id (user_id),
    INDEX idx_job_id (job_id),
    INDEX idx_type_id (type_id),
    INDEX idx_priority_id (priority_id),
    INDEX idx_is_read (is_read),
    INDEX idx_is_sent (is_sent),
    INDEX idx_scheduled_at (scheduled_at),
    INDEX idx_created_at (created_at),
    
    INDEX idx_user_unread (user_id, is_read),
    INDEX idx_scheduled_unsent (scheduled_at, is_sent)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 12. User Sessions Table (Bảng phiên đăng nhập)

```sql
CREATE TABLE user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT 'ID người dùng',
    session_token VARCHAR(500) NOT NULL UNIQUE COMMENT 'Token phiên đăng nhập',
    refresh_token VARCHAR(500) NOT NULL UNIQUE COMMENT 'Refresh token',
    device_info JSON COMMENT 'Thông tin thiết bị (JSON)',
    ip_address VARCHAR(45) COMMENT 'Địa chỉ IP',
    user_agent TEXT COMMENT 'User agent string',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Phiên đang hoạt động',
    expires_at TIMESTAMP NOT NULL COMMENT 'Thời gian hết hạn',
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Lần sử dụng cuối',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời gian cập nhật',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_refresh_token (refresh_token),
    INDEX idx_is_active (is_active),
    INDEX idx_expires_at (expires_at),
    INDEX idx_last_used_at (last_used_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 13. Audit Logs Table (Bảng log audit)

```sql
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NULL COMMENT 'ID người dùng thực hiện (nullable cho system actions)',
    entity_type VARCHAR(100) NOT NULL COMMENT 'Loại entity (User, Job, Company, etc.)',
    entity_id BIGINT NOT NULL COMMENT 'ID của entity',
    action VARCHAR(50) NOT NULL COMMENT 'Hành động thực hiện (CREATE, UPDATE, DELETE, LOGIN, LOGOUT, UPLOAD, DOWNLOAD)',
    old_values JSON COMMENT 'Giá trị cũ (JSON)',
    new_values JSON COMMENT 'Giá trị mới (JSON)',
    ip_address VARCHAR(45) COMMENT 'Địa chỉ IP',
    user_agent TEXT COMMENT 'User agent string',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_entity_type (entity_type),
    INDEX idx_entity_id (entity_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    
    INDEX idx_entity_action (entity_type, entity_id, action),
    INDEX idx_user_action (user_id, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 🔍 Indexes Strategy

### Primary Indexes
- **Primary Keys**: Tất cả bảng đều có auto-increment primary key
- **Foreign Keys**: Index cho tất cả foreign key constraints
- **Unique Constraints**: Email, Google ID, session tokens

### Performance Indexes
- **Composite Indexes**: Cho các truy vấn phức tạp
- **Date Indexes**: Cho filtering và sorting theo thời gian
- **Status Indexes**: Cho filtering theo trạng thái
- **Search Indexes**: Cho full-text search

### Query Optimization Indexes
```sql
-- Job queries optimization
CREATE INDEX idx_jobs_user_status_date ON jobs(user_id, status, created_at);
CREATE INDEX idx_jobs_deadline_status ON jobs(deadline_date, status);

-- Interview queries optimization  
CREATE INDEX idx_interviews_job_round ON interviews(job_id, round_number);
CREATE INDEX idx_interviews_scheduled_status ON interviews(scheduled_date, status);

-- Notification queries optimization
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_scheduled_unsent ON notifications(scheduled_at, is_sent);
```

## 🔄 Database Relationships

### Entity Relationship Diagram
```
Users (1) ──── (N) Jobs
Users (1) ──── (N) Resumes  
Users (1) ──── (N) User_Skills
Users (1) ──── (N) Notifications
Users (1) ──── (N) User_Sessions
Users (1) ──── (N) Audit_Logs

Companies (1) ──── (N) Jobs

Jobs (1) ──── (N) Job_Skills
Jobs (1) ──── (N) Interviews
Jobs (1) ──── (N) Job_Resumes
Jobs (1) ──── (N) Attachments
Jobs (1) ──── (N) Notifications

Skills (1) ──── (N) Job_Skills
Skills (1) ──── (N) User_Skills

Resumes (1) ──── (N) Job_Resumes
```

## 📊 Sample Data

### Initial Lookup Data

#### Roles Data
```sql
INSERT INTO roles (name, description) VALUES
('USER', 'Regular user with basic permissions'),
('ADMIN', 'Administrator with full system access'),
('MODERATOR', 'Moderator with limited admin permissions');
```

#### Permissions Data
```sql
INSERT INTO permissions (name, resource, action, description) VALUES
('USER_READ', 'USER', 'READ', 'Read user information'),
('USER_CREATE', 'USER', 'CREATE', 'Create new users'),
('USER_UPDATE', 'USER', 'UPDATE', 'Update user information'),
('USER_DELETE', 'USER', 'DELETE', 'Delete users'),
('JOB_READ', 'JOB', 'READ', 'Read job information'),
('JOB_CREATE', 'JOB', 'CREATE', 'Create new jobs'),
('JOB_UPDATE', 'JOB', 'UPDATE', 'Update job information'),
('JOB_DELETE', 'JOB', 'DELETE', 'Delete jobs'),
('COMPANY_READ', 'COMPANY', 'READ', 'Read company information'),
('COMPANY_CREATE', 'COMPANY', 'CREATE', 'Create new companies'),
('COMPANY_UPDATE', 'COMPANY', 'UPDATE', 'Update company information'),
('COMPANY_DELETE', 'COMPANY', 'DELETE', 'Delete companies');
```

#### Job Statuses Data
```sql
INSERT INTO job_statuses (name, display_name, description, color, sort_order) VALUES
('SAVED', 'Saved', 'Job saved but not yet applied', '#6B7280', 1),
('APPLIED', 'Applied', 'Application submitted', '#3B82F6', 2),
('INTERVIEW', 'Interview', 'Interview scheduled or in progress', '#F59E0B', 3),
('OFFER', 'Offer', 'Job offer received', '#10B981', 4),
('REJECTED', 'Rejected', 'Application rejected', '#EF4444', 5),
('WITHDRAWN', 'Withdrawn', 'Application withdrawn', '#8B5CF6', 6),
('ACCEPTED', 'Accepted', 'Job offer accepted', '#059669', 7);
```

#### Job Types Data
```sql
INSERT INTO job_types (name, display_name, description) VALUES
('FULL_TIME', 'Full Time', 'Full-time employment'),
('PART_TIME', 'Part Time', 'Part-time employment'),
('CONTRACT', 'Contract', 'Contract-based work'),
('INTERNSHIP', 'Internship', 'Internship position'),
('FREELANCE', 'Freelance', 'Freelance work');
```

#### Priorities Data
```sql
INSERT INTO priorities (name, display_name, level, color, description) VALUES
('LOW', 'Low', 1, '#6B7280', 'Low priority'),
('MEDIUM', 'Medium', 2, '#3B82F6', 'Medium priority'),
('HIGH', 'High', 3, '#F59E0B', 'High priority'),
('URGENT', 'Urgent', 4, '#EF4444', 'Urgent priority');
```

#### Experience Levels Data
```sql
INSERT INTO experience_levels (name, display_name, min_years, max_years, description) VALUES
('ENTRY', 'Entry Level', 0, 1, 'Entry level position'),
('JUNIOR', 'Junior', 1, 3, 'Junior level position'),
('MID', 'Mid Level', 3, 5, 'Mid level position'),
('SENIOR', 'Senior', 5, 8, 'Senior level position'),
('LEAD', 'Lead', 8, 12, 'Lead level position'),
('PRINCIPAL', 'Principal', 12, NULL, 'Principal level position');
```

#### Interview Types Data
```sql
INSERT INTO interview_types (name, display_name, description) VALUES
('PHONE', 'Phone Interview', 'Phone-based interview'),
('VIDEO', 'Video Interview', 'Video call interview'),
('IN_PERSON', 'In-Person Interview', 'Face-to-face interview'),
('TECHNICAL', 'Technical Interview', 'Technical skills assessment'),
('HR', 'HR Interview', 'Human resources interview'),
('FINAL', 'Final Interview', 'Final round interview');
```

#### Interview Statuses Data
```sql
INSERT INTO interview_statuses (name, display_name, description, color) VALUES
('SCHEDULED', 'Scheduled', 'Interview scheduled', '#3B82F6'),
('COMPLETED', 'Completed', 'Interview completed', '#10B981'),
('CANCELLED', 'Cancelled', 'Interview cancelled', '#EF4444'),
('RESCHEDULED', 'Rescheduled', 'Interview rescheduled', '#F59E0B');
```

#### Interview Results Data
```sql
INSERT INTO interview_results (name, display_name, description, color) VALUES
('PASSED', 'Passed', 'Interview passed', '#10B981'),
('FAILED', 'Failed', 'Interview failed', '#EF4444'),
('PENDING', 'Pending', 'Result pending', '#6B7280');
```

#### Notification Types Data
```sql
INSERT INTO notification_types (name, display_name, description, template) VALUES
('DEADLINE_REMINDER', 'Deadline Reminder', 'Reminder for job application deadline', 'Your job application for {job_title} at {company_name} is due in {days} days.'),
('INTERVIEW_REMINDER', 'Interview Reminder', 'Reminder for upcoming interview', 'You have an interview for {job_title} at {company_name} in {hours} hours.'),
('STATUS_UPDATE', 'Status Update', 'Job status update notification', 'Your application status for {job_title} at {company_name} has been updated to {status}.'),
('SYSTEM', 'System Notification', 'System-generated notification', '{message}'),
('EMAIL_SENT', 'Email Sent', 'Email notification sent', 'Email notification has been sent successfully.');
```

#### Notification Priorities Data
```sql
INSERT INTO notification_priorities (name, display_name, level, color, description) VALUES
('LOW', 'Low', 1, '#6B7280', 'Low priority notification'),
('MEDIUM', 'Medium', 2, '#3B82F6', 'Medium priority notification'),
('HIGH', 'High', 3, '#F59E0B', 'High priority notification'),
('URGENT', 'Urgent', 4, '#EF4444', 'Urgent priority notification');
```

### Initial Skills Data
```sql
INSERT INTO skills (name, category, created_by) VALUES
('Java', 'PROGRAMMING', 1),
('Spring Boot', 'FRAMEWORK', 1),
('React', 'FRAMEWORK', 1),
('TypeScript', 'PROGRAMMING', 1),
('MySQL', 'DATABASE', 1),
('Docker', 'TOOL', 1),
('Git', 'TOOL', 1),
('English', 'LANGUAGE', 1),
('Communication', 'SOFT_SKILL', 1),
('Problem Solving', 'SOFT_SKILL', 1);
```

### Sample Company Data
```sql
INSERT INTO companies (name, website, industry, size, location, created_by) VALUES
('Google', 'https://google.com', 'Technology', 'LARGE', 'Mountain View, CA', 1),
('Microsoft', 'https://microsoft.com', 'Technology', 'LARGE', 'Redmond, WA', 1),
('Amazon', 'https://amazon.com', 'E-commerce', 'LARGE', 'Seattle, WA', 1),
('Netflix', 'https://netflix.com', 'Entertainment', 'LARGE', 'Los Gatos, CA', 1),
('Spotify', 'https://spotify.com', 'Music', 'MEDIUM', 'Stockholm, Sweden', 1);
```

## 🚀 Database Migration Strategy

### Version Control
- **Liquibase**: Database migration tool với XML/JSON/YAML support
- **Change Sets**: Atomic database changes
- **Rollback Support**: Automatic rollback capabilities
- **Context Support**: Environment-specific changes

### Migration Files Structure
```
src/main/resources/db/changelog/
├── db.changelog-master.xml
├── changesets/
│   ├── 001-create-lookup-tables.xml
│   ├── 002-create-users-table.xml
│   ├── 003-create-companies-table.xml
│   ├── 004-create-jobs-table.xml
│   ├── 005-create-skills-table.xml
│   ├── 006-create-relationships.xml
│   ├── 007-create-interviews-table.xml
│   ├── 008-create-resumes-table.xml
│   ├── 009-create-attachments-table.xml
│   ├── 010-create-notifications-table.xml
│   ├── 011-create-sessions-table.xml
│   ├── 012-create-audit-logs-table.xml
│   └── 013-insert-initial-data.xml
└── rollback/
    ├── rollback-001.xml
    └── rollback-002.xml
```

## 🔧 Database Configuration

### Application Properties
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jobtracker?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: ${DB_USERNAME:jobtracker}
    password: ${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
        use_sql_comments: true
        jdbc:
          batch_size: 25
        order_inserts: true
        order_updates: true
        batch_versioned_data: true
  
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db.changelog-master.xml
    contexts: default
```

## 📈 Performance Monitoring

### Query Performance
- **Slow Query Log**: MySQL slow query logging
- **EXPLAIN**: Query execution plan analysis
- **Index Usage**: Monitor index effectiveness
- **Connection Pool**: HikariCP metrics

### Database Metrics
- **Connection Count**: Active/idle connections
- **Query Execution Time**: Average response time
- **Lock Wait Time**: Deadlock detection
- **Buffer Pool Hit Rate**: Cache efficiency

## 🔒 Security Considerations

### Data Protection
- **Encryption at Rest**: MySQL encryption
- **Encryption in Transit**: SSL/TLS connections
- **Password Hashing**: BCrypt with salt
- **SQL Injection Prevention**: JPA/Hibernate parameterized queries

### Access Control
- **Database User**: Limited privileges
- **Connection Security**: IP whitelisting
- **Audit Logging**: All database changes tracked
- **Backup Encryption**: Encrypted backups

## 📊 Audit Strategy Summary

### ✅ **FULL AUDIT FIELDS** (created_by, updated_by, created_at, updated_at):
- **All Lookup Tables** (11 bảng): roles, permissions, job_statuses, job_types, priorities, experience_levels, interview_types, interview_statuses, interview_results, notification_types, notification_priorities
- **Core Business Entities**: users, companies, jobs, skills, interviews, resumes, attachments

### ⚠️ **PARTIAL AUDIT FIELDS** (created_by, created_at, updated_at):
- **Junction Tables**: user_skills, job_skills, job_resumes
- **Lý do**: Junction tables ít khi update, không cần track updated_by

### 🔧 **SYSTEM TABLES** (created_at, updated_at only):
- **System Generated**: notifications, user_sessions, audit_logs
- **Lý do**: System generated, không cần user tracking

### 🗑️ **SOFT DELETE STRATEGY**:

#### **deleted_at (TIMESTAMP)** - Business Entities:
- users, companies, jobs, skills, interviews, resumes, attachments
- **Lý do**: Cần biết chính xác khi nào bị xóa cho compliance và reporting

#### **is_deleted (BOOLEAN)** - Junction Tables:
- user_skills, job_skills, job_resumes
- **Lý do**: Đơn giản, performance tốt hơn, ít khi cần timestamp

#### **No Soft Delete** - System Tables:
- notifications, user_sessions, audit_logs
- **Lý do**: Có thể xóa hard, không cần soft delete overhead

### 📈 **PERFORMANCE OPTIMIZATIONS**:
- **Junction tables** dùng `is_deleted` để tránh NULL checks
- **Business entities** dùng `deleted_at` để có timestamp
- **System tables** không cần soft delete để tránh overhead
- **Proper indexing** cho tất cả audit fields

### 🔒 **COMPLIANCE BENEFITS**:
- **Complete audit trail** cho user actions
- **Data lineage tracking** cho business entities
- **Regulatory compliance** (GDPR, SOX, etc.)
- **Forensic analysis** capabilities
