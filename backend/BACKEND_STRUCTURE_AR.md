# تقسيمة Backend لمشروع DevHub

هذه هي التقسيمة التي سنمشي عليها تدريجيًا. لا تنشئ كل الملفات مرة واحدة؛ ننشئ الملف وقت الحاجة فقط.

## خريطة مشروع DevHub بالكامل

المشروع عندك عبارة عن Frontend وBackend وقاعدة بيانات منفصلة:

```text
devHub/                              جذر المشروع
├── devHub/                          Frontend الذي يراه المستخدم
│   ├── index.html                   الصفحة الرئيسية
│   ├── pages/
│   │   ├── login.html               صفحة تسجيل الدخول
│   │   └── register.html            صفحة إنشاء حساب
│   ├── assets/
│   │   ├── css/
│   │   │   ├── variable.css         المتغيرات والألوان
│   │   │   ├── layout.css            تخطيط الصفحات
│   │   │   ├── components.css        الأزرار والكروت والمكونات
│   │   │   ├── auth.css              تنسيق Login وRegister
│   │   │   └── main.css              التنسيقات العامة
│   │   ├── js/
│   │   │   ├── main.js               سلوك الواجهة العام
│   │   │   └── auth.js               سلوك Login وRegister
│   │   └── images/                   الصور
│   └── PROJECT_REVIEW_AND_FIX_PROMPT.md
│
├── backend/                          Backend وSpring Boot
│   ├── pom.xml                       Dependencies وإعداد Maven
│   ├── mvnw                          تشغيل Maven على Linux/macOS
│   ├── mvnw.cmd                      تشغيل Maven على Windows
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/devhub/backend/
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties  إعداد PostgreSQL وSpring
│   │   └── test/                      اختبارات Backend
│   ├── data/                          ملفات H2 قديمة
│   ├── target/                        ملفات Maven مولدة تلقائيًا
│   ├── HELP.md                        ملاحظات Spring Initializr
│   └── BACKEND_STRUCTURE_AR.md        هذا الدليل
│
└── PostgreSQL                          Database تعمل خارج ملفات المشروع
    └── devhub                          اسم قاعدة البيانات الحالية
```

> ملاحظة: `PostgreSQL` ليست Folder داخل المشروع. هي Service تعمل على الجهاز في Port `5432`.

## رحلة البيانات داخل المشروع

```text
المستخدم
   ↓
صفحة HTML في Frontend
   ↓
JavaScript و fetch()
   ↓  HTTP Request إلى localhost:8081
Spring Boot Backend
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓  JDBC إلى localhost:5432
PostgreSQL Database: devhub
```

والرد يرجع في الاتجاه العكسي حتى يظهر للمستخدم في الصفحة.

## الشكل المستهدف بعد إضافة Features

```text
backend/src/main/java/com/devhub/backend/
├── BackendApplication.java
├── config/                            إعدادات مشتركة عند الحاجة
├── common/                            كود مشترك بين Features
│   ├── exception/
│   └── response/
├── user/                              كل ما يخص المستخدم
│   ├── User.java
│   ├── UserRepository.java
│   ├── UserService.java
│   ├── UserController.java
│   └── dto/
├── auth/                              التسجيل وتسجيل الدخول
│   ├── AuthController.java
│   ├── AuthService.java
│   └── dto/
├── task/                              المهام
│   ├── Task.java
│   ├── TaskRepository.java
│   ├── TaskService.java
│   ├── TaskController.java
│   └── dto/
└── comment/                           التعليقات لاحقًا
    ├── Comment.java
    ├── CommentRepository.java
    ├── CommentService.java
    ├── CommentController.java
    └── dto/
```

كل Feature مستقلة، لذلك إضافة `task` لا تجعل `user` أو `auth` ملفًا ضخمًا.

## الشكل المستهدف

```text
backend/
├── pom.xml
├── mvnw
├── src/
│   ├── main/
│   │   ├── java/com/devhub/backend/
│   │   │   ├── BackendApplication.java
│   │   │   ├── config/
│   │   │   ├── common/
│   │   │   │   ├── exception/
│   │   │   │   └── response/
│   │   │   ├── user/
│   │   │   │   ├── User.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── dto/
│   │   │   └── auth/
│   │   │       ├── AuthController.java
│   │   │       ├── AuthService.java
│   │   │       └── dto/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/devhub/backend/
└── target/
```

## وظيفة كل جزء

## لماذا هذه التقسيمة قابلة للتوسيع؟

نستخدم تقسيمة **Feature-based**: كل جزء من المنتج يعيش في مجلد مستقل.

```text
user/
task/
comment/
notification/
```

كل Feature تحتوي طبقاتها الداخلية:

```text
task/
├── Task.java
├── TaskRepository.java
├── TaskService.java
├── TaskController.java
└── dto/
```

بهذا الشكل، إضافة نظام Tasks لا تحتاج وضع كوده داخل `user/` أو داخل Controller ضخم.
وإذا كبر المشروع، يمكن تحسين Feature واحدة أو تقسيمها بدون إعادة بناء المشروع كله.

