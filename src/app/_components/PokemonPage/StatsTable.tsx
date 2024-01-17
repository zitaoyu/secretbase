import { statColorMap, statNameMap } from "@/app/_utils/stats";
import { StatElement } from "pokedex-promise-v2";
import { SectionTitle } from "./SectionTitle";

interface StatsTableProps {
  statsData: StatElement[];
}

export const StatsTable = ({ statsData }: StatsTableProps) => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <SectionTitle title="Base Stats" />
      <div className="w-full rounded-xl p-1 text-sm outline outline-default sm:text-base">
        {statsData.map((stat) => (
          <div
            className="grid grid-cols-4 border-b-2 border-default"
            key={stat.stat.name}
          >
            <div className="flex justify-between border-r-2 border-default p-1 font-semibold">
              <span>{statNameMap[stat.stat.name]}:</span>
              <span>{stat.base_stat}</span>
            </div>
            <div className="col-span-3 py-[6px]">
              <div
                className="h-full rounded-e-md"
                style={{
                  backgroundColor: statColorMap[stat.stat.name],
                  width: `${(stat.base_stat / 255) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-4">
          <div className="flex justify-between p-1 font-semibold">
            <span>Total:</span>
            <span>
              {statsData
                .map((stat) => stat.base_stat)
                .reduce((acc, currentValue) => acc + currentValue, 0)}
            </span>
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </div>
  );
};
