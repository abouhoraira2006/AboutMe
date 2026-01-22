"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { AboutMeData } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

interface SocialItem {
  key: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}
interface BubbleProps {
  item: SocialItem;
  index: number;
}

function SocialBubble({ item, index }: BubbleProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  // Magnetic effect: bubble position relative to mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Smooth spring animations
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // Calculate distance and apply magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 120; // Activation radius

      if (distance < maxDistance && !isHovered) {
        // Repel effect: move away from cursor
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(deltaY, deltaX);
        const repelDistance = force * 12; // Max repel distance

        x.set(Math.cos(angle) * repelDistance);
        y.set(Math.sin(angle) * repelDistance);
        scale.set(1 + force * 0.1);
      } else {
        x.set(0);
        y.set(0);
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, scale, isHovered]);

  // Ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y });
      setTimeout(() => setRipple(null), 600);
    }
  };

  const getHref = () => {
    if (item.key === "discord" && !String(item.value).startsWith("http")) {
      return `https://discordapp.com/users/${item.value}`;
    }
    if (item.key === "email") {
      return item.value.startsWith("mailto:") ? item.value : `mailto:${item.value}`;
    }
    return String(item.value);
  };

  return (
    <motion.a
      ref={ref}
      href={getHref()}
      target={item.key === "email" ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={item.label}
      className="group relative"
      style={{
        x: xSpring,
        y: ySpring,
        scale: scaleSpring,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glassmorphism bubble */}
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${item.color}15, ${item.color}25)`
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: `1px solid ${isHovered ? `${item.color}40` : "rgba(255,255,255,0.1)"}`,
          boxShadow: isHovered
            ? `0 8px 32px ${item.glowColor}40, 0 0 0 1px ${item.color}20 inset`
            : "0 4px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Animated glow ring */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${item.glowColor}30, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Icon */}
        <div
          className="relative z-10 flex items-center justify-center transition-all duration-300"
          style={{
            color: isHovered ? item.color : "rgba(255,255,255,0.95)",
            filter: isHovered ? `drop-shadow(0 0 12px ${item.glowColor})` : "none",
            transform: isHovered ? "scale(1.15)" : "scale(1)",
          }}
        >
          {item.icon}
        </div>

        {/* Ripple effect */}
        {ripple && (
          <motion.div
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              background: `radial-gradient(circle, ${item.glowColor}40, transparent)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: 100,
              height: 100,
              opacity: [0.6, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Light refraction effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>

      {/* Label tooltip */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 left-1/2 z-20 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white"
        style={{
          background: `linear-gradient(135deg, ${item.color}90, ${item.color}70)`,
          boxShadow: `0 4px 12px ${item.glowColor}30`,
        }}
        initial={{ opacity: 0, y: -4, x: "-50%" }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -4,
          x: "-50%",
        }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
      </motion.div>
    </motion.a>
  );
}

export function SocialSection({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();
  const s = data.social;
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for global parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const socialItems: SocialItem[] = [
    {
      key: "instagram",
      label: "Instagram",
      value: s.instagram || "",
      icon: <FaInstagram size={24} />,
      color: "#E4405F",
      glowColor: "#E4405F",
    },
    {
      key: "facebook",
      label: "Facebook",
      value: s.facebook || "",
      icon: <FaFacebook size={24} />,
      color: "#1877F2",
      glowColor: "#1877F2",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: s.linkedin || "",
      icon: <FaLinkedin size={24} />,
      color: "#0A66C2",
      glowColor: "#0A66C2",
    },
    {
      key: "github1",
      label: "GitHub",
      value: s.github1 || "",
      icon: <FaGithub size={24} />,
      color: "#FFFFFF",
      glowColor: "#58A6FF",
    },
    {
      key: "github2",
      label: "GitHub",
      value: s.github2 || "",
      icon: <FaGithub size={24} />,
      color: "#FFFFFF",
      glowColor: "#58A6FF",
    },
    {
      key: "discord",
      label: "Discord",
      value: s.discord || "",
      icon: <FaDiscord size={24} />,
      color: "#5865F2",
      glowColor: "#5865F2",
    },
    {
      key: "email",
      label: "Email",
      value: s.email || "",
      icon: <FaEnvelope size={22} />,
      color: "#34C759",
      glowColor: "#34C759",
    },
  ].filter((item) => item.value);

  return (
    <section
      id="social"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20 text-foreground sm:py-28"
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <h2 className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            {locale === "en" ? "Social & Links" : "الحسابات والروابط"}
          </h2>
          <p className="text-sm text-zinc-400">
            {locale === "en"
              ? "Connect with me on different platforms"
              : "تواصل معي عبر المنصات المختلفة"}
          </p>
        </motion.div>

        {/* Bubbles container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {socialItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <SocialBubble item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
