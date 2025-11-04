import { NextResponse } from "next/server";
import formatSeconds from "@/libs/Formatter";

export async function GET(request, { params }) {
    const { sla } = await params

    // HAPUS KARAKTER SELAIN ANGKA, TITIK DAN KOMA
    let toDecimal = sla.replace(/[^0-9.,]/g, '')
    toDecimal = parseFloat(toDecimal.replace(/\,/g, '.'))

    if (!toDecimal) return NextResponse.json({
        code: 400,
        status: false,
        message: "Missing parameter SLA. Set integer or float",
    }, { status: 400 });

    if (toDecimal < 0 || toDecimal > 100) {
        return NextResponse.json({
            code: 400,
            status: false,
            message: "SLA must be between 0 and 100",
        }, { status: 400 });
    }

    const secondsPerDay = 1440 * 60 // 86400
    const SLA = toDecimal / 100

    const dailyDownSecs = secondsPerDay * (1 - SLA);
    const weeklyDownSecs = (secondsPerDay * 7) * (1 - SLA);
    const monthlyDownSecs = (secondsPerDay * 30.436875) * (1 - SLA);
    const quarterlyDownSecs = 7889238 * (1 - SLA);
    const yearlyDownSecs = (secondsPerDay * 365.2425) * (1 - SLA);


    const responseJson = {
        status: true,
        SLA: toDecimal,
        calculate: "maximum downtime seconds",
        daily: {
            seconds: dailyDownSecs,
            formatted: formatSeconds(dailyDownSecs)
        },
        weekly: {
            seconds: weeklyDownSecs,
            formatted: formatSeconds(weeklyDownSecs)
        },
        monthly: {
            seconds: monthlyDownSecs,
            formatted: formatSeconds(monthlyDownSecs)
        },
        quarterly: {
            seconds: quarterlyDownSecs,
            formatted: formatSeconds(quarterlyDownSecs)
        },
        yearly: {
            seconds: yearlyDownSecs,
            formatted: formatSeconds(yearlyDownSecs)
        }
    }

    return NextResponse.json(responseJson, { status: 200 })
}