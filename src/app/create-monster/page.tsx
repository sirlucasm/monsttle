"use client";

import Button3D from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Wrapper } from "@/components/Wrapper";
import { CreateMonsterDto, createMonsterSchema } from "@/schemas/monster";
import { Input } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DicesIcon,
  HeartIcon,
  ImageIcon,
  ShieldIcon,
  SwordIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { useGame } from "@/contexts/game";
import Image from "next/image";
import { Button } from "@heroui/react";
import Logo from "@/components/Logo";
import clsx from "clsx";
import SuccessCard from "./components/SuccessCard";

const MONSTER_POSSIBLE_NAMES = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Monster",
  "Goblin",
  "Orc",
  "Troll",
  "Wizard",
  "Elf",
  "Dwarf",
  "Giant",
];

const MONSTER_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/assets/image/monsters/character${i + 1}.png`
);

export default function CreatePage() {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { addMonster } = useGame();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting, errors, isSubmitSuccessful },
    setValue,
  } = useForm<CreateMonsterDto>({
    resolver: yupResolver(createMonsterSchema),
  });

  const currentValues = watch();

  const handleReset = useCallback(() => {
    reset({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      imageUrl: "",
    });
  }, [reset]);

  const onSubmit = useCallback<SubmitHandler<CreateMonsterDto>>(
    (data) => {
      addMonster(data);
      handleReset();
    },
    [addMonster, handleReset]
  );

  const handleCreateRandomMonster = useCallback(() => {
    const randomImage = faker.string.fromCharacters(MONSTER_IMAGES);
    reset({
      name:
        faker.string.fromCharacters(MONSTER_POSSIBLE_NAMES) +
        " " +
        faker.person.lastName(),
      hp: faker.number.int({ min: 1, max: 100 }).toString(),
      attack: faker.number.int({ min: 1, max: 100 }).toString(),
      defense: faker.number.int({ min: 1, max: 100 }).toString(),
      speed: faker.number.int({ min: 1, max: 100 }).toString(),
      imageUrl: randomImage,
    });
    setSelectedImage(randomImage);
  }, [reset]);

  const handleImageChange = useCallback(
    (image: string) => {
      setSelectedImage(image);
      setValue("imageUrl", image);
    },
    [setValue]
  );

  return (
    <Wrapper>
      <Container>
        <Card>
          <Logo />

          {isSubmitSuccessful ? (
            <SuccessCard />
          ) : (
            <div>
              <PageTitle title="Create monster" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
              >
                <div>
                  <div>
                    <h2 className="font-semibold text-white">
                      Choose character
                    </h2>
                  </div>
                  <div className="flex overflow-x-auto max-w-full p-1.5 gap-x-2 relative z-1">
                    {MONSTER_IMAGES.map((image) => (
                      <Image
                        key={image}
                        src={image}
                        alt="Monster"
                        width={124}
                        height={124}
                        className={clsx(
                          "rounded-xl object-cover cursor-pointer border-2 border-transparent ",
                          {
                            "border-3 !border-primary": selectedImage === image,
                          }
                        )}
                        onClick={() => handleImageChange(image)}
                      />
                    ))}
                  </div>
                  {selectedImage && (
                    <Button
                      onPress={() => setSelectedImage("")}
                      variant="light"
                      size="sm"
                      className="mt-2 text-white self-center"
                    >
                      Remove image
                    </Button>
                  )}
                </div>
                <Input
                  label="Name"
                  placeholder="Red Dragon"
                  startContent={<UserIcon color="white" />}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  value={currentValues?.name}
                  {...register("name")}
                />
                <Input
                  label="Health"
                  placeholder="0-100"
                  type="number"
                  startContent={<HeartIcon color="white" />}
                  isInvalid={!!errors.hp}
                  errorMessage={errors.hp?.message}
                  value={currentValues?.hp?.toString()}
                  {...register("hp")}
                />
                <Input
                  label="Attack"
                  placeholder="0-100"
                  type="number"
                  startContent={<SwordIcon color="white" />}
                  isInvalid={!!errors.attack}
                  errorMessage={errors.attack?.message}
                  value={currentValues?.attack?.toString()}
                  {...register("attack")}
                />
                <Input
                  label="Defense"
                  placeholder="0-100"
                  type="number"
                  startContent={<ShieldIcon color="white" />}
                  isInvalid={!!errors.defense}
                  errorMessage={errors.defense?.message}
                  value={currentValues?.defense?.toString()}
                  {...register("defense")}
                />
                <Input
                  label="Speed"
                  placeholder="0-100"
                  type="number"
                  startContent={<ZapIcon color="white" />}
                  isInvalid={!!errors.speed}
                  errorMessage={errors.speed?.message}
                  value={currentValues?.speed?.toString()}
                  {...register("speed")}
                />

                {!selectedImage && (
                  <Input
                    label="Image"
                    placeholder="Image URL"
                    startContent={<ImageIcon color="white" />}
                    isInvalid={!!errors.imageUrl}
                    errorMessage={errors.imageUrl?.message}
                    value={selectedImage}
                    {...register("imageUrl")}
                  />
                )}

                <div className="mt-3 flex flex-col gap-y-2">
                  <Button3D
                    onClick={handleCreateRandomMonster}
                    className="flex gap-x-2"
                    variant="white"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    <DicesIcon />
                    Generate random
                  </Button3D>
                  <Button3D type="submit" disabled={isSubmitting}>
                    Create
                  </Button3D>
                </div>
              </form>
            </div>
          )}
        </Card>
      </Container>
    </Wrapper>
  );
}
