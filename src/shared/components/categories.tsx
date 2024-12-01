import CategoryItem from "./category-item";

import fantasy from "@/shared/assets/images/fantasy.png";
import ficction from "@/shared/assets/images/ficction.png";
import hq from "@/shared/assets/images/hq.png";
import art from "@/shared/assets/images/art.png";
import science from "@/shared/assets/images/science.png";
import tech from "@/shared/assets/images/tech.png";
import selfHelp from "@/shared/assets/images/self-help.png";

export function Categories() {
  return (
    <div className="flex flex-col items-start p-4 mt-12 gap-4 rounded-xl bg-white w-full max-w-[50%] md:max-w-[1230px]">
      <h4 className="text-sm font-bold">Descubra por categorias</h4>

      <div className="flex flex-wrap items-center justify-center md:flex md:flex-row md:justify-start gap-5">
        <CategoryItem name="Fantasia" amount={20} img={fantasy} />
        <CategoryItem name="Ficção" amount={20} img={ficction} />
        <CategoryItem name="HQs" amount={20} img={hq} />
        <CategoryItem name="Arte" amount={20} img={art} />
        <CategoryItem name="Ciência" amount={20} img={science} />
        <CategoryItem name="Tecnologia" amount={20} img={tech} />
        <CategoryItem name="Auto ajuda" amount={20} img={selfHelp} />
      </div>
    </div>
  );
}

export default Categories;
