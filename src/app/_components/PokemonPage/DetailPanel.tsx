import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { Overlay } from "../Overlay";
import useToggleBodyScroll from "@/app/_hooks/useToggleBodyScroll";
import { DetailPanelData } from "@/app/_services/models/DetailPanelData";
import { PrimaryButton } from "../PrimaryButton";
import { capitalizeFirstLetter } from "@/app/_utils/format";
import { SpriteGallery } from "./SpriteGallery";
import { FaExternalLinkAlt } from "react-icons/fa";

const splitParagraph = (text: string): string[] => {
  // Define an array of keywords that should trigger a split
  const keywords = ["Overworld:", "The following are unaffected"];

  // Create a dynamic regex to match any of the keywords
  const regex = new RegExp(`\\b(${keywords.join("|")})`, "g");

  // Split the text at the keywords, keeping the keyword in the split result
  const paragraphs = text.split(regex);

  // Recombine the keyword and the following text into paragraphs
  const result = [];
  for (let i = 0; i < paragraphs.length; i++) {
    // If this part is a keyword, combine it with the next part
    if (keywords.includes(paragraphs[i])) {
      result.push(`${paragraphs[i]} ${paragraphs[i + 1]}`.trim());
      i++; // Skip the next part because it's already combined
    } else {
      result.push(paragraphs[i].trim());
    }
  }

  return result.filter(Boolean); // Filter out any empty strings
};

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
              Close
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
              {splitParagraph(detailPanelData.detail).map((value, index) => (
                <p className="pb-1" key={index}>
                  {value}
                </p>
              ))}
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
                Full Detail at Bulbapedia <FaExternalLinkAlt />
              </PrimaryButton>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
