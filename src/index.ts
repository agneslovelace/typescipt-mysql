import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Word } from "./entity/Word";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Helper function to parse ID
const parseId = (idParam: string | string[]): number | null => {
  const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
  return isNaN(id) ? null : id;
};

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация базы данных и запуск сервера
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully");

    
    // ----- WORD ROUTES -----

    app.get(
      "/api/words",
      async (req: express.Request, res: express.Response) => {
        try {
          const words = await AppDataSource.manager.find(Word);
          res.json(words);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch words" });
        }
      },
    );

    app.get(
      "/api/words/:id",
      async (req: express.Request, res: express.Response) => {
        try {
          const id = parseId(req.params.id);
          if (id === null) {
            return res.status(400).json({ error: "Invalid ID format" });
          }

          const word = await AppDataSource.manager.findOne(Word, {
            where: { id },
          });

          if (!word) {
            return res.status(404).json({ error: "Word not found" });
          }
          res.json(word);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch word" });
        }
      },
    );

    app.post(
      "/api/words",
      async (req: express.Request, res: express.Response) => {
        try {
          const { word, translation } = req.body;

          // Валидация входных данных
          if (!word || !translation) {
            return res.status(400).json({ error: "Missing required fields" });
          }

          const newWord = new Word();
          newWord.word = word;
          newWord.translation = translation;

          await AppDataSource.manager.save(newWord);
          res.status(201).json(newWord);
        } catch (error) {
          res.status(500).json({ error: "Failed to create word" });
        }
      },
    );

    app.put(
      "/api/words/:id",
      async (req: express.Request, res: express.Response) => {
        try {
          const id = parseId(req.params.id);
          if (id === null) {
            return res.status(400).json({ error: "Invalid ID format" });
          }

          const word = await AppDataSource.manager.findOne(Word, {
            where: { id },
          });

          if (!word) {
            return res.status(404).json({ error: "Word not found" });
          }

          const { word: newWord, translation } = req.body;
          word.word = newWord || word.word;
          word.translation = translation || word.translation;

          await AppDataSource.manager.save(word);
          res.json(word);
        } catch (error) {
          res.status(500).json({ error: "Failed to update word" });
        }
      },
    );

    app.delete(
      "/api/words/:id",
      async (req: express.Request, res: express.Response) => {
        try {
          const id = parseId(req.params.id);
          if (id === null) {
            return res.status(400).json({ error: "Invalid ID format" });
          }

          const word = await AppDataSource.manager.findOne(Word, {
            where: { id },
          });

          if (!word) {
            return res.status(404).json({ error: "Word not found" });
          }

          await AppDataSource.manager.remove(word);
          res.status(204).send();
        } catch (error) {
          res.status(500).json({ error: "Failed to delete word" });
        }
      },
    );

    // Health check
    app.get("/health", (req: express.Request, res: express.Response) => {
      res.json({ status: "OK", message: "Server is running" });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Available endpoints:");
      console.log("- GET /health");
      console.log("- GET /api/words");
      console.log("- POST /api/words");
      console.log("- GET /api/words/:id");
      console.log("- PUT /api/words/:id");
      console.log("- DELETE /api/words/:id");
    });
  })
  .catch((error) => console.log("Database connection error:", error));
