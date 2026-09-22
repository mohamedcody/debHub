# شرح مشروع DevHub للمبتدئ

هذا الملف يشرح شكل المشروع الحالي ووظيفة كل جزء فيه.

## 1. الصورة الكبيرة

المشروع مقسوم إلى جزئين:

```text
devHub/
├── devHub/    الواجهة Frontend
└── backend/   السيرفر Backend
```

الـFrontend هو ما يراه المستخدم في المتصفح: صفحات HTML وملفات CSS وJavaScript.

الـBackend هو البرنامج الذي يعمل على السيرفر: يستقبل Requests، يتعامل مع قاعدة البيانات، ويرجع Responses.

حاليًا قاعدة البيانات المستخدمة هي PostgreSQL.

## 2. مجلد `devHub/`

هذا هو مجلد الواجهة الأمامية.

### `devHub/index.html`

الصفحة الرئيسية للواجهة. يكتب HTML الخاص بالصفحة، ويربط ملفات CSS وJavaScript.

### `devHub/pages/`

يحتوي على صفحات إضافية:

- `login.html`: صفحة تسجيل الدخول.
- `register.html`: صفحة إنشاء حساب.

### `devHub/assets/`

مكان الملفات التي تستخدمها الواجهة.

#### `assets/css/`

ملفات تنسيق الصفحات:

- `variable.css`: الألوان والقيم المشتركة مثل المسافات والخطوط.
- `layout.css`: تخطيط الصفحة، مثل الحاويات وFlexbox وGrid.
- `components.css`: مكونات متكررة مثل الأزرار والكروت والـNavbar.
- `auth.css`: تنسيق صفحات Login وRegister.
- `main.css`: ملف CSS رئيسي أو تنسيقات عامة.

الفكرة: لا تضع كل CSS في ملف واحد عشوائيًا. كل ملف له مسؤولية واضحة.

#### `assets/js/`

ملفات JavaScript الخاصة بالواجهة:

- `main.js`: السلوك العام للصفحات والتفاعل مع عناصر الواجهة.
- `auth.js`: منطق تسجيل الدخول والتسجيل والنماذج الخاصة بهما.

### `devHub/images/`

الصور المستخدمة في الواجهة.

## 3. مجلد `backend/`

هذا مشروع Spring Boot مستقل عن الواجهة.

### `backend/pom.xml`

ملف Maven. يحدد:

- اسم المشروع وإصداره.
- إصدار Java، وهو Java 21.
- المكتبات المستخدمة، مثل Spring Boot وSpring Web وJPA وPostgreSQL.
- طريقة بناء وتشغيل المشروع.

أي dependency جديدة للـBackend تضاف غالبًا هنا.

### `backend/mvnw`

Maven Wrapper على Linux وmacOS. يسمح بتشغيل Maven من غير تثبيته يدويًا داخل المشروع.

مثال:

```bash
./mvnw spring-boot:run
```

### `backend/mvnw.cmd`

نفس فكرة `mvnw` لكن لأنظمة Windows.

### `backend/src/main/java/`

هنا كود Java الأساسي للتطبيق.

المسار الطويل:

```text
backend/src/main/java/com/devhub/backend/
```

طول المسار طبيعي في Java، لأنه يعكس اسم الـpackage.

### `BackendApplication.java`

نقطة بداية تطبيق Spring Boot. عند تشغيل الأمر `./mvnw spring-boot:run` يبدأ التنفيذ من هنا، ثم Spring يجهز السيرفر والـBeans وباقي أجزاء التطبيق.

هذا الملف لا يحتوي عادة على منطق Login أو CRUD؛ هو ملف تشغيل التطبيق.

### `backend/src/main/resources/`

ملفات الإعدادات والموارد التي يحتاجها التطبيق أثناء التشغيل.

#### `application.properties`

ملف إعدادات Spring Boot. يحتوي حاليًا على:

- اسم التطبيق.
- Port السيرفر: `8081`.
- رابط PostgreSQL:
  `jdbc:postgresql://localhost:5432/devhub`
- اسم المستخدم: `devhub`.
- كلمة المرور المحلية: `devhub_password`.
- `spring.jpa.hibernate.ddl-auto=update` لإنشاء أو تحديث الجداول من خلال Entity أثناء التطوير.

لا تضع كلمات مرور حقيقية في Git في المشاريع الحقيقية. الأفضل لاحقًا استخدام Environment Variables.

#### `resources/static/`

مكان ملفات static التي يمكن لـSpring تقديمها مباشرة، مثل HTML وCSS وJavaScript. في مشروعنا الحالي الواجهة موجودة في مجلد `devHub/` المنفصل.

#### `resources/templates/`

