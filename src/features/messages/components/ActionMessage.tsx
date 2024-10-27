type ActionMessageProps = { body: string };

const ActionMessage = ({ body }: ActionMessageProps) => {
  return (
    <li aria-label="chat-message" className="flex justify-center text-sm">
      <p className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
        {body}
      </p>
    </li>
  );
};

export default ActionMessage;
