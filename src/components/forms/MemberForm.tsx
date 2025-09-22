'use client';

import { useState } from 'react';
import { Member } from '@/types';
import { MemberChip } from '@/components/ui/MemberChip';

interface MemberFormProps {
  members: Member[];
  onAddMember: (name: string) => void;
  onRemoveMember: (id: string) => void;
}

export function MemberForm({ members, onAddMember, onRemoveMember }: MemberFormProps) {
  const [newMemberName, setNewMemberName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      onAddMember(newMemberName.trim());
      setNewMemberName('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        👥 멤버 관리
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={10}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            disabled={!newMemberName.trim()}
          >
            추가
          </button>
        </div>
      </form>

      {members.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            현재 {members.length}명 ({members.length < 3 ? '최소 3명 권장' : '적정 인원'})
          </p>
          <div className="flex flex-wrap gap-2">
            {members.map(member => (
              <MemberChip
                key={member.id}
                member={member}
                onRemove={onRemoveMember}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">아직 멤버가 없습니다</p>
          <p className="text-sm">정산할 멤버들을 추가해주세요</p>
        </div>
      )}
    </div>
  );
}