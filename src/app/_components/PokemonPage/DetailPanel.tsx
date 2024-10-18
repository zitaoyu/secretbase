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
import { DetailPanelData } from "@/app/_services/models/DetailPanelData";
import { PrimaryButton } from "../PrimaryButton";
import { capitalizeFirstLetter } from "@/app/_utils/format";
import { SpriteGallery } from "./SpriteGallery";
import { FaExternalLinkAlt } from "react-icons/fa";

interface DetailPanelProps {
  detailPanelData: DetailPanelData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailPanel = ({
  detailPanelData,
  setIsOpen,
}: DetailPanelProps) => {
  useToggleBodyScroll();

  return (
    <div>
      <Overlay onClick={() => setIsOpen(false)} />
      <div
        className="fixed left-1/2 z-50 flex h-[90vh] w-[98vw] -translate-x-1/2
      flex-col justify-center overflow-hidden rounded-xl p-6 md:max-h-[660px] md:max-w-2xl"
      >
        {/* TODO: implement UI */}
        <Card className="flex h-full w-full p-4">
          <CardHeader className="flex justify-end p-0 sm:p-4">
            <PrimaryButton
              className="text-lg font-normal"
              onClick={() => setIsOpen(false)}
            >
              Back
            </PrimaryButton>
          </CardHeader>
          <CardHeader className="flex justify-center p-0 pb-1 sm:p-4">
            <h1 className="text-4xl font-medium">
              {capitalizeFirstLetter(detailPanelData.type)}
            </h1>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4 text-lg">
            {detailPanelData.spriteUrl && (
              <div className="flex justify-center">
                {" "}
                <SpriteGallery imageUrl={detailPanelData.spriteUrl} />
              </div>
            )}
            <p>
              <span className="font-semibold">Name: </span>
              {detailPanelData.friendlyName}
            </p>
            <p>
              <span className="font-semibold">Detail:</span>
              <p>{detailPanelData.detail}</p>
            </p>
          </CardBody>
          <Divider />
          <CardFooter className="justify-center">
            <Link
              href={`https://bulbapedia.bulbagarden.net/wiki/${detailPanelData.friendlyName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton>
                Full Detail on Bulbapedia <FaExternalLinkAlt />
              </PrimaryButton>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
