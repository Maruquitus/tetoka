import { Card } from "@/components/Card";
import { Highlight } from "@/components/Highlight";
import {
  faBookOpen,
  faCar,
  faCheck,
  faGraduationCap,
  faIdBadge,
  faMoneyBill,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PreferencesModal(props: {
  setInterests: Function;
  interests: string[];
  visible: boolean;
  setVisible: Function;
  handleSubmit: Function;
}) {
  const handleInterestChange = (preference: string) => {
    if (props.interests.includes(preference)) {
      props.setInterests(
        props.interests.filter((interest) => interest !== preference)
      );
    } else {
      props.setInterests([...props.interests, preference]);
    }
  };

  return (
    <main
      onClick={(e) => {
        props.setVisible(false);
        e.stopPropagation();
      }}
      className={`fixed z-30 dark:bg-black/50 bg-slate-700/10 left-0 top-20 w-screen h-screen backdrop-blur-lg transition-all duration-300 ${
        props.visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <h1 className="text-center text-xl sm:text-2xl mt-4 dark:text-white w-full font-medium">
        Selecione suas <Highlight>preferências</Highlight>
      </h1>
      <div className="w-11/12 sm:w-4/5 flex gap-x-10 justify-items-center justify-center flex-wrap gap-y-4 mx-auto mt-4">
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="rg"
          icon={faIdBadge}
          label="Emissão do RG"
        />
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="cnh"
          icon={faCar}
          label="Emissão da CNH"
        />
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="empreender"
          icon={faMoneyBill}
          label="Como empreender"
        />
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="faculdade"
          icon={faGraduationCap}
          label="Como melhorar na faculdade"
        />
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="concursos"
          icon={faBookOpen}
          label="Concursos"
        />
        <Card
          handleInterestChange={handleInterestChange}
          interests={props.interests}
          tag="legislação"
          icon={faScaleBalanced}
          label="Legislação"
        />
      </div>
      <FontAwesomeIcon
        onClick={(e) => {
          props.handleSubmit();
          e.stopPropagation();
        }}
        icon={faCheck}
        className="bg-primary dark:bg-primary-dark text-2xl aspect-square text-white hover:scale-[102%] duration-300 transition-all cursor-pointer shadow-lg p-4 rounded-full absolute right-10 bottom-20 sm:bottom-20 mb-10 sm:right-20"
      />
    </main>
  );
}
