export type OnlineUsersI18n = {
  title: string;
  subtitle: string;
  liveCount: string;
  autoRefresh: string;
  syncing: string;
  refresh: string;
  lastUpdated: string;
  mikrotikError: string;
  notConfigured: string;
  filters: {
    search: string;
    searchPlaceholder: string;
  };
  table: {
    sectionSubtitle: string;
    index: string;
    username: string;
    fullName: string;
    ipAddress: string;
    callerId: string;
    service: string;
    uptime: string;
    status: string;
    updatedAt: string;
    online: string;
    empty: string;
    emptyHint: string;
    noResults: string;
    openProfile: string;
  };
};

export const onlineUsersEn: OnlineUsersI18n = {
  title: "Online users",
  subtitle: "PPPoE sessions active on MikroTik — refreshes every 30 seconds.",
  liveCount: "{{count}} connected",
  autoRefresh: "Auto-refresh 30s",
  syncing: "Syncing…",
  refresh: "Refresh now",
  lastUpdated: "Router snapshot",
  mikrotikError: "Could not reach MikroTik. Check server settings and network.",
  notConfigured: "MikroTik is not configured on the server (MIKROTIK_HOST / USERNAME / PASSWORD).",
  filters: {
    search: "Search",
    searchPlaceholder: "Username, subscriber name, IP, MAC…",
  },
  table: {
    sectionSubtitle: "{{count}} shown",
    index: "#",
    username: "Username",
    fullName: "Subscriber name",
    ipAddress: "IP address",
    callerId: "MAC / Caller ID",
    service: "Service",
    uptime: "Uptime",
    status: "Status",
    updatedAt: "Updated",
    online: "Online",
    empty: "No one is connected right now",
    emptyHint: "When subscribers connect via PPPoE they will appear here.",
    noResults: "No matches for your search",
    openProfile: "Open subscriber profile",
  },
};

export const onlineUsersAr: OnlineUsersI18n = {
  title: "المتصلين",
  subtitle: "جلسات PPPoE النشطة على MikroTik — يتم التحديث كل 30 ثانية.",
  liveCount: "{{count}} متصل",
  autoRefresh: "تحديث تلقائي كل 30 ث",
  syncing: "جاري التحديث…",
  refresh: "تحديث الآن",
  lastUpdated: "لقطة من الراوتر",
  mikrotikError: "تعذّر الاتصال بـ MikroTik. تحقق من إعدادات الخادم والشبكة.",
  notConfigured: "لم يُضبط MikroTik على الخادم (MIKROTIK_HOST / USERNAME / PASSWORD).",
  filters: {
    search: "بحث",
    searchPlaceholder: "اسم مستخدم، اسم مشترك، IP، MAC…",
  },
  table: {
    sectionSubtitle: "{{count}} معروض",
    index: "#",
    username: "اسم المستخدم",
    fullName: "اسم المشترك",
    ipAddress: "عنوان IP",
    callerId: "MAC / Caller ID",
    service: "الخدمة",
    uptime: "مدة الاتصال",
    status: "الحالة",
    updatedAt: "آخر تحديث",
    online: "متصل",
    empty: "لا يوجد متصلون حالياً",
    emptyHint: "عند اتصال المشتركين عبر PPPoE ستظهر أسماؤهم هنا.",
    noResults: "لا توجد نتائج للبحث",
    openProfile: "فتح ملف المشترك",
  },
};
