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
    firstContact: string;
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
    firstContactRequired: string;
    firstContactNoUsername: string;
    disconnection: string;
    formSection: string;
    cycleOverview: string;
    currentSpeed: string;
    speedReadOnlyHint: string;
    newPassword: string;
    passwordEditHint: string;
    speedEditHint: string;
    speedUpdateSuccess: string;
    monthlyPriceLabel: string;
    monthlyPriceHint: string;
    monthlyPriceSectionTitle: string;
    monthlyPriceSectionHint: string;
    monthlyPriceRequired: string;
    monthlyPriceInvalid: string;
    sms: {
      title: string;
      subtitle: string;
      send: string;
      sendSuccess: string;
      noPhone: string;
      noPhoneHint: string;
      noTemplates: string;
      serverHint: string;
    };
    router: {
      sectionTitle: string;
      sectionHint: string;
      nameLabel: string;
      namePlaceholder: string;
      imageAlt: string;
      noImage: string;
      uploadImage: string;
      empty: string;
    };
    tabs: { stats: string; username: string; sms: string; pricing: string; invoices: string; logs: string };
    stats: {
      usageDays: string;
      usageDaysHint: string;
      daysLeft: string;
      daysLeftHint: string;
      balance: string;
      monthlyPrice: string;
      dataUsage: string;
      dataUsageHint: string;
      dataUsageNoUsername: string;
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
    preview: string;
    previewTitle: string;
    previewHeading: string;
    print: string;
    printedBy: string;
    printedAt: string;
    remaining: string;
    paidAt: string;
  };
  logs: {
    title: string;
    subtitle: string;
    sectionSubtitle: string;
    empty: string;
    emptyHint: string;
    loadError: string;
    by: string;
    systemUser: string;
    summaries: {
      Created: Record<string, string>;
      Updated: Record<string, string>;
      Deleted: Record<string, string>;
    };
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
    speedSectionTitle: string;
    speedSectionHint: string;
    saveSpeed: string;
    speedUnsavedWarning: string;
    speedHistoryTitle: string;
    speedHistoryEmpty: string;
    usageStart: string;
    usageEnd: string;
    changedAt: string;
    fromSpeed: string;
    toSpeed: string;
    daysUsed: string;
    apiPending: string;
    renewUsername: string;
    renewHint: string;
    renewSuccess: string;
    renewNoSpeed: string;
    renewConfirmTitle: string;
    renewConfirmMessage: string;
    assignConfirmTitle: string;
    assignConfirmMessage: string;
    changeConfirmTitle: string;
    changeConfirmMessage: string;
    changeCauseTitle: string;
    changeCauseHint: string;
    changeCauseRequired: string;
    changeCausePlaceholder: string;
    changeCauseColumn: string;
    changeCauseTemplates: {
      username_expired: string;
      quota_finished: string;
      subscriber_request: string;
      other: string;
    };
  };
};

