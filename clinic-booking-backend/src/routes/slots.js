const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { region_id, doctor_id, date } = req.query;

    if (!region_id || !doctor_id || !date) {
      return res.status(400).json({
        error: {
          code: "BAD_REQUEST",
          message: "region_id, doctor_id, and date are required"
        }
      });
    }

    const slots = await prisma.appointmentSlot.findMany({
      where: {
        region_id,
        doctor_id,
        slot_date: new Date(date),
        is_available: true
      },
      orderBy: {
        start_time: 'asc'
      }
    });

    res.json(slots);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong"
      }
    });
  }
});

module.exports = router;