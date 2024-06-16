import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { getErrorData } from '@/utils/getErrorData';

import { pushNotificationAdded } from '@/features/pushNotifications/pushNotificationsSlice';
import { selectContactById, useDeleteContactMutation } from '../contactsSlice';

import { PushNotificationType } from '@/types/PushNotification';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { UserRoundMinus } from 'lucide-react';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId))!;

  const dispatch = useAppDispatch();
  const [deleteContact] = useDeleteContactMutation();

  const handleContactDelete = async (): Promise<void> => {
    try {
      await deleteContact({ userId: contact._id, page: 0 }).unwrap();
    } catch (err) {
      const errorData = getErrorData(err);
      dispatch(
        pushNotificationAdded({
          body: errorData.message,
          type: PushNotificationType.ERROR,
        }),
      );
    }
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          title={contact?.username}
          colorClass={contact?.color_class}
          isOnline={contact?.is_online}
          src={contact?.profile_image}
          style="md"
        />
        <h2 className="text-md font-medium">{contact?.username}</h2>
      </div>
      <IconButton
        aria-label="Delete Contact"
        onClick={handleContactDelete}
        className="bg-transparent"
        style="round"
      >
        <UserRoundMinus />
      </IconButton>
    </li>
  );
};

export default ContactsItem;
