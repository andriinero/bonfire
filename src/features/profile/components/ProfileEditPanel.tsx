import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { selectAuthData } from '@/features/auth/authSlice';
import {
  profileEditPanelOpenStateSet,
  usePatchProfileMutation,
} from '../profileSlice';

import ValidationError from '@/components/form/ValidationError';
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

export const profilePatchSchema = z.object({
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
});
export type TProfilePatch = z.infer<typeof profilePatchSchema>;

const ProfileEditPanel = () => {
  const {
    firstName,
    lastName,
    username,
    email,
    bio,
    location,
    profileImage,
    colorClass,
  } = useAppSelector(selectAuthData)!;
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isSubmitLoading },
    control,
  } = useForm<TProfilePatch>({
    resolver: zodResolver(profilePatchSchema),
    defaultValues: { firstName, lastName, username, email, bio, location },
  });

  const [patchProfile, { isLoading: isPatchProfileLoading }] =
    usePatchProfileMutation();
  const dispatch = useAppDispatch();

  const handleClosePanel = () => {
    dispatch(profileEditPanelOpenStateSet(false));
  };

  const handleSubmitProfilePatch = async (data: TProfilePatch) => {
    await patchProfile(data);
    handleClosePanel();
  };

  const isSubmitDisabled = isSubmitLoading || isPatchProfileLoading;

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleSubmitProfilePatch)}>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <UserAvatar
              style="xl"
              title={username}
              colorClass={colorClass}
              src={profileImage}
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
            {errors.firstName && (
              <ValidationError>{errors.firstName.message}</ValidationError>
            )}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                {...register('lastName')}
                id="lastName"
                placeholder="Your last name"
              />
              {errors.lastName && (
                <ValidationError>{errors.lastName.message}</ValidationError>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              id="username"
              placeholder="Your username"
            />
            {errors.username && (
              <ValidationError>{errors.username.message}</ValidationError>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="Your email"
            />
            {errors.email && (
              <ValidationError>{errors.email.message}</ValidationError>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register('location')}
              id="location"
              placeholder="Your location"
            />
            {errors.location && (
              <ValidationError>{errors.location.message}</ValidationError>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Textarea
                  id="bio"
                  name="bio"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="Tell us about yourself"
                  rows={3}
                  wrap="hard"
                  className="resize-none"
                />
              )}
            />
            {errors.bio && (
              <ValidationError>{errors.bio.message}</ValidationError>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end  gap-4">
          <Button type="button" onClick={handleClosePanel} variant="ghost">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitDisabled}>
            {isPatchProfileLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileEditPanel;
