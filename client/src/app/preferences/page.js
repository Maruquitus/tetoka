import { Card } from "@/components/Card";
import { Highlight } from "@/components/Highlight";
import {
  faBookOpen,
  faCar,
  faGraduationCap,
  faIdBadge,
  faMoneyBill,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-xl sm:text-2xl mt-4 dark:text-white w-full font-medium">
        Selecione suas <Highlight>preferências</Highlight>
      </h1>
      <div className="w-11/12 sm:w-4/5 flex gap-x-10 justify-items-center justify-center flex-wrap gap-y-4 mx-auto mt-4">
        <Card icon={faIdBadge} label="Emissão do RG" />
        <Card icon={faCar} label="Emissão da CNH" />
        <Card icon={faMoneyBill} label="Como empreender" />
        <Card icon={faGraduationCap} label="Como melhorar na faculdade" />
        <Card icon={faBookOpen} label="Concursos" />
        <Card icon={faScaleBalanced} label="Legislação" />
      </div>
    </main>
  );
}
