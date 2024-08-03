import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719475683821 implements MigrationInterface {
    name = ' $npmConfigName1719475683821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_user" DROP COLUMN "password"`);
    }

}
