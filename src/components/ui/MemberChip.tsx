import { MemberChipProps } from '@/types';

export function MemberChip({ member, onRemove, isSelected, onToggle }: MemberChipProps) {
  const baseClasses = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all";
  const colorClasses = isSelected 
    ? `${member.color} text-white shadow-md` 
    : `${member.color.replace('bg-', 'bg-opacity-20 bg-')} text-gray-800 border border-gray-300`;

  const chipClasses = `${baseClasses} ${colorClasses}`;

  const handleClick = () => {
    if (onToggle) {
      onToggle(member.id);
    }
  };

  return (
    <div 
      className={chipClasses}
      onClick={onToggle ? handleClick : undefined}
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onKeyDown={onToggle ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
      style={{ cursor: onToggle ? 'pointer' : 'default' }}
    >
      <span>{member.name}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(member.id);
          }}
          className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
          aria-label={`${member.name} 제거`}
        >
          ×
        </button>
      )}
    </div>
  );
}