# MMA Platform Backend

This project is a minimal example of a NestJS backend for an MMA platform using GraphQL and TypeORM. It demonstrates a clean architecture-style folder structure and includes entities for fighters, events, fights and rankings.

## Ranking Algorithm

After each fight result is recorded, fighters earn points based on the result:

- **Win by KO/TKO or Submission**: +4 points
- **Win by Decision**: +3 points
- **Draw**: +1 point
- **Loss**: 0 points

Rankings are recalculated per weight class whenever points change.

## Development

Install dependencies and run in watch mode:

```bash
npm install
npm run start:dev
```

The app will start on http://localhost:3000 and provide a GraphQL endpoint at `/graphql`.
