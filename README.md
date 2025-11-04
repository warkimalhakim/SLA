Ukur SLA berdasarkan downtime minutes atau seconds. Endpoint yang bisa digunakan sbb: /api/downtime/[nilai-downtime]/[seconds or minutes]. Dibuat dengan Next.JS

## Endpoint

### Konversi dari Downtime menit/detik ke SLA (%)

/api/downtime/[nilai-downtime]/[seconds atau minutes]
contoh:

```bash
/api/downtime/60/minutes
```

```bash
/api/downtime/60/seconds
```

### Konversi dari SLA (%) ke menit/detik

```bash
/api/sla/99.5
```
