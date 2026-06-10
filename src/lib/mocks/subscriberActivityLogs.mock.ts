import { subHours, subMinutes } from "date-fns";
import type { SubscriberActivityLog } from "@/types/subscriberActivityLog";

const TEMPLATES: Array<Pick<SubscriberActivityLog, "action" | "subjectType" | "subjectName" | "adminName">> = [
  { action: "Updated", subjectType: "Subscriber", subjectName: null, adminName: "Operations Admin" },
  { action: "Updated", subjectType: "Username", subjectName: "ahmad.w04", adminName: "Operations Admin" },
  { action: "Created", subjectType: "Invoice", subjectName: "Invoice #20", adminName: "Super Admin" },
  { action: "Updated", subjectType: "Invoice", subjectName: "Invoice #20", adminName: "Super Admin" },
  { action: "Updated", subjectType: "Subscriber", subjectName: null, adminName: "Super Admin" },
  { action: "Deleted", subjectType: "Invoice", subjectName: "Invoice #18", adminName: "Operations Admin" },
];

function buildLogsForSubscriber(
  subscriberId: number,
  lineId: string,
  fullName: string,
): SubscriberActivityLog[] {
  const now = new Date();
  return TEMPLATES.map((template, index) => ({
    id: subscriberId * 100 + index + 1,
    createdAt: subMinutes(subHours(now, index * 6), index * 11).toISOString(),
    action: template.action,
    subjectType: template.subjectType,
    subjectId: subscriberId,
    subjectName:
      template.subjectType === "Subscriber"
        ? fullName || lineId
        : template.subjectName,
    adminId: index % 2 === 0 ? 2 : 1,
    adminName: template.adminName,
    method: template.action === "Created" ? "POST" : template.action === "Deleted" ? "DELETE" : "PUT",
    endpoint: `/api/v1/subscribers/${subscriberId}`,
    statusCode: 200,
    ipAddress: index % 2 === 0 ? "185.73.142.18" : "192.168.10.45",
    details: null,
  }));
}

export function listMockSubscriberActivityLogs(options: {
  subscriberId: number;
  lineId: string;
  fullName: string;
}): SubscriberActivityLog[] {
  return buildLogsForSubscriber(options.subscriberId, options.lineId, options.fullName).sort(
    (a, b) => b.id - a.id,
  );
}
