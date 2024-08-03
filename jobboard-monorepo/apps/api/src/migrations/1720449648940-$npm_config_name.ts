import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720449648940 implements MigrationInterface {
    name = ' $npmConfigName1720449648940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" ADD "questions" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" DROP COLUMN "questions"`);
    }

}
