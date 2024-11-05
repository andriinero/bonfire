import { cn } from '@/utils/utils';

type ContactSelectedIconProps = { contactId: string };

const ContactSelectedIcon = ({
  className,
  children,
  ...props
}: ContactSelectedIconProps) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

export default ContactSelectedIcon;
