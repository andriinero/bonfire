import { SafeParseReturnType, SafeParseSuccess } from 'zod';

import cn from '@/utils/cn';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { ErrorData, ErrorDataSchema } from '@/types/ErrorData';

import { FaCircleXmark } from 'react-icons/fa6';

type ServerErrorMessageProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  visible?: boolean;
  className?: string;
};

const ServerErrorMessage = ({
  error,
  visible = true,
  className,
}: ServerErrorMessageProps) => {
  const hasData = 'data' in error!;
  let errorData: ErrorData | null = null;
  if (hasData) {
    const parseResult = ErrorDataSchema.safeParse(error!.data);
    if (parseResult.success) errorData = parseResult.data;
  }

  return (
    <div
      className={cn(
        'invisible flex gap-3 rounded-md bg-red-50 p-4 text-sm',
        className,
        {
          visible: visible,
        },
      )}
    >
      <span className="mt-0.5 text-red-400">
        <FaCircleXmark size="1rem" />
      </span>
      <div>
        {hasData ? (
          errorData ? (
            <>
              <p className="text-medium text-red-800">{errorData.message}</p>
              <ul className="list-disc pl-6 font-normal text-red-700">
                {errorData.errors.map((e) => (
                  <li>{e.msg}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>oh my god....</p>
          )
        ) : (
          <p className="text-medium text-red-800">
            An unexpected error has occurred
          </p>
        )}
      </div>
    </div>
  );
};

export default ServerErrorMessage;
