import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';

type NotificationBodyProps = {
  type: PushNotificationType;
  body?: string;
  list?: string[];
};

const NotificationBody = ({ type, body, list }: NotificationBodyProps) => {
  return (
    <div
      className={cn('text-medium space-y-0.5', {
        'text-red-800': type === PushNotificationType.ERROR,
        'text-green-800': type === PushNotificationType.SUCCESS,
        'text-yellow-800': type === PushNotificationType.WARNING,
      })}
    >
      {body ? <p>{body}</p> : <p>Internal Server Error 500</p>}
      {list ? (
        <ul className="list-disc pl-6 font-normal">
          {list.map((errorMessage, index) => (
            <li
              key={index}
              className={cn({
                'text-red-700': type === PushNotificationType.ERROR,
                'text-green-700': type === PushNotificationType.SUCCESS,
                'text-yellow-700': type === PushNotificationType.WARNING,
              })}
            >
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
