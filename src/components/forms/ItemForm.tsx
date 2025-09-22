'use client';

import { useState } from 'react';
import { Member, BillItem } from '@/types';
import { MemberChip } from '@/components/ui/MemberChip';

interface ItemFormProps {
  members: Member[];
  items: BillItem[];
  onAddItem: (name: string, amount: number, payerId: string, beneficiaryIds: string[]) => void;
  onRemoveItem: (id: string) => void;
}

export function ItemForm({ members, items, onAddItem, onRemoveItem }: ItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    payerId: '',
    beneficiaryIds: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    if (!formData.name.trim() || isNaN(amount) || amount <= 0 || !formData.payerId || formData.beneficiaryIds.length === 0) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    onAddItem(formData.name.trim(), amount, formData.payerId, formData.beneficiaryIds);
    setFormData({
      name: '',
      amount: '',
      payerId: '',
      beneficiaryIds: [],
    });
  };

  const toggleBeneficiary = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      beneficiaryIds: prev.beneficiaryIds.includes(memberId)
        ? prev.beneficiaryIds.filter(id => id !== memberId)
        : [...prev.beneficiaryIds, memberId]
    }));
  };

  const selectAllBeneficiaries = () => {
    setFormData(prev => ({
      ...prev,
      beneficiaryIds: members.map(m => m.id)
    }));
  };

  const formatAmount = (amount: number) => amount.toLocaleString('ko-KR');

  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || '알 수 없음';

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📝 항목 관리
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>먼저 멤버를 추가해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        📝 항목 관리
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="항목명 (예: 치킨)"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={20}
          />
          
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="금액 (원)"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">지불자</label>
          <select
            value={formData.payerId}
            onChange={(e) => setFormData(prev => ({ ...prev, payerId: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">지불자를 선택하세요</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              수혜자 ({formData.beneficiaryIds.length}명 선택)
            </label>
            <button
              type="button"
              onClick={selectAllBeneficiaries}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              전체 선택
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {members.map(member => (
              <MemberChip
                key={member.id}
                member={member}
                isSelected={formData.beneficiaryIds.includes(member.id)}
                onToggle={toggleBeneficiary}
              />
            ))}
          </div>
          
          {formData.beneficiaryIds.length === 0 && (
            <p className="text-sm text-red-500 mt-1">최소 1명의 수혜자를 선택해주세요</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
        >
          항목 추가
        </button>
      </form>

      {items.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3">등록된 항목 ({items.length}개)</h3>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold text-green-600">{formatAmount(item.amount)}원</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="text-blue-600">💳 {getMemberName(item.payerId)}</span>
                    <span className="mx-2">→</span>
                    <span>🍽️ {item.beneficiaryIds.map(id => getMemberName(id)).join(', ')}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`${item.name} 삭제`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}