القابلية للتوسيع تعتمد على حدود واضحة بين المسؤوليات، وليس على كثرة الملفات.
لذلك لن ننشئ مجلدات أو Interfaces فارغة لمجرد أن شكلها احترافي.

### `BackendApplication.java`

نقطة تشغيل Spring Boot فقط. لا نضع فيه منطق المستخدمين أو التسجيل.

### `config/`

إعدادات عامة للتطبيق، مثل CORS أو إعدادات Security لاحقًا.

لا نستخدمه الآن إلا عندما نحتاج إعدادًا فعليًا.

### `common/`

أشياء مشتركة بين أكثر من Feature.

#### `common/exception/`

التعامل المنظم مع الأخطاء، مثل User غير موجود أو Email مستخدم بالفعل.

#### `common/response/`

شكل Responses المشتركة إذا احتجنا توحيدها لاحقًا.

### `user/`

كل ما يخص المستخدمين. وضع Feature كاملة في مكان واحد يجعل المشروع أسهل في القراءة والتوسع.

#### `User.java`

Entity تمثل جدول `users` في PostgreSQL.

مسؤوليتها: شكل البيانات وعلاقتها بالجدول فقط.

#### `UserRepository.java`

مسؤول عن القراءة والكتابة في جدول المستخدمين.

أمثلة لاحقة:

- البحث عن مستخدم بالـEmail.
- حفظ مستخدم جديد.
- التحقق من وجود Email.

#### `UserService.java`

يحتوي على منطق العمل Business Logic.

مثال: التأكد أن الـEmail غير مستخدم قبل الحفظ.

لا نضع SQL أو تفاصيل HTTP هنا.

#### `UserController.java`

يستقبل HTTP Requests الخاصة بالمستخدمين، ثم يستدعي Service.

مثال لاحق:

```text
POST /api/users
GET  /api/users/{id}
```

الـController لا يحتوي على منطق كبير؛ دوره استقبال الطلب وإرجاع النتيجة.

#### `user/dto/`

DTOs هي Objects مخصصة للبيانات الداخلة والخارجة من API.

نستخدمها حتى لا نرسل Entity مباشرة إلى المتصفح، خصوصًا لا نرسل password.

### `auth/`

كل ما يخص التسجيل وتسجيل الدخول.

#### `AuthController.java`

Endpoints مثل:

```text
POST /api/auth/register
POST /api/auth/login
```

#### `AuthService.java`

منطق التسجيل والتحقق من كلمة المرور وإنشاء جلسة أو Token لاحقًا.

#### `auth/dto/`

بيانات Login وRegister مثل email وpassword.

## قاعدة مهمة في التقسيم

تدفق الطلب يكون غالبًا:

```text
Frontend
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

والرد يرجع بالعكس:

```text
PostgreSQL
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
Frontend
```

## أين أضع الكود؟

| نوع الكود | مكانه |
|---|---|
| تعريف جدول | Entity مثل `User.java` |
| استعلامات وقاعدة البيانات | Repository |
| قواعد العمل | Service |
| HTTP endpoints | Controller |
| Request/Response objects | `dto/` |
| إعدادات التطبيق | `config/` |
| أخطاء مشتركة | `common/exception/` |
| إعداد PostgreSQL | `application.properties` |

## تقسيم العمل على مراحل

### المرحلة 1: أول Feature

```text
user/
├── User.java
└── UserRepository.java
```

الهدف: إنشاء جدول User وفهم Entity وRepository.

### المرحلة 2: API بسيطة

```text
user/
├── User.java
├── UserRepository.java
├── UserService.java
└── UserController.java
```

الهدف: إنشاء API تحفظ وتعرض بيانات المستخدمين.

### المرحلة 3: Forms وDTOs

```text
user/
└── dto/
    ├── CreateUserRequest.java
    └── UserResponse.java
```

الهدف: فصل بيانات الـAPI عن Entity وعدم إرسال password.

### المرحلة 4: Authentication

إضافة `auth/` مع تشفير كلمات المرور والتحقق من Login.

### المرحلة 5: Production readiness

لاحقًا نضيف تدريجيًا:

- Validation.
- Error handling.
- Authentication وAuthorization.
- Database indexes.
- Pagination.
- Logging وMonitoring.
- Tests.
- Caching عند وجود مشكلة حقيقية.

## قواعد سنلتزم بها

1. كل Feature لها مجلد واضح.
2. كل Feature تملك Controller وService وRepository الخاصين بها.
3. Controller لا يحتوي على Business Logic كبير.
4. Service لا يعرف تفاصيل HTTP.
5. Repository لا يحتوي على منطق الواجهة.
6. لا نرسل Entity مباشرة إذا كانت تحتوي بيانات حساسة.
7. المكونات المشتركة تذهب إلى `common/` فقط إذا استخدمتها أكثر من Feature.
8. لا ننشئ abstraction أو folder قبل أن نحتاجه.
9. كل Task صغيرة ويتم اختبارها قبل الانتقال للي بعدها.
10. كلمة المرور لا يتم تخزينها كنص عادي في النسخة الآمنة من التطبيق.

## Task الحالية

أنشئ فقط:

```text
src/main/java/com/devhub/backend/user/User.java
```

ثم نراجعه معًا قبل إنشاء `UserRepository.java`.
