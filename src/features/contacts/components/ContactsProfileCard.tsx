import { useAppDispatch, useAppSelector } from '@/app/hooks';

import appDate from '@/lib/AppDate';

import { selectAuthUserId } from '@/features/auth/authSlice';
import {
  selectContactById,
  selectedContactIdSet,
  selectSelectedContactId,
} from '../contactsSlice';

import Modal from '@/components/general/Modal';
import UserAvatar from '@/components/general/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarHeart, Mail, MapPin, Pencil, User } from 'lucide-react';

const ContactsProfileCard = () => {
  const authUserId = useAppSelector(selectAuthUserId);
  const selectedContactId = useAppSelector(selectSelectedContactId);
  const contact = useAppSelector(selectContactById(selectedContactId ?? ''));
  const dispatch = useAppDispatch();

  const fullName = `${contact?.firstName} ${contact?.lastName}`;
  const isAuthUserProfile = authUserId === contact?.id;

  const handleResetSelectedContactId = () => {
    dispatch(selectedContactIdSet(null));
  };

  return (
    <Modal
      isOpen={!!selectedContactId}
      onBackdropClick={handleResetSelectedContactId}
      className="max-w-md"
    >
      <Card className="overflow-hidden border-none">
        <div className="flex justify-between bg-amber-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <UserAvatar
              style="lg"
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
          <Button variant="ghost" size="smallIcon">
            <Pencil />
          </Button>
        </div>
        <CardContent className="grid gap-4 bg-gray-50 p-6">
          {contact?.bio && (
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm leading-relaxed text-gray-700">
                "{contact.bio}"
              </p>
            </div>
          )}

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
