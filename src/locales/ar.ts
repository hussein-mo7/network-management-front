import type { CustomersI18n } from "./customers.i18n";
import { customersAr } from "./customers.i18n";
import type { ExpiringI18n } from "./expiring.i18n";
import { expiringAr } from "./expiring.i18n";
import type { FinanceI18n } from "./finance.i18n";
import { financeAr } from "./finance.i18n";
import type { StoppedI18n } from "./stopped.i18n";
import { stoppedAr } from "./stopped.i18n";
import type { SmsI18n } from "./sms.i18n";
import { smsAr } from "./sms.i18n";
import type { StatisticsI18n } from "./statistics.i18n";
import { statisticsAr } from "./statistics.i18n";
import type { OnlineUsersI18n } from "./onlineUsers.i18n";
import { onlineUsersAr } from "./onlineUsers.i18n";
import type { SubscribersI18n } from "./subscribers.i18n";
import { subscribersAr } from "./subscribers.i18n";

export interface TranslationSchema {
  common: {
    loading: string;
    networkError: string;
    unexpectedError: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    retry: string;
    all: string;
  };
  pageTitles: {
    login: string;
  };
  brand: {
    tagline: string;
  };
  auth: {
    welcome: string;
    subtitle: string;
    username: string;
    usernamePlaceholder: string;
    usernameRequired: string;
    password: string;
    passwordPlaceholder: string;
    passwordRequired: string;
    showPassword: string;
    hidePassword: string;
    submit: string;
    loginSuccess: string;
    loginFailed: string;
    loginError: string;
    devModeTitle: string;
    devModeMessage: string;
    panelTitle: string;
    panelSubtitle: string;
    statSubscribers: string;
    statMonitoring: string;
    statControl: string;
    copyright: string;
    backToLogin: string;
    forgotPasswordLink: string;
    forgotPassword: {
      title: string;
      subtitle: string;
      email: string;
      emailPlaceholder: string;
      emailRequired: string;
      emailInvalid: string;
      submit: string;
      successTitle: string;
      successMessage: string;
      error: string;
    };
    resetPassword: {
      title: string;
      subtitle: string;
      newPassword: string;
      newPasswordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      passwordRequired: string;
      confirmPasswordRequired: string;
      passwordMinLength: string;
      passwordMismatch: string;
      submit: string;
      success: string;
      error: string;
      invalidTokenTitle: string;
      invalidTokenMessage: string;
      requestNewLink: string;
    };
  };
  language: {
    switchToEnglish: string;
    switchToArabic: string;
    shortEnglish: string;
    shortArabic: string;
    switchAriaToEnglish: string;
    switchAriaToArabic: string;
  };
  nav: {
    dashboard: string;
    logout: string;
    toggleTheme: string;
    openMenu: string;
    closeMenu: string;
    items: {
      home: string;
      statistics: string;
      customers: string;
      subscribers: string;
      onlineUsers: string;
      expiring: string;
      stopped: string;
      speeds: string;
      availableUsernames: string;
      sms: string;
      support: string;
      finance: string;
      users: string;
      logs: string;
    };
  };
  home: {
    title: string;
    subtitle: string;
    cards: {
      subscribers: { title: string; description: string };
      onlineUsers: { title: string; description: string };
      statistics: { title: string; description: string };
      finance: { title: string; description: string };
    };
  };
  pages: {
    underDevelopment: string;
    expiring: string;
    users: string;
  };
  dev: {
    userName: string;
  };
  roles: {
    admin: string;
    viewer: string;
  };
  speeds: {
    title: string;
    subtitle: string;
    hint: string;
    deletedBadge: string;
    actions: {
      add: string;
      restore: string;
    };
    stats: {
      total: string;
      available: string;
      price: string;
    };
    form: {
      addTitle: string;
      editTitle: string;
      create: string;
      valueMbps: string;
      valueMbpsPlaceholder: string;
      valueMbpsRequired: string;
      valueMbpsMin: string;
      price: string;
      pricePlaceholder: string;
      priceRequired: string;
      priceMin: string;
      hint: string;
      duplicate: string;
      createSuccess: string;
      updateSuccess: string;
      deleteSuccess: string;
      restoreSuccess: string;
      deleteTitle: string;
      deleteMessage: string;
      deleteMessageWithUsernames: string;
    };
  };
  availableUsernames: {
    title: string;
    subtitle: string;
    pickSpeed: string;
    sectionTitle: string;
    sectionSubtitle: string;
    lifecycleHint: string;
    emptyForSpeed: string;
    emptyForFilter: string;
    filters: {
      all: string;
      new: string;
      inCooldown: string;
      owner: string;
    };
    actions: {
      add: string;
      addForSpeed: string;
      import: string;
      importForSpeed: string;
      export: string;
      deleteAll: string;
      deleteAllForSpeed: string;
    };
    table: {
      username: string;
      password: string;
      speed: string;
      status: string;
      expires: string;
      createdAt: string;
      actions: string;
    };
    status: {
      new: string;
      inCooldown: string;
      owner: string;
      ownerNeverExpires: string;
      notAssigned: string;
      expiresIn: string;
      expiresOn: string;
      firstConnectionAt: string;
      expiresAt: string;
    };
    details: {
      title: string;
      close: string;
      view: string;
      firstConnection: string;
      expiresAt: string;
      addedDate: string;
      addedFull: string;
    };
    form: {
      addTitle: string;
      editTitle: string;
      create: string;
      speed: string;
      usernamePlaceholder: string;
      usernameRequired: string;
      passwordPlaceholder: string;
      passwordRequired: string;
      passwordMin: string;
      passwordEditHint: string;
      usernameEditHint: string;
      status: string;
      statusHint: string;
      statusNewHint: string;
      statusRunningHint: string;
      statusOwnerHint: string;
      assignedAt: string;
      assignedAtHint: string;
      assignedAtRequired: string;
      expiryPreview: string;
      statusEditHint: string;
      duplicateUsername: string;
      createSuccess: string;
      updateSuccess: string;
      deleteSuccess: string;
      deleteTitle: string;
      deleteMessage: string;
      deleteAllTitle: string;
      deleteAllMessage: string;
      deleteAllSuccess: string;
      importTitle: string;
      importHint: string;
      selectFile: string;
      importSubmit: string;
      importSuccess: string;
      exportSuccess: string;
    };
  };
  customers: CustomersI18n;
  stopped: StoppedI18n;
  expiring: ExpiringI18n;
  onlineUsers: OnlineUsersI18n;
  finance: FinanceI18n;
  statistics: StatisticsI18n;
  subscribers: SubscribersI18n;
  sms: SmsI18n;
  support: {
    title: string;
    subtitle: string;
    hint: string;
    actions: {
      addTicket: string;
      deleteAll: string;
    };
    stats: {
      open: string;
      openHint: string;
      inProgress: string;
      inProgressHint: string;
      resolvedToday: string;
      resolvedTodayHint: string;
      resolvedWeek: string;
      avgResolution: string;
    };
    charts: {
      byStatus: string;
      byStatusHint: string;
      dailyTrend: string;
      dailyTrendHint: string;
      weeklyActivity: string;
      weeklyActivityHint: string;
      byChannel: string;
      byChannelHint: string;
      created: string;
      resolved: string;
    };
    status: {
      open: string;
      in_progress: string;
      waiting_customer: string;
      resolved: string;
    };
    priority: {
      low: string;
      medium: string;
      high: string;
      urgent: string;
    };
    channel: {
      phone: string;
      visit: string;
      whatsapp: string;
      other: string;
    };
    table: {
      sectionTitle: string;
      sectionSubtitle: string;
      empty: string;
      ticket: string;
      title: string;
      subscriber: string;
      channel: string;
      priority: string;
      status: string;
      createdAt: string;
      actions: string;
    };
    form: {
      addTitle: string;
      editTitle: string;
      create: string;
      title: string;
      titlePlaceholder: string;
      titleRequired: string;
      description: string;
      descriptionPlaceholder: string;
      descriptionRequired: string;
      status: string;
      priority: string;
      channel: string;
      subscriberName: string;
      subscriberNamePlaceholder: string;
      subscriberNameRequired: string;
      subscriberPhone: string;
      subscriberPhonePlaceholder: string;
      subscriberPhoneRequired: string;
      assignedTo: string;
      assignedToPlaceholder: string;
      assignedToRequired: string;
      hint: string;
      createSuccess: string;
      updateSuccess: string;
      deleteSuccess: string;
      deleteTitle: string;
      deleteMessage: string;
      deleteAllTitle: string;
      deleteAllMessage: string;
      deleteAllSuccess: string;
    };
  };
}

