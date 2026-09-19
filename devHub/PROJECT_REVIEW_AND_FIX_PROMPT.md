# DevHub Project Review and Fix Prompt

هذا الملف يجمع المشاكل الحالية في مشروع DevHub، ثم يحتوي على Prompt جاهز لاستخدامه مع أي AI coding assistant.

## Current Project

المشروع حاليًا Static HTML/CSS/JavaScript:

- `index.html`: Dashboard.
- `pages/login.html`: Authentication page وتحتوي Login وRegister transition.
- `pages/register.html`: موجود لكنه فارغ.
- `assets/css/auth.css`: تصميم Authentication.
- `assets/css/main.css`: يجمع ملفات CSS الخاصة بالـDashboard.
- `assets/css/layout.css`: ترتيب Dashboard.
- `assets/css/components.css`: مكونات Dashboard.
- `assets/css/variable.css`: متغيرات الألوان والمسافات.
- `assets/js/main.js`: تفاعل قائمة Tools في Dashboard.
- `assets/js/auth.js`: تفاعل Login/Register.

لا يوجد حاليًا:

- `package.json`.
- Framework.
- TypeScript.
- Backend أو API.
- Authentication حقيقي.
- Database.
- Testing framework.
- Linting أو formatting configuration.

---

# Known Problems

## 1. Authentication

### 1.1 Register page فارغة

`pages/register.html` موجودة لكنها لا تحتوي على واجهة. حاليًا Register موجود داخل `login.html` فقط.

### 1.2 لا يوجد Authentication حقيقي

الأزرار لا تسجل الدخول فعليًا، ولا يوجد:

- API request.
- Session.
- Token.
- Server validation.
- Error response.
- Success response.

هذا مقبول في مرحلة UI prototype، لكنه يجب أن يكون واضحًا أنه ليس Authentication production-ready.

### 1.3 النماذج تمنع الإرسال فقط

`auth.js` يستخدم `preventDefault()` للنماذج، لكن لا يوجد:

- Validation للـemail.
- Password rules.
- Loading state.
- Error state.
- Success state.
- Disabled state أثناء الإرسال.

### 1.4 زر إظهار كلمة المرور غير تفاعلي

الأيقونة `.eye-icon` تظهر كأنها قابلة للضغط، لكنها ليست زرًا ولا تغير نوع الحقل.

الحل المطلوب:

- تحويلها إلى `button type="button"`.
- إضافة `aria-label`.
- تبديل `password` و`text`.
- تغيير شكل الأيقونة حسب الحالة.

### 1.5 رابط Forgot Password غير مكتمل

الرابط الحالي يشير إلى `#` ولا ينفذ أي سلوك.

يجب لاحقًا إضافة صفحة أو modal أو flow لاستعادة كلمة المرور.

### 1.6 أزرار GitHub وGoogle شكلية

الأزرار لا تبدأ OAuth ولا تعرض loading أو error state.

يجب إبقاؤها placeholder واضحة إلى أن يتم ربط backend حقيقي.

### 1.7 اللغة غير تفاعلية

`lang-selector` يعرض العربية فقط، لكنه ليس button أو رابطًا ولا يغير اللغة.

يجب إما:

- جعله زرًا حقيقيًا.
- أو إزالة مظهر التفاعل منه مؤقتًا.

### 1.8 عنوان الصفحة ثابت

عند الانتقال إلى Register يظل title هو `DevHub Login`.

يجب تحديث `document.title` حسب الحالة.

### 1.9 Accessibility تحتاج مراجعة مستمرة

تمت إضافة labels وfocus في Login/Register، لكن يجب التأكد من:

- keyboard navigation.
- focus visible.
- focus بعد التبديل.
- عدم الوصول إلى اللوحة المخفية.
- contrast جيد.
- `aria-live` لرسائل الخطأ والنجاح.

## 2. Authentication CSS

### 2.1 اعتماد على صور وخطوط خارجية

