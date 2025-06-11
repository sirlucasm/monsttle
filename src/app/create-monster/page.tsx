"use client";

import Button3D from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Wrapper } from "@/components/Wrapper";
import { CreateMonsterDto, createMonsterSchema } from "@/schemas/monster";
import { Input } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DicesIcon,
  HeartIcon,
  ShieldIcon,
  SwordIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { useGame } from "@/contexts/game";
import Image from "next/image";

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

export default function CreatePage() {
  const { addMonster } = useGame();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<CreateMonsterDto>({
    resolver: yupResolver(createMonsterSchema),
  });

  const currentValues = watch();

  const onSubmit = useCallback<SubmitHandler<CreateMonsterDto>>(
    (data) => {
      addMonster(data);
      reset({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        imageUrl: "",
      });
    },
    [addMonster, reset]
  );

  const handleCreateRandomMonster = useCallback(() => {
    reset({
      name:
        faker.string.fromCharacters(MONSTER_POSSIBLE_NAMES) +
        " " +
        faker.person.lastName(),
      hp: faker.number.int({ min: 1, max: 100 }),
      attack: faker.number.int({ min: 1, max: 100 }),
      defense: faker.number.int({ min: 1, max: 100 }),
      speed: faker.number.int({ min: 1, max: 100 }),
      imageUrl: faker.image.urlLoremFlickr({
        category: "monster",
      }),
    });
  }, [reset]);

  return (
    <Wrapper>
      <Container>
        <Card>
          <PageTitle title="Create monster" />

          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <Image
                src={currentValues?.imageUrl}
                alt={currentValues?.name}
                width={100}
                height={100}
                className="rounded-xl"
              />
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
        </Card>
      </Container>
    </Wrapper>
  );
}
