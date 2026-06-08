export type SubscribersI18n = {
  title: string;
  subtitle: string;
  mockHint: string;
  stoppedPageHint: string;
  registryHint: string;
  expiringPageHint: string;
  titleProfile: string;
  titleNew: string;
  status: {
    active: string;
    suspended: string;
    paused: string;
    no_subscription: string;
    stopped: string;
  };
  filters: {
    search: string;
    searchPlaceholder: string;
    status: string;
    status_all: string;
    status_active: string;
    status_paused: string;
    status_no_subscription: string;
    speed: string;
  };
  actions: {
    add: string;
    addWithoutSubscription: string;
    import: string;
    export: string;
    openProfile: string;
    deleteSelected: string;
    deleteAll: string;
  };
  table: {
    sectionTitle: string;
    sectionSubtitle: string;
    subscriber: string;
    lineId: string;
    username: string;
    password: string;
    fullName: string;
    phone: string;
    speed: string;
    disconnect: string;
    status: string;
    actions: string;
    empty: string;
    emptyHint: string;
    count: string;
    selectedCount: string;
    daysLeft: string;
    selectAll: string;
    createdAt: string;
  };
  form: {
    fullName: string;
    fullNameRequired: string;
    facilityType: string;
    facilityTypeOther: string;
    facilityTypeOtherRequired: string;
    lineNumber: string;
    lineNumberRequired: string;
    phone: string;
    notes: string;
    editTitle: string;
    create: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
    deleteTitle: string;
    deleteMessage: string;
    deleteBulkTitle: string;
    deleteBulkMessage: string;
    deleteBulkSuccess: string;
    deleteAllTitle: string;
    deleteAllMessage: string;
    deleteAllSuccess: string;
  };
  add: {
    withUsernameTitle: string;
    withoutUsernameTitle: string;
    withUsernameHint: string;
    withoutUsernameHint: string;
    usernameRequired: string;
    passwordRequired: string;
  };
  import: {
    title: string;
    hint: string;
    columns: {
      id: string;
      username: string;
      password: string;
      fullName: string;
      phone: string;
      line: string;
      speed: string;
    };
  };
  export: { mockMessage: string };
  profile: {
    backToList: string;
    backToStopped: string;
    notFound: string;
    movedToStopped: string;
    movedToExpiring: string;
    noUsername: string;
    stopSubscriber: string;
    stopTitle: string;
    stopMessage: string;
    stopConfirm: string;
    stopSuccess: string;
    pauseSubscriber: string;
    pauseTitle: string;
    pauseMessage: string;
    pauseConfirm: string;
    pauseSuccess: string;
    unpauseSubscriber: string;
    unpauseTitle: string;
    unpauseMessage: string;
    unpauseConfirm: string;
    unpauseSuccess: string;
    firstContact: string;
    disconnection: string;
    formSection: string;
    newPassword: string;
    passwordEditHint: string;
    speedEditHint: string;
    speedUpdateSuccess: string;
    router: {
      sectionTitle: string;
      sectionHint: string;
      nameLabel: string;
      imageAlt: string;
      noImage: string;
      empty: string;
    };
    tabs: { stats: string; invoices: string; username: string };
    stats: {
      usageDays: string;
      usageDaysHint: string;
      daysLeft: string;
      daysLeftHint: string;
      balance: string;
      monthlyPrice: string;
    };
  };
  invoices: {
    balance: string;
    add: string;
    addTitle: string;
    addHint: string;
    empty: string;
    amount: string;
    amountRequired: string;
    paid: string;
    paidAmount: string;
    paymentMethod: string;
    paymentMethodSelect: string;
    paymentMethodRequired: string;
    paymentMethodUnset: string;
    paymentMethod_cash: string;
    paymentMethod_transfer: string;
    paymentMethod_credit: string;
    status: string;
    status_unpaid: string;
    status_partial: string;
    status_paid: string;
    status_debt: string;
    createSuccess: string;
    delete: string;
    deleteTitle: string;
    deleteMessage: string;
    deleteSuccess: string;
    apiPending: string;
  };
  username: {
    changeUsername: string;
    assignFromPool: string;
    assignTitle: string;
    assignHint: string;
    changeTitle: string;
    changeHint: string;
    changeModalHint: string;
    changeSuccess: string;
    reactivateSuccess: string;
    stoppedTitle: string;
    stoppedNoUsername: string;
    stoppedWithStaleUsername: string;
    pickSpeedForPool: string;
    noSpeedTiers: string;
    confirmPick: string;
    poolEmpty: string;
    current: string;
    editPassword: string;
    editPasswordHint: string;
    savePassword: string;
    passwordRequired: string;
    passwordMin: string;
    passwordUpdated: string;
    historyTitle: string;
    historyEmpty: string;
    historyAdd: string;
    historyAddTitle: string;
    historyAddHint: string;
    historyEdit: string;
    historyEditTitle: string;
    historyEditHint: string;
    historyDelete: string;
    historyDeleteTitle: string;
    historyDeleteMessage: string;
    historyUsernameRequired: string;
    historyCreateSuccess: string;
    historyUpdateSuccess: string;
    historyDeleteSuccess: string;
    poolSpeedLabel: string;
    poolSpeedHint: string;
    poolSpeedMissing: string;
    speedHistoryTitle: string;
    speedHistoryEmpty: string;
    usageStart: string;
    usageEnd: string;
    changedAt: string;
    fromSpeed: string;
    toSpeed: string;
    daysUsed: string;
    apiPending: string;
  };
};

