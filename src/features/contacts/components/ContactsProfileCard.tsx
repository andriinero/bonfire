import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  selectContactById,
  selectedContactIdSet,
  selectSelectedContactId,
} from '../contactsSlice';

import Modal from '@/components/general/Modal';
import UserAvatar from '@/components/general/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarHeart, Mail, MapPin, User } from 'lucide-react';
import appDate from '@/lib/AppDate';

const ContactsProfileCard = () => {
  const selectedContactId = useAppSelector(selectSelectedContactId);
  const contact = useAppSelector(selectContactById(selectedContactId ?? ''));
  const dispatch = useAppDispatch();

  const handleResetSelectedContactId = () => {
    dispatch(selectedContactIdSet(null));
  };

  const fullName = `${contact?.firstName} ${contact?.lastName}`;

  return (
    <Modal
      isOpen={!!selectedContactId}
      onBackdropClick={handleResetSelectedContactId}
      className="max-w-md"
    >
      <Card className="overflow-hidden border-none">
        <div className="bg-amber-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <UserAvatar
              className="ring ring-amber-400"
              title={contact?.username}
              colorClass={contact?.colorClass}
            />

            <div>
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="flex items-center gap-1 text-sm">
                <User className="size-4" />
                {contact?.username}
              </p>
            </div>
          </div>
        </div>
        <CardContent className="grid gap-4 bg-gray-50 p-6">
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            <span>{contact?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            <span>{contact?.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarHeart className="size-4" />
            <span>
              <span className="text-sm text-gray-500">member since</span>{' '}
              {appDate.getAbsolute(contact?.created || '')}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="hover:bg-gray-100">
                English
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ContactsProfileCard;
