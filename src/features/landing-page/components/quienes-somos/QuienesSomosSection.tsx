import { ABOUT_IMAGES } from "../../data/about";
import { RevealSection } from "../reveal";
import { AboutBody } from "./AboutBody";
import { AboutFramedImage } from "./AboutFramedImage";
import { AboutNewBeginningMark } from "./AboutNewBeginningMark";
import { QuienesSomosTitle } from "./QuienesSomosTitle";

export const QuienesSomosSection = (): JSX.Element => (
  <RevealSection
    id="quienes-somos"
    aria-labelledby="quienes-somos-title"
    surface="flush"
  >
    <QuienesSomosTitle />

    <div className="mt-16 flex flex-col gap-10 lg:mt-20 lg:gap-14">
      <AboutBody paragraphIds={["origins"]} className="max-w-3xl" />

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] xl:gap-10">
        <AboutFramedImage
          image={ABOUT_IMAGES[0]}
          className="relative z-0 mx-auto w-full max-w-[18.5rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-none"
        />
        <AboutBody
          paragraphIds={["rebrand"]}
          className="relative z-10 lg:pl-12 xl:pl-16"
        />
      </div>

      <div className="relative -mt-2 grid grid-cols-1 items-start gap-8 lg:-mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-x-10 lg:gap-y-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] xl:gap-x-14">
        <AboutBody
          paragraphIds={["family"]}
          className="relative z-10 mt-8 lg:col-start-1 lg:row-start-1 lg:mt-16 lg:pr-12 xl:pr-16"
        />
        <AboutFramedImage
          image={ABOUT_IMAGES[1]}
          className="relative z-0 mx-auto w-full max-w-[18.5rem] sm:max-w-[20rem] lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-none"
        />
        <div className="mt-2 flex justify-center lg:pointer-events-none lg:absolute lg:top-[68%] lg:left-1/2 lg:z-10 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <AboutNewBeginningMark />
        </div>
        <AboutFramedImage
          image={ABOUT_IMAGES[2]}
          className="relative z-0 mx-auto w-full max-w-[18.5rem] sm:max-w-[20rem] lg:col-start-1 lg:row-start-2 lg:mx-0 lg:-mt-28 lg:max-w-[22rem]"
        />
      </div>
    </div>
  </RevealSection>
);
