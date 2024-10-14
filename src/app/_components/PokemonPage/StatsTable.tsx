import { statColorMap, statNameMap } from "@/app/_utils/stats";
import { PokemonStats } from "@/app/_services/models/PokemonSimpleData";
import { SectionContainer } from "./SectionContainer";

interface StatsTableProps {
  stats: PokemonStats;
}

export const StatsTable = ({ stats }: StatsTableProps) => {
  return (
    <SectionContainer title="Base Stats">
      {Object.entries(stats).map(([statName, baseStat]) => (
        <div
          className="grid grid-cols-4 border-b-2 border-default"
          key={statName}
        >
          <div className="flex justify-between border-r-2 border-default p-1 font-semibold">
            <span>{statNameMap[statName]}:</span>
            <span>{baseStat}</span>
          </div>
          <div className="col-span-3 py-[6px]">
            <div
              className="h-full rounded-e-md"
              style={{
                backgroundColor: statColorMap[statName],
                width: `${(baseStat / 255) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-4">
        <div className="flex justify-between p-1 font-semibold">
          <span>Total:</span>
          <span>
            {Object.values(stats).reduce(
              (acc, currentValue) => acc + currentValue,
              0,
            )}
          </span>
        </div>
        <div className="col-span-3"></div>
      </div>
    </SectionContainer>
  );
};
