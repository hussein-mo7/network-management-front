export interface OnlineUser {
  username: string;
  fullName: string;
  ipAddress: string;
  callerId: string;
  service: string;
  uptime: string;
  status: "online";
  lastUpdated: string;
  lineId?: string | null;
}
