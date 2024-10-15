import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Overlay } from "../Overlay";
import useToggleBodyScroll from "@/app/_hooks/useToggleBodyScroll";

enum DetailType {
  ABILITY = "ability",
  HELD_ITEM = "held-item",
  MOVE = "move",
}

interface DetailPanelProps {
  detailType?: DetailType;
  //   detailData: DetailData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailPanel = ({ setIsOpen }: DetailPanelProps) => {
  useToggleBodyScroll();

  return (
    <div>
      <Overlay onClick={() => setIsOpen(false)} />
      <div
        className="absolute left-1/2 z-50 flex h-[90vh] w-[90vw] -translate-x-1/2
      flex-col justify-center overflow-hidden rounded-xl p-6 md:max-w-2xl"
      >
        {/* TODO: implement UI */}
        <Card className="h-full w-full">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">NextUI</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
