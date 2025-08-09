"use client";

export const buildLoginUrlWithCallback = (explicitPath?: string) => {
  const current = explicitPath ?? (typeof window !== 'undefined'
    ? window.location.pathname + window.location.search
    : '/');
  return `/login?callbackUrl=${encodeURIComponent(current)}`;
};


