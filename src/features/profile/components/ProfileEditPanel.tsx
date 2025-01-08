import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import UserAvatar from '@/components/general/UserAvatar';
import { usePatchProfileMutation } from '../profileSlice';

export const profilePatchSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  location: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
});
export type TProfilePatch = z.infer<typeof profilePatchSchema>;

export default function ProfileEditCard() {
  const {
    register,
    handleSubmit,
    formState: { isLoading: isSubmitLoading },
  } = useForm<TProfilePatch>({
    resolver: zodResolver(profilePatchSchema),
  });

  const [patchProfile, { isLoading: isPatchProfileLoading }] =
    usePatchProfileMutation();

  const handlePatchProfile = async (data: TProfilePatch) => {
    patchProfile(data);
  };

  const isFormLoading = isSubmitLoading || isPatchProfileLoading;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Edit Profile
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handlePatchProfile)}>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <UserAvatar />
            <Input type="file" accept="image/*" className="hidden" />
            <Button type="button" variant="outline" disabled>
              Change Avatar
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                {...register('firstName')}
                id="firstName"
                placeholder="Your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                {...register('lastName')}
                id="lastName"
                placeholder="Your last name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              id="username"
              placeholder="Your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register('password')}
                id="password"
                placeholder="New password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register('location')}
              id="location"
              placeholder="Your location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register('bio')}
              id="bio"
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isFormLoading}>
            {isFormLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
