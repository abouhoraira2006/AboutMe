# حل مشكلة ظهور صفحة Next.js الافتراضية

## المشكلة:
عند النشر على Vercel، تظهر صفحة Next.js الافتراضية بدلاً من موقع AboutMe.

## الحل:

### 1. تأكد من رفع جميع الملفات على GitHub:

```bash
cd aboutme-web
git add .
git commit -m "Fix deployment"
git push
```

### 2. في Vercel Dashboard:

1. اذهب إلى مشروعك في Vercel
2. اضغط على **Settings** → **General**
3. تأكد من:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (أو اتركه فارغاً)
   - **Output Directory**: `.next` (أو اتركه فارغاً)
   - **Install Command**: `npm install` (أو اتركه فارغاً)

### 3. إعادة البناء:

1. في Vercel → **Deployments**
2. اضغط على **Redeploy** → **Redeploy**
3. انتظر حتى ينتهي البناء

### 4. تحقق من الملفات:

تأكد من أن هذه الملفات موجودة في GitHub:
- ✅ `src/app/page.tsx` (يجب أن يحتوي على كود AboutMe)
- ✅ `src/app/layout.tsx`
- ✅ `src/data/aboutme.json`
- ✅ `package.json`

### 5. إذا لم يعمل:

**حذف المشروع وإعادة إنشائه:**
1. في Vercel → Settings → Delete Project
2. أنشئ مشروع جديد
3. اختر نفس المستودع من GitHub
4. تأكد من أن **Root Directory** فارغ (أو `aboutme-web` إذا كان المشروع في مجلد فرعي)

### 6. تحقق من الـ Build Logs:

في Vercel → Deployments → اضغط على آخر deployment → **Build Logs**
- تأكد من عدم وجود أخطاء
- تأكد من أن البناء نجح

---

## ملاحظة مهمة:

إذا كان المشروع في مجلد `aboutme-web` داخل المستودع:
- في Vercel → Settings → General → **Root Directory**: اكتب `aboutme-web`

إذا كان المشروع في جذر المستودع:
- اترك **Root Directory** فارغاً
