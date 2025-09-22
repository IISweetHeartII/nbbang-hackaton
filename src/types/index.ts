// Core data types
export interface Member {
  id: string;
  name: string;
  color: string; // Tailwind color class for visual distinction
}

export interface BillItem {
  id: string;
  name: string;
  amount: number;
  payerId: string;
  beneficiaryIds: string[];
}

export interface MemberBalance {
  id: string;
  name: string;
  paid: number;
  owed: number;
  net: number; // positive = should receive, negative = should pay
  color: string;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
  fromName: string;
  toName: string;
}

// Form data types
export interface MemberFormData {
  name: string;
}

export interface ItemFormData {
  name: string;
  amount: string;
  payerId: string;
  beneficiaryIds: string[];
}

// Component props
export interface MemberChipProps {
  member: Member;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  onToggle?: (id: string) => void;
}

export interface BalanceCardProps {
  balance: MemberBalance;
}

export interface SettlementMessageProps {
  settlements: Settlement[];
  totalAmount: number;
  memberCount: number;
}

// App state
export interface AppState {
  members: Member[];
  items: BillItem[];
}

// Predefined colors for member chips
export const MEMBER_COLORS = [
  'bg-blue-500',
  'bg-green-500', 
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500',
] as const;

export type MemberColor = typeof MEMBER_COLORS[number];