export const subscribersEn: SubscribersI18n = {
  title: "Subscribers",
  subtitle: "Active subscriptions with a valid cycle — assign usernames from Customers.",
  mockHint: "Mock data for UI review — backend contract is in STRUCTURE.md.",
  stoppedPageHint: "Canceled subscriptions are on",
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
    firstContact: "First contact",
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
    backToStopped: "Back to canceled",
    notFound: "Subscriber not found.",
    movedToStopped: "This subscription was canceled — see the Canceled page.",
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
    firstContactRequired: "First contact date is required",
    firstContactNoUsername: "Assign a username before editing the first contact date.",
    disconnection: "Disconnect date",
    formSection: "User data",
    cycleOverview: "Billing cycle",
    currentSpeed: "Using {{speed}}",
    speedReadOnlyHint: "To change speed, go to the Username tab.",
    newPassword: "New password",
    passwordEditHint: "Leave blank to keep the current password. Username cannot be changed here.",
    speedEditHint: "Pick a speed to browse its username pool. The subscriber speed updates when you confirm a username.",
    speedUpdateSuccess: "Speed updated",
    monthlyPriceLabel: "Monthly price (₪)",
    monthlyPriceHint: "Custom monthly price for this subscriber.",
    monthlyPriceSectionTitle: "Custom monthly price",
    monthlyPriceSectionHint: "Set a custom price for this subscriber — separate from invoices.",
    monthlyPriceRequired: "Enter a monthly price",
    monthlyPriceInvalid: "Enter a valid price",
    sms: {
      title: "Send SMS",
      subtitle: "Send a text message to this subscriber via the SMS gateway.",
      send: "Send SMS",
      sendSuccess: "SMS sent successfully",
      noPhone: "No phone number",
      noPhoneHint: "Add a phone number in User data before sending SMS.",
      noTemplates: "No templates yet — create one under SMS → Templates.",
      serverHint: "Messages are sent through the server SMS provider (TweetSMS). Delivery is logged under SMS → Logs.",
    },
    router: {
      sectionTitle: "Router / CPE",
      sectionHint: "Saved together with the profile using Save below.",
      nameLabel: "Router name",
      namePlaceholder: "e.g. TP-Link Archer C6",
      imageAlt: "Router photo",
      noImage: "No router image",
      uploadImage: "Upload image",
      empty: "No router assigned yet.",
    },
    tabs: {
      stats: "User data",
      username: "Username",
      sms: "SMS",
      pricing: "Monthly price",
      invoices: "Invoices",
      logs: "Activity",
    },
    stats: {
      usageDays: "Days in cycle",
      usageDaysHint: "Since first contact",
      daysLeft: "Days until disconnect",
      daysLeftHint: "31-day cycle",
      balance: "Balance",
      monthlyPrice: "{{price}} ₪ / month",
      dataUsage: "Data usage",
      dataUsageHint: "Linked to {{username}} (upload + download)",
      dataUsageNoUsername: "Assign a username to track usage",
    },
  },
  invoices: {
    balance: "Account balance",
    add: "Add invoice",
    addTitle: "Add invoice",
    addHint: "Payment is added to the account balance. Pay the owed amount to reach zero, or more for credit (+).",
    empty: "No invoices yet.",
    amount: "Amount (₪)",
    amountRequired: "Enter a valid payment amount",
    paid: "Paid",
    paidAmount: "Payment amount (₪)",
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
    preview: "Preview / print invoice",
    previewTitle: "Invoice #{{id}}",
    previewHeading: "Invoice",
    print: "Print",
    printedBy: "Printed by",
    printedAt: "Print date",
    remaining: "Remaining",
    paidAt: "Paid on",
  },
  logs: {
    title: "Activity log",
    subtitle: "Changes made to this subscriber — who edited what and when.",
    sectionSubtitle: "{{count}} of {{total}} entries",
    empty: "No activity recorded for this subscriber yet",
    emptyHint: "Updates to the profile, username, invoices, and other actions will appear here.",
    loadError: "Could not load activity log for this subscriber.",
    by: "By {{name}}",
    systemUser: "System",
    summaries: {
      Created: {
        Subscriber: "Subscriber profile created",
        Invoice: "Invoice created",
        Username: "Username assigned",
        Customer: "Customer record created",
        SMS: "SMS sent",
        Speed: "Speed tier created",
        Other: "Record created",
      },
      Updated: {
        Subscriber: "Subscriber profile updated",
        Invoice: "Invoice updated",
        Username: "Username changed",
        Customer: "Customer record updated",
        SMS: "SMS updated",
        Speed: "Speed tier updated",
        Other: "Record updated",
      },
      Deleted: {
        Subscriber: "Subscriber removed",
        Invoice: "Invoice deleted",
        Username: "Username removed",
        Customer: "Customer record deleted",
        SMS: "SMS deleted",
        Speed: "Speed tier deleted",
        Other: "Record deleted",
      },
    },
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
    poolSpeedHint: "Usernames shown in the picker come from this speed tier.",
    poolSpeedMissing: "Select a speed above to browse available usernames.",
    speedSectionTitle: "Connection speed",
    speedSectionHint: "Choose the package speed, then assign or change the username from that pool.",
    saveSpeed: "Save speed",
    speedUnsavedWarning: "Select a speed above before picking a username.",
    speedHistoryTitle: "Speed history",
    speedHistoryEmpty: "No speed changes recorded.",
    usageStart: "Usage start",
    usageEnd: "Usage end",
    changedAt: "Changed",
    fromSpeed: "From",
    toSpeed: "To",
    daysUsed: "Days",
    apiPending: "Username API pending",
    renewUsername: "Renew username",
    renewHint:
      "Pulls the newest available username from the same speed tier automatically — same effect as a manual change.",
    renewSuccess: "Username renewed from the same speed pool",
    renewNoSpeed: "No speed tier linked — set speed on the Username tab first",
    renewConfirmTitle: "Renew username?",
    renewConfirmMessage:
      "Assign a new username from the pool for {{name}}? Current username {{username}} will be returned to the pool.",
    assignConfirmTitle: "Assign this username?",
    assignConfirmMessage: "Assign {{username}} to this subscriber?",
    changeConfirmTitle: "Assign new username?",
    changeConfirmMessage:
      "Replace {{current}} with {{username}}? The current username returns to the pool.",
    changeCauseTitle: "Reason for change",
    changeCauseHint: "Pick a reason or choose Other to write a custom note.",
    changeCauseRequired: "Enter a reason before confirming",
    changeCausePlaceholder: "Describe the reason…",
    changeCauseColumn: "Reason",
    changeCauseTemplates: {
      username_expired: "Username validity expired",
      quota_finished: "Data quota finished",
      subscriber_request: "Subscriber request",
      other: "Other (custom)",
    },
  },
};

