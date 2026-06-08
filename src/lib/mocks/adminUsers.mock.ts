import type {
  AdminRole,
  AdminUser,
  AdminUserFormValues,
  AdminUsersListParams,
  AdminUserStatus,
} from "@/types/adminUser";

export const mockAdminRoles: AdminRole[] = [
  { id: 1, name: "super_admin", displayName: "Super admin" },
  { id: 2, name: "admin", displayName: "Admin" },
  { id: 3, name: "viewer", displayName: "Viewer" },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 1,
    name: "أحمد محمود",
    username: "ahmad.admin",
    email: "ahmad@wewifi.ps",
    roleId: 1,
    roleName: "super_admin",
    roleDisplayName: "مدير النظام",
    status: "active",
    lastLoginAt: "2026-05-31T08:12:00.000Z",
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: 2,
    name: "خالد عمر",
    username: "khaled.ops",
    email: "khaled@wewifi.ps",
    roleId: 2,
    roleName: "admin",
    roleDisplayName: "مسؤول",
    status: "active",
    lastLoginAt: "2026-05-30T16:45:00.000Z",
    createdAt: "2025-03-02T09:30:00.000Z",
  },
  {
    id: 3,
    name: "سارة ناصر",
    username: "sara.support",
    email: "sara@wewifi.ps",
    roleId: 2,
    roleName: "admin",
    roleDisplayName: "مسؤول",
    status: "active",
    lastLoginAt: "2026-05-29T11:20:00.000Z",
    createdAt: "2025-04-15T14:00:00.000Z",
  },
  {
    id: 4,
    name: "يوسف حمدان",
    username: "yousef.billing",
    email: "yousef@wewifi.ps",
    roleId: 2,
    roleName: "admin",
    roleDisplayName: "مسؤول",
    status: "inactive",
    lastLoginAt: "2026-04-20T07:55:00.000Z",
    createdAt: "2025-06-01T08:00:00.000Z",
  },
  {
    id: 5,
    name: "لينا فراس",
    username: "lina.viewer",
    email: "lina@wewifi.ps",
    roleId: 3,
    roleName: "viewer",
    roleDisplayName: "عرض فقط",
    status: "active",
    lastLoginAt: "2026-05-28T13:10:00.000Z",
    createdAt: "2025-08-12T12:00:00.000Z",
  },
  {
    id: 6,
    name: "محمود رائد",
    username: "mahmoud.noc",
    email: "mahmoud@wewifi.ps",
    roleId: 2,
    roleName: "admin",
    roleDisplayName: "مسؤول",
    status: "active",
    lastLoginAt: "2026-05-31T06:30:00.000Z",
    createdAt: "2025-09-05T10:15:00.000Z",
  },
  {
    id: 7,
    name: "نور إياد",
    username: "nour.finance",
    email: "nour@wewifi.ps",
    roleId: 2,
    roleName: "admin",
    roleDisplayName: "مسؤول",
    status: "active",
    lastLoginAt: "2026-05-27T09:00:00.000Z",
    createdAt: "2025-10-20T11:45:00.000Z",
  },
  {
    id: 8,
    name: "رامي سامي",
    username: "rami.viewer",
    email: null,
    roleId: 3,
    roleName: "viewer",
    roleDisplayName: "عرض فقط",
    status: "inactive",
    lastLoginAt: null,
    createdAt: "2026-01-08T15:30:00.000Z",
  },
];

function matchesSearch(user: AdminUser, search: string): boolean {
  const q = search.toLowerCase();
  return (
    user.name.toLowerCase().includes(q) ||
    user.username.toLowerCase().includes(q) ||
    (user.email?.toLowerCase().includes(q) ?? false) ||
    user.roleDisplayName.toLowerCase().includes(q) ||
    user.roleName.toLowerCase().includes(q) ||
    user.status.includes(q)
  );
}

let mockUsersStore: AdminUser[] = [...mockAdminUsers];

export function listMockAdminUsers(params: AdminUsersListParams = {}) {
  return queryAdminUsersMock(mockUsersStore, params);
}

export function createMockAdminUser(values: AdminUserFormValues): AdminUser {
  const role = mockAdminRoles.find((r) => r.id === values.roleId) ?? mockAdminRoles[1];
  const nextId = Math.max(0, ...mockUsersStore.map((u) => u.id)) + 1;
  const created: AdminUser = {
    id: nextId,
    name: values.name.trim(),
    username: values.username.trim(),
    email: values.email.trim() || null,
    roleId: role.id,
    roleName: role.name,
    roleDisplayName: role.displayName,
    status: values.status,
    lastLoginAt: null,
    createdAt: new Date().toISOString(),
  };
  mockUsersStore = [created, ...mockUsersStore];
  return created;
}

export function updateMockAdminUser(id: number, values: Partial<AdminUserFormValues>): AdminUser | null {
  const index = mockUsersStore.findIndex((u) => u.id === id);
  if (index < 0) return null;

  const current = mockUsersStore[index];
  const role = values.roleId
    ? (mockAdminRoles.find((r) => r.id === values.roleId) ?? mockAdminRoles[1])
    : null;

  const updated: AdminUser = {
    ...current,
    name: values.name?.trim() ?? current.name,
    username: values.username?.trim() ?? current.username,
    email: values.email !== undefined ? values.email.trim() || null : current.email,
    roleId: role?.id ?? current.roleId,
    roleName: role?.name ?? current.roleName,
    roleDisplayName: role?.displayName ?? current.roleDisplayName,
    status: values.status ?? current.status,
  };

  mockUsersStore = mockUsersStore.map((u) => (u.id === id ? updated : u));
  return updated;
}

export function deleteMockAdminUser(id: number): boolean {
  const before = mockUsersStore.length;
  mockUsersStore = mockUsersStore.filter((u) => u.id !== id);
  return mockUsersStore.length < before;
}

export function setMockAdminUserStatus(id: number, status: AdminUserStatus): AdminUser | null {
  return updateMockAdminUser(id, { status } as AdminUserFormValues);
}

export function queryAdminUsersMock(
  users: AdminUser[],
  params: AdminUsersListParams = {},
): { items: AdminUser[]; total: number; page: number; limit: number } {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 10);
  const search = params.search?.trim();

  let filtered = [...users];
  if (search) {
    filtered = filtered.filter((row) => matchesSearch(row, search));
  }

  filtered.sort((a, b) => b.id - a.id);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return { items, total, page, limit };
}
