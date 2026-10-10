import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      }),
      prisma.thread.count(),
    ]);

    res.json({
      threads,
      total,
      hasMore: total > page * pageSize,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
