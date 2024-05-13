import { useAppDispatch } from '@/app/hooks';

import { pushNotificationRemoved } from '../pushNotificationsSlice';

import cn from '@/utils/cn';

import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import IconButton from '@/components/general/IconButton';
import { BaseErrorSchema } from '@/types/BaseError';
import { ErrorDataSchema } from '@/types/ErrorData';
import { FaCircleXmark, FaXmark } from 'react-icons/fa6';

type ErrorNotificationProps = {
  id: string;
  error: FetchBaseQueryError | SerializedError;
  visible?: boolean;
  className?: string;
};

const ErrorNotification = ({
  id,
  error,
  visible = true,
  className,
}: ErrorNotificationProps) => {
  const baseErrorParse = BaseErrorSchema.safeParse(error);
  const errorDataParse = baseErrorParse.success
    ? ErrorDataSchema.safeParse(baseErrorParse.data.data)
    : null;

  const dispatch = useAppDispatch();

  const handleNotificationDismiss = (): void => {
    dispatch(pushNotificationRemoved(id));
  };

  return (
    <div
      className={cn(
        'invisible flex items-center gap-3 rounded-md bg-red-50 p-4 text-sm shadow-sm',
        className,
        {
          visible: visible,
        },
      )}
    >
      <span className="mt-0.5 text-red-400">
        <FaCircleXmark size="1rem" />
      </span>
      <div className="text-medium text-red-800">
        {baseErrorParse.success ? (
          errorDataParse?.success ? (
            <>
              <p>{errorDataParse.data.message}</p>
              <ul className="list-disc pl-6 font-normal text-red-700">
                {errorDataParse.data.errors.map((e) => (
                  <li key={e.path}>{e.msg}</li>
                ))}
              </ul>
            </>
          ) : baseErrorParse.data.status === 401 ? (
            <p>Incorrect credentials</p>
          ) : (
            <p>An unexpected error has occurred</p>
          )
        ) : (
          <p>Internal Server Error 500</p>
        )}
      </div>
      <IconButton
        className="ml-8 p-0 text-red-300 hover:bg-transparent"
        onClick={handleNotificationDismiss}
      >
        <FaXmark />
      </IconButton>
    </div>
  );
};

export default ErrorNotification;
