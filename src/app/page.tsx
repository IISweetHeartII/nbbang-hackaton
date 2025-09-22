'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBillSplitter } from '@/hooks/useBillSplitter';
import { MemberForm } from '@/components/forms/MemberForm';
import { ItemForm } from '@/components/forms/ItemForm';
import { BalanceCard } from '@/components/ui/BalanceCard';
import { SettlementMessage } from '@/components/settlement/SettlementMessage';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white border-b border-gray-200 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🧮 간단한 N빵
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                공정하게 나눠내자! 30분 MVP 버전
              </p>
            </motion.div>
            
            <motion.div 
              className="text-right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="text-lg font-semibold text-gray-900">
                총 <AnimatedCounter value={totalAmount} suffix="원" />
              </div>
              <div className="text-sm text-gray-500">
                <AnimatedCounter value={members.length} suffix="명" /> · <AnimatedCounter value={items.length} suffix="개 항목" />
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {totalAmount > 0 && (
              <motion.div 
                className="mt-4 flex justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={clearAll}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  전체 초기화
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Forms */}
          <motion.div 
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
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
          </motion.div>

          {/* Right Column - Results */}
          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Balance Cards */}
            <AnimatePresence>
              {balances.length > 0 && (
                <motion.div 
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    💰 개인별 정산
                  </h2>
                  <motion.div className="grid gap-3">
                    <AnimatePresence>
                      {balances.map((balance, index) => (
                        <motion.div
                          key={balance.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <BalanceCard balance={balance} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Settlement Message */}
            <AnimatePresence>
              {totalAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <SettlementMessage
                    settlements={settlements}
                    totalAmount={totalAmount}
                    memberCount={members.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            <AnimatePresence>
              {members.length === 0 && (
                <motion.div 
                  className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    🧮
                  </motion.div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    간단한 N빵에 오신 것을 환영합니다!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    공정한 정산을 위해 먼저 멤버들을 추가해주세요.
                  </p>
                  <motion.div 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    💡 팁: 3명 이상 추가하는 것을 권장합니다
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        className="bg-white border-t border-gray-200 mt-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
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
      </motion.footer>
    </div>
  );
}