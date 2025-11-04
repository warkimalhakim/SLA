import { NextResponse } from "next/server";
import formatSeconds from "@/libs/Formatter";

export async function GET(request, { params }) {
  const { waktu } = await params

  const [value, typeValue] = waktu

  if (!typeValue) {
    return NextResponse.json({
      code: 400,
      status: false,
      message: "add params '/minutes' or '/seconds' to calculate SLA",
    }, { status: 400 });
  }
  // JIKA BUKAN ANGKA MAKA TOLAK
  if (!parseInt(value)) {
    return NextResponse.json({
      code: 400,
      status: false,
      message: "minute must be a number",
    }, { status: 400 });
  }

  // JIKA PARAMYA MENIT, MAKA KOVERSI DAHULU
  let seconds = parseFloat(value)
  let minutes = parseFloat(value)

  const isMinute = RegExp(/minute/i).test(typeValue)
  if (isMinute) {
    seconds = parseFloat((minutes * 60))
  } else if (RegExp(/second/i).test(typeValue)) {
    minutes = parseFloat((minutes / 60))
  }

  const secondsPerDay = 24 * 3600 // 86400


  // METHOD #1
  // const daily   = 100 * (1 - (seconds / (1 * secondsPerDay)))
  // const weekly  = 100 * (1 - (seconds / (7 * secondsPerDay)))
  // const monthly = 100 * (1 - ( seconds / (1 * (365 * secondsPerDay) / 12) ))
  // const quarterly = 100 * (1 - ( seconds / (3 * (365 * secondsPerDay) / 12) ))
  // const yearly = 100 * (1 - ( seconds / (365 * secondsPerDay) ))
  // METHOD #2
  const daily = (secondsPerDay - seconds) / secondsPerDay * 100
  const weekly = (secondsPerDay * 7 - seconds) / (secondsPerDay * 7) * 100
  const monthly = (2629746 - seconds) / 2629746 * 100 //(seconPerDay * 30,436875 hari)
  const quarterly = (7889238 - seconds) / 7889238 * 100
  const yearly = (31556952 - seconds) / 31556952 * 100 // (1 tahun adalah 365.2425 hari)

  return NextResponse.json({
    status: true,
    seconds: seconds,
    minutes: minutes,
    formatted: formatSeconds(seconds),
    daily: daily,
    weekly: weekly,
    monthly: monthly,
    quarterly: quarterly,
    yearly: yearly
  }, { status: 200 });
}