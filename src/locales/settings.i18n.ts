export type SettingsI18n = {
  title: string;
  subtitle: string;
  hub: {
    comingSoon: string;
    logs: { title: string; description: string };
    excel: { title: string; description: string };
    users: { title: string; description: string };
    data: { title: string; description: string };
  };
  data: {
    backToSettings: string;
    title: string;
    subtitle: string;
    dangerZoneTitle: string;
    dangerZoneHint: string;
    customers: {
      title: string;
      description: string;
      recordCount: string;
    };
    subscribers: {
      title: string;
      description: string;
      recordCount: string;
    };
  };
  excel: {
    backToSettings: string;
    title: string;
    subtitle: string;
    uiOnlyHint: string;
    importTitle: string;
    importDescription: string;
    exportTitle: string;
    exportDescription: string;
    chooseFile: string;
    downloadTemplate: string;
    previewTitle: string;
    previewDescription: string;
    sampleCell: string;
  };
};

export const settingsEn: SettingsI18n = {
  title: "Settings",
  subtitle: "Admin tools — activity log, data management, Excel import/export, and user management.",
  hub: {
    comingSoon: "UI only",
    logs: {
      title: "Activity log",
      description: "Who did what and when across the system.",
    },
    excel: {
      title: "Excel tools",
      description: "Import and export spreadsheets — layout preview until API is connected.",
    },
    users: {
      title: "Users & permissions",
      description: "Manage dashboard accounts and roles.",
    },
    data: {
      title: "Data management",
      description: "Bulk delete customers and subscribers — irreversible actions.",
    },
  },
  data: {
    backToSettings: "Back to settings",
    title: "Data management",
    subtitle: "Destructive bulk operations for customers and subscribers. Use only when you need to clear registry data.",
    dangerZoneTitle: "Danger zone",
    dangerZoneHint:
      "These actions permanently remove records and cannot be undone. Individual delete on list pages is unchanged.",
    customers: {
      title: "Delete all customers",
      description: "Remove every customer currently in the registry list.",
      recordCount: "{{count}} customers",
    },
    subscribers: {
      title: "Delete all subscribers",
      description: "Remove every active subscriber on the subscribers list (non-expired usernames).",
      recordCount: "{{count}} subscribers",
    },
  },
  excel: {
    backToSettings: "Back to settings",
    title: "Excel tools",
    subtitle: "Prepare bulk imports and exports. Backend connection is not wired yet.",
    uiOnlyHint: "This page is a UI preview only — file actions are disabled until the API is ready.",
    importTitle: "Import from Excel",
    importDescription: "Upload a spreadsheet to add or update subscribers and usernames in bulk.",
    exportTitle: "Export to Excel",
    exportDescription: "Download current lists as Excel for editing or reporting.",
    chooseFile: "Choose file",
    downloadTemplate: "Download template",
    previewTitle: "Sheet preview",
    previewDescription: "Example layout for a future import template.",
    sampleCell: "username",
  },
};

export const settingsAr: SettingsI18n = {
  title: "الإعدادات",
  subtitle: "أدوات الإدارة — سجل العمليات، إدارة البيانات، Excel، وإدارة المستخدمين.",
  hub: {
    comingSoon: "واجهة فقط",
    logs: {
      title: "سجل العمليات",
      description: "من قام بماذا ومتى في النظام.",
    },
    excel: {
      title: "أدوات Excel",
      description: "استيراد وتصدير جداول — معاينة الواجهة حتى ربط الـ API.",
    },
    users: {
      title: "المستخدمين والصلاحيات",
      description: "إدارة حسابات لوحة التحكم والأدوار.",
    },
    data: {
      title: "إدارة البيانات",
      description: "حذف جماعي للزبائن والمشتركين — إجراءات لا رجعة فيها.",
    },
  },
  data: {
    backToSettings: "العودة للإعدادات",
    title: "إدارة البيانات",
    subtitle: "عمليات حذف جماعية للزبائن والمشتركين. استخدمها فقط عند الحاجة لتفريغ السجل.",
    dangerZoneTitle: "منطقة خطرة",
    dangerZoneHint:
      "هذه الإجراءات تحذف السجلات نهائياً ولا يمكن التراجع. الحذف الفردي من صفحات القوائم يبقى كما هو.",
    customers: {
      title: "حذف كل الزبائن",
      description: "إزالة كل الزبائن الموجودين حالياً في سجل الزبائن.",
      recordCount: "{{count}} زبون",
    },
    subscribers: {
      title: "حذف كل المشتركين",
      description: "إزالة كل المشتركين النشطين في قائمة المشتركين (أسماء غير منتهية).",
      recordCount: "{{count}} مشترك",
    },
  },
  excel: {
    backToSettings: "العودة للإعدادات",
    title: "أدوات Excel",
    subtitle: "تجهيز الاستيراد والتصدير الجماعي. الربط بالخادم غير مفعّل بعد.",
    uiOnlyHint: "هذه الصفحة معاينة للواجهة فقط — إجراءات الملفات معطّلة حتى جاهزية الـ API.",
    importTitle: "استيراد من Excel",
    importDescription: "رفع جدول لإضافة أو تحديث المشتركين والأسماء دفعة واحدة.",
    exportTitle: "تصدير إلى Excel",
    exportDescription: "تنزيل القوائم الحالية كملف Excel للتعديل أو التقارير.",
    chooseFile: "اختيار ملف",
    downloadTemplate: "تنزيل قالب",
    previewTitle: "معاينة الجدول",
    previewDescription: "مثال لتخطيط قالب الاستيراد مستقبلاً.",
    sampleCell: "username",
  },
};
