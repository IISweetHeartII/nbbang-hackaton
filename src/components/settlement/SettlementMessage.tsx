'use client';

import { useState } from 'react';
import { SettlementMessageProps } from '@/types';

export function SettlementMessage({ settlements, totalAmount, memberCount }: SettlementMessageProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const formatAmount = (amount: number) => amount.toLocaleString('ko-KR');

  const generateKakaoMessage = () => {
    if (settlements.length === 0) {
      return `💰 정산 완료!\n\n총 금액: ${formatAmount(totalAmount)}원 (${memberCount}명)\n\n🎉 모든 계정이 정산되었습니다!`;
    }

    let message = `💰 정산 결과\n\n`;
    message += `총 금액: ${formatAmount(totalAmount)}원 (${memberCount}명)\n\n`;
    message += `📱 송금 지시:\n`;
    
    settlements.forEach((settlement) => {
      message += `${settlement.fromName} → ${settlement.toName}: ${formatAmount(settlement.amount)}원\n`;
    });

    message += `\n✅ 간단한 N빵으로 정산했어요!`;
    
    return message;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateKakaoMessage());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateKakaoMessage();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        💬 카카오톡 메시지
      </h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
          {generateKakaoMessage()}
        </pre>
      </div>

      <button
        onClick={copyToClipboard}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          copySuccess 
            ? 'bg-green-600 text-white' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }`}
      >
        {copySuccess ? '✅ 복사됨!' : '📋 메시지 복사'}
      </button>

      {settlements.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            💡 <strong>정산 완료 후:</strong> 위 메시지를 카카오톡 그룹채팅에 붙여넣어 
            모든 멤버에게 송금 정보를 공유하세요!
          </p>
        </div>
      )}
    </div>
  );
}