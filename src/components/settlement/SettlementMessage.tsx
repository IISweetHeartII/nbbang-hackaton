'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettlementMessageProps } from '@/types';
import { Confetti } from '../ui/Confetti';

export function SettlementMessage({ settlements, totalAmount, memberCount }: SettlementMessageProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isSettled = settlements.length === 0 && totalAmount > 0;

  const formatAmount = (amount: number) => amount.toLocaleString('ko-KR');

  useEffect(() => {
    if (isSettled) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isSettled]);

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
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.h2 
        className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
        animate={{ 
          scale: isSettled ? [1, 1.1, 1] : 1,
          color: isSettled ? '#16a34a' : '#111827'
        }}
        transition={{ duration: 0.5 }}
      >
        {isSettled ? '🎉 정산 완료!' : '💬 카카오톡 메시지'}
      </motion.h2>
      
      <motion.div 
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
          {generateKakaoMessage()}
        </pre>
      </motion.div>

      <motion.button
        onClick={copyToClipboard}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          copySuccess 
            ? 'bg-green-600 text-white' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          scale: copySuccess ? [1, 1.05, 1] : 1,
          backgroundColor: copySuccess ? '#16a34a' : undefined
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {copySuccess ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✅ 복사됨!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              📋 메시지 복사
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {settlements.length > 0 && (
          <motion.div 
            className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-blue-800">
              💡 <strong>정산 완료 후:</strong> 위 메시지를 카카오톡 그룹채팅에 붙여넣어 
              모든 멤버에게 송금 정보를 공유하세요!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Confetti show={showConfetti} />
    </motion.div>
  );
}