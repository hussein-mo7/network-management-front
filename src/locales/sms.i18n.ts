export type SmsI18n = {
  title: string;
  subtitle: string;
  mockHint?: string;
  provider: string;
  charLimit: string;
  recipientMode: {
    subscribers: string;
    customers: string;
    custom: string;
  };
  filters: {
    label: string;
    customersHint: string;
    all: string;
    expires1Day: string;
    expires2Days: string;
    expiresSoon: string;
    expired: string;
    stopped: string;
    withDebt: string;
  };
  table: {
    sectionSubtitle: string;
    selectAll: string;
    clearSelection: string;
    selectedCount: string;
    subscriber: string;
    phone: string;
    daysLeft: string;
    balance: string;
    empty: string;
    emptyHint: string;
    noPhone: string;
    daysExpired: string;
    daysLeftValue: string;
  };
  sections: {
    send: string;
    logs: string;
    templates: string;
  };
  compose: {
    title: string;
    messageLabel: string;
    messagePlaceholder: string;
    templatesLabel: string;
    manageTemplates: string;
    customPhoneLabel: string;
    customPhonePlaceholder: string;
    customPhoneHint: string;
    send: string;
    sending: string;
    previewRecipients: string;
  };
  logs: {
    subtitle: string;
    empty: string;
    sentAt: string;
    sentBy: string;
    recipient: string;
    phone: string;
    message: string;
    status: string;
    statusSent: string;
    statusFailed: string;
    customRecipient: string;
    previous: string;
    next: string;
  };
  templatesPanel: {
    title: string;
    subtitle: string;
    add: string;
    addTitle: string;
    nameLabel: string;
    nameRequired: string;
    bodyLabel: string;
    bodyRequired: string;
    save: string;
    system: string;
    createdBy: string;
    createSuccess: string;
    deleteSuccess: string;
  };
  templates: {
    renewal: string;
    expired: string;
    support: string;
    blank: string;
  };
  tips: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
    note: string;
  };
  toast: {
    sent: string;
    partial: string;
    noRecipients: string;
    noMessage: string;
    noPhone: string;
  };
};

export const smsEn: SmsI18n = {
  title: "Send SMS",
  subtitle: "Notify subscribers about renewal, expiry, support, or custom messages — filter and select many at once.",
  provider: "TweetSMS",
  charLimit: "Up to 320 characters per message",
  recipientMode: {
    subscribers: "From subscribers",
    customers: "From customers",
    custom: "Custom number",
  },
  filters: {
    label: "Audience",
    customersHint: "Registered customers without a subscription yet — search by name, line ID, or phone.",
    all: "All active",
    expires1Day: "Ends in 1 day",
    expires2Days: "Ends in 2 days",
    expiresSoon: "Ends within 7 days",
    expired: "Already expired",
    stopped: "Stopped",
    withDebt: "With debt",
  },
  table: {
    sectionSubtitle: "{{count}} matching · {{selected}} selected",
    selectAll: "Select visible",
    clearSelection: "Clear selection",
    selectedCount: "{{count}} selected",
    subscriber: "Subscriber",
    phone: "Phone",
    daysLeft: "Subscription",
    balance: "Balance",
    empty: "No recipients match this filter",
    emptyHint: "Try another filter or add phone numbers to customer/subscriber profiles.",
    noPhone: "No phone",
    daysExpired: "Expired",
    daysLeftValue: "{{days}} days left",
  },
  sections: {
    send: "Send",
    logs: "Message log",
    templates: "Templates",
  },
  compose: {
    title: "Message",
    messageLabel: "Message text",
    messagePlaceholder: "Write a clear, short message…",
    templatesLabel: "Quick templates",
    manageTemplates: "Manage templates",
    customPhoneLabel: "Mobile number",
    customPhonePlaceholder: "e.g. 0599123456",
    customPhoneHint: "Send to any number, even if not in the subscriber list.",
    send: "Send message",
    sending: "Sending…",
    previewRecipients: "Will send to {{count}} recipient(s)",
  },
  logs: {
    subtitle: "History of sent messages — who sent each SMS and to whom.",
    empty: "No SMS messages logged yet.",
    sentAt: "Sent at",
    sentBy: "Sent by",
    recipient: "Recipient",
    phone: "Phone",
    message: "Message",
    status: "Status",
    statusSent: "Sent",
    statusFailed: "Failed",
    customRecipient: "Custom number",
    previous: "Previous",
    next: "Next",
  },
  templatesPanel: {
    title: "Quick templates",
    subtitle: "Save reusable messages for renewal, support, and reminders.",
    add: "New template",
    addTitle: "Add quick template",
    nameLabel: "Template name",
    nameRequired: "Name is required",
    bodyLabel: "Message text",
    bodyRequired: "Message is required",
    save: "Save template",
    system: "Built-in",
    createdBy: "Added by {{user}}",
    createSuccess: "Template saved",
    deleteSuccess: "Template deleted",
  },
  templates: {
    renewal: "WeWiFi: Your subscription renews soon. Contact us to avoid interruption. Thank you.",
    expired: "WeWiFi: Your subscription has ended. Please contact us to renew your line.",
    support: "WeWiFi: We tried to reach you regarding your account. Please call or message us.",
    blank: "",
  },
  tips: {
    title: "Tips for effective SMS",
    item1: "Identify the sender at the start (e.g. WeWiFi).",
    item2: "State the reason clearly — renewal, expiry, or support follow-up.",
    item3: "End with a call or WhatsApp for quick contact.",
    note: "You can send to multiple subscribers at once or a single custom number.",
  },
  toast: {
    sent: "Message sent to {{count}} recipient(s)",
    partial: "Sent {{sent}}, failed {{failed}}",
    noRecipients: "Select at least one recipient with a valid phone.",
    noMessage: "Enter a message before sending.",
    noPhone: "Enter a valid phone number.",
  },
};

