import { LucideIcon } from 'lucide-react';

export interface SubItem {
  title: string;
  description?: string;
  points?: string[];
  highlight?: string;
  icon?: LucideIcon;
}

export interface Block {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  content: SubItem[];
  footer?: string;
}

export interface HeaderState {
  status: string;
  date: string;
  mode: string;
}
