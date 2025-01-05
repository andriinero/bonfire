import Spinner from '@/components/general/Spinner';
import UserAvatar from '@/components/general/UserAvatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { useGetRecommendedContactsQuery, usePostContactMutation } from '../contactsSlice';

const RecommendedContact = () => {
  const {
    data,
    isLoading: areRecommendedContactsLoading,
    isSuccess: areRecommendedContactsFetched
  } = useGetRecommendedContactsQuery();
  const [postContactMutation, { isLoading: isPostContactLoading }] =
    usePostContactMutation();

  const handleAddContact = () => {
    if (!isPostContactLoading && areRecommendedContactsFetched && data)
      postContactMutation({ contactUsername: data[0].username });
  };

  return (
    <Card className="mx-4">
      <CardHeader>
        <CardTitle className="text-lg">Recommended Contact</CardTitle>
        <CardDescription>
          {data && data.length > 0
            ? 'Connect with passionate learners like you!'
            : 'You\'re all caught up!'}
        </CardDescription>
      </CardHeader>
      {areRecommendedContactsLoading ? (
        <div className="p-4">
          <Spinner />
        </div>
      ) : areRecommendedContactsFetched ? (
        data.length > 0 ? (
          <CardContent className="flex justify-between">
            <div className="flex items-center space-x-4">
              <UserAvatar
                title={data[0].username}
                colorClass={data[0].colorClass}
              />
              <div>
                <p className="font-semibold">{data[0].username}</p>
                <p className="text-muted-foreground text-sm">{data[0].email}</p>
              </div>
            </div>
            <Button
              onClick={handleAddContact}
              variant="roundedGhost"
              size="icon"
            >
              <UserPlus />
            </Button>
          </CardContent>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Card>
  );
};

export default RecommendedContact;
