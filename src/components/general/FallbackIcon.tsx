import cn from '@/utils/cn';

type FallbackIconProps = {
  title?: string;
  style?: 'xs' | 'md' | 'lg' | 'xl';
  colorClass?: string;
  className?: string;
};

const FallbackIcon = ({
  title = 'N',
  style = 'md',
  colorClass = 'amber-400',
  className,
}: FallbackIconProps) => {
  const capitalizedTitle = title.substring(0, 1).toUpperCase();

  return (
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full text-2xl font-semibold text-amber-50',
        'bg-' + colorClass,
        className,
        {
          'size-6': style === 'xs',
          'size-10': style === 'md',
          'size-12 text-3xl': style === 'lg',
          'size-20 text-4xl': style === 'xl',
        },
      )}
    >
      {capitalizedTitle}
    </div>
  );
};

export default FallbackIcon;
