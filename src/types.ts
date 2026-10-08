export interface GameItem {
  id: string;
  num: number;
  name: string;
  category: "fists" | "skins" | "weapons" | "diamonds";
  imageUrl: string;
  amount?: number;
  tag?: string;
}

export type CategoryId = "fists" | "skins" | "weapons" | "diamonds";

export interface PlayerProfile {
  id: string;
  nickname?: string;
  region: string;
  level?: number;
  rank?: string;
  likes?: number;
  guild?: string;
  avatarUrl?: string;
  verifiedGarena?: boolean;
  pagoStoreVerified?: boolean;
  pagoStoreUrl?: string;
}

export type GenerationStep =
  | "idle"
  | "connecting"
  | "finding_player"
  | "generating_packets"
  | "injecting_items"
  | "completed"
  | "error";

export type ModalState = "none" | "generating" | "verification" | "verified";
