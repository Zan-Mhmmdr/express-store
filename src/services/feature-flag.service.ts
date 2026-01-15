type FeatureKey = string;

interface FeatureFlag {
  key: FeatureKey;
  enabled: boolean;
  description?: string;
}

// sementara simpan di memory (nanti bisa pindah ke DB / Redis)
const flags: Map<FeatureKey, FeatureFlag> = new Map();

// seed contoh
flags.set("new-dashboard", {
  key: "new-dashboard",
  enabled: false,
  description: "Enable new dashboard UI",
});

export const isFeatureEnabled = (key: FeatureKey): boolean => {
  const flag = flags.get(key);
  return flag ? flag.enabled : false;
};

export const enableFeature = (key: FeatureKey): void => {
  const flag = flags.get(key) || { key, enabled: false };
  flag.enabled = true;
  flags.set(key, flag);
};

export const disableFeature = (key: FeatureKey): void => {
  const flag = flags.get(key) || { key, enabled: false };
  flag.enabled = false;
  flags.set(key, flag);
};

export const getAllFeatures = (): FeatureFlag[] => {
  return Array.from(flags.values());
};

export const setFeature = (flag: FeatureFlag): void => {
  flags.set(flag.key, flag);
};
