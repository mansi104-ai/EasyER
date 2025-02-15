<div align="center">

<div align="center">
  <img src="https://github.com/mansi104-ai/EasyER/blob/main/logo.png" alt="EasyER Logo" height="300">
</div>

# EasyER

An interactive web application for creating and managing Entity-Relationship diagrams with real-time collaboration features.

## Features

- Create and edit ER diagrams with an intuitive interface
- Real-time diagram preview
- Export diagrams in multiple formats
- Save diagram history
- Collaborative editing
- File upload support for importing existing diagrams

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma
- PostgreSQL
- shadcn/ui
- Tailwind CSS

## Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mansi104-ai/EasyER/.git
cd EasyER
```

2. Install frontend dependencies:
```bash
cd er-diagram-generator
npm install
```
   Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Configure your database connection in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/er_diagram_db"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to start using the application.

## Database Schema

The application uses the following database models:

- Diagram: Stores diagram metadata and content
- User: User authentication and preferences
- History: Tracks diagram changes and versions
- Collaboration: Manages shared access and permissions

## API Routes

- `/api/diagrams`: CRUD operations for diagrams
- `/api/diagrams/generate`: Generate diagram from specifications
- `/api/history`: Track and retrieve diagram history
- `/api/collaboration`: Manage shared access

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.