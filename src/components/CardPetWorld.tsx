import { Heart, Shield, UtensilsCrossed, Zap } from "lucide-react";

interface StatsBarProps {
  color: string;
  icon: React.ReactNode;
  currentValue: number;
  maxValue: number;
}

function StatsBar(props: StatsBarProps) {
  const { color, icon, currentValue, maxValue } = props;

  return (
    <div className={`flex items-center gap-2 justify-center`}>
      {icon}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${(currentValue / maxValue) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {currentValue}
    </div>
  );
}

interface CardPetWorldProps {
  id: number;
  name: string;
  description: string;
  type: string;
  imageUrl: string;
  hunger: number;
  happiness: number;
  health: number;
  energy: number;
  owner: {
    id: number;
    username: string;
  };
}

function CardPetWorld(props: CardPetWorldProps) {
  const getColor = (type: string) => {
    if (type === "hunger") return "#4caf50";
    else if (type === "happiness") return "#ff36cb";
    else if (type === "health") return "#ff3636";
    else if (type === "energy") return "#ffeb3b";
    return "#9e9e9e"; // Default color if type is unknown
  };

  return (
    <div className="bg-orange-300 rounded-xl w-[300px] h-[450px] border-4 border-orange-400 pt-6 pb-6">
      <div className="bg-orange-100 border-t-2 border-b-2 border-orange-400 h-full w-full px-4 py-4 text-amber-800 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-2xl">{props.name}</h2>
          <div className="rounded-full bg-orange-500 px-3 py-1 text-lg font-bold text-white text-center">
            {props.type}
          </div>
        </div>
        <img
          src={props.imageUrl}
          alt={props.name}
          className="w-full h-40 object-cover rounded-lg border-2 border-orange-400"
        />
        <div className="flex flex-col gap-2">
          <StatsBar
            color={getColor("health")}
            icon={<Shield color={getColor("health")} size={20} />}
            currentValue={props.health}
            maxValue={100}
          />
          <StatsBar
            color={getColor("happiness")}
            icon={<Heart color={getColor("happiness")} size={20} />}
            currentValue={props.happiness}
            maxValue={100}
          />
          <StatsBar
            color={getColor("energy")}
            icon={<Zap color={getColor("energy")} size={20} />}
            currentValue={props.energy}
            maxValue={100}
          />
          <StatsBar
            color={getColor("hunger")}
            icon={<UtensilsCrossed color={getColor("hunger")} size={20} />}
            currentValue={props.hunger}
            maxValue={100}
          />
        </div>
      </div>
    </div>
  );
}

export default CardPetWorld;
