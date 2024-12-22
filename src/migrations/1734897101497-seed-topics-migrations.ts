import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class SeedTopicsMigration1734897101497 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Путь к JSON файлу
        const filePath = path.resolve(__dirname, '../../data/topics_data.json');

        // Чтение файла
        const topicsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Вставка данных в таблицу
        for (const topic of topicsData) {
            await queryRunner.query(
              `INSERT INTO topics (title, description, difficulty_level, is_active, language, created_at) VALUES ("${topic.topic}", "${topic.description}", "beginner", 1, "en", NOW())`,
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаление всех данных, которые были вставлены
        await queryRunner.query(`DELETE FROM topics`);
    }
}
