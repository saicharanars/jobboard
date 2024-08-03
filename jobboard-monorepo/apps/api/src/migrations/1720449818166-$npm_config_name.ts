import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720449818166 implements MigrationInterface {
    name = ' $npmConfigName1720449818166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" ADD "questions" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" DROP COLUMN "questions"`);
    }

}