export const subscribersEn: SubscribersI18n = {
  title: "Subscribers",
  subtitle: "Active subscriptions with a valid cycle — assign usernames from Customers.",
  mockHint: "Mock data for UI review — backend contract is in STRUCTURE.md.",
  stoppedPageHint: "Stopped on",
  registryHint: "Add people on",
  expiringPageHint: "Expired cycle on",
  titleProfile: "Subscriber profile",
  titleNew: "Add subscriber",
  status: {
    active: "Active",
    suspended: "Suspended",
    paused: "Paused temporarily",
    no_subscription: "No subscription",
    stopped: "Stopped",
  },
  filters: {
    search: "Search",
    searchPlaceholder: "Name, phone, username, line ID…",
    status: "Status",
    status_all: "All",
    status_active: "Active",
    status_paused: "Paused temporarily",
    status_no_subscription: "No username",
    speed: "Speed",
  },
  actions: {
    add: "Add with username",
    addWithoutSubscription: "Add without username",
    import: "Import Excel",
    export: "Export",
    openProfile: "Open profile",
    deleteSelected: "Delete selected ({{count}})",
    deleteAll: "Delete all",
  },
  table: {
    sectionTitle: "All subscribers",
    sectionSubtitle: "{{count}} shown after filters",
    subscriber: "Subscriber",
    lineId: "Line ID",
    username: "Username",
    password: "Password",
    fullName: "Full name",
    phone: "Phone",
    speed: "Speed",
    disconnect: "Disconnect",
    status: "Status",
    actions: "Actions",
    empty: "No subscribers match your filters",
    emptyHint: "Try clearing search or changing status or speed filters.",
    count: "{{count}} subscriber(s)",
    selectedCount: "{{count}} selected",
    daysLeft: "{{count}}d left",
    selectAll: "Select all",
    createdAt: "Created",
  },
  form: {
    fullName: "Full name",
    fullNameRequired: "Full name is required",
    facilityType: "Facility type",
    facilityTypeOther: "Specify facility type",
    facilityTypeOtherRequired: "Facility type is required",
    lineNumber: "Line number",
    lineNumberRequired: "Line number is required",
    phone: "Phone",
    notes: "Notes",
    editTitle: "Edit {{lineId}}",
    create: "Create subscriber",
    createSuccess: "Subscriber created",
    updateSuccess: "Subscriber updated",
    deleteSuccess: "Subscriber deleted",
    deleteTitle: "Delete subscriber",
    deleteMessage: "Delete {{lineId}}? This cannot be undone.",
    deleteBulkTitle: "Delete selected subscribers",
    deleteBulkMessage: "Delete {{count}} selected subscriber(s)?",
    deleteBulkSuccess: "Deleted {{count}} subscriber(s)",
    deleteAllTitle: "Delete all subscribers",
    deleteAllMessage: "Delete all {{count}} subscribers? This cannot be undone.",
    deleteAllSuccess: "All subscribers deleted",
  },
  add: {
    withUsernameTitle: "Add subscriber with username",
    withoutUsernameTitle: "Add subscriber (no username yet)",
    withUsernameHint: "Assigns a pool username and starts the subscription cycle.",
    withoutUsernameHint: "Creates a line ID only — assign username later from the profile.",
    usernameRequired: "Username is required",
    passwordRequired: "Password is required",
  },
  import: {
    title: "Import subscribers",
    hint: "Excel import will call POST /api/v1/subscribers/upload. Columns (AR/EN headers supported):",
    columns: {
      id: "Line ID",
      username: "Username",
      password: "Password",
      fullName: "Full name",
      phone: "Phone",
      line: "Package line",
      speed: "Speed (Mbps)",
    },
  },
  export: { mockMessage: "Export will download Excel when API is connected" },
  profile: {
    backToList: "Back to subscribers",
    backToStopped: "Back to stopped",
    notFound: "Subscriber not found.",
    movedToStopped: "This account is stopped (موقوف) — see the Stopped page.",
    movedToExpiring: "Subscription cycle ended — listed on Expiring. Customer record:",
    noUsername: "No username assigned",
    stopSubscriber: "Stop subscriber",
    stopTitle: "Stop subscriber",
    stopMessage: "Move {{name}} to stopped list and return username to the pool?",
    stopConfirm: "Stop",
    stopSuccess: "Subscriber stopped — username returned to pool when not expired",
    pauseSubscriber: "Pause temporarily",
    pauseTitle: "Pause temporarily",
    pauseMessage: "Mark {{name}} as temporarily paused?",
    pauseConfirm: "Pause",
    pauseSuccess: "Subscriber paused temporarily",
    unpauseSubscriber: "Cancel pause",
    unpauseTitle: "Cancel temporary pause",
    unpauseMessage: "Resume {{name}} to active status?",
    unpauseConfirm: "Resume",
    unpauseSuccess: "Temporary pause cancelled — subscriber is active again",
    firstContact: "First contact",
    disconnection: "Disconnect date",
    formSection: "Subscriber details",
    newPassword: "New password",
    passwordEditHint: "Leave blank to keep the current password. Username cannot be changed here.",
    speedEditHint: "Change speed here. Username pool picks use this speed — edit it on the Statistics tab, not when assigning.",
    speedUpdateSuccess: "Speed updated",
    router: {
      sectionTitle: "Router / CPE",
      sectionHint: "Customer premises equipment linked to this subscription (API connection coming soon).",
      nameLabel: "Router name",
      imageAlt: "Router photo",
      noImage: "No router image",
      empty: "No router assigned yet — will appear here when connected to the server.",
    },
    tabs: { stats: "Statistics", invoices: "Invoices", username: "Username" },
    stats: {
      usageDays: "Days in cycle",
      usageDaysHint: "Since first contact",
      daysLeft: "Days until disconnect",
      daysLeftHint: "31-day cycle",
      balance: "Balance",
      monthlyPrice: "{{price}} ₪ / month",
    },
  },
  invoices: {
    balance: "Account balance",
    add: "Add invoice",
    addTitle: "Add invoice",
    addHint: "Invoice amount and optional payment. Balance updates automatically (mock).",
    empty: "No invoices yet.",
    amount: "Invoice amount (₪)",
    amountRequired: "Enter a valid amount",
    paid: "Paid",
    paidAmount: "Amount paid now (₪)",
    paymentMethod: "Payment method",
    paymentMethodSelect: "Select payment method",
    paymentMethodRequired: "Payment method is required",
    paymentMethodUnset: "Not set",
    paymentMethod_cash: "Cash",
    paymentMethod_transfer: "Transfer",
    paymentMethod_credit: "Balance",
    status: "Status",
    status_unpaid: "Unpaid",
    status_partial: "Partial",
    status_paid: "Paid",
    status_debt: "Debt",
    createSuccess: "Invoice added",
    delete: "Delete invoice",
    deleteTitle: "Delete invoice?",
    deleteMessage: "Remove invoice #{{id}} ({{amount}} ₪)? The account balance will be adjusted.",
    deleteSuccess: "Invoice deleted",
    apiPending: "Invoice API pending",
  },
  username: {
    changeUsername: "Change username",
    assignFromPool: "Assign username",
    assignTitle: "Assign username from pool",
    assignHint:
      "Pick an available username to reactivate this subscriber. They return to the active subscribers list.",
    changeTitle: "Pick username from pool",
    changeHint:
      "If the current username is not expired, it returns to the pool and expiry keeps counting. Expired usernames stay in history only.",
    changeModalHint:
      "Select an available username. The current one is released to the pool (if not expired) or recorded in history only (if expired).",
    changeSuccess: "Username changed",
    reactivateSuccess: "Username assigned — subscriber is active again",
    stoppedTitle: "Stopped subscriber",
    stoppedNoUsername:
      "No username is linked. Assign one from the pool below to move them back to active subscribers.",
    stoppedWithStaleUsername:
      "Assign a new username from the pool below to reactivate (previous username was released on stop).",
    pickSpeedForPool: "Speed tier (pool)",
    noSpeedTiers: "Add speed tiers first, then add available usernames for that speed.",
    confirmPick: "Confirm",
    poolEmpty: "No usernames available for this speed. Add them from Available Usernames.",
    current: "Current credentials",
    editPassword: "Change password",
    editPasswordHint: "Username cannot be changed here. Enter a new password for this subscriber.",
    savePassword: "Save password",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 4 characters",
    passwordUpdated: "Password updated",
    historyTitle: "Username history",
    historyEmpty: "No previous usernames.",
    historyAdd: "Add entry",
    historyAddTitle: "Add username history",
    historyAddHint: "Manual record for a past username (e.g. migrated data).",
    historyEdit: "Edit entry",
    historyEditTitle: "Edit username history",
    historyEditHint: "Update username, password, or usage dates.",
    historyDelete: "Delete entry",
    historyDeleteTitle: "Delete history entry?",
    historyDeleteMessage: "Remove {{username}} from the history log?",
    historyUsernameRequired: "Username is required",
    historyCreateSuccess: "History entry added",
    historyUpdateSuccess: "History entry updated",
    historyDeleteSuccess: "History entry deleted",
    poolSpeedLabel: "Pool speed",
    poolSpeedHint: "Usernames are loaded from this speed tier. Change speed on the Statistics tab.",
    poolSpeedMissing: "Set the subscriber speed on the Statistics tab before picking from the pool.",
    speedHistoryTitle: "Speed history",
    speedHistoryEmpty: "No speed changes recorded.",
    usageStart: "Usage start",
    usageEnd: "Usage end",
    changedAt: "Changed",
    fromSpeed: "From",
    toSpeed: "To",
    daysUsed: "Days",
    apiPending: "Username API pending",
  },
};

