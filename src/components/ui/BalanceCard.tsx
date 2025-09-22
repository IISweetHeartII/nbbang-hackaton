'use client';

import { motion } from 'framer-motion';
import { BalanceCardProps } from '@/types';
import { AnimatedCounter } from './AnimatedCounter';

export function BalanceCard({ balance }: BalanceCardProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  const netDisplay = () => {
    if (balance.net > 0) {
      return (
        <span className="text-green-600 font-semibold">
          +<AnimatedCounter value={balance.net} suffix="원" />
        </span>
      );
    } else if (balance.net < 0) {
      return (
        <span className="text-red-600 font-semibold">
          <AnimatedCounter value={balance.net} suffix="원" />
        </span>
      );
    } else {
      return (
        <motion.span 
          className="text-gray-500 font-semibold"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.5 }}
        >
          정산완료 ✅
        </motion.span>
      );
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
        y: -2 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div 
          className={`w-3 h-3 rounded-full ${balance.color}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        ></motion.div>
        <h3 className="font-semibold text-gray-900">{balance.name}</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">지불한 금액:</span>
          <span className="font-medium">
            <AnimatedCounter value={balance.paid} suffix="원" />
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">부담할 금액:</span>
          <span className="font-medium">
            <AnimatedCounter value={balance.owed} suffix="원" />
          </span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">차액:</span>
          {netDisplay()}
        </div>
      </div>
    </motion.div>
  );
}