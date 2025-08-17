import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface SpaceCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  glowing?: boolean;
}

const SpaceCard = ({ title, children, className = "", glowing = false }: SpaceCardProps) => {
  return (
    <Card className={`space-card p-6 hover:scale-105 transition-transform duration-300 ${glowing ? 'stellar-glow' : ''} ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      {children}
    </Card>
  );
};

export default SpaceCard;