import { useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { selectAuthData } from '@/features/auth/authSlice';
import { usePatchProfileMutation } from '../profileSlice';

import UserAvatar from '@/components/general/UserAvatar';
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

export const profilePatchSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'First name must contain at least 3 characters')
      .max(100, 'First name must contain at most 100 characters'),
    lastName: z
      .string()
      .min(3, 'Last name must contain at least 3 characters')
      .max(100, 'Last name must contain at most 100 characters'),
    username: z
      .string()
      .min(3, 'Username must contain at least 3 characters')
      .max(100, 'Username must contain at most 100 characters'),
    email: z
      .string()
      .email()
      .min(3, 'Email must contain at least 3 characters')
      .max(100, 'Email must contain at most 100 characters'),
    location: z
      .string()
      .min(3, 'Location must contain at least 3 characters')
      .max(100, 'Location must contain at most 100 characters'),
    bio: z
      .string()
      .min(3, 'Bio must contain at least 3 characters')
      .max(100, 'Bio must contain at most 100 characters'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export type TProfilePatch = z.infer<typeof profilePatchSchema>;

const ProfileEditPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { isLoading: isSubmitLoading },
  } = useForm<TProfilePatch>({
    resolver: zodResolver(profilePatchSchema),
  });

  const authData = useAppSelector(selectAuthData);
  const [patchProfile, { isLoading: isPatchProfileLoading }] =
    usePatchProfileMutation();

  const handleSubmitProfilePatch = async (data: TProfilePatch) => {
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
      <form onSubmit={handleSubmit(handleSubmitProfilePatch)}>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <UserAvatar
              title={authData?.username}
              colorClass={authData?.colorClass}
              src={authData?.profileImage}
            />
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="Your email"
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
};

export default ProfileEditPanel;
