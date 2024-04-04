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

interface ISocialLink {
  link: string;
  platform: string;
}

function SocialLink({ platform, link }) {
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

  return <Link href={link}>{getIcon(platform)}</Link>;
}

export default SocialLink;
