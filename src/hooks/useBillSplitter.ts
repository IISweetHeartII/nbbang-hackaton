'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Member, 
  BillItem, 
  MemberBalance, 
  Settlement, 
  AppState, 
  MEMBER_COLORS 
} from '@/types';

const STORAGE_KEY = 'nbbang-data';

export function useBillSplitter() {
  const [members, setMembers] = useState<Member[]>([]);
  const [items, setItems] = useState<BillItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: AppState = JSON.parse(saved);
        setMembers(data.members || []);
        setItems(data.items || []);
      } catch (error) {
        console.warn('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data: AppState = { members, items };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [members, items]);

  // Member management
  const addMember = (name: string) => {
    if (!name.trim()) return;
    
    // Check for duplicate names
    if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
      alert('이미 존재하는 이름입니다.');
      return;
    }

    const colorIndex = members.length % MEMBER_COLORS.length;
    const newMember: Member = {
      id: Date.now().toString(),
      name: name.trim(),
      color: MEMBER_COLORS[colorIndex],
    };

    setMembers(prev => [...prev, newMember]);
  };

  const removeMember = (id: string) => {
    // Remove member and clean up their references in items
    setMembers(prev => prev.filter(m => m.id !== id));
    setItems(prev => prev.map(item => ({
      ...item,
      beneficiaryIds: item.beneficiaryIds.filter(bId => bId !== id),
      payerId: item.payerId === id ? '' : item.payerId,
    })).filter(item => item.payerId !== '')); // Remove items with no payer
  };

  // Item management
  const addItem = (name: string, amount: number, payerId: string, beneficiaryIds: string[]) => {
    if (!name.trim() || amount <= 0 || !payerId || beneficiaryIds.length === 0) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    const newItem: BillItem = {
      id: Date.now().toString(),
      name: name.trim(),
      amount,
      payerId,
      beneficiaryIds,
    };

    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate balances using memoization for performance
  const balances = useMemo<MemberBalance[]>(() => {
    const balanceMap = new Map<string, { paid: number; owed: number }>();

    // Initialize all members
    members.forEach(member => {
      balanceMap.set(member.id, { paid: 0, owed: 0 });
    });

    // Calculate paid and owed amounts
    items.forEach(item => {
      const currentPaid = balanceMap.get(item.payerId);
      if (currentPaid) {
        currentPaid.paid += item.amount;
      }

      // Split amount among beneficiaries
      const sharePerPerson = item.amount / item.beneficiaryIds.length;
      item.beneficiaryIds.forEach(beneficiaryId => {
        const currentOwed = balanceMap.get(beneficiaryId);
        if (currentOwed) {
          currentOwed.owed += sharePerPerson;
        }
      });
    });

    // Convert to MemberBalance array with net calculation
    return members.map(member => {
      const balance = balanceMap.get(member.id) || { paid: 0, owed: 0 };
      return {
        id: member.id,
        name: member.name,
        paid: Math.round(balance.paid),
        owed: Math.round(balance.owed),
        net: Math.round(balance.paid - balance.owed),
        color: member.color,
      };
    });
  }, [members, items]);

  // Calculate optimal settlements using greedy algorithm
  const settlements = useMemo<Settlement[]>(() => {
    const creditors = balances.filter(b => b.net > 0).sort((a, b) => b.net - a.net);
    const debtors = balances.filter(b => b.net < 0).sort((a, b) => a.net - b.net);
    
    const result: Settlement[] = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];
      
      const amount = Math.min(creditor.net, Math.abs(debtor.net));
      
      if (amount > 0) {
        result.push({
          from: debtor.id,
          to: creditor.id,
          amount,
          fromName: debtor.name,
          toName: creditor.name,
        });

        creditor.net -= amount;
        debtor.net += amount;
      }

      if (creditor.net === 0) creditorIndex++;
      if (debtor.net === 0) debtorIndex++;
    }

    return result;
  }, [balances]);

  // Calculate totals
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  // Clear all data
  const clearAll = () => {
    if (confirm('모든 데이터를 삭제하시겠습니까?')) {
      setMembers([]);
      setItems([]);
    }
  };

  return {
    members,
    items,
    balances,
    settlements,
    totalAmount,
    addMember,
    removeMember,
    addItem,
    removeItem,
    clearAll,
  };
}