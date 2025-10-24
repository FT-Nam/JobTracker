# 🏗️ JobTracker Architecture Guide

## 📋 Tổng quan kiến trúc

JobTracker sử dụng kiến trúc **Monolithic** với thiết kế modular, đảm bảo tính đơn giản trong phát triển và triển khai ban đầu, đồng thời có thể dễ dàng tách thành microservices trong tương lai.

## 🎯 Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + JavaScript)            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Auth      │ │   Jobs      │ │ Dashboard   │           │
│  │   Module    │ │   Module    │ │   Module    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              │ WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (Spring Boot 3)                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Security   │ │   Business  │ │   Data      │           │
│  │   Layer     │ │   Logic     │ │   Access    │           │
│  │             │ │   Layer     │ │   Layer     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ JPA/Hibernate
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (MySQL 8.0)                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Users     │ │    Jobs     │ │   Files     │           │
│  │   Tables    │ │   Tables    │ │   Tables    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Công nghệ chi tiết

### Backend Stack

#### Core Framework
- **Spring Boot 3.2+**: Framework chính, hỗ trợ Java 21
- **Java 21**: LTS version với Virtual Threads, Pattern Matching
- **Spring Framework 6**: Dependency injection, AOP, MVC

#### Data Layer
- **Spring Data JPA**: ORM abstraction layer
- **Hibernate 6**: JPA implementation với performance improvements
- **MySQL 8.0**: Primary database với JSON support
- **HikariCP**: Connection pooling (default trong Spring Boot 3)

#### Security
- **Spring Security 6**: Authentication & Authorization
- **OAuth2 Resource Server**: JWT token validation from Authorization Server
- **OAuth2 Client**: Google login integration
- **BCrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

#### Validation & Processing
- **Jakarta Validation**: Bean validation (JSR-380)
- **Hibernate Validator**: Validation implementation
- **MapStruct**: Entity ↔ DTO mapping
- **Jackson**: JSON serialization/deserialization

#### Communication
- **Spring Web**: REST API endpoints
- **Spring WebSocket**: Real-time notifications
- **STOMP**: WebSocket sub-protocol
- **Spring Mail**: Email notifications
- **Thymeleaf**: Email templates

#### External Integrations
- **Dropbox API**: File storage service
- **Google OAuth2**: Social login
- **SMTP**: Email delivery

#### Scheduling & Events
- **Spring @Scheduled**: Cron jobs cho reminders
- **ApplicationEventPublisher**: Event-driven architecture
- **@Async**: Asynchronous processing

#### Documentation & Monitoring
- **SpringDoc OpenAPI 3**: API documentation
- **Spring Boot Actuator**: Health checks, metrics
- **SLF4J + Logback**: Logging framework
- **Micrometer**: Application metrics

### Frontend Stack

#### Core Framework
- **React 18**: UI library với Concurrent Features
- **JavaScript ES6+**: Modern JavaScript features
- **Create React App (CRA)**: Build tool và development server
- **Webpack**: Module bundler (built-in CRA)

#### State Management
- **Redux Toolkit**: Predictable state container
- **RTK Query**: Data fetching và caching
- **React Redux**: React bindings

#### Routing & Navigation
- **React Router v6**: Client-side routing
- **React Router DOM**: Browser routing
- **Lazy Loading**: Code splitting cho performance

#### UI & Styling
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **Yup**: Schema validation

#### Data & Communication
- **Axios**: HTTP client với interceptors
- **React Query**: Server state management
- **WebSocket**: Real-time communication
- **React Toastify**: Toast notifications

#### Charts & Visualization
- **Recharts**: Chart library
- **React Quill**: Rich text editor
- **React Dropzone**: File upload
- **dayjs**: Date manipulation

### Database Design

#### Primary Database: MySQL 8.0
- **ACID Compliance**: Transactional integrity
- **JSON Support**: Flexible data storage
- **Full-text Search**: Advanced search capabilities
- **Indexing**: Performance optimization
- **Replication**: High availability

#### Connection Management
- **HikariCP**: High-performance connection pool
- **Connection Pool Size**: 10-20 connections
- **Timeout Configuration**: 30s connection timeout
- **Health Checks**: Connection validation

### External Services

#### File Storage: Dropbox API
- **REST API**: File upload/download
- **OAuth2**: Secure authentication
- **Webhooks**: File change notifications
- **Sharing Links**: Public file access

#### Email Service: SMTP
- **Spring Mail**: Email abstraction
- **Thymeleaf**: HTML email templates
- **Async Processing**: Non-blocking email sending
- **Retry Logic**: Failed email handling

#### Authentication: Google OAuth2
- **OAuth2 Client**: Social login
- **User Profile**: Google account integration
- **Token Management**: Access/refresh tokens

## 🏛️ Kiến trúc Backend (Monolithic)

