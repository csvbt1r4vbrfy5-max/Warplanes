import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // يمنع المتصفح من تخمين نوع المحتوى
          { key: "X-Content-Type-Options", value: "nosniff" },
          // يمنع تضمين الموقع داخل iframe (حماية من Clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // حماية إضافية من XSS في المتصفحات القديمة
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // يتحكم بمعلومات الإحالة المُرسلة مع الطلبات
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // يقيّد الوصول لميزات المتصفح الحساسة
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // يفرض استخدام HTTPS لمدة سنة
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // سياسة أمان المحتوى — تحدد المصادر المسموحة
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
