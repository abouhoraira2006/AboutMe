# نشر الموقع على Vercel

## الخطوات السريعة:

### 1. ارفع المشروع على GitHub

```bash
cd aboutme-web
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. انشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجّل بحساب GitHub
3. اضغط **Add New Project**
4. اختر المستودع من GitHub
5. اضغط **Deploy** (لا تغير أي إعدادات)

✅ ستحصل على رابط مثل: `aboutme-web-xxxxx.vercel.app`

---

## ربط دومين مخصص (hammi.[extension])

### الحصول على دومين مجاني:

**Freenom** (الأسهل):
- اذهب إلى [freenom.com](https://www.freenom.com)
- ابحث عن `hammi.tk` أو `hammi.ml` أو `hammi.ga`
- سجّل مجاناً

### ربط الدومين في Vercel:

1. في Vercel → مشروعك → **Settings** → **Domains**
2. أضف دومينك (مثلاً: `hammi.tk`)
3. اتبع تعليمات DNS من Vercel
4. انتظر 5-30 دقيقة

**إعدادات DNS المطلوبة:**
```
Type: A
Name: @
Value: 76.76.21.21
```

أو:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

✅ بعد التفعيل، الموقع سيكون على `https://hammi.tk`

---

## تحديث الموقع بعد التعديلات:

```bash
git add .
git commit -m "Update"
git push
```

Vercel سيبني ويحدث الموقع تلقائياً!
