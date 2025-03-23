"use client";

import { Card, CardBody, Image, Link } from "@heroui/react";
import gbaGif from "@/app/_assets/gba.gif";

// Static strings
const ABOUT_TITLE = "About";
const ABOUT_DESCRIPTION = `The name "Secret Base" is inspired by Pokémon Emerald's Secret Base feature, which allows players to create a unique safe space. This app aims to provide a safe and user-friendly space for Pokédex lookups, covering both the main series Pokémon games and ROM hacks, with a modern and intuitive UI designed for both desktop and mobile clients.`;
const ABOUT_POKEAPI_TEXT = "Main series' Pokemon data is powered by";
const PRIVACY_TITLE = "Privacy";
const PRIVACY_DESCRIPTION = `Pokémon and All Respective Names are Trademark & © of Nintendo 1996-2025`;

export default function About() {
  return (
    <div className="max-w-screen min-h-screen bg-[#303d69]">
      <section className="mx-auto flex max-w-7xl  flex-col items-center justify-center text-center">
        <Link
          href="https://www.pixeljess.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Artist"
        >
          <Image
            src={gbaGif.src}
            alt="GBA"
            className="max-h-[30vh] lg:max-h-[50vh]"
          />
        </Link>

        <div className="z-10 -mt-8 px-6 py-2 text-foreground">
          {/* About Section */}
          <Card className="mb-8">
            <CardBody>
              <h2 className="mb-4 text-3xl font-bold">{ABOUT_TITLE}</h2>
              <p className="text-lg">
                {ABOUT_DESCRIPTION}{" "}
                <p>
                  {ABOUT_POKEAPI_TEXT}{" "}
                  <Link href="https://pokeapi.co/" color="primary">
                    PokeAPI
                  </Link>
                  .
                </p>
              </p>
            </CardBody>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl font-bold">{PRIVACY_TITLE}</h2>
              <p className="mb-4 text-lg">{PRIVACY_DESCRIPTION}</p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
