import Link from "next/link";
import {
  Facebook,
  Github,
  Linkedin,
  LucideInstagram,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

interface SocialLinkProps {
  link: string;
  platform: string;
  isShareUrl?: boolean;
}

function SocialLink({ platform, link, isShareUrl = false }: SocialLinkProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size="16" />;
      case "twitter":
        return <Twitter size="16" />;
      case "instagram":
        return <LucideInstagram size="16" />;
      case "youtube":
        return <Youtube size="16" />;
      case "linkedin":
        return <Linkedin size="16" />;
      case "github":
        return <Github size="16" />;
    }
  };

  return (
    <Link href={link}>
      <div
        className={`${
          isShareUrl
            ? "py-2 px-3 bg-neutral-600 rounded-md hover:bg-neutral-800 hover:text-neutral-100 duration-100 ease-in-out transition-colors"
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
}

export default SocialLink;
