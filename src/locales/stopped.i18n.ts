export type StoppedI18n = {
  title: string;
  subtitle: string;
  table: {
    sectionSubtitle: string;
    subscriber: string;
    lineId: string;
    fullName: string;
    phone: string;
    balance: string;
    stoppedAt: string;
    owesBalance: string;
    balanceCleared: string;
    actions: string;
    empty: string;
    emptyHint: string;
    openCustomer: string;
    openProfile: string;
  };
  actions: {
    restore: string;
    restoreSuccess: string;
  };
};

export const stoppedEn: StoppedI18n = {
  title: "Stopped",
  subtitle:
    "Subscribers who were stopped (موقوف). Username returned to available pool. Customer record remains for balance.",
  table: {
    sectionSubtitle: "{{count}} stopped",
    subscriber: "Customer",
    lineId: "Line ID",
    fullName: "Name",
    phone: "Phone",
    balance: "Balance",
    stoppedAt: "Stopped on",
    owesBalance: "Outstanding balance",
    balanceCleared: "No debt — can assign username",
    actions: "Actions",
    empty: "No stopped subscribers",
    emptyHint: "Stopped accounts appear here after you stop an active subscription.",
    openCustomer: "Customer file",
    openProfile: "Open profile",
  },
  actions: {
    restore: "Reactivate",
    restoreSuccess: "Reactivated (mock)",
  },
};

export const stoppedAr: StoppedI18n = {
  title: "المتوقفون",
  subtitle:
    "مشتركون تم إيقافهم (موقوف). أُعيد اسم المستخدم للمجموعة. يبقى ملف الزبون للرصيد.",
  table: {
    sectionSubtitle: "{{count}} موقوف",
    subscriber: "الزبون",
    lineId: "رقم الخط",
    fullName: "الاسم",
    phone: "الهاتف",
    balance: "الرصيد",
    stoppedAt: "تاريخ الإيقاف",
    owesBalance: "رصيد مستحق",
    balanceCleared: "لا دين — يمكن تعيين اسم مستخدم",
    actions: "إجراءات",
    empty: "لا يوجد موقوفون",
    emptyHint: "يظهر الموثوفون هنا بعد إيقاف اشتراك نشط.",
    openCustomer: "ملف الزبون",
    openProfile: "فتح الملف",
  },
  actions: {
    restore: "إعادة تفعيل",
    restoreSuccess: "تمت إعادة التفعيل (تجريبي)",
  },
};
