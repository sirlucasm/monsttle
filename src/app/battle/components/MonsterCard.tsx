import { Monster } from "@/schemas/monster";
import { Progress } from "@heroui/react";
import clsx from "clsx";
import { HeartIcon, ShieldIcon, SwordIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MonsterCardProps {
  monster: Monster;
  onClick: () => void;
  isSelected?: boolean;
}

export const MonsterCard = ({
  monster,
  onClick,
  isSelected,
}: MonsterCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={clsx(
        "flex flex-col gap-y-2 p-2 bg-secondary-100/10 w-48 rounded-xl cursor-pointer hover:bg-secondary-100/20 border-2 border-transparent transition-colors",
        {
          "border-2 !border-secondary-200/20 !bg-secondary-100/20": isSelected,
        }
      )}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={monster.imageUrl}
        alt={monster.name}
        width={256}
        height={256}
        className="rounded-xl w-36 h-36 object-cover self-center"
        priority
      />
      <div className="flex justify-center">
        <h2 className="text-neutral-700/80 font-semibold text-sm">
          {monster.name}
        </h2>
      </div>
      <div className="flex flex-col gap-y-2 bg-white/10 rounded-lg p-2">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-x-1">
              <HeartIcon size={16} className="text-neutral-800/70" />
              <p className="text-xs text-neutral-800/70">HP</p>
            </div>
            <p className="text-[10px] text-neutral-800/70">{monster.hp}</p>
          </div>
          <Progress value={monster.hp} color="success" aria-label="HP" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-x-1">
              <SwordIcon size={16} className="text-neutral-800/70" />
              <p className="text-xs text-neutral-800/70">Attack</p>
            </div>
            <p className="text-[10px] text-neutral-800/70">{monster.attack}</p>
          </div>
          <Progress
            value={monster.attack}
            color="primary"
            aria-label="Attack"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-x-1">
              <ShieldIcon size={16} className="text-neutral-800/70" />
              <p className="text-xs text-neutral-800/70">Defense</p>
            </div>
            <p className="text-[10px] text-neutral-800/70">{monster.defense}</p>
          </div>
          <Progress
            value={monster.defense}
            color="secondary"
            aria-label="Defense"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-x-1">
              <ZapIcon size={16} className="text-neutral-800/70" />
              <p className="text-xs text-neutral-800/70">Speed</p>
            </div>
            <p className="text-[10px] text-neutral-800/70">{monster.speed}</p>
          </div>
          <Progress
            value={monster.speed}
            classNames={{ indicator: "bg-blue-500" }}
            aria-label="Speed"
          />
        </div>
      </div>
    </motion.div>
  );
};
