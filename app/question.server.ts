import { question } from "@prisma/client";
import { prisma } from "./db.server";

export const createQuestion = async (
  question: Pick<question, "name" | "question">
) => {
  await prisma.question.create({
    data: question,
  });
};
