import UserIcon from '@/components/general/UserIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const RecommendedContact = () => {
  return (
    <Card className="mx-3 bg-gray-50">
      <CardHeader>
        <CardTitle className="text-lg">Recommended Contact</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between">
        <div className="flex items-center space-x-4">
          <UserIcon />
          <div>
            <p className="font-semibold">Placeholder name</p>
            <p className="text-muted-foreground text-sm">
              placeholder@email.com
            </p>
          </div>
        </div>
        <Button variant="roundedGhost" size="icon">
          <UserPlus />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendedContact;
