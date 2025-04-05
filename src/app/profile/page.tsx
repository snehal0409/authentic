import { Profile } from "./_components/";
import { getProfile } from "@/app/actions/auth";

export default async function ProfilePage() {
  const profile = await getProfile();

  
    return <Profile profile={profile} />;
  }

