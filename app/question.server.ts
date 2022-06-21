import type { question } from "@prisma/client";
import { prisma } from "./db.server";

export const createQuestion = async (
  question: Pick<question, "name" | "question">
) => {
  return await prisma.question.create({
    data: question,
  });
};

export const getQuestionsForDisplay = async () => {
  return await prisma.question.findMany({
    where: {
      isAnswered: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      answer: true,
      question: true,
      name: true,
    },
  });
};

export const getUnansweredQuestions = async () => {
  return await prisma.question.findMany({
    where: {
      isAnswered: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      question: true,
      name: true,
    },
  });
};
