import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';

const styleMap: Record<
  PushNotificationType,
  { color: { main: string; list: string } }
> = {
  [PushNotificationType.ERROR]: {
    color: { main: 'text-red-800', list: 'text-red-700' },
  },
  [PushNotificationType.SUCCESS]: {
    color: { main: 'text-green-800', list: 'text-green-700' },
  },
  [PushNotificationType.WARNING]: {
    color: { main: 'text-yellow-800', list: 'text-yellow-700' },
  },
};

type NotificationBodyProps = {
  type: PushNotificationType;
  body?: string;
  list?: string[];
};

const NotificationBody = ({ type, body, list }: NotificationBodyProps) => {
  return (
    <div className={cn('text-medium space-y-0.5', styleMap[type].color.main)}>
      {body ? <p>{body}</p> : <p>Internal Server Error 500</p>}
      {list ? (
        <ul className="list-disc pl-6 font-normal">
          {list.map((errorMessage, index) => (
            <li key={index} className={cn('', styleMap[type].color.list)}>
              {errorMessage}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NotificationBody;
