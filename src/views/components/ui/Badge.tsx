interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'gray' | 'disabled';
}

const styles = {
  green: 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]',
  gray: 'bg-[#F5F5F5] text-[#888888] border border-[#E5E5E5]',
  disabled: 'bg-[#16A34A] text-white',
};

export default function Badge({ children, variant = 'green' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-semibold rounded-full px-2 py-0.5 ${styles[variant]}`}>
      {children}
    </span>
  );
}
