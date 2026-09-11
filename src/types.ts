export type TabType = 'home' | 'shop' | 'rules' | 'discord';

export interface ServerStatus {
  ip: string;
  port: string;
  connectUrl: string;
  isOnline: boolean;
  players: number;
  maxPlayers: number;
  map: string;
  ping: number;
  tickrate: number;
  gamemode: string;
}

export interface PrivilegePlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  durations: {
    period: string;
    days: number;
    price: number;
    oldPrice?: number;
    discount?: string;
  }[];
  features: {
    title: string;
    highlight?: boolean;
    description?: string;
  }[];
  commands: string[];
}

export interface RuleCategory {
  id: string;
  title: string;
  icon: string;
  rules: {
    number: string;
    title: string;
    description: string;
    punishment: string;
  }[];
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}