### Package Structure
```
com.jobtracker
├── config/                 # Configuration classes
│   ├── SecurityConfig.java
│   ├── WebConfig.java
│   ├── DatabaseConfig.java
│   └── WebSocketConfig.java
├── controller/             # REST Controllers
│   ├── AuthController.java
│   ├── JobController.java
│   ├── UserController.java
│   └── FileController.java
├── dto/                    # Data Transfer Objects
│   ├── request/           # Request DTOs
│   └── response/          # Response DTOs
├── entity/                 # JPA Entities
│   ├── User.java
│   ├── Job.java
│   ├── Company.java
│   └── Resume.java
├── repository/             # Data Access Layer
│   ├── UserRepository.java
│   ├── JobRepository.java
│   └── CompanyRepository.java
├── service/                # Business Logic Layer
│   ├── AuthService.java
│   ├── JobService.java
│   ├── UserService.java
│   └── NotificationService.java
├── security/               # Security Components
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
├── event/                  # Event Handling
│   ├── JobDeadlineEvent.java
│   └── EventListener.java
├── scheduler/              # Scheduled Tasks
│   └── ReminderScheduler.java
├── exception/              # Exception Handling
│   ├── GlobalExceptionHandler.java
│   └── BusinessException.java
├── util/                   # Utility Classes
│   ├── DateUtils.java
│   └── ValidationUtils.java
└── JobTrackerApplication.java
```

### Layer Responsibilities

#### 1. Controller Layer
- **REST API endpoints**
- **Request/Response mapping**
- **Input validation**
- **Error handling**
- **Authentication checks**

#### 2. Service Layer
- **Business logic implementation**
- **Transaction management**
- **External service integration**
- **Event publishing**
- **Data transformation**

#### 3. Repository Layer
- **Data access abstraction**
- **Custom queries**
- **Pagination support**
- **Specification pattern**

#### 4. Entity Layer
- **Database mapping**
- **Relationships definition**
- **Validation constraints**
- **Audit fields**

## 🔄 Data Flow

### 1. Authentication Flow
```
User Login → OAuth2 Authorization Server → JWT Token → Resource Server Validation
                ↓
User Info ← OAuth2UserService ← Token Validation ← JWT Claims
```

### 2. Job Management Flow
```
Create Job → JobController → JobService → JobRepository → Database
                ↓
Event Publishing → NotificationService → Email/WebSocket
```

### 3. File Upload Flow
```
Upload File → FileController → DropboxService → Dropbox API
                ↓
File URL ← Database Update ← File Metadata
```

## 🚀 Performance Considerations

### Database Optimization
- **Indexing Strategy**: Primary keys, foreign keys, search fields
- **Query Optimization**: N+1 problem prevention
- **Connection Pooling**: HikariCP configuration
- **Caching**: Spring Cache với Redis (future)

### Application Performance
- **Lazy Loading**: JPA relationships
- **Pagination**: Large dataset handling
- **Async Processing**: Email, file upload
- **Connection Pooling**: Database connections

### Frontend Performance
- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component lazy loading
- **Memoization**: React.memo, useMemo
- **Bundle Optimization**: CRA build optimization

## 🔒 Security Architecture

### Authentication
- **JWT Tokens**: Stateless authentication
- **Refresh Tokens**: Token renewal
- **OAuth2**: Social login integration
- **Password Hashing**: BCrypt

### Authorization
- **Role-based Access**: USER, ADMIN roles
- **Method-level Security**: @PreAuthorize
- **Resource-level Security**: User data isolation

### Data Protection
- **Input Validation**: Jakarta Validation
- **SQL Injection Prevention**: JPA/Hibernate
- **XSS Protection**: Input sanitization
- **CORS Configuration**: Cross-origin security

## 📊 Monitoring & Observability

### Application Metrics
- **Spring Boot Actuator**: Health checks, metrics
- **Micrometer**: Application metrics
- **Custom Metrics**: Business metrics

### Logging Strategy
- **Structured Logging**: JSON format
- **Log Levels**: DEBUG, INFO, WARN, ERROR
- **Correlation IDs**: Request tracing
- **Audit Logging**: User actions

### Error Handling
- **Global Exception Handler**: Centralized error handling
- **Custom Exceptions**: Business-specific errors
- **Error Response Format**: Consistent error format
- **Error Monitoring**: Exception tracking

## 🔄 Deployment Architecture

### Development Environment
```
Developer Machine → Local MySQL → Spring Boot App → React Dev Server
```

### Production Environment
```
Load Balancer → Spring Boot App → MySQL Cluster → External Services
```

### Docker Architecture
```
Docker Compose:
├── jobtracker-app (Spring Boot)
├── jobtracker-frontend (React + CRA)
├── mysql-db (MySQL 8.0)
├── redis-cache (Redis - future)
└── nginx-proxy (Reverse Proxy)
```

## 🎯 Scalability Considerations

### Horizontal Scaling
- **Stateless Design**: JWT-based authentication
- **Database Connection Pooling**: HikariCP
- **Load Balancer Ready**: Multiple app instances

### Vertical Scaling
- **Memory Optimization**: JVM tuning
- **Database Optimization**: Query optimization
- **Caching Strategy**: Application-level caching

### Future Microservices Migration
- **Modular Design**: Clear service boundaries
- **Event-driven Architecture**: Loose coupling
- **API Gateway Ready**: RESTful APIs
- **Database Per Service**: Service isolation

## 📈 Monitoring & Alerting

### Application Health
- **Health Endpoints**: /actuator/health
- **Metrics Endpoints**: /actuator/metrics
- **Custom Health Checks**: Database, external services

### Business Metrics
- **User Registration Rate**: Daily active users
- **Job Creation Rate**: Jobs per day
- **Email Delivery Rate**: Notification success
- **API Response Time**: Performance metrics

### Error Tracking
- **Exception Monitoring**: Error rates
- **Failed Authentication**: Security monitoring
- **Database Errors**: Data integrity
- **External Service Failures**: Integration monitoring
