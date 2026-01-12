interface AuditLog {
  id: number;
  action: string;
  userId?: number;
  endpoint?: string;
  method?: string;
  ip?: string;
  createdAt: Date;
}

// sementara pakai memory (nanti ganti DB)
let logs: AuditLog[] = [];

export const createAuditLog = async (params: {
  action: string;
  userId?: number;
  endpoint?: string;
  method?: string;
  ip?: string;
}): Promise<AuditLog> => {
  const newLog: AuditLog = {
    id: logs.length + 1,
    action: params.action,
    userId: params.userId,
    endpoint: params.endpoint,
    method: params.method,
    ip: params.ip,
    createdAt: new Date(),
  };

  logs.push(newLog);
  return newLog;
};

export const getAuditLogs = async (): Promise<AuditLog[]> => {
  return logs;
};

export const clearAuditLogs = async (): Promise<void> => {
  logs = [];
};
