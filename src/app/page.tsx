'use client';

import { useBillSplitter } from '@/hooks/useBillSplitter';
import { MemberForm } from '@/components/forms/MemberForm';
import { ItemForm } from '@/components/forms/ItemForm';
import { BalanceCard } from '@/components/ui/BalanceCard';
import { SettlementMessage } from '@/components/settlement/SettlementMessage';

export default function Home() {
  const {
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
  } = useBillSplitter();

  const formatAmount = (amount: number) => amount.toLocaleString('ko-KR');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🧮 간단한 N빵
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                공정하게 나눠내자! 30분 MVP 버전
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                총 {formatAmount(totalAmount)}원
              </div>
              <div className="text-sm text-gray-500">
                {members.length}명 · {items.length}개 항목
              </div>
            </div>
          </div>

          {totalAmount > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                전체 초기화
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Forms */}
          <div className="space-y-6">
            <MemberForm
              members={members}
              onAddMember={addMember}
              onRemoveMember={removeMember}
            />
            
            <ItemForm
              members={members}
              items={items}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Balance Cards */}
            {balances.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  💰 개인별 정산
                </h2>
                <div className="grid gap-3">
                  {balances.map(balance => (
                    <BalanceCard key={balance.id} balance={balance} />
                  ))}
                </div>
              </div>
            )}

            {/* Settlement Message */}
            {totalAmount > 0 && (
              <SettlementMessage
                settlements={settlements}
                totalAmount={totalAmount}
                memberCount={members.length}
              />
            )}

            {/* Empty State */}
            {members.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
                <div className="text-6xl mb-4">🧮</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  간단한 N빵에 오신 것을 환영합니다!
                </h2>
                <p className="text-gray-600 mb-4">
                  공정한 정산을 위해 먼저 멤버들을 추가해주세요.
                </p>
                <div className="text-sm text-gray-500">
                  💡 팁: 3명 이상 추가하는 것을 권장합니다
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              💾 모든 데이터는 브라우저에만 저장되며 외부로 전송되지 않습니다
            </p>
            <p>
              Made with ❤️ for fair bill splitting · 30분 MVP 버전
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}