`auth.css` يعتمد على Google Fonts وUnsplash وFont Awesome CDN.

المشاكل المحتملة:

- الصفحة تتأثر بانقطاع الإنترنت.
- وقت تحميل إضافي.
- الصورة الخارجية قد تتغير أو تفشل.
- لا توجد fallback assets محلية.

الحل المستقبلي: إضافة صورة محلية وخط fallback واضح، أو استخدام assets موثوقة مع `font-display` مناسب.

### 2.2 الخلفية قوية على النص

صورة الخلفية في الجزء الأيسر تجذب الانتباه وتقلل وضوح النص في بعض الشاشات.

يجب ضبط overlay وcontrast بدون جعل الصورة مظلمة جدًا.

### 2.3 الموبايل طويل بصريًا

في الشاشات الصغيرة يتحول التصميم إلى عمود واحد، لكن Branding يأخذ مساحة كبيرة قبل النموذج.

يجب مراجعة:

- ترتيب الأقسام.
- طول الصفحة.
- المسافات.
- إمكانية تقليل بعض الـfeatures على الموبايل.

### 2.4 لا يوجد favicon

المتصفح يطلب `favicon.ico` ويحصل على 404.

يجب إضافة favicon محلي أو إضافة icon مناسب.

### 2.5 بعض قيم CSS متكررة

الألوان والمسافات في `auth.css` منفصلة عن متغيرات `variable.css` الخاصة بالـDashboard.

هذا ليس خطأ حاليًا، لكنه قد يسبب اختلافًا في التصميم مع نمو المشروع.

الحل البسيط: توحيد design tokens تدريجيًا بدون عمل abstraction كبير.

## 3. Dashboard HTML

### 3.1 أخطاء تنسيق HTML

يوجد استخدام غير متناسق مثل:

```html
<div class ="logo">
```

والأفضل:

```html
<div class="logo">
```

### 3.2 لغة الصفحة غير متناسقة

`index.html` يستخدم:

```html
<html lang="ar" dir="ltr">
```

المحتوى خليط عربي وإنجليزي، و`dir="ltr"` لا يناسب النص العربي بالكامل.

يجب تحديد لغة واتجاه واضحين أو استخدام direction محلي للعناصر الإنجليزية.

### 3.3 عناصر تفاعلية بدون سلوك

الأزرار التالية ليس لها functionality حقيقي:

- Notifications.
- Help.
- Dark Mode.
- Profile.
- Quick Action.
- View Resources.
- View Tool.
- Dashboard navigation links.

يجب تحديد scope لكل زر بدل إضافة JavaScript عشوائي.

### 3.4 Search غير مكتمل

حقل البحث موجود بصريًا، لكنه لا يبحث في الأدوات أو الملاحظات.

يجب لاحقًا تحديد:

- ما الذي سيتم البحث فيه.
- هل البحث client-side أم API.
- empty state.
- no results state.

## 4. Dashboard CSS

### 4.1 Selector غير مطابق للـHTML

في `components.css` يوجد:

```css
.sidebar-links ul
```

لكن لا يوجد عنصر بهذه class في HTML. الموجود هو `.sidebar-nav`.

لذلك هذا الـCSS لا يعمل.

### 4.2 Selector غير مستخدم

يوجد `.top-nav-links` في CSS، لكنه غير موجود في `index.html`.

يجب حذف القاعدة أو ربطها بعنصر حقيقي.

### 4.3 شبكة الأدوات غير responsive بشكل كافٍ

الحالي:

```css
grid-template-columns: repeat(4, minmax(220px, 1fr));
```

هذا قد يسبب overflow على الشاشات الأصغر.

الأفضل استخدام grid responsive أو media queries.

### 4.4 `flex-direction` بدون `display: flex`

في `.tool-card` يوجد:

```css
flex-direction: column;
```

لكن لا يوجد `display: flex`، لذلك القاعدة لا تؤثر.

### 4.5 نقص في Dashboard mobile layout

لا توجد media queries كافية لتصميم:

