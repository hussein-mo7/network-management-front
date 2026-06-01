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
      subscribers: string;
      onlineUsers: string;
      expiring: string;
      stopped: string;
      speeds: string;
      availableUsernames: string;
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
    actions: {
      add: string;
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
    emptyForSpeed: string;
    actions: {
      addForSpeed: string;
      importForSpeed: string;
      export: string;
    };
    table: {
      username: string;
      password: string;
      speed: string;
      status: string;
      createdAt: string;
      actions: string;
    };
    status: {
      available: string;
      used: string;
      owner: string;
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
      ownerUsername: string;
      ownerHint: string;
      ownerEditHint: string;
      duplicateUsername: string;
      createSuccess: string;
      updateSuccess: string;
      deleteSuccess: string;
      deleteTitle: string;
      deleteMessage: string;
      importTitle: string;
      importHint: string;
      selectFile: string;
      importSubmit: string;
      importSuccess: string;
      exportSuccess: string;
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
      subscribers: "المشتركين",
      onlineUsers: "المتصلين",
      expiring: "المنتهية",
      stopped: "المتوقفون",
      speeds: "السرعات",
      availableUsernames: "أسماء متاحة",
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
    expiring: "الاشتراكات المنتهية",
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
    actions: {
      add: "إضافة سرعة",
    },
    stats: {
      total: "{{count}} اسم",
      available: "{{count}} متاح",
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
      deleteTitle: "حذف السرعة",
      deleteMessage: "هل تريد حذف {{speed}}؟",
      deleteMessageWithUsernames:
        "تحذير: {{speed}} مرتبطة بـ {{count}} اسم مستخدم. حذفها قد يؤثر على الأسماء المسجّلة.",
    },
  },
  availableUsernames: {
    title: "أسماء متاحة",
    subtitle: "اختر سرعة لعرض وإدارة الأسماء المتاحة لهذه السرعة فقط.",
    pickSpeed: "اختر السرعة",
    sectionTitle: "أسماء {{speed}}",
    sectionSubtitle: "{{count}} اسم مسجّل لسرعة {{speed}}",
    emptyForSpeed: "لا توجد أسماء متاحة لسرعة {{speed}} بعد.",
    actions: {
      addForSpeed: "إضافة اسم — {{speed}}",
      importForSpeed: "استيراد Excel — {{speed}}",
      export: "تصدير",
    },
    table: {
      username: "اسم المستخدم",
      password: "كلمة المرور",
      speed: "السرعة",
      status: "الحالة",
      createdAt: "تاريخ الإضافة",
      actions: "إجراءات",
    },
    status: {
      available: "متاح",
      used: "مستخدم",
      owner: "مالك",
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
      ownerUsername: "اسم مالك (Owner)",
      ownerHint: "أسماء المالك (Owner) لا تنتهي صلاحيتها على الخادم.",
      ownerEditHint: "حالة المالك (Owner) تُحدَّد عند الإنشاء ولا يمكن تغييرها.",
      duplicateUsername: "اسم المستخدم موجود مسبقاً",
      createSuccess: "تمت إضافة الاسم",
      updateSuccess: "تم تحديث الاسم",
      deleteSuccess: "تم حذف الاسم",
      deleteTitle: "حذف اسم متاح",
      deleteMessage: "هل تريد حذف {{username}}؟",
      importTitle: "استيراد Excel — {{speed}}",
      importHint: "ارفع ملف Excel أو CSV لإضافة أسماء لسرعة {{speed}}.",
      selectFile: "اختر ملفاً",
      importSubmit: "استيراد",
      importSuccess: "تم استيراد {{file}} (وضع تجريبي)",
      exportSuccess: "تم تصدير أسماء {{speed}} (وضع تجريبي)",
    },
  },
};
