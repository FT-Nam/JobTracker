# 🎯 JobTracker - Personal Job Application Management System

## 📋 Tổng quan dự án

JobTracker là một hệ thống quản lý quá trình ứng tuyển việc làm cá nhân, giúp người dùng theo dõi, quản lý và phân tích hiệu quả quá trình tìm kiếm việc làm của mình.

### 🎯 Mục tiêu chính
- **Quản lý ứng tuyển**: Lưu trữ và theo dõi các công việc đã ứng tuyển
- **Ghi chú phỏng vấn**: Ghi lại chi tiết từng vòng phỏng vấn
- **Nhắc nhở thông minh**: Gửi email reminder trước deadline
- **Phân tích hiệu quả**: Thống kê tỷ lệ apply → interview → offer
- **Quản lý CV**: Lưu trữ nhiều phiên bản CV khác nhau

### 🏗️ Kiến trúc hệ thống
- **Pattern**: Monolithic Architecture với modular design
- **Backend**: Spring Boot 3 + Java 21
- **Frontend**: React 18 + JavaScript + Create React App
- **Database**: MySQL 8.0
- **Authentication**: OAuth2 Resource Server + OAuth2 Client (Google)
- **File Storage**: Dropbox API
- **Deployment**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/jobtracker.git
cd jobtracker

# Start with Docker Compose
docker-compose up -d

# Or run locally
# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm install
npm start
```

## 📚 Documentation

- [API Documentation](./docs/API.md) - Chi tiết các API endpoints
- [Database Schema](./docs/DATABASE.md) - Thiết kế database
- [Architecture Guide](./docs/ARCHITECTURE.md) - Kiến trúc hệ thống
- [Deployment Guide](./docs/DEPLOYMENT.md) - Hướng dẫn deploy

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2+
- **Language**: Java 21
- **ORM**: Spring Data JPA + Hibernate 6
- **Database**: MySQL 8.0
- **Security**: Spring Security 6 + OAuth2 Resource Server
- **Validation**: Jakarta Validation
- **Mail**: Spring Mail + Thymeleaf
- **File Storage**: Dropbox API
- **Scheduling**: Spring @Scheduled
- **WebSocket**: Spring WebSocket + STOMP
- **Documentation**: SpringDoc OpenAPI 3

### Frontend
- **Framework**: React 18 + JavaScript
- **Build Tool**: Create React App (CRA)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **UI Library**: TailwindCSS + shadcn/ui
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Toastify

### DevOps & Tools
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: SonarQube
- **Monitoring**: Spring Boot Actuator
- **Logging**: SLF4J + Logback

## 📊 Features

### 🔐 Authentication & Authorization
- [x] User registration/login
- [x] Google OAuth2 login
- [x] OAuth2 token authentication
- [x] Password reset via email
- [x] Profile management

### 💼 Job Management
- [x] CRUD operations for jobs
- [x] Job status tracking
- [x] Skills tagging
- [x] Company information
- [x] Interview notes
- [x] File attachments (CV, JD)

### 📈 Analytics & Dashboard
- [x] Job statistics
- [x] Success rate analysis
- [x] Timeline visualization
- [x] Skills analysis
- [x] Company performance

### 🔔 Notifications
- [x] Email reminders
- [x] Real-time notifications
- [x] Deadline alerts
- [x] Interview reminders

### 📄 Resume Management
- [x] Multiple CV versions
- [x] CV-job association
- [x] File upload/download
- [x] Version control

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Your Name]
- **DevOps Engineer**: [Your Name]

## 📞 Support

For support, email support@jobtracker.com or join our Slack channel.

---

Made with ❤️ by the JobTracker Team
