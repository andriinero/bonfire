import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { FaPaperPlane } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/general/Button';

const MessageBarSchema = z.object({
  body: z.string(),
});

type TMessageBar = z.infer<typeof MessageBarSchema>;

const MessageBar = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TMessageBar>({ resolver: zodResolver(MessageBarSchema) });

  const handleFormSubmit = async (data: TMessageBar): Promise<void> => {};

  const isSubmitDisabled = isSubmitting;

  return (
    <div className="border-t px-4 py-2">
      <form
        className="flex items-center gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          {...register('body')}
          className="flex-1 rounded-full border border-solid border-transparent bg-gray-100 px-4 py-2 text-gray-800 outline-0 transition focus:border-solid focus:border-sky-500"
          type="text"
          placeholder="Write a message"
        />
        <Button
          disabled={isSubmitDisabled}
          style="primary"
          type="submit"
          className="cursor-pointer rounded-full p-2 text-white transition"
        >
          <FaPaperPlane />
        </Button>
      </form>
    </div>
  );
};

export default MessageBar;