export const subscribersAr: SubscribersI18n = {
  title: "المشتركين",
  subtitle: "اشتراكات نشطة بدورة صالحة — تعيين الأسماء من صفحة الزبائن.",
  mockHint: "بيانات تجريبية لمراجعة الواجهة — عقد الـ API في STRUCTURE.md.",
  stoppedPageHint: "المتوقفين في",
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
    firstContact: "أول اتصال",
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
    backToStopped: "العودة للمتوقفين",
    notFound: "المشترك غير موجود.",
    movedToStopped: "هذا الحساب متوقف — راجع صفحة المتوقفين.",
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
    firstContactRequired: "تاريخ أول اتصال مطلوب",
    firstContactNoUsername: "عيّن اسم مستخدم قبل تعديل تاريخ أول اتصال.",
    disconnection: "تاريخ الفصل",
    formSection: "بيانات المستخدم",
    cycleOverview: "نظرة على الدورة",
    currentSpeed: "نستخدم سرعة {{speed}}",
    speedReadOnlyHint: "لتغيير السرعة، انتقل إلى تبويب اسم المستخدم.",
    newPassword: "كلمة مرور جديدة",
    passwordEditHint: "اترك الحقل فارغاً للإبقاء على كلمة المرور الحالية. لا يمكن تغيير اسم المستخدم من هنا.",
    speedEditHint: "اختر السرعة لعرض أسماءها المتاحة. تتحدث سرعة المشترك عند تأكيد اختيار الاسم.",
    speedUpdateSuccess: "تم تحديث السرعة",
    monthlyPriceLabel: "السعر الشهري (₪)",
    monthlyPriceHint: "سعر شهري مخصص لهذا المشترك.",
    monthlyPriceSectionTitle: "السعر الشهري المخصص",
    monthlyPriceSectionHint: "حدّد سعراً شهرياً لهذا المشترك — منفصل عن الفواتير.",
    monthlyPriceRequired: "أدخل السعر الشهري",
    monthlyPriceInvalid: "أدخل سعراً صالحاً",
    sms: {
      title: "إرسال رسالة",
      subtitle: "أرسل رسالة نصية لهذا المشترك عبر بوابة SMS.",
      send: "إرسال SMS",
      sendSuccess: "تم إرسال الرسالة بنجاح",
      noPhone: "لا يوجد رقم هاتف",
      noPhoneHint: "أضف رقم هاتف في بيانات المستخدم قبل الإرسال.",
      noTemplates: "لا توجد قوالب بعد — أنشئ قالباً من SMS ← القوالب.",
      serverHint: "تُرسل الرسائل عبر مزود SMS على الخادم (TweetSMS). يُسجَّل الإرسال في SMS ← السجل.",
    },
    router: {
      sectionTitle: "الراوتر / جهاز العميل",
      sectionHint: "يُحفظ مع باقي الملف عند الضغط على حفظ بالأسفل.",
      nameLabel: "اسم الراوتر",
      namePlaceholder: "مثال: TP-Link Archer C6",
      imageAlt: "صورة الراوتر",
      noImage: "لا توجد صورة",
      uploadImage: "رفع صورة",
      empty: "لم يُعيَّن راوتر بعد.",
    },
    tabs: {
      stats: "بيانات المستخدم",
      username: "اسم المستخدم",
      sms: "رسائل",
      pricing: "السعر الشهري",
      invoices: "الفواتير",
      logs: "السجل",
    },
    stats: {
      usageDays: "أيام في الدورة",
      usageDaysHint: "منذ أول اتصال",
      daysLeft: "أيام حتى الفصل",
      daysLeftHint: "دورة 31 يوماً",
      balance: "الرصيد",
      monthlyPrice: "{{price}} ₪ / شهر",
      dataUsage: "كمية السحب",
      dataUsageHint: "مرتبطة بـ {{username}} (رفع + تنزيل)",
      dataUsageNoUsername: "عيّن اسم مستخدم لمتابعة الاستهلاك",
    },
  },
  invoices: {
    balance: "رصيد الحساب",
    add: "إضافة فاتورة",
    addTitle: "إضافة فاتورة",
    addHint: "يُضاف المبلغ إلى رصيد الحساب. ادفع المستحق للوصول إلى صفر، أو أكثر للحصول على رصيد موجب (+).",
    empty: "لا توجد فواتير بعد.",
    amount: "المبلغ (₪)",
    amountRequired: "أدخل مبلغ دفع صالحًا",
    paid: "المدفوع",
    paidAmount: "مبلغ الدفع (₪)",
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
    preview: "معاينة / طباعة فاتورة",
    previewTitle: "فاتورة رقم {{id}}",
    previewHeading: "فاتورة",
    print: "طباعة",
    printedBy: "طُبعت بواسطة",
    printedAt: "تاريخ الطباعة",
    remaining: "المتبقي",
    paidAt: "تاريخ الدفع",
  },
  logs: {
    title: "سجل النشاط",
    subtitle: "التغييرات على هذا المشترك — من قام بالتعديل وماذا ومتى.",
    sectionSubtitle: "{{count}} من {{total}} سجل",
    empty: "لا يوجد نشاط مسجّل لهذا المشترك بعد",
    emptyHint: "ستظهر هنا تحديثات الملف، اسم المستخدم، الفواتير، وغيرها من الإجراءات.",
    loadError: "تعذّر تحميل سجل النشاط لهذا المشترك.",
    by: "بواسطة {{name}}",
    systemUser: "النظام",
    summaries: {
      Created: {
        Subscriber: "تم إنشاء ملف المشترك",
        Invoice: "تم إنشاء فاتورة",
        Username: "تم تعيين اسم مستخدم",
        Customer: "تم إنشاء سجل زبون",
        SMS: "تم إرسال رسالة",
        Speed: "تم إنشاء سرعة",
        Other: "تم إنشاء سجل",
      },
      Updated: {
        Subscriber: "تم تحديث ملف المشترك",
        Invoice: "تم تحديث فاتورة",
        Username: "تم تغيير اسم المستخدم",
        Customer: "تم تحديث سجل الزبون",
        SMS: "تم تحديث رسالة",
        Speed: "تم تحديث السرعة",
        Other: "تم تحديث سجل",
      },
      Deleted: {
        Subscriber: "تم حذف المشترك",
        Invoice: "تم حذف فاتورة",
        Username: "تم إزالة اسم المستخدم",
        Customer: "تم حذف سجل الزبون",
        SMS: "تم حذف رسالة",
        Speed: "تم حذف السرعة",
        Other: "تم حذف سجل",
      },
    },
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
    poolSpeedHint: "الأسماء في نافذة الاختيار تُحمَّل من هذه السرعة.",
    poolSpeedMissing: "اختر سرعة أعلاه لعرض الأسماء المتاحة.",
    speedSectionTitle: "سرعة الاتصال",
    speedSectionHint: "اختر سرعة الباقة ثم عيّن أو غيّر اسم المستخدم من مجموعتها.",
    saveSpeed: "حفظ السرعة",
    speedUnsavedWarning: "اختر سرعة أعلاه قبل اختيار اسم مستخدم.",
    speedHistoryTitle: "سجل تغيير السرعة",
    speedHistoryEmpty: "لا يوجد تغييرات سرعة.",
    usageStart: "بداية الاستخدام",
    usageEnd: "نهاية الاستخدام",
    changedAt: "تاريخ التغيير",
    fromSpeed: "من",
    toSpeed: "إلى",
    daysUsed: "أيام",
    apiPending: "واجهة الأسماء قيد الربط",
    renewUsername: "تجديد يوزر",
    renewHint:
      "يسحب تلقائياً أحدث اسم متاح من نفس السرعة — بنفس تبعات التغيير اليدوي.",
    renewSuccess: "تم تجديد اسم المستخدم من نفس السرعة",
    renewNoSpeed: "لا توجد سرعة مرتبطة — حدّد السرعة من تبويب اسم المستخدم أولاً",
    renewConfirmTitle: "تجديد اسم المستخدم؟",
    renewConfirmMessage:
      "تعيين اسم جديد من المجموعة لـ {{name}}؟ سيعود الاسم الحالي {{username}} إلى المجموعة.",
    assignConfirmTitle: "تعيين هذا الاسم؟",
    assignConfirmMessage: "تعيين {{username}} لهذا المشترك؟",
    changeConfirmTitle: "تعيين اسم جديد؟",
    changeConfirmMessage:
      "استبدال {{current}} بـ {{username}}؟ سيعود الاسم الحالي إلى المجموعة.",
    changeCauseTitle: "سبب التغيير",
    changeCauseHint: "اختر سبباً أو اختر «أخرى» لكتابة ملاحظة مخصصة.",
    changeCauseRequired: "أدخل السبب قبل التأكيد",
    changeCausePlaceholder: "اكتب السبب…",
    changeCauseColumn: "السبب",
    changeCauseTemplates: {
      username_expired: "انتهاء صلاحية اسم المستخدم",
      quota_finished: "انتهاء الكوتة",
      subscriber_request: "تغيير سرعة",
      other: "أخرى (مخصص)",
    },
  },
};