مكان صفحات server-side templates مثل Thymeleaf. المجلد موجود لكنه غير مستخدم حاليًا.

### `backend/src/test/`

هنا اختبارات الـBackend. الاختبار الحالي يتأكد أن Spring Boot يستطيع تشغيل Application Context.

الاختبارات تستخدم H2 داخل الذاكرة حتى لا تعتمد على PostgreSQL الحقيقية أثناء الاختبار.

### `backend/data/`

يحتوي على ملفات H2 قديمة:

- `devhub.mv.db`
- `devhub.trace.db`

هذه ليست ملفات PostgreSQL الحالية. PostgreSQL تعمل كخدمة منفصلة على الجهاز، وقاعدة البيانات الحالية اسمها `devhub`.

يمكن ترك هذه الملفات مؤقتًا، ولا تعتمد عليها الواجهة أو الـBackend الحالي.

### `backend/target/`

ملفات يتم توليدها تلقائيًا بواسطة Maven، مثل compiled classes وتقارير الاختبارات.

لا تعدلها يدويًا، وغالبًا لا يتم رفعها إلى Git.

### `backend/HELP.md`

ملف مساعد أنشأه Spring Initializr، ويحتوي روابط وملاحظات عامة عن Spring Boot وJPA.

## 4. قاعدة البيانات والاتصال

بيانات PostgreSQL المحلية:

```text
Host: localhost
Port: 5432
Database: devhub
Username: devhub
Password: devhub_password
```

رابط JDBC:

```text
jdbc:postgresql://localhost:5432/devhub
```

التدفق يكون هكذا:

```text
Browser
  ↓ HTTP Request
Spring Boot على localhost:8081
  ↓ JDBC
PostgreSQL على localhost:5432
  ↓
Database: devhub
```

مهم: وجود اتصال بقاعدة البيانات لا يعني أن Login يعمل تلقائيًا. ما زلنا نحتاج Entity وRepository وController ثم ربط JavaScript بالـAPI.

## 5. كيف أشغل المشروع؟

### تشغيل PostgreSQL

تأكد أن الخدمة تعمل:

```bash
pg_isready -h localhost -p 5432
```

المفروض تظهر رسالة أن السيرفر يقبل الاتصالات.

### تشغيل الـBackend

من داخل مجلد `backend`:

```bash
./mvnw spring-boot:run
```

المفروض يظهر:

```text
Tomcat started on port 8081
Started BackendApplication
```

### تشغيل الواجهة

افتح `devHub/index.html` في المتصفح، أو استخدم Live Server من VS Code.

ملاحظة: فتح HTML وحده لا ينشئ اتصالًا بقاعدة البيانات. الاتصال يحدث عندما JavaScript يرسل Request إلى Backend API.

## 6. أهم المصطلحات

- **Frontend**: الجزء الذي يعمل في المتصفح.
- **Backend**: الجزء الذي يعمل على السيرفر.
- **API**: عنوان يتواصل معه الـFrontend لإرسال أو طلب البيانات.
- **Database**: مكان تخزين البيانات.
- **Entity**: Class في Java يمثل جدولًا في قاعدة البيانات.
- **Repository**: طبقة تستخدمها Java للقراءة والكتابة في الجداول.
- **Controller**: يستقبل HTTP Requests ويرجع Responses.
- **JPA**: طريقة تجعل Java تتعامل مع الجداول باستخدام Objects بدل كتابة SQL دائمًا.

## 7. ما الذي سنبنيه بعد ذلك؟

الترتيب العملي:

1. إنشاء `User` Entity.
2. إنشاء `UserRepository`.
3. إنشاء API للتسجيل.
4. اختبار الـAPI من المتصفح أو curl.
5. ربط `register.html` بالـAPI باستخدام `fetch`.
6. إضافة Login والتحقق من البيانات.
7. إضافة تشفير كلمات المرور قبل اعتبار النظام آمنًا.

## 8. ماذا أتعلم الآن؟

### MUST KNOW

- HTML semantic وForms.
- CSS Box Model وFlexbox وGrid.
- JavaScript functions وobjects وarrays.
- DOM وevents و`fetch`.
- HTTP Request وResponse.
- قراءة أخطاء Console وNetwork.

### SHOULD KNOW لاحقًا

- State management.
- Architecture وتقسيم المكونات.
- Testing وAccessibility المتقدمة.
- React بعد تقوية JavaScript.

### SKIP FOR NOW

- تفاصيل PostgreSQL الداخلية.
- Redux قبل فهم State في Vanilla JavaScript.
- Performance optimization المتقدم.
- Docker وMicroservices.

ابدأ دائمًا بتغيير صغير، شغّل التطبيق، راقب النتيجة، ثم اشرح لنفسك لماذا حدثت.
