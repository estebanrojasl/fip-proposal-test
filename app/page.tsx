import Image from "next/image";
import content from "../content.json";

export default function Home() {
  return (
    <>
      <h1>{content.heading}</h1>
      <Image src={content.img_1} width={500} height={500} alt="image" />
    </>
  );
}
