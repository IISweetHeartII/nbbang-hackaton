import { BalanceCardProps } from '@/types';

export function BalanceCard({ balance }: BalanceCardProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  const netDisplay = () => {
    if (balance.net > 0) {
      return (
        <span className="text-green-600 font-semibold">
          +{formatAmount(balance.net)}원
        </span>
      );
    } else if (balance.net < 0) {
      return (
        <span className="text-red-600 font-semibold">
          {formatAmount(balance.net)}원
        </span>
      );
    } else {
      return (
        <span className="text-gray-500 font-semibold">
          정산완료
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-3 h-3 rounded-full ${balance.color}`}></div>
        <h3 className="font-semibold text-gray-900">{balance.name}</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">지불한 금액:</span>
          <span className="font-medium">{formatAmount(balance.paid)}원</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">부담할 금액:</span>
          <span className="font-medium">{formatAmount(balance.owed)}원</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">차액:</span>
          {netDisplay()}
        </div>
      </div>
    </div>
  );
}