export const ar: TranslationSchema = {
  common: {
    loading: "جاري التحميل...",
    networkError: "تعذّر الاتصال بالخادم — تأكد أن الـ backend يعمل",
    unexpectedError: "حدث خطأ غير متوقع",
    edit: "تعديل",
    delete: "حذف",
    cancel: "إلغاء",
    save: "حفظ",
    retry: "إعادة المحاولة",
    all: "الكل",
  },
  pageTitles: {
    login: "تسجيل الدخول",
  },
  brand: {
    tagline: "إدارة اشتراكات الإنترنت",
  },
  auth: {
    welcome: "مرحباً بعودتك",
    subtitle: "سجّل دخولك للوصول إلى لوحة التحكم",
    username: "اسم المستخدم",
    usernamePlaceholder: "أدخل اسم المستخدم",
    usernameRequired: "اسم المستخدم مطلوب",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    passwordRequired: "كلمة المرور مطلوبة",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    submit: "تسجيل الدخول",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    loginFailed: "فشل تسجيل الدخول",
    loginError: "حدث خطأ أثناء تسجيل الدخول",
    devModeTitle: "وضع التطوير:",
    devModeMessage: "الخادم غير متصل — أي اسم مستخدم وكلمة مرور ستعمل. استخدم viewer كاسم مستخدم لتجربة وضع المشاهد.",
    panelTitle: "لوحة تحكم متكاملة لإدارة اشتراكات WiFi بكل سهولة ووضوح.",
    panelSubtitle:
      "تابع المشتركين، الفواتير، الأسماء المتاحة، والمتصلين — كل شيء في مكان واحد.",
    statSubscribers: "مشترك",
    statMonitoring: "متابعة",
    statControl: "تحكم",
    copyright: "جميع الحقوق محفوظة",
    backToLogin: "العودة لتسجيل الدخول",
    forgotPasswordLink: "نسيت كلمة المرور؟",
    forgotPassword: {
      title: "نسيت كلمة المرور",
      subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
      email: "البريد الإلكتروني",
      emailPlaceholder: "example@company.com",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "أدخل بريداً إلكترونياً صالحاً",
      submit: "إرسال رابط الاستعادة",
      successTitle: "تحقق من بريدك",
      successMessage:
        "إذا كان البريد مسجلاً لدينا، ستصلك رسالة تحتوي على رابط لإعادة تعيين كلمة المرور.",
      error: "تعذّر إرسال رابط الاستعادة. حاول مرة أخرى.",
    },
    resetPassword: {
      title: "إعادة تعيين كلمة المرور",
      subtitle: "اختر كلمة مرور جديدة لحسابك.",
      newPassword: "كلمة المرور الجديدة",
      newPasswordPlaceholder: "أدخل كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
      passwordRequired: "كلمة المرور مطلوبة",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordMinLength: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      passwordMismatch: "كلمتا المرور غير متطابقتين",
      submit: "حفظ كلمة المرور",
      success: "تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن.",
      error: "تعذّر إعادة تعيين كلمة المرور. قد يكون الرابط منتهياً.",
      invalidTokenTitle: "رابط غير صالح",
      invalidTokenMessage: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية.",
      requestNewLink: "طلب رابط جديد",
    },
  },
  language: {
    switchToEnglish: "English",
    switchToArabic: "العربية",
    shortEnglish: "EN",
    shortArabic: "ع",
    switchAriaToEnglish: "Switch to English",
    switchAriaToArabic: "التبديل إلى العربية",
  },
  nav: {
    dashboard: "لوحة التحكم",
    logout: "خروج",
    toggleTheme: "تبديل المظهر",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    items: {
      home: "الرئيسية",
      statistics: "الاحصائيات",
      customers: "الزبائن",
      subscribers: "المشتركين",
      onlineUsers: "المتصلين",
      expiring: "المنتهية",
      stopped: "المتوقفون",
      speeds: "السرعات",
      availableUsernames: "أسماء متاحة",
      sms: "إرسال رسائل",
      support: "الدعم الفني",
      finance: "المالية",
      users: "المستخدمين",
      logs: "سجل العمليات",
    },
  },
  home: {
    title: "الرئيسية",
    subtitle: "مرحباً بك في لوحة تحكم WeWiFi. اختر قسماً من القائمة للبدء.",
    cards: {
      subscribers: {
        title: "المشتركين",
        description: "إدارة الزبائن والاشتراكات",
      },
      onlineUsers: {
        title: "المتصلين",
        description: "عرض المتصلين عبر MikroTik",
      },
      statistics: {
        title: "الاحصائيات",
        description: "مؤشرات وبيانات حقيقية",
      },
      finance: {
        title: "المالية",
        description: "الفواتير والديون والإيرادات",
      },
    },
  },
  pages: {
    underDevelopment: "هذه الصفحة قيد التطوير — سيتم ربطها بالـ API قريباً.",
    expiring: "المنتهية والقريبة من الانتهاء",
    users: "المستخدمين والصلاحيات",
  },
  dev: {
    userName: "مدير التطوير",
  },
  roles: {
    admin: "مدير",
    viewer: "مشاهد",
  },
  speeds: {
    title: "السرعات",
    subtitle: "عرّف سرعات الإنترنت المتاحة. كل سرعة لها جدول أسماء مستخدمة خاص بها.",
    hint: "بعد إضافة سرعة، انتقل إلى «أسماء متاحة» واختر السرعة لإدارة الأسماء واستيراد Excel.",
    deletedBadge: "محذوفة",
    actions: {
      add: "إضافة سرعة",
      restore: "استعادة",
    },
    stats: {
      total: "{{count}} اسم",
      available: "{{count}} جاهز",
      price: "{{price}} ₪ / شهر",
    },
    form: {
      addTitle: "إضافة سرعة",
      editTitle: "تعديل {{speed}}",
      create: "إضافة",
      valueMbps: "السرعة (Mbps)",
      valueMbpsPlaceholder: "مثال: 64",
      valueMbpsRequired: "السرعة مطلوبة",
      valueMbpsMin: "أدخل سرعة أكبر من صفر",
      price: "السعر الشهري (₪)",
      pricePlaceholder: "مثال: 120",
      priceRequired: "السعر مطلوب",
      priceMin: "السعر لا يمكن أن يكون سالباً",
      hint: "سيتم إنشاء التسمية تلقائياً (مثل 64 Mbps).",
      duplicate: "هذه السرعة موجودة مسبقاً",
      createSuccess: "تمت إضافة السرعة",
      updateSuccess: "تم تحديث السرعة",
      deleteSuccess: "تم حذف السرعة",
      restoreSuccess: "تمت استعادة {{speed}}",
      deleteTitle: "حذف السرعة",
      deleteMessage: "هل تريد حذف {{speed}}؟",
      deleteMessageWithUsernames:
        "تحذير: {{speed}} مرتبطة بـ {{count}} اسم مستخدم. حذفها قد يؤثر على الأسماء المسجّلة.",
    },
  },
  availableUsernames: {
    title: "أسماء متاحة",
    subtitle:
      "اختر سرعة لإدارة مجموعة الأسماء. يبقى الاسم هنا خلال فترة الانتظار بعد التعيين حتى انتهاء الصلاحية.",
    pickSpeed: "اختر السرعة",
    sectionTitle: "أسماء {{speed}}",
    sectionSubtitle: "{{count}} معروض · {{total}} في المجموعة لسرعة {{speed}}",
    lifecycleHint:
      "عند تعيين اسم لمشترك يدخل فترة انتظار {{days}} يوماً (قيد التشغيل). يبقى ظاهراً هنا مع تاريخ انتهاء، ثم ينتقل إلى «منتهية» بعد انتهاء الانتظار. أسماء المالك لا تنتهي.",
    emptyForSpeed: "لا توجد أسماء لسرعة {{speed}} بعد.",
    emptyForFilter: "لا توجد أسماء تطابق هذا الفلتر.",
    filters: {
      all: "الكل في المجموعة",
      new: "جديد",
      inCooldown: "قيد التشغيل",
      owner: "مالك",
    },
    actions: {
      add: "إضافة اسم",
      addForSpeed: "إضافة اسم — {{speed}}",
      import: "استيراد Excel",
      importForSpeed: "استيراد Excel — {{speed}}",
      export: "تصدير",
      deleteAll: "حذف الكل",
      deleteAllForSpeed: "حذف الكل — {{speed}}",
    },
    table: {
      username: "اسم المستخدم",
      password: "كلمة المرور",
      speed: "السرعة",
      status: "الحالة",
      expires: "ينتهي",
      createdAt: "تاريخ الإضافة",
      actions: "إجراءات",
    },
    status: {
      new: "جديد",
      inCooldown: "قيد التشغيل",
      owner: "مالك",
      ownerNeverExpires: "لا ينتهي",
      notAssigned: "لم يُعيَّن بعد",
      expiresIn: "خلال {{count}} يوم",
      expiresOn: "حتى {{date}}",
      firstConnectionAt: "أول اتصال: {{datetime}}",
      expiresAt: "ينتهي: {{datetime}}",
    },
    details: {
      title: "تفاصيل {{username}}",
      close: "إغلاق",
      view: "عرض التفاصيل",
      firstConnection: "أول اتصال",
      expiresAt: "تاريخ الانتهاء",
      addedDate: "تاريخ الإضافة",
      addedFull: "وقت الإضافة (كامل)",
    },
    form: {
      addTitle: "إضافة اسم — {{speed}}",
      editTitle: "تعديل {{username}}",
      create: "إضافة",
      speed: "السرعة",
      usernamePlaceholder: "أدخل اسم المستخدم",
      usernameRequired: "اسم المستخدم مطلوب",
      passwordPlaceholder: "أدخل كلمة المرور",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordMin: "كلمة المرور يجب أن تكون 4 أحرف على الأقل",
      passwordEditHint: "اترك الحقل فارغاً للإبقاء على كلمة المرور الحالية.",
      usernameEditHint: "لا يمكن تغيير اسم المستخدم بعد إنشائه.",
      status: "الحالة",
      statusHint: "اختر الحالة عند الإضافة — لاستيراد اسم كان قيد التشغيل خارج النظام اختر «قيد التشغيل» وأدخل تاريخ البدء.",
      statusNewHint: "لم يُستخدم بعد — جاهز للتعيين لمشترك جديد.",
      statusRunningHint: "مُستخدم سابقاً ولا يزال ضمن فترة الانتظار — أدخل تاريخ بدء الاستخدام.",
      statusOwnerHint: "اسم مالك — لا ينتهي ولا يدخل فترة انتظار.",
      assignedAt: "وقت أول اتصال (يوم / ساعة / دقيقة)",
      assignedAtHint: "يُحسب وقت الانتهاء تلقائياً بعد {{days}} يوماً من هذا التاريخ والوقت.",
      assignedAtRequired: "وقت أول اتصال مطلوب لحالة قيد التشغيل",
      expiryPreview: "ينتهي {{datetime}} — متبقي {{count}} يوم",
      statusEditHint:
        "يمكنك تغيير الحالة عند التعديل. عند اختيار «جديد» يُحذف وقت أول اتصال ووقت الانتهاء من السجل.",
      duplicateUsername: "اسم المستخدم موجود مسبقاً",
      createSuccess: "تمت إضافة الاسم",
      updateSuccess: "تم تحديث الاسم",
      deleteSuccess: "تم حذف الاسم",
      deleteTitle: "حذف اسم متاح",
      deleteMessage: "هل تريد حذف {{username}}؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteAllTitle: "حذف كل أسماء {{speed}}",
      deleteAllMessage:
        "حذف نهائي لجميع الأسماء ({{count}}) في مجموعة {{speed}}؟ السرعات الأخرى لن تتأثر. لا يمكن التراجع.",
      deleteAllSuccess: "تم حذف {{count}} اسم من {{speed}}",
      importTitle: "استيراد Excel — {{speed}}",
      importHint:
        "ارفع Excel (.xlsx): العمود A اسم المستخدم، العمود B كلمة المرور فقط. لا تعيد استيراد ملف التصدير (فيه أعمدة إضافية). الأسماء المكررة مرفوضة.",
      selectFile: "اختر ملفاً",
      importSubmit: "استيراد",
      importSuccess: "تم استيراد {{count}} اسم",
      exportSuccess: "تم تصدير أسماء {{speed}} (وضع تجريبي)",
    },
  },
  customers: customersAr,
  stopped: stoppedAr,
  expiring: expiringAr,
  onlineUsers: onlineUsersAr,
  finance: financeAr,
  statistics: statisticsAr,
  subscribers: subscribersAr,
  sms: smsAr,
  support: {
    title: "الدعم الفني",
    subtitle:
      "تسجيل مشاكل المشتركين من المكالمات وزيارات المكتب. متابعة التذاكر وأداء الفريق.",
    hint: "التذاكر يُنشئها فريق الدعم يدوياً — المشتركون لا يفتحون تذاكر من الموقع.",
    actions: {
      addTicket: "تذكرة جديدة",
      deleteAll: "حذف كل التذاكر",
    },
    stats: {
      open: "تذاكر مفتوحة",
      openHint: "مشاكل جديدة بانتظار المعالجة",
      inProgress: "قيد المعالجة",
      inProgressHint: "جاري العمل عليها الآن",
      resolvedToday: "حُلّت اليوم",
      resolvedTodayHint: "{{created}} جديدة اليوم",
      resolvedWeek: "حُلّت هذا الأسبوع",
      avgResolution: "متوسط الحل ~{{hours}} س",
    },
    charts: {
      byStatus: "التذاكر حسب الحالة",
      byStatusHint: "توزيع العمل الحالي",
      dailyTrend: "آخر 7 أيام",
      dailyTrendHint: "مُنشأة مقابل محلولة يومياً",
      weeklyActivity: "نشاط الأسبوع",
      weeklyActivityHint: "مقارنة الحجم حسب اليوم",
      byChannel: "قناة التواصل",
      byChannelHint: "كيف تواصل المشتركون مع الدعم",
      created: "مُنشأة",
      resolved: "محلولة",
    },
    status: {
      open: "مفتوحة",
      in_progress: "قيد المعالجة",
      waiting_customer: "بانتظار المشترك",
      resolved: "محلولة",
    },
    priority: {
      low: "منخفضة",
      medium: "متوسطة",
      high: "عالية",
      urgent: "عاجلة",
    },
    channel: {
      phone: "هاتف",
      visit: "زيارة المكتب",
      whatsapp: "واتساب",
      other: "أخرى",
    },
    table: {
      sectionTitle: "التذاكر",
      sectionSubtitle: "{{count}} تذكرة",
      empty: "لا توجد تذاكر لهذا الفلتر.",
      ticket: "رقم التذكرة",
      title: "العنوان / المشكلة",
      subscriber: "المشترك",
      channel: "القناة",
      priority: "الأولوية",
      status: "الحالة",
      createdAt: "تاريخ الإنشاء",
      actions: "إجراءات",
    },
    form: {
      addTitle: "تذكرة دعم جديدة",
      editTitle: "تعديل {{ticket}}",
      create: "إنشاء تذكرة",
      title: "العنوان",
      titlePlaceholder: "مثال: يحتاج برمجة راوتر",
      titleRequired: "العنوان مطلوب",
      description: "تفاصيل المشكلة",
      descriptionPlaceholder: "صف ما أبلغ عنه المشترك…",
      descriptionRequired: "تفاصيل المشكلة مطلوبة",
      status: "الحالة",
      priority: "الأولوية",
      channel: "قناة التواصل",
      subscriberName: "اسم المشترك",
      subscriberNamePlaceholder: "الاسم الكامل",
      subscriberNameRequired: "اسم المشترك مطلوب",
      subscriberPhone: "رقم الهاتف",
      subscriberPhonePlaceholder: "0599123456",
      subscriberPhoneRequired: "رقم الهاتف مطلوب",
      assignedTo: "مسند إلى",
      assignedToPlaceholder: "عضو فريق الدعم",
      assignedToRequired: "المسند إليه مطلوب",
      hint: "استخدم مفتوحة للمكالمات الجديدة، قيد المعالجة أثناء الإصلاح، بانتظار المشترك عند الحاجة لرد، محلولة عند الانتهاء.",
      createSuccess: "تم إنشاء التذكرة",
      updateSuccess: "تم تحديث التذكرة",
      deleteSuccess: "تم حذف التذكرة",
      deleteTitle: "حذف تذكرة",
      deleteMessage: "هل تريد حذف {{ticket}}؟ لا يمكن التراجع.",
      deleteAllTitle: "حذف كل تذاكر الدعم",
      deleteAllMessage: "حذف نهائي لجميع التذاكر ({{count}})؟ لا يمكن التراجع.",
      deleteAllSuccess: "تم حذف {{count}} تذكرة",
    },
  },
};
