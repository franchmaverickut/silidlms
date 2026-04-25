import EmojiTokensProject from "./EmojiTokensProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicEmojiTokens() {
  return (
    <PublicProjectShell>
      <EmojiTokensProject isPublic />
    </PublicProjectShell>
  );
}