export const subscribersAr: SubscribersI18n = {
  title: "المشتركين",
  subtitle: "اشتراكات نشطة بدورة صالحة — تعيين الأسماء من صفحة الزبائن.",
  mockHint: "بيانات تجريبية لمراجعة الواجهة — عقد الـ API في STRUCTURE.md.",
  stoppedPageHint: "الموقوفون في",
  registryHint: "إضافة الأشخاص من",
  expiringPageHint: "منتهي الدورة في",
  titleProfile: "ملف المشترك",
  titleNew: "إضافة مشترك",
  status: {
    active: "نشط",
    suspended: "موقوف",
    paused: "موقف مؤقتاً",
    no_subscription: "بدون اشتراك",
    stopped: "متوقف",
  },
  filters: {
    search: "بحث",
    searchPlaceholder: "اسم، هاتف، اسم مستخدم، رقم الخط…",
    status: "الحالة",
    status_all: "الكل",
    status_active: "نشط",
    status_paused: "موقف مؤقتاً",
    status_no_subscription: "بدون اسم مستخدم",
    speed: "السرعة",
  },
  actions: {
    add: "إضافة مع اسم مستخدم",
    addWithoutSubscription: "إضافة بدون اسم مستخدم",
    import: "استيراد Excel",
    export: "تصدير",
    openProfile: "فتح الملف",
    deleteSelected: "حذف المحدد ({{count}})",
    deleteAll: "حذف الكل",
  },
  table: {
    sectionTitle: "قائمة المشتركين",
    sectionSubtitle: "{{count}} يظهر بعد الفلاتر",
    subscriber: "المشترك",
    lineId: "رقم الخط",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    phone: "الهاتف",
    speed: "السرعة",
    disconnect: "تاريخ الفصل",
    status: "الحالة",
    actions: "إجراءات",
    empty: "لا يوجد مشتركون يطابقون الفلتر",
    emptyHint: "جرّب مسح البحث أو تغيير فلتر الحالة أو السرعة.",
    count: "{{count}} مشترك",
    selectedCount: "{{count}} محدد",
    daysLeft: "باقي {{count}} يوم",
    selectAll: "تحديد الكل",
    createdAt: "تاريخ الإضافة",
  },
  form: {
    fullName: "الاسم الكامل",
    fullNameRequired: "الاسم مطلوب",
    facilityType: "نوع المنشأة",
    facilityTypeOther: "حدد نوع المنشأة",
    facilityTypeOtherRequired: "نوع المنشأة مطلوب",
    lineNumber: "رقم الخط",
    lineNumberRequired: "رقم الخط مطلوب",
    phone: "الهاتف",
    notes: "ملاحظات",
    editTitle: "تعديل {{lineId}}",
    create: "إنشاء مشترك",
    createSuccess: "تم إنشاء المشترك",
    updateSuccess: "تم تحديث المشترك",
    deleteSuccess: "تم حذف المشترك",
    deleteTitle: "حذف مشترك",
    deleteMessage: "حذف {{lineId}}؟ لا يمكن التراجع.",
    deleteBulkTitle: "حذف المشتركين المحددين",
    deleteBulkMessage: "حذف {{count}} مشترك محدد؟",
    deleteBulkSuccess: "تم حذف {{count}} مشترك",
    deleteAllTitle: "حذف كل المشتركين",
    deleteAllMessage: "حذف جميع المشتركين ({{count}})؟ لا يمكن التراجع.",
    deleteAllSuccess: "تم حذف كل المشتركين",
  },
  add: {
    withUsernameTitle: "إضافة مشترك مع اسم مستخدم",
    withoutUsernameTitle: "إضافة مشترك بدون اسم مستخدم",
    withUsernameHint: "تعيين اسم من المجموعة وبدء دورة الاشتراك.",
    withoutUsernameHint: "إنشاء رقم خط فقط — تعيين الاسم لاحقاً من الملف.",
    usernameRequired: "اسم المستخدم مطلوب",
    passwordRequired: "كلمة المرور مطلوبة",
  },
  import: {
    title: "استيراد المشتركين",
    hint: "الاستيراد سيستدعي POST /api/v1/subscribers/upload. الأعمدة (عربي/إنجليزي):",
    columns: {
      id: "رقم الخط",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      phone: "الهاتف",
      line: "رقم الخط",
      speed: "السرعة (ميجا)",
    },
  },
  export: { mockMessage: "التصدير سيحمّل Excel عند ربط الـ API" },
  profile: {
    backToList: "العودة للمشتركين",
    backToStopped: "العودة للموقوفين",
    notFound: "المشترك غير موجود.",
    movedToStopped: "هذا الحساب موقوف — راجع صفحة المتوقفين.",
    movedToExpiring: "انتهت دورة الاشتراك — يظهر في المنتهية. ملف الزبون:",
    noUsername: "لم يُعيَّن اسم مستخدم",
    stopSubscriber: "إيقاف المشترك",
    stopTitle: "إيقاف المشترك",
    stopMessage: "نقل {{name}} لقائمة المتوقفين وإرجاع الاسم للمجموعة؟",
    stopConfirm: "إيقاف",
    stopSuccess: "تم إيقاف المشترك — يُعاد الاسم للمجموعة إن لم يكن منتهيًا",
    pauseSubscriber: "توقيف مؤقت",
    pauseTitle: "توقيف مؤقت",
    pauseMessage: "تعليم {{name}} كموقف مؤقتاً؟",
    pauseConfirm: "توقيف مؤقت",
    pauseSuccess: "تم التوقيف المؤقت للمشترك",
    unpauseSubscriber: "إلغاء التوقيف",
    unpauseTitle: "إلغاء التوقيف المؤقت",
    unpauseMessage: "إعادة {{name}} إلى الحالة النشطة؟",
    unpauseConfirm: "إلغاء التوقيف",
    unpauseSuccess: "تم إلغاء التوقيف المؤقت — المشترك نشط مجدداً",
    firstContact: "أول اتصال",
    disconnection: "تاريخ الفصل",
    formSection: "بيانات المشترك",
    newPassword: "كلمة مرور جديدة",
    passwordEditHint: "اترك الحقل فارغاً للإبقاء على كلمة المرور الحالية. لا يمكن تغيير اسم المستخدم من هنا.",
    speedEditHint: "غيّر السرعة من هنا. اختيار الاسم من المجموعة يستخدم هذه السرعة — عدّلها من تبويب الإحصائيات وليس عند التعيين.",
    speedUpdateSuccess: "تم تحديث السرعة",
    router: {
      sectionTitle: "الراوتر / جهاز العميل",
      sectionHint: "جهاز الاشتراك في موقع الزبون (سيتم الربط بالسيرفر لاحقاً).",
      nameLabel: "اسم الراوتر",
      imageAlt: "صورة الراوتر",
      noImage: "لا توجد صورة",
      empty: "لم يُعيَّن راوتر بعد — سيظهر هنا عند الربط بالسيرفر.",
    },
    tabs: { stats: "الإحصائيات", invoices: "الفواتير", username: "اسم المستخدم" },
    stats: {
      usageDays: "أيام في الدورة",
      usageDaysHint: "منذ أول اتصال",
      daysLeft: "أيام حتى الفصل",
      daysLeftHint: "دورة 31 يوماً",
      balance: "الرصيد",
      monthlyPrice: "{{price}} ₪ / شهر",
    },
  },
  invoices: {
    balance: "رصيد الحساب",
    add: "إضافة فاتورة",
    addTitle: "إضافة فاتورة",
    addHint: "مبلغ الفاتورة والدفعة اختياريًا. يتحدث الرصيد تلقائيًا (تجريبي).",
    empty: "لا توجد فواتير بعد.",
    amount: "مبلغ الفاتورة (₪)",
    amountRequired: "أدخل مبلغًا صالحًا",
    paid: "المدفوع",
    paidAmount: "المبلغ المدفوع الآن (₪)",
    paymentMethod: "طريقة الدفع",
    paymentMethodSelect: "اختر طريقة الدفع",
    paymentMethodRequired: "طريقة الدفع مطلوبة",
    paymentMethodUnset: "غير محدد",
    paymentMethod_cash: "نقدي",
    paymentMethod_transfer: "تحويل",
    paymentMethod_credit: "رصيد",
    status: "الحالة",
    status_unpaid: "غير مدفوعة",
    status_partial: "جزئي",
    status_paid: "مدفوعة",
    status_debt: "دين",
    createSuccess: "تمت إضافة الفاتورة",
    delete: "حذف الفاتورة",
    deleteTitle: "حذف الفاتورة؟",
    deleteMessage: "حذف الفاتورة رقم {{id}} ({{amount}} ₪)؟ سيتم تعديل رصيد الحساب.",
    deleteSuccess: "تم حذف الفاتورة",
    apiPending: "واجهة الفواتير قيد الربط",
  },
  username: {
    changeUsername: "تغيير اسم المستخدم",
    assignFromPool: "تعيين اسم مستخدم",
    assignTitle: "تعيين اسم من المجموعة",
    assignHint: "اختر اسمًا متاحًا لإعادة تفعيل المشترك — يعود إلى قائمة المشتركين النشطين.",
    changeTitle: "اختيار اسم من المجموعة",
    changeHint:
      "إن لم ينتهِ الاسم الحالي يُعاد للمجموعة ويستمر عدّ مدة الانتهاء. إن انتهى يُسجّل في السجل فقط.",
    changeModalHint:
      "اختر اسمًا متاحًا. الاسم الحالي يُعاد للمجموعة (إن لم ينتهِ) أو يُسجّل في السجل فقط (إن انتهى).",
    changeSuccess: "تم تغيير اسم المستخدم",
    reactivateSuccess: "تم تعيين الاسم — المشترك نشط مرة أخرى",
    stoppedTitle: "مشترك موقوف",
    stoppedNoUsername:
      "لا يوجد اسم مستخدم مرتبط. عيّن اسمًا من المجموعة أدناه لإعادته إلى المشتركين النشطين.",
    stoppedWithStaleUsername:
      "عيّن اسمًا جديدًا من المجموعة لإعادة التفعيل (الاسم السابق أُعيد للمجموعة عند الإيقاف).",
    pickSpeedForPool: "سرعة الباقة (المجموعة)",
    noSpeedTiers: "أضف سرعات أولًا، ثم أسماء مستخدمين متاحة لهذه السرعة.",
    confirmPick: "تأكيد",
    poolEmpty: "لا توجد أسماء متاحة لهذه السرعة. أضفها من صفحة الأسماء المتاحة.",
    current: "بيانات الدخول الحالية",
    editPassword: "تغيير كلمة المرور",
    editPasswordHint: "لا يمكن تغيير اسم المستخدم من هنا. أدخل كلمة مرور جديدة لهذا المشترك.",
    savePassword: "حفظ كلمة المرور",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordMin: "كلمة المرور يجب أن تكون 4 أحرف على الأقل",
    passwordUpdated: "تم تحديث كلمة المرور",
    historyTitle: "سجل أسماء المستخدمين",
    historyEmpty: "لا يوجد أسماء سابقة.",
    historyAdd: "إضافة سجل",
    historyAddTitle: "إضافة سجل اسم مستخدم",
    historyAddHint: "سجل يدوي لاسم مستخدم سابق (مثلاً بيانات قديمة).",
    historyEdit: "تعديل السجل",
    historyEditTitle: "تعديل سجل اسم المستخدم",
    historyEditHint: "تحديث اسم المستخدم أو كلمة المرور أو تواريخ الاستخدام.",
    historyDelete: "حذف السجل",
    historyDeleteTitle: "حذف سجل من السجل؟",
    historyDeleteMessage: "إزالة {{username}} من سجل الأسماء؟",
    historyUsernameRequired: "اسم المستخدم مطلوب",
    historyCreateSuccess: "تمت إضافة السجل",
    historyUpdateSuccess: "تم تحديث السجل",
    historyDeleteSuccess: "تم حذف السجل",
    poolSpeedLabel: "سرعة المجموعة",
    poolSpeedHint: "تُحمَّل الأسماء من هذه السرعة. غيّر السرعة من تبويب الإحصائيات.",
    poolSpeedMissing: "حدّد سرعة المشترك من تبويب الإحصائيات قبل الاختيار من المجموعة.",
    speedHistoryTitle: "سجل تغيير السرعة",
    speedHistoryEmpty: "لا يوجد تغييرات سرعة.",
    usageStart: "بداية الاستخدام",
    usageEnd: "نهاية الاستخدام",
    changedAt: "تاريخ التغيير",
    fromSpeed: "من",
    toSpeed: "إلى",
    daysUsed: "أيام",
    apiPending: "واجهة الأسماء قيد الربط",
  },
};