- Sidebar.
- Navbar.
- Search bar.
- Stats cards.
- Tool cards.
- Welcome section.

على الموبايل قد تصبح الصفحة ضيقة أو غير مريحة.

### 4.6 margin على الحاوية الرئيسية

`.app-container` يستخدم `margin` مع `min-height: 100vh`، مما قد ينتج مساحة خارجية غير ضرورية أو scroll غير مقصود.

يجب مراجعة هل المطلوب margin أم padding فقط.

### 4.7 عدم وجود ألوان للكلاسات الإحصائية

HTML يستخدم:

```html
class="stat-number blue"
```

لكن يجب التأكد من وجود CSS فعلي لـ:

- `.stat-number`
- `.blue`
- `.pink`
- `.green`
- `.yellow`

### 4.8 CSS comments كثيرة مقارنة بحجم المشروع

التعليقات التعليمية مفيدة أثناء التعلم، لكن يجب حذف التعليقات التي تشرح CSS الواضح جدًا عندما يكبر الملف، للحفاظ على سهولة القراءة.

## 5. JavaScript Organization

### 5.1 `main.js` مرتبط بالـDashboard فقط

هذا جيد حاليًا، لكن يجب عدم وضع Authentication logic داخله.

### 5.2 رسائل console غير مناسبة للإنتاج

يوجد `console.log` و`console.error` في `main.js`.

مقبولة أثناء التطوير، لكن يجب مراجعتها قبل production.

### 5.3 لا يوجد error boundary أو global error strategy

في Static JavaScript بسيط، يكفي حاليًا التعامل مع الأخطاء محليًا بدل إنشاء architecture كبيرة.

## 6. Semantic HTML

يجب مراجعة:

- استخدام `main` و`header` و`nav` و`section` بشكل صحيح.
- استخدام `button` للأفعال.
- استخدام `a` للتنقل.
- إضافة `type="button"` للأزرار التي لا ترسل forms.
- إضافة `name` للحقول عند ربط backend.
- إضافة `autocomplete` المناسب.

## 7. Visual Product Quality

التصميم الحالي جيد كـprototype، لكنه يحتاج polish ليشبه منتج SaaS حقيقي:

- هوية Logo أقوى.
- نظام spacing ثابت.
- hierarchy أوضح للعناوين.
- contrast أفضل فوق الصورة.
- states واضحة للـhover/focus/loading/error.
- تقليل ازدحام Branding على الموبايل.
- توحيد لغة النصوص.
- favicon وmetadata.

---

# Recommended Priority

## Priority 1: UX and Bugs

1. إضافة password visibility toggle.
2. إضافة validation أساسي للنماذج.
3. إصلاح responsive Dashboard.
4. إصلاح selectors غير المستخدمة.
5. إضافة focus وerror states.
6. إزالة أو معالجة favicon 404.

## Priority 2: Product Polish

1. تحسين الخلفية والـoverlay.
2. تحسين mobile spacing.
3. تحسين Logo والـtypography.
4. توحيد الألوان والمتغيرات.
5. إضافة loading states.
6. إضافة empty states للبحث والأدوات.

## Priority 3: Future Features

1. Backend Authentication.
2. OAuth GitHub/Google.
3. Forgot Password flow.
4. Dashboard navigation الحقيقي.
5. Search functionality.
6. Theme switching.
7. Tests وlinting بعد بدء JavaScript الحقيقي.

---

# Ready-to-Use Fix Prompt

انسخ الـPrompt التالي عند استخدام AI coding assistant:

```text
أنت Senior Frontend Engineer تعمل على مشروع DevHub صغير مبني بـ Static HTML/CSS/JavaScript.

أنا ما زلت أتعلم، لذلك أريد كودًا بسيطًا وواضحًا وقابلًا للتطوير، بدون Framework أو dependencies جديدة أو Enterprise Architecture.

قبل تعديل أي ملف:

1. افحص project structure والملفات الفعلية.
2. اقرأ HTML وCSS وJavaScript المرتبط بالمشكلة.
3. حدد:
   - What I found
   - Problem
   - Root Cause
   - Files involved
   - Proposed solution
   - Why this solution
   - Complexity check
4. لا تعدل أي ملف قبل أن أكتب APPROVED.

المشاكل المعروفة التي يجب مراجعتها:

Authentication:
- register.html فارغة.
- Login/Register transition موجودة داخل login.html فقط.
- لا يوجد backend authentication.
- النماذج تمنع الإرسال فقط.
- لا يوجد validation أو loading أو error state.
- password eye icon غير تفاعلي.
- Forgot Password غير مكتمل.
- GitHub وGoogle buttons غير مربوطة بـOAuth.
- language selector غير تفاعلي.
- title لا يتغير عند Register.
- راجع keyboard navigation وfocus وaria وreduced motion.

Dashboard:
- راجع selectors التي لا تطابق HTML مثل sidebar-links وtop-nav-links.
- أصلح `.tool-card` حتى يعمل flex فعلًا.
- اجعل tools grid responsive.
- أضف mobile layout مناسب للـsidebar والnavbar والcards.
- راجع app-container margin والـoverflow.
- راجع stat color classes.
- لا تضف functionality كبيرة للأزرار إلا إذا كانت مطلوبة.

General:
- راجع semantic HTML.
- راجع labels وinput ids وautocomplete.
- راجع external assets وfavicon.
- راجع console logs.
- لا تعالج مشاكل غير مرتبطة بالمهمة.
- لا تنشئ abstraction إلا بسبب واضح.

قواعد التنفيذ:

- لا تغير unrelated files.
- لا تستخدم مكتبات animation.
- استخدم CSS transitions على transform وopacity عندما يناسب.
- حافظ على التصميم الحالي وطوره بدل استبداله بالكامل.
- استخدم أزرارًا حقيقية للأفعال وروابط حقيقية للتنقل.
- لا تستخدم `display: none` إذا كان المطلوب transition بين حالتين.
- اجعل التصميم يعمل على desktop وtablet وmobile.
- احترم `prefers-reduced-motion`.
- لا تدّعي وجود backend أو authentication حقيقي إذا لم يكن موجودًا.

بعد موافقتي:

1. نفذ أصغر تغيير يحقق المطلوب.
2. شغل فحص CSS/HTML/JavaScript مناسب.
3. اختبر السلوك الفعلي في المتصفح إن أمكن.
4. اختبر desktop وtablet وmobile.
5. اختبر keyboard focus وreduced motion.
6. إذا وجدت bug أثناء الاختبار:
   - حدد root cause.
   - أصلحه فورًا.
   - أعد الاختبار نفسه.
7. لا تقل إن المهمة اكتملت قبل التحقق.

في التقرير النهائي اذكر فقط:

- What changed
- Files modified
- Files created
- UI behavior
- Accessibility
- Responsive behavior
- Performance
- Verification results
- أي شيء لم يتم اختباره تحت عنوان NOT VERIFIED
```

---

# Master Prompt v2: Senior Frontend Team Mode

استخدم الـPrompt التالي بدل النسخة المختصرة عندما تريد إصلاح المشروع بشكل كامل ومنظم:

```text
أنت تعمل كفريق Frontend صغير ومحترف على مشروع DevHub.

تعامل داخليًا مع المهمة من خلال هذه الأدوار:

1. Senior Frontend Engineer: يختار أبسط implementation صحيح.
2. UI/UX Engineer: يراجع hierarchy والspacing والوضوح والتناسق.
3. Accessibility Reviewer: يراجع keyboard وfocus وlabels وcontrast وreduced motion.
4. Performance Reviewer: يراجع حجم الأصول والanimations والـDOM work.
5. QA Engineer: يختبر السلوك الحقيقي على أحجام شاشات مختلفة.
6. Code Reviewer: يبحث عن duplication وselectors ميتة وunrelated changes.

لا تنشئ agents أو architecture منفصلة لهذه الأدوار. استخدمها كقائمة مراجعة داخلية.

## Project Rules

- المشروع صغير وStatic HTML/CSS/JavaScript.
- أنا ما زلت أتعلم، لذلك اشرح القرارات بلغة واضحة.
- Keep it simple, but build it correctly.
- لا تستخدم Framework أو dependency جديدة إلا إذا أثبتت أنها ضرورية.
- لا تنشئ folders أو abstractions أو patterns بدون سبب حقيقي.
- لا تعيد كتابة ملفات لا علاقة لها بالمشكلة.
- لا تعمل refactor شامل لمجرد تحسين الشكل.
- لا تدّعِ أن Authentication حقيقي إذا لم يوجد Backend.
- لا تضع secrets أو tokens أو credentials داخل الملفات.

## Phase 1: Investigation Only

قبل أي تعديل:

1. افحص structure الفعلي للمشروع.
2. ابحث عن كل HTML وCSS وJavaScript وassets.
3. اقرأ الملفات المرتبطة بالميزة الحالية فقط.
4. تتبع flow الحقيقي من interaction إلى DOM إلى CSS.
5. تحقق هل المشكلة موجودة فعلًا أم مجرد افتراض.
6. افحص إن كانت هناك تغييرات سابقة في الملفات المهمة، ولا تحذف تغييرات المستخدم.

أخرج تقريرًا قصيرًا بهذا الترتيب:

- What I found
- Current structure
- Problem
- Root cause
- Files involved
- Proposed solution
- Alternatives rejected ولماذا
- Complexity: Simple / Moderate / Over-engineered
- Exact acceptance criteria

توقف بعد التقرير. لا تعدل أي ملف قبل أن أكتب APPROVED.

## Phase 2: Plan After Approval

بعد كلمة APPROVED:

1. حدد أصغر مجموعة ملفات مطلوبة.
2. اذكر ما لن تلمسه ولماذا.
3. نفذ التعديل على خطوات صغيرة.
4. حافظ على public class names وbehavior القائم إلا عند الضرورة.
5. استخدم semantic HTML.
6. افصل UI behavior عن Dashboard behavior عندما يكون الفصل بسيطًا ومفيدًا.

## Authentication Requirements

راجع وأصلح، فقط إذا كان مرتبطًا بالمهمة:

- Login/Register transition.
- Login على اليمين وRegister على اليسار في Desktop.
- Single-column layout مناسب للموبايل.
- عدم استخدام display:none لانتقال الواجهات.
- استخدام transform وopacity وvisibility للانتقال.
- `inert` و`aria-hidden` للوحة غير النشطة.
- انتقال focus إلى أول control في اللوحة الجديدة.
- labels مرتبطة بالـinputs عن طريق `for` و`id`.
- `autocomplete` و`name` مناسبين للحقول.
- password visibility toggle كزر حقيقي.
- validation أساسي ورسائل خطأ مفهومة.
- loading وdisabled states بدون ادعاء وجود API.
- title يتغير بين Login وRegister.
- buttons التي لا ترسل form تستخدم `type="button"`.
- `prefers-reduced-motion`.

إذا لم يوجد Backend، نفذ UI states فقط واذكر بوضوح أن الاتصال الحقيقي غير موجود.

## Dashboard Requirements

راجع فقط المشاكل الموجودة فعلًا:

- selectors لا تطابق HTML.
- tool cards وstats cards.
- sidebar وnavbar.
- search bar.
- responsive grid.
- mobile overflow.
- الأزرار التي تبدو clickable بدون behavior.
- console logs غير الضرورية.
- عدم خلط Dashboard JavaScript مع Authentication JavaScript.

لا تضف features كبيرة مثل API search أو OAuth أو dark-mode logic إلا بطلب منفصل.

## CSS Rules

- استخدم design tokens عندما تقلل التكرار فعلًا.
- حافظ على naming واضح.
- لا تترك selectors غير مستخدمة إذا كانت ضمن الجزء المعدل.
- لا تحرك layout properties إذا كان transform يحقق نفس animation.
- اختبر النصوص الطويلة والأزرار والحقول.
- امنع horizontal overflow.
- لا تستخدم ألوانًا منخفضة contrast.
- لا تجعل كل شيء card داخل card.
- لا تجعل التصميم مزدحمًا على mobile.

## Accessibility Checklist

تحقق من:

- keyboard-only navigation.
- visible focus state.
- correct heading hierarchy.
- labels وinput associations.
- button/link semantics.
- hidden panel لا يدخل في tab order.
- readable contrast.
- reduced motion.
- error messages قابلة للقراءة.

## Verification Loop

بعد كل تعديل مؤثر:

1. شغل أقرب فحص ممكن للجزء المعدل.
2. اختبر الصفحة في المتصفح إن أمكن.
3. اختبر initial state.
4. اختبر كل interaction رئيسي.
5. اختبر reverse interaction.
6. اختبر desktop وtablet وmobile.
7. افحص console errors وnetwork failures.
8. إذا ظهر bug، لا تكمل التقرير:
   - اذكر observation.
   - حدد root cause.
   - أصلح نفس الجزء.
   - أعد نفس الاختبار.

لا تعتبر المهمة مكتملة بسبب نجاح syntax check فقط.

## Acceptance Criteria

اعتبر المهمة ناجحة فقط إذا:

- الصفحة الأساسية تفتح بدون JavaScript errors.
- Login state تعمل كما هو متوقع.
- Register state تعمل كما هو متوقع.
- الانتقال ذهابًا وإيابًا مستقر وبدون flicker واضح.
- لا يوجد horizontal overflow على mobile.
- inputs وbuttons قابلة للاستخدام بالماوس والكيبورد.
- hidden panel لا يتم الوصول إليه بالـTab.
- reduced motion يقلل أو يلغي الانتقالات.
- لا توجد ملفات unrelated تم تعديلها.
- لا توجد dependencies جديدة بدون سبب مكتوب.

## Final Report

بعد نجاح الاختبارات، اكتب التقرير بهذا الشكل:

### What Changed
اذكر التغييرات الفعلية فقط.

### Files Modified
اذكر الملفات وروابطها إن أمكن.

### Files Created
اذكر الملفات الجديدة أو `None`.

### Behavior
اشرح flow المستخدم باختصار.

### Accessibility
اذكر ما تم اختباره فعليًا.

### Responsive
اذكر desktop/tablet/mobile.

### Performance
اذكر animations والdependencies والأصول.

### Verification
استخدم الحالة الدقيقة لكل فحص:

- HTML/CSS errors: PASS/FAIL/NOT VERIFIED
- JavaScript syntax: PASS/FAIL/NOT VERIFIED
- Browser runtime: PASS/FAIL/NOT VERIFIED
- Login interaction: PASS/FAIL/NOT VERIFIED
- Register interaction: PASS/FAIL/NOT VERIFIED
- Mobile overflow: PASS/FAIL/NOT VERIFIED
- Keyboard/focus: PASS/FAIL/NOT VERIFIED
- Reduced motion: PASS/FAIL/NOT VERIFIED

لا تقل PASS لشيء لم يتم اختباره.
```

## How To Use This File

1. افتح هذا الملف.
2. انسخ قسم `Master Prompt v2` كاملًا.
3. أرسله للـcoding agent مع تحديد المهمة المطلوبة.
4. انتظر تقرير Phase 1.
5. اكتب `APPROVED` فقط بعد مراجعة الخطة.
6. بعد التنفيذ راجع جدول Verification، وليس شكل الصفحة فقط.

# Important Note

هذا المشروع حاليًا Prototype للواجهة، وليس نظام Authentication حقيقيًا. لا يجب استخدامه في production قبل إضافة backend آمن، password hashing، session management، CSRF protection، validation على الخادم، وOAuth configuration آمن.
