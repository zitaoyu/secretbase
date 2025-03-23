import { useState, useEffect } from "react";
import { PrimarySpinner } from "@/app/_components/PrimarySpinner";
import { PokemonSimpleData } from "@/app/_services/models/PokemonSimpleData";
import { PokemonCard } from "@/app/_components/pokedex/PokemonCard";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import WrapperProps from "@/app/_components/Wrapper";
import { Game } from "@/app/_types/game.type";
import { pokedexMap } from "@/app/_utils/pokedex-mapping";

interface SidePanelProps extends WrapperProps {
  isLeft?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const SidePanel = ({
  children,
  isLeft = true,
  onOpen = () => {},
  onClose = () => {},
}: SidePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function openPanel() {
    setIsOpen((prev) => !prev);
    onOpen();
  }

  function closePanel() {
    setIsOpen(false);
    onClose();
  }

  return (
    <div
      className={`fixed top-0 z-50 flex h-screen w-10/12 max-w-lg transition duration-700 ease-in-out md:w-1/2
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    ${isLeft ? "left-0" : "left-full"}
                    `}
    >
      {/* Overlay */}
      <div
        className={`fixed left-0 top-0 h-screen w-screen ${isOpen ? "block" : "hidden"}`}
        onClick={closePanel}
      />
      {/* Toggle Button */}
      <button
        className={`${isOpen ? "opacity-100" : "opacity-60 sm:opacity-100"} absolute left-full top-[20%] z-40 h-20 -translate-y-1/2 rounded-r-xl border-b-2 border-r-2 border-t-2 border-default-400 bg-content1 sm:top-1/2 `}
        onClick={() => (isOpen ? closePanel() : openPanel())}
      >
        <div className="flex flex-col items-center px-1">
          {!isOpen && <div className="hidden sm:block">Pokedex</div>}
          <div>
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft size={32} />
            ) : (
              <MdKeyboardDoubleArrowRight size={32} />
            )}
          </div>
        </div>
      </button>
      <div className="z-50 h-screen w-full border-r-2 border-default-400 bg-content1">
        {children}
      </div>
    </div>
  );
};

interface PokedexSidePanelProps {
  game: Game;
}

export const PokedexSidePanel = ({ game }: PokedexSidePanelProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonSimpleData[]>();
  const [isShowOverlay, setIsShowOverlay] = useState(false);

  function onOpen() {
    const data = pokedexMap[game].getAllPokemonSimpleData();
    setPokemonData(data);
    setIsShowOverlay(true);
  }

  function onClose() {
    setPokemonData([]);
    setIsShowOverlay(false);
  }

  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-40 h-screen bg-black opacity-20
                      ${isShowOverlay ? " w-screen" : "w-0"}
                      `}
      />
      <SidePanel onOpen={onOpen} onClose={onClose}>
        {pokemonData ? (
          <div className="grid h-full w-full grid-cols-4 gap-2 overflow-y-scroll p-4 lg:grid-cols-5">
            {pokemonData.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                data={pokemon}
                isMini
                showShiny={false}
              />
            ))}
          </div>
        ) : (
          <PrimarySpinner />
        )}
      </SidePanel>
    </div>
  );
};
