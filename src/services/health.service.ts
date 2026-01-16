interface HealthStatus {
  service: string;
  status: "up" | "down";
  message?: string;
}

export const checkAppHealth = async (): Promise<HealthStatus[]> => {
  const results: HealthStatus[] = [];

  // contoh: cek database
  try {
    // await db.ping();
    results.push({
      service: "database",
      status: "up",
    });
  } catch (err) {
    results.push({
      service: "database",
      status: "down",
      message: "Cannot connect to database",
    });
  }

  // contoh: cek cache
  try {
    // await redis.ping();
    results.push({
      service: "cache",
      status: "up",
    });
  } catch (err) {
    results.push({
      service: "cache",
      status: "down",
      message: "Cannot connect to cache",
    });
  }

  return results;
};

export const isHealthy = async (): Promise<boolean> => {
  const results = await checkAppHealth();
  return results.every((r) => r.status === "up");
};
