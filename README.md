
<div align="center">
  <img src="https://github.com/mansi104-ai/EasyER/blob/main/logo_final.png" alt="EasyER Logo" height="200">
</div>

<div align = "center" >
<font-size= "25">EasyER</font>
</div>

✨✨An interactive web application for creating and managing Entity-Relationship diagrams with real-time collaboration features.✨✨

## Features

- Create and edit ER diagrams with an intuitive interface
- Real-time diagram preview
- Export diagrams in multiple formats
- Save diagram history
- Collaborative editing
- File upload support for importing existing diagrams


## Tech Stack

### Machine Learning & Tools  
[![DeepSeek](https://img.shields.io/badge/DeepSeek-FF6B6B?style=for-the-badge&logo=ai&logoColor=white)](https://deepseek.com/)  
[![Graphviz](https://img.shields.io/badge/Graphviz-2596be?style=for-the-badge&logo=graphviz&logoColor=white)](https://graphviz.gitlab.io/)  
<!-- [![Machine Learning](https://img.shields.io/badge/Machine_Learning-F7931E?style=for-the-badge&logo=python&logoColor=white)](https://scikit-learn.org/) -->

### Frontend  
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=react&logoColor=white)](https://ui.shadcn.com/)  
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### Backend  
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)  
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)


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

- 📐Diagram: Stores diagram metadata and content
- 👩🏽‍💻User: User authentication and preferences
- ⏱️History: Tracks diagram changes and versions
- 🔗Collaboration: Manages shared access and permissions

## API Routes

- `/api/diagrams`: CRUD operations for diagrams
- `/api/diagrams/generate`: Generate diagram from specifications
- `/api/history`: Track and retrieve diagram history
- `/api/collaboration`: Manage shared access

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.