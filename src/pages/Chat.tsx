// Chat.tsx
import { useLocation } from "react-router-dom";
import ChatSection from "../components/Chat/ChatSection";
import type { ProfileData } from "../types/profile";

function Chat({ profileData }: { profileData: ProfileData }) {
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt;

  return <ChatSection profileData={profileData} initialPrompt={initialPrompt} />;
}

export default Chat;
