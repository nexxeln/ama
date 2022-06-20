import { prisma } from "./db.server";

export const createQuestion = async (question) => {
  await prisma.question.create({
    data: question,
  });
};
