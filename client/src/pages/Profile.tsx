import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router"; // <-- Import Link for navigation
import { ArrowLeft, Camera } from "lucide-react";

// shadcn/ui Components - Ensure these are added via `npx shadcn-ui@latest add ...`
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "react-image-crop/dist/ReactCrop.css";
import { AvatarCropperModal } from "@/components/AvatarCropperModal";


// --- Interfaces and Mock Data ---
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio?: string;
  dob?: Date;
}

// !! REPLACE WITH ACTUAL DATA FETCHING !!
const currentUserData: UserData = {
  firstName: "Anh", // Example data
  lastName: "Le",
  email: "anh.le.dev@example.com",
  avatarUrl: "https://github.com/shadcn.png", // Placeholder avatar
  bio: "Full-stack developer based in Ho Chi Minh City.",
  dob: new Date(1993, 9, 25), // Example DOB (Month is 0-indexed: 9 = October)
};

// --- Zod Schema ---
const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).max(50),
  lastName: z.string().min(1, { message: "Last name is required." }).max(50),
  bio: z
    .string()
    .max(160, { message: "Bio must not be longer than 160 characters." })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;



// --- End Avatar Cropping Modal Component ---

// --- Main Update Profile Form Component ---

export const UpdateProfileForm = () => {
  const [displayAvatar, setDisplayAvatar] = useState<string | null>(
    currentUserData.avatarUrl
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [croppedAvatarData, setCroppedAvatarData] = useState<string | null>(
    null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: currentUserData.firstName || "",
      lastName: currentUserData.lastName || "",
      bio: currentUserData.bio || "",
    },
    mode: "onChange",
  });

  const handleCropSave = (croppedDataUrl: string): void => {
    setDisplayAvatar(croppedDataUrl);
    setCroppedAvatarData(croppedDataUrl);
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log("Form submitted!");
    console.log("Data submitted:", data); // Includes DOB as Date object
    if (!form.formState.isSubmitting) {
      try {
        console.log("Updating profile with text data:", data);
        // !! TODO: Replace with API call to update profile (handle Date object on backend) !!
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        if (croppedAvatarData) {
          console.log("Uploading new cropped avatar (base64 data)...");
          // !! TODO: Replace with API call to upload avatar (handle base64 data) !!
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate upload delay
          alert("Avatar data ready (check console). Implement API call.");
          setCroppedAvatarData(null); // Clear after successful upload simulation
        }

        alert("Profile updated successfully! (Check console for data)");
        form.reset(data, {
          keepValues: true,
          keepDirty: false,
          keepIsSubmitted: false,
        });
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Check console for errors.");
      }
    }
  };

  const fallbackInitials =
    (
      (currentUserData.firstName?.[0] ?? "") +
      (currentUserData.lastName?.[0] ?? "")
    ).toUpperCase() || "??";

  return (
    <div>
      <Card className="w-full max-w-lg mx-auto my-8 !pt-2 shadow-md border border-border/40">
        <CardHeader className="flex flex-row items-center space-x-3 !pb-2 border-b">
          <Button variant="ghost" size="icon" aria-label="Go back home">
            <Link to="/" className="grid place-content-center flex-1 h-full">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <CardTitle className="text-xl font-medium">Update Profile</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6 space-y-8">
              <div className="flex justify-center">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ")
                      setIsModalOpen(true);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Update profile picture"
                >
                  <Avatar className="size-40 border-2 border-muted group-hover:border-primary transition-colors duration-200">
                    <AvatarImage
                      src={displayAvatar ?? undefined}
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>{fallbackInitials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 items-start">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    value={currentUserData.email}
                    readOnly
                    disabled
                    className="cursor-not-allowed opacity-70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

           <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      
                      <Textarea
                        placeholder="Tell us a little bit about yourself (max 160 characters)"
                        className="resize-none min-h-[100px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            </CardContent>

            <CardFooter className="bg-muted/30 px-6 py-4 border-t">
              <Button
                type="submit"
                disabled={
                  (!form.formState.isDirty && !croppedAvatarData) ||
                  form.formState.isSubmitting
                }
                className="ml-auto"
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {/* Avatar Cropping Modal */}
      <AvatarCropperModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleCropSave}
      />
    </div>
  );
};