export const smsAr: SmsI18n = {
  title: "إرسال رسائل SMS",
  subtitle: "أرسل تذكيراً بالتجديد أو انتهاء الاشتراك أو متابعة دعم — مع فلاتر واختيار عدة مشتركين دفعة واحدة.",
  provider: "TweetSMS",
  charLimit: "حتى 320 حرفاً لكل رسالة",
  recipientMode: {
    subscribers: "من المشتركين",
    customers: "من الزبائن",
    custom: "رقم آخر",
  },
  filters: {
    label: "الفئة",
    customersHint: "زبائن مسجلون بدون اشتراك بعد — ابحث بالاسم أو رقم الخط أو الهاتف.",
    all: "كل النشطين",
    expires1Day: "ينتهي خلال يوم",
    expires2Days: "ينتهي خلال يومين",
    expiresSoon: "ينتهي خلال أسبوع",
    expired: "منتهي بالفعل",
    stopped: "موقوفون",
    withDebt: "عليهم دين",
  },
  table: {
    sectionSubtitle: "{{count}} مطابق · {{selected}} محدد",
    selectAll: "تحديد الظاهر",
    clearSelection: "مسح التحديد",
    selectedCount: "{{count}} محدد",
    subscriber: "المشترك",
    phone: "الهاتف",
    daysLeft: "الاشتراك",
    balance: "الرصيد",
    empty: "لا يوجد مستلمون لهذا الفلتر",
    emptyHint: "جرّب فئة أخرى أو أضف أرقام هواتف في ملفات الزبائن/المشتركين.",
    noPhone: "بدون هاتف",
    daysExpired: "منتهي",
    daysLeftValue: "باقي {{days}} يوم",
  },
  sections: {
    send: "إرسال",
    logs: "سجل الرسائل",
    templates: "القوالب",
  },
  compose: {
    title: "الرسالة",
    messageLabel: "نص الرسالة",
    messagePlaceholder: "اكتب رسالة واضحة ومختصرة…",
    templatesLabel: "قوالب سريعة",
    manageTemplates: "إدارة القوالب",
    customPhoneLabel: "رقم الجوال",
    customPhonePlaceholder: "مثال: 0599123456",
    customPhoneHint: "يمكن الإرسال لأي رقم حتى لو لم يكن في قائمة المشتركين.",
    send: "إرسال الرسالة",
    sending: "جاري الإرسال…",
    previewRecipients: "سيُرسل إلى {{count}} مستلم",
  },
  logs: {
    subtitle: "سجل الرسائل المرسلة — من أرسلها وإلى من.",
    empty: "لا توجد رسائل مسجّلة بعد.",
    sentAt: "وقت الإرسال",
    sentBy: "أرسلها",
    recipient: "المستلم",
    phone: "الهاتف",
    message: "الرسالة",
    status: "الحالة",
    statusSent: "تم الإرسال",
    statusFailed: "فشل",
    customRecipient: "رقم مخصص",
    previous: "السابق",
    next: "التالي",
  },
  templatesPanel: {
    title: "قوالب سريعة",
    subtitle: "احفظ رسائل جاهزة للتجديد والدعم والتذكير.",
    add: "قالب جديد",
    addTitle: "إضافة قالب سريع",
    nameLabel: "اسم القالب",
    nameRequired: "الاسم مطلوب",
    bodyLabel: "نص الرسالة",
    bodyRequired: "النص مطلوب",
    save: "حفظ القالب",
    system: "افتراضي",
    createdBy: "أضافه {{user}}",
    createSuccess: "تم حفظ القالب",
    deleteSuccess: "تم حذف القالب",
  },
  templates: {
    renewal: "WeWiFi: اشتراكك على وشك الانتهاء. تواصل معنا لتجديد الخط دون انقطاع. شكراً لك.",
    expired: "WeWiFi: انتهى اشتراكك. يرجى التواصل معنا لتجديد الخط.",
    support: "WeWiFi: حاولنا التواصل معك بخصوص حسابك. يرجى الاتصال أو مراسلتنا.",
    blank: "",
  },
  tips: {
    title: "نصائح لرسائل ناجحة",
    item1: "عرّف بالمُرسل في البداية (مثال: WeWiFi).",
    item2: "اذكر سبب الرسالة بوضوح — تجديد، انتهاء، أو متابعة دعم.",
    item3: "اختم بدعوة للاتصال أو واتساب للتواصل السريع.",
    note: "يمكنك الإرسال لعدة مشتركين دفعة واحدة أو إلى رقم مخصص.",
  },
  toast: {
    sent: "تم إرسال الرسالة إلى {{count}} مستلم",
    partial: "تم إرسال {{sent}} وفشل {{failed}}",
    noRecipients: "حدد مستلماً واحداً على الأقل برقم هاتف صالح.",
    noMessage: "أدخل نص الرسالة قبل الإرسال.",
    noPhone: "أدخل رقم هاتف صالح.",
  },
};
