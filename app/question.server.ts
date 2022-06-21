import type { question } from "@prisma/client";
import { prisma } from "./db.server";

export const createQuestion = async (
  question: Pick<question, "name" | "question">
) => {
  return await prisma.question.create({
    data: question,
  });
};

export const getQuestions = async ({
  getAnswered,
}: {
  getAnswered: boolean;
}) => {
  if (getAnswered) {
    return await prisma.question.findMany({
      where: {
        isAnswered: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.question.findMany();
};
